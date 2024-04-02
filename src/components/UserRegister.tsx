import {TextField} from "@mui/material";
import Box from "@mui/material/Box";
import React, {useContext, useState} from "react";
import Button from "@mui/material/Button";
import LoadingButton from '@mui/lab/LoadingButton';
import SendIcon from '@mui/icons-material/Send';
import axios from "axios";
import { RegisterContext } from "../contexts/RegisterContext";


const Register = ({onButtonClick}) =>{

  const [ processing, setProcessing] = useState(false);
  const { registerForm, modifyForm } = useContext(RegisterContext);

  const handleFormModify = (e: any) => {
    const { name, value } = e.target;
    // console.log(name, value);
    modifyForm(name, value);
  }

  const submitRegister = () => {
    // axios.post()
    // TODO: make API request to register after backend finishing API building
    console.log(registerForm);
    setProcessing(true);
    // onButtonClick("pagetwo");
  }

  return (
    <>
      <h1>
        Step 1: Create an account
      </h1>
      <div className="user-register-form">
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
            name="username"
            label="User Name"
            type="text"
            value={registerForm.username}
            onChange={handleFormModify}
          />
          <TextField
            name="email"
            label="Email"
            type="email"
            value={registerForm.email}
            onChange={handleFormModify}
          />
          <TextField
            name="password"
            label="Password"
            type="password"
            value={registerForm.password}
            onChange={handleFormModify}
          />
          <TextField
            name="repeatPassword"
            label="Confirm Password"
            type="password"
            value={registerForm.repeatPassword}
            onChange={handleFormModify}
          />
        </Box>
      </div>
      <div className="register-form-button-area">
        <LoadingButton
          variant="contained"
          style={{ textTransform: "none" }}
          onClick={ submitRegister }
          loading={processing}
          loadingPosition="end"
          endIcon={<SendIcon />}
        >
          Create Account
        </LoadingButton>
      </div>
    </>
  );
}

export default Register;