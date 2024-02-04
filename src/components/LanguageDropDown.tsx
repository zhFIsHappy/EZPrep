import "../assets/css/dropdown.css";
import React, { useState } from "react";
import languages from "../assets/static/language";
function LanguageDropDown({setLanguageChoice} :any){
    const getInitialState = () => {
        const value = "apex";
        return value;
    };
    const handleChange = (e:any) => {
        setValue(e.target.value);
        setLanguageChoice(e.target.value)
    };

    const [value, setValue] = useState(getInitialState);
    const languageSelect = function(language:string) {
        return <option>{language}</option>;
    };
    return (
        <div>
        <select value={value} onChange={handleChange}>{languages.map(languageSelect)}</select>;
      <p>{`You selected ${value}`}</p>
    </div>
    )
}
export default LanguageDropDown;