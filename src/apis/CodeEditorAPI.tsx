import axios, { AxiosError } from "axios";
import { ProblemStatement } from "../reducers/ProblemInfo";
import { ServerError } from "../reducers/ServerError";
const getProblemStatement = async (difficulty: string) => {
  try {
    const response = await axios.get<ProblemStatement | ServerError>(
      "https://ezprep.discovery.cs.vt.edu/api/random-problem/" + difficulty
    );

    console.log(response.data);
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

export default getProblemStatement;
