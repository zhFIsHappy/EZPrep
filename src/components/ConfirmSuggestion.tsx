import { suggestions } from "../assets/static/preferences"
import Box from "@mui/material/Box";
import {FormControl, TextField} from "@mui/material";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import React, {useContext, useEffect} from "react";
import {SuggestionItem} from "../types";
import LoadingButton from "@mui/lab/LoadingButton";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { RegisterContext } from "../contexts/RegisterContext";
import { useNavigate } from "react-router-dom";
import {getProblemStatementByDifficulty} from "../apis/modules/InterviewAPI";

const ConfirmSuggestion = ({ onButtonClick }) => {

  const navigate = useNavigate();

  const confirmPreference = async () => {
    // TODO: navigate to problem/:id
    const info = await getProblemStatementByDifficulty(selectedPreference.difficulty);
    navigate(`/problem/${info?.problem_id}`);
  }

  const { selectedPreference, modifyPreference, preferenceTime } = useContext(RegisterContext);

  useEffect(() => {
    modifyPreference("time", preferenceTime);
  }, []);

  function setPreference(e) {
    const { name, value } = e.target;
    modifyPreference(name, value);
  }

  const inputFieldDOM = (suggestion: SuggestionItem) => {
    switch (suggestion.suggestion) {
      case "Coding time": {
        return (
          <TextField
            type="number"
            label="minutes"
            name="time"
            value={selectedPreference.time}
            onChange={setPreference}
          >
          </TextField>
        );
      }
      case "Question difficulty": {
        return (
          <Select
            name="difficulty"
            value={selectedPreference.difficulty[0].toUpperCase() + selectedPreference.difficulty.slice(1)}
            onChange={setPreference}
          >
            <MenuItem value="Easy" key="Easy">Easy</MenuItem>
            <MenuItem value="Medium" key="Medium">Medium</MenuItem>
            <MenuItem value="Hard" key="Hard">Hard</MenuItem>
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
          suggestions.map((suggestion, index) => (
            <div key={index}>
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
