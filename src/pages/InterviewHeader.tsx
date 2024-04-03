import { InterviewTimer } from "../components/InterviewTimer";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {IconButton} from "@mui/material";
import {useNavigate} from "react-router-dom";
export function InterviewHeader() {

  const navigate = useNavigate()

  const backToHomePage = () => {
    navigate("/");
  }

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
      <div style={{ paddingRight: "10px" }}>
        <InterviewTimer />
      </div>
    </>
  )
}