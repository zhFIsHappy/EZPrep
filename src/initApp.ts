import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { appState } from "./appState";

const initApp = () => {
  const token = Cookies.get("token");
  if (token) {
    const decodedToken: any = jwtDecode(token);
    const currentTime = Date.now() / 1000; // Convert milliseconds to seconds
    if (decodedToken.exp && decodedToken.exp > currentTime) {
      appState.isLoggedIn = true; // Set user as logged in
      appState.userId = decodedToken.user_id;
    } else {
      // Token is expired or invalid, clear it from the cookie
      Cookies.remove("token");
    }
  }
}


export default initApp;