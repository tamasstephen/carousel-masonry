import { useCallback, useEffect, useReducer, useRef, useState } from "react";

type CarouselButtonState = {
  prev: {
    nextPrev: boolean;
    prevPressed: boolean;
  };
  next: {
    nextNext: boolean;
    nextPressed: boolean;
  };
};

enum CarouselChange {
  END_NEXT,
  END_PREV,
  HAS_NEXT,
  HAS_PREV,
  NEXT_PRESSED,
  NEXT_SCROLLEND,
  PREV_PRESSED,
  PREV_SCROLLEND,
}

enum CardsPerView {
  MOBILE = 1,
  SMALL = 2,
  DESKTOP = 3,
}

const MOBILE_BREAKPOINT = 576;
const SMALL_BREAKPOINT = 768;

export const useCarousel = (
  isRtl: boolean,
  carouselRef: React.RefObject<HTMLDivElement>,
  cardRef: React.RefObject<HTMLDivElement>
) => {
  const [cardsPerView, setCardsPerView] = useState(CardsPerView.DESKTOP);
  const [scrollPosition, setScrollposition] = useState(0);
  const windowSizeRef = useRef(window.innerWidth);
  const [state, dispatch] = useReducer(carouselChangeReducer, {
    prev: {
      nextPrev: isRtl ? false : true,
      prevPressed: false,
    },
    next: {
      nextNext: isRtl ? true : false,
      nextPressed: false,
    },
  });

  function carouselChangeReducer(
    state: CarouselButtonState,
    action: { type: CarouselChange }
  ) {
    switch (action.type) {
      case CarouselChange.HAS_NEXT:
        return { ...state, next: { ...state.next, nextNext: true } };
      case CarouselChange.END_NEXT:
        return { ...state, next: { ...state.next, nextNext: false } };
      case CarouselChange.NEXT_PRESSED:
        return { ...state, next: { ...state.next, nextPressed: true } };
      case CarouselChange.NEXT_SCROLLEND:
        return { ...state, next: { ...state.next, nextPressed: false } };
      case CarouselChange.HAS_PREV:
        return { ...state, prev: { ...state.prev, nextPrev: true } };
      case CarouselChange.END_PREV:
        return { ...state, prev: { ...state.prev, nextPrev: false } };
      case CarouselChange.PREV_PRESSED:
        return { ...state, prev: { ...state.prev, prevPressed: true } };
      case CarouselChange.PREV_SCROLLEND:
        return { ...state, prev: { ...state.prev, prevPressed: false } };
    }
  }

  useEffect(() => {
    const listenToWindowResize = (e: Event) => {
      const target = e.target as Window;
      if (
        target.innerWidth <= MOBILE_BREAKPOINT &&
        windowSizeRef.current >= MOBILE_BREAKPOINT
      ) {
        resetCarousel(isRtl);
        setCardsPerView(CardsPerView.MOBILE);
        windowSizeRef.current = target.innerWidth;
      }
      if (
        target.innerWidth >= MOBILE_BREAKPOINT &&
        windowSizeRef.current <= MOBILE_BREAKPOINT
      ) {
        resetCarousel(isRtl);
        setCardsPerView(CardsPerView.SMALL);
        windowSizeRef.current = target.innerWidth;
      }
      if (
        target.innerWidth <= SMALL_BREAKPOINT &&
        windowSizeRef.current >= SMALL_BREAKPOINT
      ) {
        resetCarousel(isRtl);
        setCardsPerView(CardsPerView.SMALL);
        windowSizeRef.current = target.innerWidth;
      }
      if (
        target.innerWidth >= SMALL_BREAKPOINT &&
        windowSizeRef.current <= SMALL_BREAKPOINT
      ) {
        resetCarousel(isRtl);
        setCardsPerView(CardsPerView.DESKTOP);
        windowSizeRef.current = target.innerWidth;
      }
    };

    window.addEventListener("resize", listenToWindowResize);
    return () => window.removeEventListener("resize", listenToWindowResize);
  });

  useEffect(() => {
    const listenToScrollEnd = () => {
      if (state.next.nextPressed) {
        dispatch({ type: CarouselChange.NEXT_SCROLLEND });
      }
      if (state.prev.prevPressed) {
        dispatch({ type: CarouselChange.PREV_SCROLLEND });
      }
    };
    if (carouselRef.current) {
      carouselRef.current.addEventListener("scrollend", listenToScrollEnd);
    }
  }, [carouselRef, state]);

  const resetCarousel = useCallback(
    (isRtl: boolean) => {
      carouselRef.current?.scrollTo({
        left: 0,
        behavior: "smooth",
      });
      setScrollposition(0);
      if (!isRtl) {
        dispatch({ type: CarouselChange.HAS_PREV });
        dispatch({ type: CarouselChange.END_NEXT });
      } else {
        dispatch({ type: CarouselChange.END_PREV });
        dispatch({ type: CarouselChange.HAS_NEXT });
      }
    },
    [carouselRef]
  );

  useEffect(() => {
    if (carouselRef.current) {
      resetCarousel(isRtl);
    }
  }, [isRtl, resetCarousel, carouselRef]);

  useEffect(() => {
    if (windowSizeRef.current > SMALL_BREAKPOINT) {
      setCardsPerView(CardsPerView.DESKTOP);
    } else if (windowSizeRef.current > MOBILE_BREAKPOINT) {
      setCardsPerView(CardsPerView.SMALL);
    } else {
      setCardsPerView(CardsPerView.MOBILE);
    }
  }, [setCardsPerView]);

  const handleNextClick = () => {
    if (!state.prev.nextPrev) {
      dispatch({ type: CarouselChange.HAS_PREV });
    }
    dispatch({ type: CarouselChange.NEXT_PRESSED });
    const cardWidth = cardRef.current ? cardRef.current.offsetWidth : 0;
    if (carouselRef.current) {
      carouselRef.current.scrollTo({
        left: scrollPosition - cardWidth,
        behavior: "smooth",
      });
      setScrollposition((prevValue) => prevValue - cardWidth);
    }
    if (
      isNextNotAvailable(carouselRef.current?.scrollLeft || 0, cardWidth, isRtl)
    ) {
      dispatch({ type: CarouselChange.END_NEXT });
      if (!isRtl) {
        setScrollposition(0);
      }
    }
  };

  const handlePrevClick = () => {
    if (!state.next.nextNext) {
      dispatch({ type: CarouselChange.HAS_NEXT });
    }
    dispatch({ type: CarouselChange.PREV_PRESSED });
    const cardWidth = cardRef.current ? cardRef.current.offsetWidth : 0;
    if (carouselRef.current) {
      carouselRef.current.scrollTo({
        left: scrollPosition + cardWidth,
        behavior: "smooth",
      });
      setScrollposition((prevValue) => prevValue + cardWidth);
    }
    if (
      isPrevNotAvailable(
        carouselRef.current?.scrollLeft || 0,
        cardWidth,
        carouselRef.current?.scrollWidth || 0,
        isRtl
      )
    ) {
      dispatch({ type: CarouselChange.END_PREV });
      if (isRtl) {
        setScrollposition(0);
      }
    }
  };

  const isNextNotAvailable = (
    scrollLeft: number,
    cardWidth: number,
    isRtl: boolean
  ) => {
    if (isRtl) {
      return (
        Math.abs(scrollLeft) + cardWidth + cardsPerView * cardWidth >=
        (carouselRef.current?.scrollWidth || 0) - cardWidth / 2
      );
    } else {
      return scrollLeft - cardWidth <= 0;
    }
  };

  const isPrevNotAvailable = (
    carouselScrollLeftWidth: number,
    cardWidth: number,
    carouselWidth: number,
    isRtl: boolean
  ) => {
    if (isRtl) {
      return carouselScrollLeftWidth + cardWidth >= 0;
    }
    return (
      Math.abs(carouselScrollLeftWidth) +
        cardWidth +
        cardsPerView * cardWidth >=
      carouselWidth - cardWidth / 2
    );
  };

  return { handleNextClick, handlePrevClick, state };
};
