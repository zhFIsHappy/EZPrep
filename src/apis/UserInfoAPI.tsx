import axios, { AxiosError } from "axios";
import { ServerError } from "../reducers/ServerError";
import { userInfo, userSolvedQuestionsCount } from "../reducers/UserInfo";
export const getUserInfo = async () => {
  try {
    const response = await axios.get<userInfo | ServerError>(
      "https://ezprep.discovery.cs.vt.edu/api/userInfo/"
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

export const getUserSolvedQuestionsCount = async (user_id: string) => {
  try {
    const response = await axios.get<userSolvedQuestionsCount | ServerError>(
      "https://ezprep.discovery.cs.vt.edu/api/user-solved/"
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
