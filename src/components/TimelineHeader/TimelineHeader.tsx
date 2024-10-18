import { PropsWithChildren } from "react";
import styles from "./TimelineHeader.module.scss";
import Arrow from "../../assets/icons/arrow.svg";

interface TimelineHeaderProps {
  isRtl: boolean;
}

export const TimelineHeader = ({
  children,
  isRtl,
}: PropsWithChildren & TimelineHeaderProps) => {
  return (
    <div className="my-5">
      <div>
        <div className="d-flex justify-content-between align-items-center">
          <p className="order-2">
            <a className={styles["view-all-anchor"]} href="">
              View all
              <span
                className={
                  isRtl
                    ? styles["view-all-arrow-rtl"]
                    : styles["view-all-arrow-ltr"]
                }
              >
                <Arrow />
              </span>
            </a>
          </p>
          <h2
            className={`order-1 ${
              isRtl ? styles["rtl-title"] : styles["ltr-title"]
            } px-2 mb-4`}
          >
            Financial sector development timeline
          </h2>
        </div>
        <div className="border-top pt-4">
          <div className="justify-content-end gap-2 d-none d-sm-flex">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
