import { useState } from "react";
import styles from "./App.module.scss";
import { TimelineCard } from "./components/TimelineCard/TimelineCard";

function App() {
  const [isArabic, setIsArabic] = useState(true);
  const toggleLanguageChange = () => {
    document.documentElement.setAttribute("lang", isArabic ? "en" : "ar");
    document.documentElement.setAttribute("dir", isArabic ? "ltr" : "rtl");
    setIsArabic((prevState) => !prevState);
  };
  return (
    <div className="w-100">
      <div style={{ maxWidth: "1280px", margin: "auto" }}>
        <div>
          <button
            type="button"
            className={styles["change-language"]}
            onClick={toggleLanguageChange}
          >
            Change language
          </button>
        </div>
        <div>
          <TimelineCard
            title="New title"
            description="my custom description."
            image=""
            month="August"
            year={2024}
          />
        </div>
        <div>{/* <TimelineCarousel isRtl={isArabic} /> */}</div>

        {/* <Masonry /> */}
      </div>
    </div>
  );
}

export default App;
