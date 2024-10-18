import { useRef } from "react";
import { timelineData } from "@/data";
import { TimelineCard } from "../TimelineCard";
import styles from "./TimelineCarousel.module.scss";
import { TimelineHeader } from "../TimelineHeader";
import Arrow from "@/assets/icons/arrow.svg";
import { useCarousel } from "@/hooks";

export const TimelineCarousel = ({ isRtl }: { isRtl: boolean }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const { handleNextClick, handlePrevClick, state } = useCarousel(
    isRtl,
    carouselRef,
    cardRef
  );

  return (
    <>
      <TimelineHeader isRtl={isRtl}>
        <button
          className={`${styles["prev-button"]}  ${styles["timeline-button"]} ${
            !isRtl ? "order-2" : ""
          }`}
          disabled={!state.prev.nextPrev || state.prev.prevPressed}
          onClick={handlePrevClick}
          type="button"
        >
          <Arrow />
        </button>
        <button
          className={`${styles["timeline-button"]} ${!isRtl ? "order-1" : ""}`}
          type="button"
          disabled={!state.next.nextNext || state.next.nextPressed}
          onClick={handleNextClick}
        >
          <Arrow />
        </button>
      </TimelineHeader>
      <div className="overflow-hidden overflow-md-visible">
        <div
          id="carouselExampleControls"
          className="carousel slide pb-5 overflow-visible"
        >
          <div
            className={`carousel-inner ${styles["carousel-inner"]}`}
            ref={carouselRef}
          >
            {timelineData.map((data, idx) => (
              <div
                key={data.id}
                className={`carousel-item } ${styles["carousel-item"]}`}
                ref={idx === 0 ? cardRef : null}
              >
                <TimelineCard
                  title={data.title}
                  description={data.description}
                  image={data.image}
                  month={data.month}
                  year={data.year}
                  isRtl={isRtl}
                  isFirst={idx === 0}
                  isLast={idx === timelineData.length - 1}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
