import InterviewTimer from "../components/InterviewTimer";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {IconButton} from "@mui/material";
import {useNavigate} from "react-router-dom";
import Button from "@mui/material/Button";
import {useEffect, useState} from "react";
const InterviewHeader = ({
  initEndTime, onFinishInterview
}) => {

  const navigate = useNavigate();
  const [internalEndTime, setInternalEndTime] = useState(0);

  const backToHomePage = () => {
    navigate("/problemset");
  }

  useEffect(() => {
    setInternalEndTime(initEndTime);
  }, [initEndTime]);

  return (
    <>
      <div>
        <IconButton
          style={{ paddingLeft: "6px" }}
          onClick={backToHomePage}
        >
          <ArrowBackIcon />
        </IconButton>
        {/*<p style={{ paddingLeft: "6px" }}> <ArrowBackIcon /> </p>*/}
      </div>
      <div style={{ marginRight: "10px", display: "flex" }}>
        <Button
          variant="contained"
          style={{ marginTop: "6px", marginRight: "20px", textTransform: "none", height: "37px" }}
          size="small"
          onClick={onFinishInterview}
        >Finish Interview</Button>
        <InterviewTimer endTime={internalEndTime} onFinish={onFinishInterview}/>
      </div>

    </>
  )
}

export default InterviewHeader;