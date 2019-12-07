import React, { FunctionComponent } from 'react'
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  :root {
    --s-sm: .5em;
    --s-md: 1em;
  }

  * {
    margin: 0;
  }
  
  textarea {
    display: block;
    width: 100%;
  }
`;

export const Global: FunctionComponent = ({ children }) => <>
  <GlobalStyle />
  {children}
</>;
