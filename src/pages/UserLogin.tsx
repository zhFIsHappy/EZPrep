import React from "react";
import "../assets/css/login.css";
import Box from "@mui/material/Box";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
export function UserLogin() {
  const navigate = useNavigate();

  const createAccountNavi = () => {
    navigate("/register");
  }

  return (
    <div className="login-page-layout">
      <div className="user-login-container">
        <p className="login-form-title">Sign in</p>
        <div className="user-login-form">
          <Box
            component="form"
            display="flex"
            flexDirection="column"
            sx={{
              '& .MuiTextField-root': { m: 1, width: '35ch' },
            }}
            alignItems="center"
            autoComplete="off"
            justifyContent="center"
          >
            <TextField
              label="Email"
              type="email"
            />
            <TextField
              label="Password"
              type="password"
            />
          </Box>
        </div>
        <div className="login-form-button-area">
          <Button
            variant="text"
            style={{ textTransform: "none" }}
            onClick={ createAccountNavi }
          >
            Create Account
          </Button>
          <Button variant="contained" style={{ textTransform: "none" }}>Login</Button>
        </div>
      </div>
    </div>
  )
}