import React, {useContext, useEffect, useRef, useState} from "react";
import CodeEditor from "../components/CodeEditor";
import "../assets/css/interview.css";
import ChatBox from "../components/ChatBox";
import InterviewHeader from "./InterviewHeader";
import { appState } from "../appState";
import LoginAlertDialog from "../components/NotLoggedInAlertDialog";
import { useParams, useNavigate } from "react-router-dom";
import {
  finishInterviewRequest,
  getInterviewByProblemAndUser,
  getProblemStatementById, sendChatMessage,
  submitCodeToServer,
  updateEditorToServer
} from "../apis/modules/InterviewAPI";
import {getAllProblem} from "../apis/modules/ProblemTableAPI";
import {ChatMessage, EditorValue, InterviewInfo, ProblemStatement} from "../types";
import {commentProblemStatement} from "../utils/CodeFormatter";
import axios from "axios";
import ExistInterviewAlertDialog from "../components/ExistInterviewAlertDialog";
function InterviewPage() {
  const navigate= useNavigate();
  let { problemId } = useParams();

  // Clear the message context every time enter interview
  // TODO: consider a nicer way to achieve
  // const { messagesDispatch } = useContext(MessagesContext);
  const [editorValue, setEditorValue] = useState<EditorValue>();
  const interviewId = useRef<number>(0);
  const [messageHistory, setMessageHistory] = useState<ChatMessage[]>([]);
  const [interviewInfo, setInterviewInfo] = useState<InterviewInfo>();
  const [endTime, setEndTime] = useState(0);
  const loaded = useRef(false);

  const submitCode = async (code: string, language: string) => {
    const response =  await submitCodeToServer(interviewId?.current, parseInt(problemId??"1"), code, language);
    setMessageHistory((prevState) => [...prevState, {
      fromAi: true,
      content: response?.ai_response??""
    } as ChatMessage]);
  }

  async function fetchData() {
    const response = await getInterviewByProblemAndUser(parseInt(problemId??"1"), appState.userId, 20);
    if (!response) {
      return
    }
    console.log(response);
    setInterviewInfo(response);
    setEndTime(response.endTime);
    if (response.interviewId !== undefined) {
      interviewId.current = response?.interviewId;
    }
    if (response.messages !== undefined) {
      setMessageHistory(response.messages);
    }
    let val: EditorValue = {
      code: "",
      language: "",
    };
    if (response.prevExist) {
      val.code = response.editor.code;
      val.language = response.editor.language;
    } else {
      const ps = await getProblemStatementById(problemId??"1");
      val.code = commentProblemStatement(ps?.problem_statement, appState.languagePreference)??"";
      val.language = appState.languagePreference;
    }
    console.log(val);
    updateEditorToServer(interviewId?.current, val.code, val.language);
    setEditorValue(val);
  };

  useEffect(() => {
    if (loaded.current) {
      return;
    }
    loaded.current = true;
    fetchData();
  }, []);

  const appendMessageHistory = (content: string, fromAi: boolean) => {
    setMessageHistory([...messageHistory, {
      content: content,
      fromAi: fromAi
    } as ChatMessage]);
  }

  const onSendChatMessage = async (message: string) => {
    console.log(interviewInfo);
    if (!editorValue?.code) {
      return
    }
    console.log(message);
    sendChatMessage(interviewId.current, editorValue.code, message).then((res) => {
      setMessageHistory((prevState) => [...prevState, {
          content: res,
          fromAi: true
        } as ChatMessage]);
      console.log(res);
    });
  }

  const onModifyCode = (code: string, language: string) => {
    setEditorValue({
      code: code,
      language: language
    } as EditorValue);
  }

  const finishInterview = async () => {
    finishInterviewRequest(interviewId.current).then(() => {
      // TODO: After finish interview
      navigate("/problemset");
    });
  }

  const interviewAlterDialogDOM = () => {
    if (!appState.isLoggedIn) {
      return (<LoginAlertDialog />);
    }
    if (!interviewInfo || interviewInfo.prevExist) {
      return (<ExistInterviewAlertDialog interviewId={interviewId.current}/>);
    }
    // TODO(?): Add success landing page
  }

  return (
    <>
      {interviewAlterDialogDOM()}
      <div className="interview-layout">
        <div className="interview-header-container">
          <InterviewHeader initEndTime={endTime} onFinishInterview={finishInterview}/>
        </div>
        <div className="interview-main-container">
          <div className="interview-editor-container">
            <CodeEditor
              problemStatement={editorValue?.code}
              problemId={problemId}
              submitCode={submitCode}
              modifyCode={onModifyCode}
            />
          </div>
          <div className="interview-chat-container">
            <div className="interview-chat-container-top"></div>
            <div className="interview-chat-container-bottom">
              <ChatBox
                messages={messageHistory}
                sendChatMessage={onSendChatMessage}
                appendMessageHistory={appendMessageHistory}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default InterviewPage;
