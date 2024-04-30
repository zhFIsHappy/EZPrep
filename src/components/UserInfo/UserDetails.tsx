import Avatar from "@mui/material/Avatar";
// import getUserInfo from "../../apis/UserInfoAPI";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { deepOrange } from "@mui/material/colors";
import { useEffect, useState } from "react";
import "../../assets/css/userinfo.css";
import Button from "@mui/material/Button";
import { SettingOutlined } from "@ant-design/icons";
import { appState } from "../../appState";
import { useNavigate } from "react-router-dom";

export default function UserDetails() {
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState("");
  const navigate = useNavigate();

  // async function retrieveUserinfo() {
  //   const userInfoResponse = await getUserInfo();
  //   if ("username" in userInfoResponse) {
  //     // userInfoResponse is of type userInfo, so we can safely access its properties
  //     setUsername(userInfoResponse.username);
  //   } else {
  //     console.error("An error occurred:", userInfoResponse.errorMessage);
  //   }
  // }

  // retrieveUserinfo();

  return (
    <div>
      <div className="user-container">
        <div className="user-avatar">
          <Avatar
            sx={{
              bgcolor: "primary.main",
              width: 180,
              height: 180,
              fontSize: 85,
            }}
          >
            {appState.userName[0].toUpperCase()}
          </Avatar>
        </div>
        <div className="userinfo-content">
          <p className="username" style={{ fontSize: "20px" }}> {appState.userName} </p>
          {/*<p className="user_id">User_ID: {appState.userId}</p>*/}
        </div>
        <Button
          variant="outlined"
          onClick={() => navigate("/edit-profile")}
          className="settings"
          color="success"
        >
          Edit Profile
        </Button>
      </div>
    </div>
  );
}
