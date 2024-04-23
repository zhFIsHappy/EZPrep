import axios, { AxiosError } from "axios";
import { ServerError } from "../../reducers/ServerError";
import {
  userAccountInfo,
  userCodingPreference,
  userSolvedQuestionsCount,
} from "../../reducers/UserInfo";

export const getUserAccountInfo = async (user_id: number) => {
  try {
    const response = await axios.get<userAccountInfo | ServerError>(
      "https://ezprep.discovery.cs.vt.edu/api/user-account-info/"
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
    return { errorMessage: "We cannot get user account info" };
  }
};

export const getUserCodingPreferenceInfo = async (user_id: number) => {
  try {
    const response = await axios.get<userCodingPreference | ServerError>(
      "https://ezprep.discovery.cs.vt.edu/api/user-coding-preference/"
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
    return { errorMessage: "We cannot get user coding preference info" };
  }
};

export const getUserSolvedQuestionsCount = async (user_id: number) => {
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
