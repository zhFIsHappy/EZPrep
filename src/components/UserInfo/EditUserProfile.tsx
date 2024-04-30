import React, { useContext, useEffect, useState } from "react";
import { appState } from "../../appState";
import { useNavigate } from "react-router-dom";
import {
  getUserAccountInfo,
  getUserCodingPreferenceInfo,
  postUserEditPreference,
} from "../../apis/modules/UserInfoAPI";
import "../../assets/css/edituserprofile.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Alert, FormControl } from "@mui/material";
import Select from "@mui/material/Select";
import { EditPreferences } from "../../assets/static/preferences";
import { Avatar, MenuItem } from "@mui/material";
import { RegisterContext } from "../../contexts/RegisterContext";

export default function EditUserProfile() {
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState(0);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [programmingExp, setProgrammingExp] = useState("");
  const [codingExp, setCodingExp] = useState("");
  const [codingLang, setCodingLang] = useState("");

  const [emailChange, setEmailChange] = useState("");
  const [passwordChange, setPasswordChange] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false); // State to track if form submission was successful

  const { selectedPreference, modifyPreference } = useContext(RegisterContext);

  const navigate = useNavigate();
  async function userAccountInfo(user_id: number) {
    try {
      const userAccountInfoResponse = await getUserAccountInfo(user_id);
      if (userAccountInfoResponse) {
        setEmail(userAccountInfoResponse.email);
        setPassword(userAccountInfoResponse.password);
      }
    } catch (error) {
      console.error("An error occurred when getting user information:", error);
    }
  }

  async function userCodingPrefInfo(user_id: number) {
    const userCodingPreferenceResponse = await getUserCodingPreferenceInfo(
      user_id
    );
    if (userCodingPreferenceResponse) {
      setProgrammingExp(userCodingPreferenceResponse.programmingExp);
      setCodingExp(userCodingPreferenceResponse.codingExp);
      setCodingLang(userCodingPreferenceResponse.codingLang);
    } else {
      console.error("An error occurred when getting user information :");
    }
  }

  useEffect(() => {
    setUsername(appState.userName);
    setUserId(appState.userId);
    userAccountInfo(userId);
    userCodingPrefInfo(userId);
  }, []);

  const handleItemSelection = (e) => {
    const { name, value } = e.target;
    modifyPreference(name, value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const updatedUserInfo = {
      email: emailChange,
      password: passwordChange,
      programmingExp: selectedPreference.codingExperience,
      codingExp: selectedPreference.algoExperience,
      codingLang: selectedPreference.language,
    };
    try {
      await postUserEditPreference(userId, updatedUserInfo);
      setSubmitSuccess(true); // Set state to indicate successful form submission
      console.log("User profile updated successfully");
      setTimeout(() => {
        setSubmitSuccess(false); // Hide the alert after a delay
        navigate("/profile"); // Navigate to the desired route after delay
      }, 1000);
    } catch (error) {
      console.error("Error updating user profile", error);
    }
  };

  return (
    <div style={{ position: "relative", paddingBottom: "30px" }}>
      <div className="edit-user-info-container">
        <Box
          sx={{
            maxWidth: 400,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
          }}
        >
          <h2>Edit User Profile</h2>
          <Avatar
            sx={{
              bgcolor: "primary.main",
              width: 180,
              height: 180,
              fontSize: 85,
            }}
            className="avatar"
          >
            {appState.userName[0].toUpperCase()}
          </Avatar>
          <div className="edit-profile-form">
            <form className="text-field-form">
              <div className="text-field">
                <TextField
                  id="email"
                  label="Email"
                  defaultValue={email}
                  value={emailChange}
                  onChange={(e) => setEmailChange(e.target.value)}
                  fullWidth
                />
              </div>
              <div className="text-field">
                <TextField
                  id="password"
                  label="Password"
                  type="password"
                  defaultValue={password}
                  value={passwordChange}
                  onChange={(e) => setPasswordChange(e.target.value)}
                  fullWidth
                />
              </div>
            </form>
            <div>
              {EditPreferences.map((preference, index) => (
                <div key={index}>
                  <div className="register-preference-question-area">
                    <h3>{preference.question}</h3>
                  </div>
                  <div className="register-preference-answer-area">
                    <Box sx={{ width: "35ch" }}>
                      <FormControl fullWidth>
                        <Select
                          name={preference.name}
                          onChange={handleItemSelection}
                          value={
                            selectedPreference[preference.name] ||
                            preference.options[0]
                          }
                        >
                          {preference.options.map((option, index) => (
                            <MenuItem key={index} value={option}>
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
            <Button
              onClick={handleSubmit}
              variant="contained"
              type="submit"
              sx={{ marginTop: 2 }}
            >
              Save Changes
            </Button>
            {submitSuccess && (
              <div style={{ position: "absolute", top: 0, left: 0, right: 0 }}>
                <Alert variant="filled" severity="success">
                  <div>Edited File Successfully</div>
                </Alert>
              </div>
            )}
          </div>
        </Box>
      </div>
    </div>
  );
}
