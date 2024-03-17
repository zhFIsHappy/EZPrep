import { ChatMessage, SenderType } from "../types";

export enum MessageTypes {
  SEND,
  RECEIVE,
}

export type MessageActions = {
  type: MessageTypes;
  content: string;
};
export function messagesReducer(
  messages: ChatMessage[],
  action: MessageActions
) {
  switch (action.type) {
    case MessageTypes.RECEIVE: {
      return [
        ...messages,
        {
          sender: SenderType.AI,
          content: action.content,
        },
      ];
    }
    case MessageTypes.SEND: {
      return [
        ...messages,
        {
          sender: SenderType.SELF,
          content: action.content,
        },
      ];
    }
    // case 'changed': {
    //   return messages.map(t => {
    //     if (t.id === action.task.id) {
    //       return action.task;
    //     } else {
    //       return t;
    //     }
    //   });
    // }
    // case 'deleted': {
    //   return messages.filter(t => t.id !== action.id);
    // }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}
