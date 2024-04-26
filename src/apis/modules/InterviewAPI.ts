import axios, { AxiosError } from "axios";
import {ChatMessage, EditorValue, InterviewInfo, ProblemStatement, SubmissionResponseInfo} from "../../types";
import { ServerError } from "../../reducers/ServerError";
import {AxiosResponse} from "axios/index";
import {appState} from "../../appState";

// TODO: try consider refactor and optimize the process of try random problem
export const getProblemStatementByDifficulty = async (difficulty: string) => {
  try {
    const response = await axios.get<ProblemStatement>(
      "https://ezprep.discovery.cs.vt.edu/api/random-problem/" + difficulty
    );
    return response.data;
  } catch (error) {

  }
};


export const getProblemStatementById = async (problemId: string) => {
  try {
    const response = await axios.get<ProblemStatement>(
      "https://ezprep.discovery.cs.vt.edu/api/problem/" + problemId
    );
    return response.data;
  } catch (error) {
  }
};

export const submitCodeToServer = async (
  interviewId: number, problemId: number, code: string, language: string
) => {
  try {
    const response = await axios.post(
      `https://ezprep.discovery.cs.vt.edu/api/submit`,
      {
        problem_id: problemId,
        user_id: appState.userId,
        interview_id: interviewId,
        code: code,
        language: language,
      }
    );
    return response.data;
  } catch (error) {

  }
}

function interviewInfoResponseMapper (response: AxiosResponse): InterviewInfo {
  const data = response.data;
  const interviewInfo: InterviewInfo = {
    interviewId: data.interview_id,
    beginTime: data.begin_time,
    endTime: data.end_time,
    editor: {
      code: data.editor.code,
      language: data.editor.language,
    },
    prevExist: data.prev_exist,
    messages: data.messages.map((msg: any) => (
      {
        fromAi: msg.from_ai,
        content: msg.content,
        sentTime: msg.sent_time,
      } as ChatMessage
    )),
  };
  console.log(interviewInfo);
  return interviewInfo;
}

export const getInterviewByProblemAndUser = async (problemId: number, userId: number, timeSpent: number): Promise<InterviewInfo | undefined> => {
  try {
    let data = {
      problem_id: problemId,
      user_id: userId,
      time_spent: timeSpent
    };
    const response = await axios.post<InterviewInfo>(
      `https://ezprep.discovery.cs.vt.edu/api/interview`,
      data
    )
    return interviewInfoResponseMapper(response);
  } catch (error) {

  }
}

export const updateEditorToServer = async (interviewId: number, code: string, language: string) => {
  try {
    let data = {
      interview_id: interviewId,
      code: code,
      language: language
    };
    const response = await axios.post(
      `https://ezprep.discovery.cs.vt.edu/api/editor`,
      data
    )
    return response.data;
  } catch (error) {

  }
}

export const sendChatMessage = async (interviewId: number, problemId: number, code: string, message: string) => {
  try {
    const response = await axios.post(
      `https://ezprep.discovery.cs.vt.edu/api/chat`,
      {
        message: message,
        code: code,
        interview_id: interviewId,
        user_id: appState.userId,
        problem_id: problemId,
      }
    )
    return response.data.response;
  } catch (error) {

  }
}

export const finishInterviewRequest = async (interviewId: number) => {
  try {
    const response = await axios.post(
      `https://ezprep.discovery.cs.vt.edu/api/interview/finish`,
      {
        interview_id: interviewId,
        user_id: appState.userId
      }
    )
  } catch (error) {

  }
}