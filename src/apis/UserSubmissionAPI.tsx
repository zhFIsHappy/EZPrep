import axios, { AxiosError } from "axios";
import { ProblemSubmissionInfo } from "../reducers/ProblemInfo";
import { ServerError } from "../reducers/ServerError";
const getAllProblem = async () => {
  try {
    const userSubmission = await axios.get<
      ProblemSubmissionInfo[] | ServerError
    >("https://ezprep.discovery.cs.vt.edu/api/problemset/all");

    console.log(userSubmission.data);
    if (Array.isArray(userSubmission.data)) {
      return userSubmission.data.map((x) => ({
        problem_id: x.problem_id,
        problem_title: x.problem_title,
        problem_date: x.problem_date,
      }));
    } else {
      return [];
    }
    // return allProblemResponse.data.map((x) => ({}));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const ServerErrors = error as AxiosError<ServerError>;
      if (ServerErrors && ServerErrors.response) {
        console.log(ServerErrors.response.data);
        return ServerErrors.response.data;
      }
    }
    // console.log("somethings went wrong!");
    return { errorMessage: "We cannot get problem statement" };
  }
};

export default getAllProblem;
