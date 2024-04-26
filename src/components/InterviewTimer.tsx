import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { useContext, useEffect, useState } from "react";
import { TimerContext } from "../contexts/InterviewContext";
import { leadingZeroFormatter } from "../utils/NumberFormatter";
import { RegisterContext } from "../contexts/RegisterContext";

const InterviewTimer = ({
  endTime, onFinish
}) => {
  // const { beginTime, endTime } = useContext(TimerContext);
  const { selectedPreference } = useContext(RegisterContext);
  const [ totalTime, setTotalTime] = useState<number>(0);
  const [ countdown, setCountdown ] = useState(Date.now() + selectedPreference.time * 60 * 1000);
  const [ hours, setHours ] = useState("00");
  const [ minutes, setMinutes ] = useState("00");
  const [ seconds, setSeconds ] = useState("00");

  useEffect(() => {
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (endTime === 0) {
        return;
      }
      const time = new Date(endTime).getTime() - Date.now();
      if (time <= 0) {
        onFinish();
        clearInterval(interval);
      }
      setHours(leadingZeroFormatter(Math.floor(time / 1000 / 3600), 2));
      setMinutes(leadingZeroFormatter(Math.floor(time / 1000 % 3600 / 60), 2));
      setSeconds(leadingZeroFormatter(Math.floor(time / 1000 % 60), 2));
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [endTime]);

  return (
    <>
      <div className="interview-timer-container">
        <AccessTimeIcon />
        <p>{hours}:{minutes}:{seconds}</p>
      </div>
    </>
  )
}

export default InterviewTimer;