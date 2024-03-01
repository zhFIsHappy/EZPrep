import { useState, useEffect, useRef } from "react";
import React from "react";
import "sanitize.css";
import "sanitize.css/forms.css";
import "sanitize.css/typography.css";
import "../assets/css/chatUI.css";
import Typewriter from "react-ts-typewriter";

export default function App() {
  const [messages, setMessages] = useState<string[]>([]);
  const [message, setMessage] = useState<string>("");
  const allMessages: string[] = [];
  const inputRef = useRef<HTMLInputElement>(null);
  const welcomeMessage = "Your Chat With Interviewer Starts Here ...";
  const el = document.getElementById("messages-container");
  if (el) {
    el.scrollTop = el.scrollHeight;
  }
  const submit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (message.length === 0) {
      return;
    }
    allMessages.push(message);
    setMessages((allMessages) => [...allMessages, message]);
  };

  // const appendMessage = (v) => {
  //   let currentMsg = message;
  //   currentMsg += v;
  //   setMessage(currentMsg);
  // };

  useEffect(() => {
    setMessage("");
  }, [messages]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div className="App">
      {/* <div */}
      <ul id="messages-container" className="messages">
        <li>
          <span>
            <Typewriter text={welcomeMessage} loop={false} cursor={false} />
          </span>
        </li>
        {messages.map((message, index) => (
          <li className="my-message" key={index}>
            <span>{message}</span>
          </li>
        ))}
      </ul>
      <form className="chat-form" onSubmit={submit}>
        <div className="chat-input-container">
          <input
            type="text"
            className="chat-input"
            placeholder="Message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            ref={inputRef}
          />
        </div>
      </form>
    </div>
  );
}
