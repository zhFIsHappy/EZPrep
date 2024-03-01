import React, {useContext, useEffect, useRef, useState} from "react";
import "sanitize.css";
import "sanitize.css/forms.css";
import "sanitize.css/typography.css";
import "../assets/css/chatUI.css";
import Typewriter from "react-ts-typewriter";
import {ChatMessage, SenderType} from "../types";
import {MessagesContext} from "../contexts/MessagesContext";
import {MessageTypes} from "../reducers/MessagesReducer";
import axios from "axios";

export default function ChatPanel() {
  // const initMessage: ChatMessage = {
  //   sender: SenderType.AI,
  //   content: "Your Chat With Interviewer Starts Here..."
  // }
  const [inputBoxContent, setInputBoxContent] = useState<string>("");
  // const [messages, setMessages] = useState<ChatMessage[]>([initMessage]);
  const inputRef = useRef<HTMLInputElement>(null);
  // const messagesEndRef = useRef(null);
  const el = document.getElementById("messages-container");
  const { messages, dispatch} = useContext(MessagesContext);

  if (el) {
    el.scrollTop = el.scrollHeight;
  }

  const scrollToBottom = () => {
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  }

  const submit = (e) => {
    e.preventDefault();
    if (inputBoxContent.length === 0) {
      return;
    }
    dispatch({
      type: MessageTypes.SEND,
      content: inputBoxContent
    })
    // TODO: Extract network request into service
    axios.post("http://0.0.0.0:8080/api/chat", {
      message: inputBoxContent
    }).then((response) => {
      // console.log(response);
      dispatch({
        type: MessageTypes.RECEIVE,
        content: response.data.response
      })
    });
    clearInput();
    // setMessages([...messages, message]);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  function clearInput() {
    setInputBoxContent("");
  }

  const messageItemDOM = (message: ChatMessage, index: number) => {
    switch (message.sender) {
      case SenderType.SELF:
        return <li className="my-message" key={index}><span>{message.content}</span></li>
      case SenderType.AI:
        return <li className="ai-message" key={index}><span>
          <Typewriter text={message.content} loop={false} cursor={false} onFinished={scrollToBottom}/>
        </span></li>
      default:
        return <div/>
    }
  }

  return (
    <div className="App">
      {/* <div */}
      <ul id="messages-container" className="messages">
        {messages.map((message: ChatMessage, index: number) => (
          messageItemDOM(message, index)
        ))}
      </ul>
      <form className="chat-form" onSubmit={submit}>
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
