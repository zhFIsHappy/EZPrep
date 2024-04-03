import React from "react";
import "../assets/css/mainpage.css";
import { useNavigate } from "react-router-dom";
import AppHeader from "./AppHeader";
import AppFooter from "./AppFooter";
import Button from "@mui/material/Button";

function HomePage() {
  const navigate = useNavigate();
  function openPage() {
    navigate("/login");
  }

  return (
    <div>
      <AppHeader />
      <div className="slogan-button">
        <h1>Supercharge your coding interview success with AI</h1>
        <h4>
          Refine your algorithm skills in immersive interview sessions, receive
          instant feedback whenever you're stuck, and elevate your coding
          proficiency with ease!
        </h4>
        <Button variant="contained" onClick={openPage} id="call-to-action">
          Try it out for Free
        </Button>
      </div>

      <AppFooter />
    </div>
  );
}

export default HomePage;
