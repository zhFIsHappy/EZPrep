import { useEffect, useState } from "react";
import { appState } from "../../appState";
import {
  getUserAccountInfo,
  getUserCodingPreferenceInfo,
} from "../../apis/modules/UserInfoAPI";
import "../../assets/css/edituserprofile.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

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
  const [programmingExpChange, setProgrammingExpChange] = useState("");
  const [codingExpChange, setCodingExpChange] = useState("");
  const [codingLangChange, setCodingLangChange] = useState("");

  async function userAccountInfo(user_id: number) {
    const userAccountInfoResponse = await getUserAccountInfo(user_id);
    if ("email" in userAccountInfoResponse) {
      setEmail(userAccountInfoResponse.email);
      setPassword(userAccountInfoResponse.password);
    } else {
      console.error(
        "An error occurred when getting user information :",
        userAccountInfoResponse.errorMessage
      );
    }
  }

  async function userCodingPrefInfo(user_id: number) {
    const userCodingPreferenceResponse = await getUserCodingPreferenceInfo(
      user_id
    );
    if ("programmingExp" in userCodingPreferenceResponse) {
      setProgrammingExp(userCodingPreferenceResponse.programmingExp);
      setCodingExp(userCodingPreferenceResponse.codingExp);
      setCodingLang(userCodingPreferenceResponse.codingLang);
    } else {
      console.error(
        "An error occurred when getting user information :",
        userCodingPreferenceResponse.errorMessage
      );
    }
  }

  useEffect(() => {
    setUsername(appState.userName);
    setUserId(appState.userId);
    userAccountInfo(userId);
    userCodingPrefInfo(userId);
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Send updated user profile data to the server
    // Implement your logic here
  };

  return (
    <div className="edit-user-info-container">
      <Box sx={{ maxWidth: 400 }}>
        <h2>Edit User Profile</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <TextField
              id="email"
              label="Email"
              defaultValue={email}
              value={emailChange}
              onChange={(e) => setEmailChange(e.target.value)}
              fullWidth
            />
          </div>
          <div>
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
          <div>
            <TextField
              id="programmingExp"
              label="Programming Experience"
              value={programmingExp}
              onChange={(e) => setProgrammingExpChange(e.target.value)}
              fullWidth
            />
          </div>
          <div>
            <TextField
              id="codingExp"
              label="Coding Experience"
              value={codingExp}
              onChange={(e) => setCodingExpChange(e.target.value)}
              fullWidth
            />
          </div>
          <div>
            <TextField
              id="codingLang"
              label="Coding Language"
              value={codingLang}
              onChange={(e) => setCodingLangChange(e.target.value)}
              fullWidth
            />
          </div>
          <Button variant="contained" type="submit" sx={{ marginTop: 2 }}>
            Save Changes
          </Button>
        </form>
      </Box>
    </div>
  );
}
