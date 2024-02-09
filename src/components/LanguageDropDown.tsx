import "../assets/css/dropdown.css";
import React, { useState } from "react";
import languages from "../assets/static/language";
import NativeSelect from "@mui/material/NativeSelect";
function LanguageDropDown({ setLanguageChoice }: any) {
  const getInitialState = () => {
    const value = "apex";
    return value;
  };
  const handleChange = (e: any) => {
    setValue(e.target.value);
    setLanguageChoice(e.target.value);
  };

  const [value, setValue] = useState(getInitialState);
  const languageSelect = function (language: string) {
    return <option>{language}</option>;
  };
  return (
    <div className="dropDown">
      {/* <select value={value} onChange={handleChange}>
        {languages.map(languageSelect)}
      </select> */}
      <NativeSelect variant="outlined" value={value} onChange={handleChange}>
        {languages.map(languageSelect)}
      </NativeSelect>
    </div>
  );
}
export default LanguageDropDown;
