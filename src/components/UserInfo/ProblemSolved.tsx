import { Progress } from "antd";
import { useState } from "react";
import { getUserSolvedQuestionsCount } from "../../apis/UserInfoAPI";

export default function UserProgress() {
  const [easySolvedAmount, setEasySolved] = useState<number>(0);
  const [mediumSolvedAmount, setMediumSolvedAmount] = useState<number>(0);
  const [hardSolvedAmount, setHardSolvedAmount] = useState<number>(0);
  const [easyTotal, setEasyTotal] = useState<number>(0);
  const [mediumTotal, setMediumTotal] = useState<number>(0);
  const [hardTotal, setHardTotal] = useState<number>(0);
  async function getUserSolvedAmount(user_id: string) {
    const userSubmissionAmountResponse = await getUserSolvedQuestionsCount(
      user_id
    );
    if ("easy_finished" in userSubmissionAmountResponse) {
      setEasySolved(userSubmissionAmountResponse.easy_finished);
      setMediumSolvedAmount(userSubmissionAmountResponse.medium_finished);
      setHardSolvedAmount(userSubmissionAmountResponse.hard_finished);
      setEasyTotal(userSubmissionAmountResponse.easy_total);
      setMediumTotal(userSubmissionAmountResponse.medium_total);
      setHardTotal(userSubmissionAmountResponse.hard_total);
    } else {
      console.error(
        "An error occurred when getting user solved questions amount :",
        userSubmissionAmountResponse.errorMessage
      );
    }
  }
  //TODO: Replace fake_id with real user_id
  getUserSolvedAmount("fake_id");
  // if (userSubmissionAmountResponse)
  return (
    <div className="progress-container">
      Easy :{" "}
      <Progress
        percent={easySolvedAmount / easyTotal}
        strokeColor="#8fb935"
        size="small"
      />
      <Progress
        percent={mediumSolvedAmount / mediumTotal}
        strokeColor="#e09c3b"
        size="small"
      />
      <Progress
        percent={hardSolvedAmount / hardTotal}
        strokeColor="#e64747"
        size="small"
      />
    </div>
  );
}
