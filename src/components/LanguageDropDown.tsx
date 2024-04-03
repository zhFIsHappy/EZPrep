import "../assets/css/dropdown.css";
import React, { useState } from "react";
import { languages } from "../assets/static/language";
import Box from '@mui/material/Box';
import { FormControl } from "@mui/material";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

function LanguageDropDown({ setLanguageChoice }: any) {
  const getInitialState = () => {
    return Array.from(languages.values())[0];
  };
  const handleChange = (e: any) => {
    setValue(e.target.value);
    setLanguageChoice(Array.from(languages.keys()).filter(key => languages.get(key) === e.target.value)[0]);
  };

  const [value, setValue] = useState(getInitialState);
  const languageSelect = function (language: string) {
    return <option>{language}</option>;
  };
  return (
    <div className="dropDown">
      <Box
        p={0}
        sx={{ minWidth: 140 }}
      >
        <FormControl fullWidth size="small">
          <Select
            value={value}
            onChange={handleChange}
          >
            { Array.from(languages.values()).map(language => <MenuItem value={language}>{language}</MenuItem>) }
          </Select>
        </FormControl>
      </Box>
      {/* <select value={value} onChange={handleChange}>
        {languages.map(languageSelect)}
      </select> */}
      {/*<NativeSelect variant="outlined" value={value} onChange={handleChange}>*/}
      {/*  {languages.map(languageSelect)}*/}
      {/*</NativeSelect>*/}
    </div>
  );
}
export default LanguageDropDown;
