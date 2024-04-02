import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

function HomePage() {
  const navigate = useNavigate();
  function openPage() {
    navigate("/login");
  }

  return (
    <>
      <p>This is Main Page</p>
      <p>Try out our free AI-Powered Coding Interview</p>
      <Button
        onClick={openPage}
      >
        Try now!
      </Button>
      <button onClick={openPage}>Click Me</button>
    </>
  );
}

export default HomePage;
