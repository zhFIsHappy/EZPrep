import React, {useState} from "react";
import "../assets/css/login.css";
import Box from "@mui/material/Box";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import LoadingButton from "@mui/lab/LoadingButton";
import axios from "axios";
import md5 from "md5";

export function UserLogin() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(-1);
  const [serverResponse, setServerResponse] = useState("");
  const navigate = useNavigate();

  const updateForm = (e) => {
    const { name, value } = e.target;
    if (name === "password") {
      setPassword(value);
    } else if (name === "email") {
      setEmail(value);
    }
  }

  const submitLogin = (e) => {
    setProcessing(true);

    axios
      .post("https://ezprep.discovery.cs.vt.edu/api/login", {
        email: email,
        password: md5(password),
      })
      .then((response) => {
        setSuccess(1);
        setServerResponse("Login successful");
        setTimeout(() => {
          navigate("/interview");
        }, 1000);
      })
      .catch((error) => {
        setSuccess(0);
        setServerResponse(error.response?.data?.error);
      })
      .finally(() => {
        setProcessing(false);
      });
  }

  const createAccountNavi = () => {
    navigate("/register");
  }

  return (
    <>
      {
        success !== -1 && <div style={{ marginTop: "110px", position: "absolute", width: "100%" }}>
          <Box sx={{ width: "300px", margin: "0 auto" }}>
            <Alert variant="filled" severity={success === 1? "success" : "error"}>
              {serverResponse}
            </Alert>
          </Box>
        </div>
      }
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
                name="email"
                label="Email"
                type="email"
                onChange={updateForm}
                value={email}
              />
              <TextField
                name="password"
                label="Password"
                type="password"
                onChange={updateForm}
                value={password}
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
            <LoadingButton
              variant="contained"
              style={{ textTransform: "none" }}
              onClick={ submitLogin }
              loading={processing}
            >Login</LoadingButton>
          </div>
        </div>
      </div>
    </>

  )
}