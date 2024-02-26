import React from "react";
import CodeEditor from "../components/CodeEditor";
import "../assets/css/interview.css";
import ChatBox from "../components/ChatBox";
function Interview() {
  return (
    <div className="interview-layout">
      <div className="interview-container">
        <CodeEditor />
      </div>
      <div className="interview-container">
        <ChatBox />
      </div>
    </div>
  );
}

export default Interview;
