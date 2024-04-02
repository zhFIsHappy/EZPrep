import React from "react";
import "../assets/css/AppHeader.css";
import logo from "../assets/images/Logo/logo.png";
const AppHeader = () => {
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
              <a href="/community">Community</a>
            </li>
            <li>
              <a href="/pricing">Pricing</a>
            </li>
            <li>
              <a href="/login">Log in </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};
export default AppHeader;
