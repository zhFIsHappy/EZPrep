import { TextField } from "@mui/material";
import Box from "@mui/material/Box";
import React, { useContext, useState } from "react";
import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from "@mui/icons-material/Send";
import Alert from "@mui/material/Alert";
import axios from "axios";
import { RegisterContext } from "../contexts/RegisterContext";
import { registerSchema } from "../validations/RegisterValidations";
import md5 from "md5";
import { appState } from "../appState";

const Register = ({ onButtonClick }) => {
  const { registerForm, modifyForm, clearForm } = useContext(RegisterContext);
  const [processing, setProcessing] = useState(false);
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [serverResponse, setServerResponse] = useState({
    success: -1,
    message: "",
  });
  const handleFormModify = (e: any) => {
    const { name, value } = e.target;
    // console.log(name, value);
    modifyForm(name, value);
  };

  const submitRegister = async (e) => {
    // axios.post()
    // TODO: make API request to register after backend finishing API building
    // console.log(registerForm);
    e.preventDefault();
    const formData = {
      name: registerForm.username,
      email: registerForm.email,
      password: registerForm.password,
      confirmPassword: registerForm.repeatPassword,
    };
    try {

      await registerSchema.validate(formData, { abortEarly: false });
      setProcessing(true);

      axios
        .post("https://ezprep.discovery.cs.vt.edu/api/register", {
          user_name: formData.name,
          email: formData.email,
          password: md5(formData.password),
        })
        .then((response) => {
          setServerResponse({
            success: 1,
            message: "Create account successful",
          });
          appState.token = response.data.token;
          appState.userId = response.data.user_id;
          appState.userName = response.data.user_name;
          appState.isLoggedIn = true;
          setTimeout(() => {
            clearForm();
            onButtonClick("pagetwo");
          }, 1200);
        })
        .catch((error) => {
          setServerResponse({
            success: 0,
            message: error.response?.data?.error,
          });
          // console.log('err', error);
          // setServerResponse(error.response?.data?.message);
        })
        .finally(() => {
          setProcessing(false);
          setTimeout(() => {
            setServerResponse({
              success: -1,
              message: "",
            })
          }, 1500);
        });

      // onButtonClick("pagetwo");
      console.log("Form Submitted", formData);
    } catch (error: any) {
      const newErrors = {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      };
      if (error instanceof Error) {
        error["inner"].forEach((err) => {
          newErrors[err.path] = err.message;
        });
      }

      setErrors(newErrors);
    }
    // const isValid = await registerSchema.isValid(formData);
    // if (isValid) {
    //   console.log("success");
    // }
    // const errorMessage = await registerSchema.validate(formData);

    // alert(errorMessage);

    // onButtonClick("pagetwo");
  };

  return (
    <>
      <h1>Step 1: Create an account</h1>
      <div className="user-register-form">
        <Box
          component="form"
          display="flex"
          flexDirection="column"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "35ch" },
          }}
          alignItems="center"
          autoComplete="off"
          justifyContent="center"
        >
          <TextField
            error={errors.name.length !== 0}
            name="username"
            label="User Name"
            type="text"
            value={registerForm.username}
            onChange={handleFormModify}
            helperText={errors.name}
          />
          <TextField
            error={errors.email.length !== 0}
            name="email"
            label="Email"
            type="email"
            value={registerForm.email}
            onChange={handleFormModify}
            helperText={errors.email}
          />

          <TextField
            error={errors.password.length !== 0}
            name="password"
            label="Password"
            type="password"
            value={registerForm.password}
            onChange={handleFormModify}
            helperText={errors.password}
          />

          <TextField
            error={errors.confirmPassword.length !== 0}
            name="repeatPassword"
            label="Confirm Password"
            type="password"
            value={registerForm.repeatPassword}
            onChange={handleFormModify}
            helperText={errors.confirmPassword}
          />
        </Box>
      </div>
      <div className="register-form-button-area">
        <LoadingButton
          variant="contained"
          style={{ textTransform: "none" }}
          onClick={submitRegister}
          loading={processing}
          loadingPosition="end"
          endIcon={<SendIcon />}
        >
          Create Account
        </LoadingButton>
      </div>
      {
        serverResponse.success !== -1 &&
        <div style={{ marginTop: "40px" }}>
            <Alert variant="filled" severity={serverResponse.success === 1? "success" : "error"}>
                <div>{serverResponse.message}</div>
            </Alert>
        </div>
      }
    </>
  );
};

export default Register;
