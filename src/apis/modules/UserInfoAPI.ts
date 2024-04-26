import axios, { AxiosError, AxiosResponse } from "axios";
import { ServerError } from "../../reducers/ServerError";
import {
  userAccountInfo,
  userCodingPreference,
  userSolvedQuestionsCount,
} from "../../reducers/UserInfo";
import { EditUserPreferenceInfo } from "../../types";

function responseMapper(response: AxiosResponse): EditUserPreferenceInfo[] {
  return response.data.map((item: any) => {
    const editUserPreferenceInfo: EditUserPreferenceInfo = {
      email: item.email,
      password: item.password,
      programmingExp: item.programmingExp,
      codingExp: item.codingExp,
      codingLang: item.codingLang,
    };
    return editUserPreferenceInfo;
  });
}

export const getUserAccountInfo = async (user_id: number) => {
  try {
    const response = await axios.get<userAccountInfo>(
      "https://ezprep.discovery.cs.vt.edu/api/user-account-info/"
    );

    return response.data;
  } catch (error) {
    console.log("somethings went wrong!");
    // return { errorMessage: "We cannot get user account info" };
  }
};

export const getUserCodingPreferenceInfo = async (user_id: number) => {
  try {
    const response = await axios.get<userCodingPreference>(
      "https://ezprep.discovery.cs.vt.edu/api/user-coding-preference/"
    );

    return response.data;
  } catch (error) {
    console.log("Cannot get User Coding Preference Info");
  }
};

export const getUserSolvedQuestionsCount = async (user_id: number) => {
  try {
    const response = await axios.get<userSolvedQuestionsCount>(
      "https://ezprep.discovery.cs.vt.edu/api/user-solved/"
    );

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log("cannot get User Solved Questions Count");
  }
};

export const postUserEditPreference = async (
  userId: number,
  editInfo: EditUserPreferenceInfo
) => {
  try {
    const response = await axios.post<EditUserPreferenceInfo[]>(
      `https://ezprep.discovery.cs.vt.edu/api/prefernece/edit`,

      {
        user_id: userId,
        email: editInfo.email,
        password: editInfo.password,
        programmingExp: editInfo.programmingExp,
        codingExp: editInfo.codingExp,
        codingLang: editInfo.codingLang,
      }
    );
    return response.data;
  } catch (error) {
    // if (axios.isAxiosError(error)) {
    //   const ServerErrors = error as AxiosError<ServerError>;
    //   if (ServerErrors && ServerErrors.response) {
    //     console.log(ServerErrors.response.data);
    //     return ServerErrors.response.data;
    //   }
    // }
    // // console.log("somethings went wrong!");
    // return { errorMessage: "We cannot get problem statement" };
  }
};
