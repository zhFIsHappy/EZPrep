import React from "react";
import CodeEditor from "../components/CodeEditor";
import "../assets/css/interview.css";
import ChatBox from "../components/ChatBox";
import {InterviewContextProvider} from "../contexts/MessagesContext";
function Interview() {
  return (
    <InterviewContextProvider>
      <div className="interview-layout">
        <div className="interview-container">
          <CodeEditor />
        </div>
        <div className="interview-container">
          <ChatBox />
        </div>
      </div>
    </InterviewContextProvider>
  );
}

export default Interview;
