import {createContext, Dispatch, useReducer, useState} from 'react';
import {ChatMessage, SenderType} from "../types";
import {MessageActions, messagesReducer} from "../reducers/MessagesReducer";

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
  lastModifyTime: number;
  onModifyCode: () => void
}>({
  beginTime: Date.now(),
  lastModifyTime: Date.now(),
  onModifyCode: () => {}
});

MessagesContext.displayName = "InterviewContext";
TimerContext.displayName = "TimerContext";

export function InterviewContextProvider({children}: React.PropsWithChildren<{}>) {
  // Use the useReducer hook to manage the interview chat messages state
  // @ts-ignore
  const [beginTime, setBeginTime] = useState<number>(Date.now());
  const [lastModifyTime, setLastModifyTime] = useState<number>(Date.now());
  const [messages, messagesDispatch] = useReducer(messagesReducer, initialMessages);

  const initTimer = () => {
    setBeginTime(Date.now())
  }

  const onModifyCode = () => {
    setLastModifyTime(Date.now())
  };

  // You can provide any other context values or functions you need here
  return (
    <>
      <MessagesContext.Provider value={{ messages, messagesDispatch }}>
        <TimerContext.Provider value={{ beginTime, lastModifyTime, onModifyCode }}>
          {children}
        </TimerContext.Provider>
      </MessagesContext.Provider>

    </>
  );
}





