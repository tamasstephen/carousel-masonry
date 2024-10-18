import styles from "./TimelineCard.module.scss";
import { TimelineData } from "@/types";
import Arrow from "@/assets/icons/arrow.svg";

interface CardProps {
  isRtl: boolean;
  isFirst?: boolean;
  isLast?: boolean;
}

export const TimelineCard = ({
  title,
  description,
  image,
  month,
  year,
  isRtl,
  isFirst,
  isLast,
}: Omit<TimelineData, "id"> & CardProps) => {
  return (
    <div className={`${styles["card-wrapper"]}`}>
      <div className={`card shadow mx-3 ${styles["timeline-card"]}`}>
        <div className="card-body">
          <div
            className={`ratio ratio-21x9 overflow-hidden ${styles["card-image-wrapper"]}`}
          >
            <img
              className="card-image-top object-fit-cover rounded-0"
              src={image}
            />
          </div>
          <h5 className={`card-title pt-3 m-0 ${styles["card-title"]}`}>
            {title}
          </h5>
          <p className={`card-text py-3 m-0 ${styles["card-text"]}`}>
            {description}
          </p>
          <a
            href="#"
            className={`d-flex align-items-center fw-bold grid pt-3 m-0 ${styles["card-link-custom"]}`}
          >
            <span
              className={`${isRtl ? styles["icon-rtl"] : styles["icon-ltr"]}`}
            >
              <Arrow />
            </span>
            <span>view more</span>
          </a>
        </div>
      </div>
      <div
        className={`${styles["timeline-decoration-wrapper"]} m-0 p-0 d-flex justify-content-center position-relative`}
      >
        <div className="h-100 bg-dark-subtle" style={{ width: "1px" }}></div>
        <div className="position-absolute top-100 translate-middle-y bg-white d-flex flex-column justify-content-center">
          <p className="m-0 text-center">{month}</p>
          <p className="m-0 text-center">{year}</p>
        </div>
      </div>
      <div style={{ height: "1px" }}>
        <div className="container p-0 m-0 w-100 h-100">
          <div className="row m-0 w-100 h-100">
            <div
              className={`col ${
                isFirst ? "" : styles["timeline-dashed-border"]
              }`}
            ></div>
            <div
              className={`col ${
                isLast ? "" : styles["timeline-dashed-border"]
              }`}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};
