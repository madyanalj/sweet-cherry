import React from 'react'
import ReactDOM from 'react-dom'
import { isInDevMode } from '../shared/environemnt';
import { App } from './App';

if (module.hot) {
  module.hot.accept();
}

if (!isInDevMode) {
  // inject content script
  chrome.tabs.executeScript({ file: 'content/index.js' });
}

ReactDOM.render(<App />, document.getElementById('root'));
