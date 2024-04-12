import axios, { AxiosError } from "axios";
import { ProblemInfo } from "../reducers/ProblemInfo";
import { ServerError } from "../reducers/ServerError";
const getAllProblem = async () => {
  try {
    const allProblemResponse = await axios.get<ProblemInfo[] | ServerError>(
      "https://ezprep.discovery.cs.vt.edu/api/problemset/all"
    );
    console.log(allProblemResponse.data);
    if (Array.isArray(allProblemResponse.data)) {
      return allProblemResponse.data.map((x) => ({
        problem_id: x.problem_id,
        problem_title: x.problem_title,
        problem_difficulty: x.problem_difficulty,
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
