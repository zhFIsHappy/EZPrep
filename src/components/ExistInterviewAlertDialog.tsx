import {Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import Button from "@mui/material/Button";
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import { finishInterviewRequest } from "../apis/modules/InterviewAPI";

const ExistInterviewAlertDialog = ({interviewId}) => {
  const navigate= useNavigate();
  const [selected, setSelected] = useState(false);

  const startNewInterview = () => {
    // navigate("/");
    finishInterviewRequest(interviewId).then(() => {
      window.location.reload();
    });
    setSelected(true);
  }

  const continueInterview = () => {
    // navigate("/login");
    setSelected(true);
  }

  return (
    <>
      <Dialog open={!selected}>
        <DialogTitle>{"Incomplete Interview Alert"}</DialogTitle>
        <DialogContent sx={{ width: '600px' }}>{"Would you like to resume your unfinished interview?"}</DialogContent>
        <DialogActions>
          <Button sx={{ textTransform: 'none', color: 'red' }} onClick={startNewInterview}>{"No, Start a New Interview"}</Button>
          <Button sx={{ textTransform: 'none' }} onClick={continueInterview}>{"Yes, Resume"}</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default ExistInterviewAlertDialog;