import React, {useContext, useState} from "react";
import { useNavigate } from "react-router-dom";
import { PreferenceItem } from "../types";
import { preferences } from "../assets/static/preferences";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import { FormControl } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import axios from "axios";
import { RegisterContext } from "../contexts/RegisterContext";
import { preferenceSchema } from "../validations/PreferenceValidation";

const PreferenceSettings = ({ onButtonClick }) => {
  const [processing, setProcessing] = useState(false);

  const { selectedPreference, modifyPreference } = useContext(RegisterContext);

  const submitPreference = async (e) => {
    try {
      await preferenceSchema.validate(selectedPreference, { abortEarly: false });

      setProcessing(true);
      const progExp = selectedPreference.codingExperience;
      const algoExp = selectedPreference.algoExperience;
      console.log(progExp, algoExp);

      axios
        .post("https://ezprep.discovery.cs.vt.edu/api/suggestion", {
          prog_exp: preferences[0].options.findIndex(value => value === progExp) + 1,
          algo_exp: preferences[1].options.findIndex(value => value === algoExp) + 1
        })
        .then((response) => {
          console.log(response.data);
          modifyPreference("time", response.data.time);
          modifyPreference("difficulty", response.data.difficulty);
          setProcessing(false);
        })
        .catch((error) => {
          console.log('err', error);
          // setServerResponse(error.response?.data?.message);
        })
        .finally(() => {
          setProcessing(false);
          console.log(selectedPreference);
          onButtonClick("pagethree");
        });
    } catch (e) {
      console.log('err1', e);
    }
  };

  const handleItemSelection = (e) => {
    const { name, value } = e.target;
    modifyPreference(name, value);
  };

  return (
    <>
      <h1>Step 2: Choose coding preference</h1>
      <div className="register-preference">
        {preferences.map((preference, index) => (
          <div>
            <div className="register-preference-question-area">
              <h3>{preference.question}</h3>
            </div>
            <div className="register-preference-answer-area">
              <Box sx={{ width: "35ch" }}>
                <FormControl fullWidth>
                  <Select
                    name={preference.name}
                    onChange={handleItemSelection}
                    value={selectedPreference[preference.name]}
                  >
                    {preference.options.map(option => (
                      <MenuItem value={option}>
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
          loading={processing}
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
