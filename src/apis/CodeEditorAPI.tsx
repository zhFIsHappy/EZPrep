import axios, { AxiosError } from "axios";
import { ProblemInfo } from "../reducers/ProblemInfo";
import { ServerError } from "../reducers/ServerError";
const getProblemInfo = async () => {
  try {
    const response = await axios.get<ProblemInfo | ServerError>(
      "http://0.0.0.0:8080/api/random-problem/easy"
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

export default getProblemInfo;
