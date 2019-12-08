import React, { FunctionComponent } from 'react'
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  :root {
    --s-sm: .5em;
    --s-md: 1em;
  }

  * {
    margin: 0;
    box-sizing: border-box;
  }

  textarea {
    display: block;
    width: 100%;
  }

  table {
    display: block;
    overflow-x: auto;
  }
`;

export const Global: FunctionComponent = ({ children }) => <>
  <GlobalStyle />
  {children}
</>;
