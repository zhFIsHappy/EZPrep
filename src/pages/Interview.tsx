import React from "react";
import CodeEditor from "../components/CodeEditor";
import "../assets/css/interview.css";
import ChatBox from "../components/ChatBox";
import { InterviewContextProvider } from "../contexts/InterviewContext";
import { InterviewHeader } from "./InterviewHeader";
function Interview() {
  return (
    <InterviewContextProvider>
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
    </InterviewContextProvider>
  );
}

export default Interview;
