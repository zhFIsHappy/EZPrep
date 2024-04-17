import React, {useContext, useEffect} from "react";
import CodeEditor from "../components/CodeEditor";
import "../assets/css/interview.css";
import ChatBox from "../components/ChatBox";
import { MessagesContext } from "../contexts/InterviewContext";
import { InterviewHeader } from "./InterviewHeader";
import { MessageTypes } from "../reducers/MessagesReducer";
import { appState } from "../appState";
import LoginAlertDialog from "../components/NotLoggedInAlertDialog";
function Interview() {

  // Clear the message context every time enter interview
  // TODO: consider a nicer way to achieve
  const { messagesDispatch } = useContext(MessagesContext);
  useEffect(() => {
    messagesDispatch({
      type: MessageTypes.CLEAR,
      content: "",
    });
  }, []);

  return (
    <>
      {appState.isLoggedIn? <div/>:<LoginAlertDialog />}
      <div className="interview-layout">
        <div className="interview-header-container">
          <InterviewHeader />
        </div>
        <div className="interview-main-container">
          <div className="interview-editor-container">
            <CodeEditor />
          </div>
          <div className="interview-chat-container">
            <div className="interview-chat-container-top"></div>
            <div className="interview-chat-container-bottom">
              <ChatBox />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Interview;
