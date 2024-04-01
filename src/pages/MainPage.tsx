import React from "react";
import { useNavigate } from "react-router-dom";

function MainPage() {
  const navigate = useNavigate();
  function openPage() {
    navigate("/register-page");
  }

  return (
    <>
      <p>This is Main Page</p>
      <p>Try out our free AI-Powered Coding Interview</p>
      <button onClick={openPage}>Click Me</button>
    </>
  );
}

export default MainPage;
