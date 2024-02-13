import { useState, useEffect, useRef } from "react";

import "sanitize.css";
import "sanitize.css/forms.css";
import "sanitize.css/typography.css";
import "../assets/css/chatUI.css";

export default function App() {
  const [messages, setMessages] = useState<string[]>([]);
  const [message, setMessage] = useState<string>("");
  const allMessages: string[] = [];
  const inputRef = useRef<HTMLInputElement>(null);

  const submit = (e) => {
    e.preventDefault();
    if (message.length === 0) {
      return;
    }
    allMessages.push(message);
    setMessages((allMessages) => [...allMessages, message]);
  };

  const appendMessage = (v) => {
    let currentMsg = message;
    currentMsg += v;
    setMessage(currentMsg);
  };

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
      <ul className="messages">
        <li>
          <span>FF test ...</span>
        </li>
        <li className="my-message">
          <span>FF test1</span>
        </li>
        <li>
          <span>FF test1 bababa</span>
        </li>
        <li className="my-message">
          <span>babab die??</span>
        </li>
        <li>
          <span>FF test2</span>
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
