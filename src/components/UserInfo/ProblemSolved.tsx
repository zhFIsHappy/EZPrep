import { Progress } from "antd";
import { useEffect, useState } from "react";
import { getUserSolvedQuestions } from "../../apis/modules/UserInfoAPI";
import "../../assets/css/problemsolved.css";
import { appState } from "../../appState";
import { getAllProblem } from "../../apis/modules/ProblemTableAPI";
import {ProblemInfo} from "../../types";

export default function UserProgress() {
  const [easySolvedAmount, setEasySolved] = useState<number>(0);
  const [mediumSolvedAmount, setMediumSolvedAmount] = useState<number>(0);
  const [hardSolvedAmount, setHardSolvedAmount] = useState<number>(0);
  const [easyTotal, setEasyTotal] = useState<number>(0);
  const [mediumTotal, setMediumTotal] = useState<number>(0);
  const [hardTotal, setHardTotal] = useState<number>(0);

  const countSolved = (problems: ProblemInfo[], difficulty: number, solved: any) => {
    return problems
      .filter(p =>
        parseInt(p.problem_difficulty) === difficulty && solved[p.problem_id] === 3)
      .length
  }

  const countDifficulty = (problems: ProblemInfo[], difficulty: number) => {
    return problems.filter(p => parseInt(p.problem_difficulty) === difficulty).length;
  }

  async function getUserSolvedAmount(user_id: number) {
    const solved = await getUserSolvedQuestions(user_id);
    const problems = await getAllProblem();
    if (solved && Array.isArray(problems)) {
      setEasySolved(countSolved(problems, 1, solved));
      setMediumSolvedAmount(countSolved(problems, 2, solved));
      setHardSolvedAmount(countSolved(problems, 3, solved));
      setEasyTotal(countDifficulty(problems, 1));
      setMediumTotal(countDifficulty(problems, 2));
      setHardTotal(countDifficulty(problems, 3));
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
        {easySolvedAmount} / {easyTotal}
      </h4>
      <Progress
        percent={+((easySolvedAmount / easyTotal) * 100).toFixed(2)}
        strokeColor="var(--difficulty-easy)"
        size="default"
      />
      <h4>
        Medium : &nbsp;
        {mediumSolvedAmount} / {mediumTotal}
      </h4>
      <Progress
        percent={+((mediumSolvedAmount / mediumTotal) * 100).toFixed(2)}
        strokeColor="var(--difficulty-medium)"
        size="default"
      />
      <h4>
        Hard : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        {hardSolvedAmount} / {hardTotal}
      </h4>
      <Progress
        percent={+((hardSolvedAmount / hardTotal) * 100).toFixed(2)}
        strokeColor="var(--difficulty-hard)"
        size="default"
      />
    </div>
  );
}
