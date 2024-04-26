import React, { useContext, useEffect, useRef, useState } from "react";
import "sanitize.css";
import "sanitize.css/forms.css";
import "sanitize.css/typography.css";
import "../assets/css/chatUI.css";
import Typewriter from "react-ts-typewriter";
import { ChatMessage, SenderType } from "../types";
// import { MessagesContext } from "../contexts/InterviewContext";
// import { MessageTypes } from "../reducers/MessagesReducer";
import axios from "axios";
import {sendChatMessage,} from "../apis/modules/InterviewAPI";

const ChatPanel = ({
  messages, sendChatMessage, appendMessageHistory
}) => {
  const [inputBoxContent, setInputBoxContent] = useState<string>("");
  // const [messages, setMessages] = useState<ChatMessage[]>([initMessage]);
  const inputRef = useRef<HTMLInputElement>(null);
  // const messagesEndRef = useRef(null);
  const el = document.getElementById("messages-container");
  // const { messages, messagesDispatch } = useContext(MessagesContext);

  if (el) {
    el.scrollTop = el.scrollHeight;
  }

  const scrollToBottom = () => {
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  };

  const onSendMessage = (e: any) => {
    e.preventDefault();
    console.log(inputBoxContent);
    appendMessageHistory(inputBoxContent, false);
    sendChatMessage(inputBoxContent);
    clearInput();
  }

  const submitt = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (inputBoxContent.trim().length === 0) {
      return;
    }
    if (inputBoxContent.length === 0) {
      return;
    }
    // messagesDispatch({
    //   type: MessageTypes.SEND,
    //   content: inputBoxContent,
    // });
    // TODO: Extract network request into service
    axios
      .post("https://ezprep.discovery.cs.vt.edu/api/chat", {
        message: inputBoxContent,
      })
      .then((response) => {
        // console.log(response);
        // messagesDispatch({
        //   type: MessageTypes.RECEIVE,
        //   content: response.data.response,
        // });
      });
    clearInput();
    // setMessages([...messages, message]);
  };

  useEffect(() => {
    console.log(messages);
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    console.log('cb reload')
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  function clearInput() {
    setInputBoxContent("");
  }

  const messageItemDOM = (message: ChatMessage, index: number) => {
    if (message.fromAi) {
      return (
        <li className="ai-message" key={index}>
          <div className="ai-message-content-container">
            <span>{message.content}</span>
          </div>
        </li>
      )
    } else {
      return (
        <li className="my-message" key={index}>
          <div className="my-message-content-container">
            <span>{message.content}</span>
          </div>
        </li>
      )
    }
    // switch (message.sender) {
    //   case SenderType.SELF:
    //     return (
    //       <li className="my-message" key={index}>
    //         <span>{message.content}</span>
    //       </li>
    //     );
    //   case SenderType.AI:
    //     return (
    //       <li className="ai-message" key={index}>
    //         <span>
    //           <Typewriter
    //             text={message.content}
    //             loop={false}
    //             cursor={false}
    //             onFinished={scrollToBottom}
    //           />
    //         </span>
    //       </li>
    //     );
    //   default:
    //     return <div />;
    // }
  };

  return (
    <div className="App">
      {/* <div */}
      <ul id="messages-container" className="messages">
        {messages.map((message: ChatMessage, index: number) =>
          messageItemDOM(message, index)
        )}
      </ul>
      <form className="chat-form" onSubmit={onSendMessage}>
        <div className="chat-input-container">
          <input
            type="text"
            className="chat-input"
            placeholder="Message..."
            value={inputBoxContent}
            onChange={(e) => setInputBoxContent(e.target.value)}
            ref={inputRef}
          />
        </div>
      </form>
    </div>
  );
}

export default ChatPanel;
