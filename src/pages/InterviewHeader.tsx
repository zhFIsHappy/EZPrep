import { InterviewTimer } from "../components/InterviewTimer";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
export function InterviewHeader() {
  return (
    <>
      <div>
        <p style={{ paddingLeft: "6px" }}> <ArrowBackIcon /> </p>
      </div>
      <div style={{ paddingRight: "10px" }}>
        <InterviewTimer />
      </div>
    </>
  )
}