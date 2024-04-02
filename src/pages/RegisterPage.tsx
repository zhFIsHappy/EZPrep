import Register from "../components/UserRegister";
import PreferenceSettings from "../components/PreferenceSettings";
import ConfirmSuggestion from "../components/ConfirmSuggestion";
// import "./App.css";
import React, { useState } from "react";
import MultiStepProgressBar from "../components/MultiStepProgressBar";
import "../assets/css/register.css";
import { RegisterContextProvider } from "../contexts/RegisterContext";

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
    <RegisterContextProvider>
      <div className="register-page-layout">
        <div className="register-page-header-area">
          <MultiStepProgressBar page={page} onPageNumberClick={nextPageNumber} />
        </div>
        <div className="register-form-area">
          {
            {
              pageone: <Register onButtonClick={nextPage} />,
              pagetwo: <PreferenceSettings onButtonClick={nextPage} />,
              pagethree: <ConfirmSuggestion onButtonClick={nextPage} />,
            }[page]
          }
        </div>
      </div>
    </RegisterContextProvider>
  );
}

export default RegisterPage;
