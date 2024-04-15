import axios, { AxiosError } from "axios";
import { ProblemInfo } from "../../types";
import { ServerError } from "../../reducers/ServerError";
export const getAllProblem = async () => {
  try {
    const allProblemResponse = await axios.get<ProblemInfo[] | ServerError>(
      "https://ezprep.discovery.cs.vt.edu/api/problems/all"
    );
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
    return { errorMessage: "We cannot get problem info" };
  }
};

export const getProblemByPage = async (pageNumber: number, pageSize: number) => {
  try {
    const problemsResponse = await axios.get<ProblemInfo[] | ServerError>(
      `https://ezprep.discovery.cs.vt.edu/api/problems?page_id=${pageNumber}&page_size=${pageSize}`
    );
    if (Array.isArray(problemsResponse.data)) {
      return problemsResponse.data.map((x) => ({
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
    return { errorMessage: "We cannot get problem info" };
  }
}

// export default getAllProblem;
