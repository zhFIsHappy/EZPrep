import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import "../assets/css/AppHeader.css";
import logo from "../assets/images/Logo/logo.png";

const AppHeader = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      const decodedToken: any = jwtDecode(token);
      const currentTime = Date.now() / 1000; // Convert milliseconds to seconds
      if (decodedToken.exp && decodedToken.exp > currentTime) {
        setIsLoggedIn(true); // Set user as logged in
      } else {
        // Token is expired or invalid, clear it from the cookie
        Cookies.remove("token");
      }
    }
  }, []);
  return (
    <div>
      <div id="main-navbar" className="navbar">
        <img id="logo" src={logo} alt="Logo Not Found"></img>
        <nav>
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/problemset">Problemset</a>
            </li>
            <li>
              <a href="/community">Community</a>
            </li>
            <li>
              <a href="/pricing">Pricing</a>
            </li>
            {isLoggedIn ? (
              <li>
                <a href="/profile">My Profile </a>
              </li>
            ) : (
              <li>
                <a href="/login">Log in </a>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
};
export default AppHeader;
