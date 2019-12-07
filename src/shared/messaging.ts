import { isInDevMode } from './environemnt';
import { Field } from './models';

interface Messages {
  FETCH_FIELDS: {
    payload: void
    response: Field[]
  }
  FILL_FIELDS: {
    payload: { field: Field, value: string }[]
    response: void
  }
}
type MessageType = keyof Messages;
type MessagePayload<T extends MessageType> = Messages[T]['payload'];
type MessageResponse<T extends MessageType> = Messages[T]['response'];

const mockMessageResponses: { [type in MessageType]: MessageResponse<type> } = {
  FETCH_FIELDS: [
    { tag: 'input', idKey: 'id', idValue: 'A' },
    { tag: 'input', idKey: 'id', idValue: 'B' },
  ],
  FILL_FIELDS: undefined,
};

/**
 * Stubbing chrome.tabs API when in dev mode.
 */
chrome.tabs = isInDevMode
  ? {
    query: (_: any, callback: (tabs: chrome.tabs.Tab[]) => void) => {
      callback([{ id: 1 } as chrome.tabs.Tab]);
    },
    sendMessage: (_: number, message: { type: MessageType }, callback: (response: any) => void) => {
      console.info('Message sent', message);
      callback(mockMessageResponses[message.type]);
    },
  } as typeof chrome.tabs
  : chrome.tabs;

/**
 * Sends a message to content/background extension scripts.
 * When in dev mode, mock responses will be returned instead.
 */
export function sendMessageToContent<T extends MessageType>(type: T, payload: MessagePayload<T> = undefined): Promise<MessageResponse<T>> {
  return new Promise((resolve) => {
    chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
      if (!tab.id) {
        throw new Error(`Tab ID must be defined to send message to content script. tab.id=${tab.id}`);
      }
      chrome.tabs.sendMessage(tab.id, { type, payload }, resolve);
    });
  });
}

export function addMessageListener(handlers: Partial<{
  [key in MessageType]: (payload: MessagePayload<key>) => MessageResponse<key>
}>) {
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    Object.entries(handlers).forEach(([message, handler]) => {
      if (handler && request.type === message) {
        const response = handler(request.payload);
        if (response) {
          sendResponse(response);
        }
      }
    });
  });
}
