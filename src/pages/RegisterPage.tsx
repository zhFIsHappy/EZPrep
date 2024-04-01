import Register from "../components/UserRegister";
import Preference from "../components/Preference";
import SystemSuggest from "../components/SystemSuggest";
// import "./App.css";
import React, { useState } from "react";
import MultiStepProgressBar from "../components/MultiStepProgressBar";

function RegisterPage() {
  const [page, setPage] = useState("pageone");

  const nextPage = (page) => {
    setPage(page);
  };

  const nextPageNumber = (pageNumber) => {
    switch (pageNumber) {
      case "1":
        setPage("pageone");
        break;
      case "2":
        setPage("pagetwo");
        break;
      case "3":
        setPage("pagethree");
        break;
      default:
        setPage("1");
    }
  };

  return (
    <div className="RegisterPage">
      <MultiStepProgressBar page={page} onPageNumberClick={nextPageNumber} />
      {
        {
          pageone: <Register onButtonClick={nextPage} />,
          pagetwo: <Preference onButtonClick={nextPage} />,
          pagethree: <SystemSuggest onButtonClick={nextPage} />,
        }[page]
      }
    </div>
  );
}

export default RegisterPage;
