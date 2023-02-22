import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  :root {
    --gray-900: #1F1E20;
    --gray-800: #29282B;
    --gray-700: #312F31;
    --gray-600: #373638;
    --gray-500: #38373B;
    --gray-400: #3D3C3F;
    
    --violet-500: #8b5cf6;
    --violet-400: #a78bfa;
    --violet-300: #c4b5fd;
    --violet-200: #ddd6fe;
    --violet-50: #f5f3ff;
    
    --red-500: #ef4444;
    --red-400: #F87171;
    --red-300: #fca5a5;

    --green-500: #22c55e;
    --green-400: #4ade80;
    --green-300: #86efac;

    --shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
    --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
    --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
    --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
    --shadow-2xl: 0 25px 50px -12px rgb(0 0 0 / 0.25);
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background: var(--gray-900);
    color: var(--violet-50);

    font-family: 'Assistant', sans-serif;
    font-size: 1rem;
    line-height: 1.5rem;
    font-weight: 400;
  }

  button, textarea, input, select, a {
    font: inherit;
    line-height: inherit;
    color: inherit;
  }
`
