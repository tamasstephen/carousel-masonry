import { useState } from "react";
import styles from "./App.module.scss";
import { Masonry, TimelineCarousel } from "./components";

function App() {
  const [isArabic, setIsArabic] = useState(true);
  const toggleLanguageChange = () => {
    document.documentElement.setAttribute("lang", isArabic ? "en" : "ar");
    document.documentElement.setAttribute("dir", isArabic ? "ltr" : "rtl");
    setIsArabic((prevState) => !prevState);
  };
  return (
    <div className="w-100 container mt-4">
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
          <TimelineCarousel isRtl={isArabic} />
        </div>
        <div className="my-5">
          <Masonry />
        </div>
      </div>
    </div>
  );
}

export default App;
