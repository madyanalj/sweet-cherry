/**
 * Boolean used to determine whether the app is being ran directly
 * as opposed to as a chrome extension popup.
 */
export const isInDevMode = !chrome.storage;
