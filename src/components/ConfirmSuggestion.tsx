import { suggestions } from "../assets/static/preferences"
import Box from "@mui/material/Box";
import {FormControl, TextField} from "@mui/material";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import React, {useContext} from "react";
import {SuggestionItem} from "../types";
import LoadingButton from "@mui/lab/LoadingButton";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import {RegisterContext} from "../contexts/RegisterContext";
import {useNavigate} from "react-router-dom";

const ConfirmSuggestion = ({ onButtonClick }) => {

  const navigate = useNavigate();

  const confirmPreference = () => {
    navigate("/interview");
  }

  const { selectedPreference, modifyPreference } = useContext(RegisterContext);

  function setPreference(e) {
    const { name, value } = e.target;
    console.log(name, value);
    modifyPreference(name, value);
  }

  const inputFieldDOM = (suggestion: SuggestionItem) => {
    switch (suggestion.suggestion) {
      case "Coding time": {
        return (
          <TextField
            type="number"
            name="time"
            value={selectedPreference.time}
            onChange={setPreference}
          >
          </TextField>
        );
      }
      case "Question difficulty": {
        return (
          <Select value="Easy">
            <MenuItem value="Easy">Easy</MenuItem>
            <MenuItem value="Medium">Medium</MenuItem>
            <MenuItem value="Hard">Hard</MenuItem>
          </Select>
        )
      }
    }
  }

  return (
    <>
      <h1>Page 3: Check the suggestion</h1>
      <div className="confirm-preference">
        {
          suggestions.map(suggestion => (
            <div>
              <div className="confirm-preference-question-area">
                <h3>{suggestion.suggestion}</h3>
              </div>
              <div className="confirm-preference-answer-area">
                <Box
                  sx={{ width:'35ch' }}
                >
                  <FormControl fullWidth>
                    {inputFieldDOM(suggestion)}
                  </FormControl>
                </Box>
              </div>
            </div>
          ))
        }
      </div>
      <div className="register-form-button-area">
        <LoadingButton
          variant="contained"
          style={{ textTransform: "none" }}
          loadingPosition="end"
          endIcon={<NavigateNextIcon />}
          onClick={confirmPreference}
        >
          Start Practice
        </LoadingButton>
      </div>
    </>
  );
};

export default ConfirmSuggestion;
