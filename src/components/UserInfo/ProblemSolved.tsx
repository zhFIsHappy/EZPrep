import { Progress } from "antd";
import { useEffect, useState } from "react";
import { getUserSolvedQuestionsCount } from "../../apis/modules/UserInfoAPI";
import "../../assets/css/problemsolved.css";
import { appState } from "../../appState";

export default function UserProgress() {
  const [easySolvedAmount, setEasySolved] = useState<number>(0);
  const [mediumSolvedAmount, setMediumSolvedAmount] = useState<number>(0);
  const [hardSolvedAmount, setHardSolvedAmount] = useState<number>(0);
  const [easyTotal, setEasyTotal] = useState<number>(0);
  const [mediumTotal, setMediumTotal] = useState<number>(0);
  const [hardTotal, setHardTotal] = useState<number>(0);
  async function getUserSolvedAmount(user_id: number) {
    const userSubmissionAmountResponse = await getUserSolvedQuestionsCount(
      user_id
    );
    if (userSubmissionAmountResponse) {
      setEasySolved(userSubmissionAmountResponse.easy_finished);
      setMediumSolvedAmount(userSubmissionAmountResponse.medium_finished);
      setHardSolvedAmount(userSubmissionAmountResponse.hard_finished);
      setEasyTotal(userSubmissionAmountResponse.easy_total);
      setMediumTotal(userSubmissionAmountResponse.medium_total);
      setHardTotal(userSubmissionAmountResponse.hard_total);
    } else {
      console.error(
        "An error occurred when getting user solved questions amount :"
      );
    }
  }

  useEffect(() => {
    getUserSolvedAmount(appState.userId);
  });
  return (
    <div className="progress-container">
      <h4>
        Easy : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        {easySolvedAmount / easyTotal}
      </h4>
      <Progress
        percent={(easySolvedAmount / easyTotal) * 100}
        strokeColor="var(--difficulty-easy)"
        size="small"
      />
      <h4>
        Medium : &nbsp;
        {mediumSolvedAmount / mediumTotal}
      </h4>
      <Progress
        percent={(mediumSolvedAmount / mediumTotal) * 100}
        strokeColor="var(--difficulty-medium)"
        size="small"
      />
      <h4>
        Hard : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        {hardSolvedAmount / hardTotal}
      </h4>
      <Progress
        percent={(hardSolvedAmount / hardTotal) * 100}
        strokeColor="var(--difficulty-medium)"
        size="small"
      />
    </div>
  );
}
