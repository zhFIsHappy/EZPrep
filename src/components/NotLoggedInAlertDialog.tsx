import {Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import Button from "@mui/material/Button";
import React from "react";
import {useNavigate} from "react-router-dom";

export default function LoginAlertDialog() {
  const navigate= useNavigate();

  const backToHomePage = () => {
    navigate("/");
  }

  const goToLoginPage = () => {
    navigate("/login");
  }

  return (
    <>
      <Dialog open={true}>
        <DialogTitle>{"Actions required"}</DialogTitle>
        <DialogContent sx={{ width: '400px' }}>{"Please login first"}</DialogContent>
        <DialogActions>
          <Button sx={{ textTransform: 'none' }} onClick={goToLoginPage}>{"Login"}</Button>
          <Button sx={{ textTransform: 'none' }} onClick={backToHomePage}>{"Back to home"}</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}