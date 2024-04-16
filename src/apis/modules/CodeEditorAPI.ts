import axios, { AxiosError } from "axios";
import { ProblemStatement } from "../../types";
import { ServerError } from "../../reducers/ServerError";

// TODO: try consider refactor and optimize the process of try random problem
export const getProblemStatementByDifficulty = async (difficulty: string) => {
  try {
    const response = await axios.get<ProblemStatement | ServerError>(
      "https://ezprep.discovery.cs.vt.edu/api/random-problem/" + difficulty
    );
    return response.data;
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


export const getProblemStatementById = async (problemId: string) => {
  try {
    const response = await axios.get<ProblemStatement | ServerError>(
      "https://ezprep.discovery.cs.vt.edu/api/problem/" + problemId
    );
    return response.data;
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
