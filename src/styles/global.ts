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

    --shadow: 0px 0.1px 0.1px rgba(0, 0, 0, 0.19), 0px 0.2px 0.4px rgba(0, 0, 0, 0.28), 0px 1px 2px rgba(0, 0, 0, 0.47);
    --shadow-md: 0px 0.1px 0.3px rgba(0, 0, 0, 0.178), 0px 0.4px 0.9px rgba(0, 0, 0, 0.262), 0px 2px 4px rgba(0, 0, 0, 0.44);
    --shadow-lg: 0px 0.2px 0.4px rgba(0, 0, 0, 0.166), 0px 0.7px 1.3px rgba(0, 0, 0, 0.244), 0px 3px 6px rgba(0, 0, 0, 0.41);
    --shadow-xl: 0px 0.3px 0.7px rgba(0, 0, 0, 0.141), 0px 1.1px 2.2px rgba(0, 0, 0, 0.209), 0px 5px 10px rgba(0, 0, 0, 0.35);
    --shadow-2xl: 0px 0.5px 0.9px rgba(0, 0, 0, 0.113), 0px 1.6px 3.1px rgba(0, 0, 0, 0.167), 0px 7px 14px rgba(0, 0, 0, 0.28);
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
