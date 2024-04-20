import Avatar from "@mui/material/Avatar";
// import getUserInfo from "../../apis/UserInfoAPI";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { deepOrange } from "@mui/material/colors";
import { useState } from "react";
import { getUserInfo } from "../../apis/UserInfoAPI";
import "../../assets/css/userinfo.css";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";

export default function UserDetails() {
  // const [username, setUsername] = useState("");
  // const [userId, setUserId] = useState("");

  // const token = Cookies.get("token");
  // if (token) {
  //   const decodedToken: any = jwtDecode(token);
  //   const currentTime = Date.now() / 1000; // Convert milliseconds to seconds
  //   if (decodedToken.exp && decodedToken.exp > currentTime) {
  //     setUserId(decodedToken.user_id);
  //   } else {
  //     // Token is expired or invalid, clear it from the cookie
  //     // TODO: LOGOUT
  //     Cookies.remove("token");
  //   }
  // }
  // async function retrieveUserinfo() {
  //   const userInfoResponse = await getUserInfo();
  //   if ("username" in userInfoResponse) {
  //     // userInfoResponse is of type userInfo, so we can safely access its properties
  //     setUsername(userInfoResponse.username);
  //   } else {
  //     console.error("An error occurred:", userInfoResponse.errorMessage);
  //   }
  // }

  return (
    <div>
      <div className="user-container">
        <div className="user-avatar">
          <Avatar sx={{ bgcolor: deepOrange[500] }} variant="circular">
            {/* {username.charAt(0)} */}
            ZF
          </Avatar>
        </div>
        <div className="userinfo-content">
          <p className="username"> Username: zhfan</p>
          <p className="user_id">User_ID: 01</p>
        </div>
        <hr />
        <Button className="Button" variant="contained">
          Edit Profile
        </Button>
      </div>
    </div>
  );
}
