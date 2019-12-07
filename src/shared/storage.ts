import { isInDevMode } from './environemnt';

interface Store { [key: string]: any }

/**
 * Stubbing chrome.storage API when in dev mode.
 */
let mockStore: Store = {};
chrome.storage = isInDevMode
  ? {
    local: {
      set: (items: Partial<Store>) => {
        mockStore = { ...mockStore, items };
      },
      get: (key: string, callback: (items: Partial<Store>) => void) =>
        callback({ [key]: mockStore[key] }),
    },
  } as typeof chrome.storage
  : chrome.storage;

export function setValue<T>(key: string, value: T): void {
  chrome.storage.local.set({ [key]: value });
}

export function getValue<T>(key: string): Promise<T | undefined> {
  return new Promise((resolve) => {
    chrome.storage.local.get(
      key,
      (items) => { resolve(items[key]) },
    );
  });
}
