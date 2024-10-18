import { useEffect } from "react";
import { masonryData } from "../../data";

interface Window {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Masonry: any;
}

export const Masonry = () => {
  useEffect(() => {
    window.onload = () => {
      const customWindow = window as unknown as Window;
      const Masonry = customWindow.Masonry;
      new Masonry(".masonry-grid", {
        itemSelector: ".grid-item",
        percentPosition: true,
      });
    };
  }, []);

  return (
    <div className="container">
      <div
        className="row masonry-grid"
        data-masonry='{"percentPosition": true }'
      >
        {masonryData.map((item, idx) => (
          <div key={idx} className="col-lg-4 col-md-6 col-sm-12 grid-item mb-4">
            <img
              src={item.image}
              className="img-fluid rounded w-100"
              style={{ display: "block" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
