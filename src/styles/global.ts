import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-size: 1rem;
    line-height: 1.5rem;
    font-weight: 400;
  }

  button, textarea, input, select, a {
    font: inherit;
    line-height: inherit;
  }
`
