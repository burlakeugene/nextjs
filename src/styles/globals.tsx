'use client';

import { createGlobalStyle, css } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
${({ theme }) => css`
  * {
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
    display: flex;
    flex-direction: column;
    min-height: 100%;
    scrollbar-width: thin;
    scrollbar-color: ${theme.colors.theme} ${theme.colors.white};
  }

  html,
  body {
    margin: 0;
  }

  body {
    flex: 1;
    background: ${theme.colors.white};
    color: ${theme.colors.text.primary};
    font-size: 14px;
    line-height: 1.4;
    display: flex;
    flex-direction: column;
  }
`}
`;

export default GlobalStyle;
