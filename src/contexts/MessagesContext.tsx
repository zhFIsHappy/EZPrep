import {createContext, Dispatch, useReducer} from 'react';
import {ChatMessage, SenderType} from "../types";
import {MessageActions, messagesReducer} from "../reducers/MessagesReducer";

const initialMessages: ChatMessage[] = [
  {sender: SenderType.AI, content: "Your Chat With Interviewer Starts Here ..."}
];
export const MessagesContext = createContext<{
  messages: ChatMessage[];
  dispatch: Dispatch<MessageActions>;
}>({
  messages: initialMessages,
  dispatch: () => null
});

MessagesContext.displayName = "MessagesContext";

export function InterviewContextProvider({children}: React.PropsWithChildren<{}>) {
  // Use the useReducer hook to manage the cart state
  // @ts-ignore
  const [messages, dispatch] = useReducer(messagesReducer, initialMessages);

  // You can provide any other context values or functions you need here
  return (
    <>
      <MessagesContext.Provider value={{messages, dispatch}}>
        {children}
      </MessagesContext.Provider>
    </>
  );
}





