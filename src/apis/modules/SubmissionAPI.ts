import axios, {AxiosError, AxiosResponse} from "axios";
import { SubmissionResponseInfo } from "../../types";
import { ServerError } from "../../reducers/ServerError";

function responseMapper (response: AxiosResponse): SubmissionResponseInfo[] {
  return response.data.map((item: any) => {
    const submissionInfo: SubmissionResponseInfo = {
      submissionId: item.submission_id,
      problemId: item.problem_id,
      problemTitle: item.problem_title,
      language: item.language,
      timeSubmitted: item.submit_time,
    };
    return submissionInfo;
  });
}

export const getSubmissions = async (page: number, size: number, userId: number) => {
  try {
    const response = await axios.post<SubmissionResponseInfo[]>(
      `https://ezprep.discovery.cs.vt.edu/api/submissions?page_id=${page}&page_size=${size}`,
      {
        user_id: userId
      }
    );
    return responseMapper(response);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const ServerErrors = error as AxiosError<ServerError>;
      if (ServerErrors && ServerErrors.response) {
        console.log(ServerErrors.response.data);
        return ServerErrors.response.data;
      }
    }
    return { errorMessage: "We cannot get submissions" };
  }
};

export const getAllSubmissions = async (userId: number) => {
  try {
    const response = await axios.post<SubmissionResponseInfo[]>(
      `https://ezprep.discovery.cs.vt.edu/api/submissions/all`,
      {
        user_id: userId,
      }
    );
    return responseMapper(response);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const ServerErrors = error as AxiosError<ServerError>;
      if (ServerErrors && ServerErrors.response) {
        console.log(ServerErrors.response.data);
        return ServerErrors.response.data;
      }
    }
    return { errorMessage: "We cannot get submissions" };
  }
};


