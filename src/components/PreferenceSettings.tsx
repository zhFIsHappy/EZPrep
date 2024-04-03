import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PreferenceItem } from "../types";
import { preferences } from "../assets/static/preferences";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import { FormControl } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

const PreferenceSettings = ({ onButtonClick }) => {
  const [answeredCounter, setAnsweredCounter] = useState<number>(0);
  const submitPreference = () => {
    if (preferences.length === answeredCounter) {
      onButtonClick("pagethree");
    } else {
      console.log("You entered " + answeredCounter);
      console.log("It should be " + preferences.length);

      alert("You must select all code preference to proceed!");
    }
  };
  const handleItemSelection = (e) => {
    let obj = JSON.parse(e.target.value);
    if (obj.length !== 0) setAnsweredCounter(answeredCounter + 1);
  };
  return (
    <>
      <h1>Step 2: Choose coding preference</h1>
      <div className="register-preference">
        {preferences.map((preference) => (
          <div>
            <div className="register-preference-question-area">
              <h3>{preference.question}</h3>
            </div>
            <div className="register-preference-answer-area">
              <Box sx={{ width: "35ch" }}>
                <FormControl fullWidth>
                  <Select onChange={handleItemSelection}>
                    {preference.options.map((option, index) => (
                      <MenuItem value={JSON.stringify(option)} key={index}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </div>
          </div>
        ))}
      </div>
      <div className="register-form-button-area">
        <LoadingButton
          variant="contained"
          style={{ textTransform: "none" }}
          loadingPosition="end"
          endIcon={<NavigateNextIcon />}
          onClick={submitPreference}
        >
          Next
        </LoadingButton>
      </div>
      <button onClick={() => onButtonClick("pagethree")}></button>
    </>
  );
};

export default PreferenceSettings;
