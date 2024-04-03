import { createContext, Dispatch, useContext, useEffect, useReducer, useState } from 'react';
import {ChatMessage, SenderType} from "../types";
import {MessageActions, messagesReducer} from "../reducers/MessagesReducer";
import { RegisterContext } from "./RegisterContext";

const initialMessages: ChatMessage[] = [
  {sender: SenderType.AI, content: "Your Chat With Interviewer Starts Here ..."}
];
export const MessagesContext = createContext<{
  messages: ChatMessage[];
  messagesDispatch: Dispatch<MessageActions>;
}>({
  messages: initialMessages,
  messagesDispatch: () => null
});

export const TimerContext = createContext<{
  beginTime: number;
  endTime: number;
  lastModifyTime: number;
  onModifyCode: () => void
}>({
  beginTime: Date.now(),
  endTime: Date.now(),
  lastModifyTime: Date.now(),
  onModifyCode: () => {}
});

MessagesContext.displayName = "InterviewContext";
TimerContext.displayName = "TimerContext";

export function InterviewContextProvider({children}: React.PropsWithChildren<{}>) {
  const { selectedPreference } = useContext(RegisterContext);
  // Use the useReducer hook to manage the interview chat messages state
  // @ts-ignore
  const [beginTime, setBeginTime] = useState<number>(Date.now());
  const [endTime, setEndTime] = useState<number>(Date.now() + selectedPreference.time * 60 * 1000);
  const [lastModifyTime, setLastModifyTime] = useState<number>(Date.now());
  const [messages, messagesDispatch] = useReducer(messagesReducer, initialMessages);

  const initTimer = (minutes: number) => {
    if (beginTime === endTime) {
      setBeginTime(Date.now());
      setEndTime(Date.now() + minutes * 60 * 1000);
    }
  }

  const onModifyCode = () => {
    setLastModifyTime(Date.now());
  };

  // You can provide any other context values or functions you need here
  return (
    <>
      <MessagesContext.Provider value={{ messages, messagesDispatch }}>
        <TimerContext.Provider value={{ beginTime, endTime, lastModifyTime, onModifyCode }}>
          {children}
        </TimerContext.Provider>
      </MessagesContext.Provider>

    </>
  );
}





