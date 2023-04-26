import { ToastContainer, type ToastContainerProps } from 'react-toastify'
import styled, { createGlobalStyle } from 'styled-components'

// @media (min-width: 320px) {  }
// @media (min-width: 360px) {  }
// @media (min-width: 412px) {  }
// @media (min-width: 640px) {  }
// @media (min-width: 768px) {  }
// @media (min-width: 1024px) {  }
// @media (min-width: 1280px) {  }
// @media (min-width: 1366px) {  }
// @media (min-width: 1440px) {  }

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

    --blue-500: #3b82f6;
    --blue-400: #60a5fa;
    --blue-300: #93c5fd;

    --yellow-500: #eab308;
    --yellow-400: #facc15;
    --yellow-300: #fde047;

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
    font-weight: 400;
  }

  button, textarea, input, input::file-selector-button, select, a {
    font: inherit;
    line-height: inherit;
    color: inherit;
  }

  @media (min-width: 320px) { 
    body {
      font-size: 0.875rem;
      line-height: 1.25rem;
    }
    h1 {
      font-size: 1rem;
      line-height: 1.5rem;
    }
  }
  @media (min-width: 412px) { 
    body {
      font-size: 1rem;
      line-height: 1.5rem;
    }
    h1 {
      font-size: 1.125rem;
      line-height: 1.75rem;
    }
  }
`

export const StyledToastContainer = styled(ToastContainer)<ToastContainerProps>`
  .Toastify__toast {
    ${props => {
      if (props.theme === 'dark') return 'background: var(--gray-400);'
    }}
    border-radius: 4px;
    box-shadow: var(--shadow-2xl);
  }
  .Toastify__toast-icon {
    margin-bottom: auto;
    width: 24px;
    height: 24px;
  }
  .Toastify__toast-body {
    color: var(--violet-50);

    font-family: 'Assistant', sans-serif;
    font-size: 1rem;
    line-height: 1.5rem;
    font-weight: 400;

    @media (min-width: 320px) {
      font-size: 0.875rem;
      line-height: 1.25rem;
    }
    @media (min-width: 640px) {
      font-size: 1rem;
      line-height: 1.5rem;
    }
  }
  .Toastify__toast--warning {
    svg {
      fill: var(--yellow-500);
    }
  }
  .Toastify__toast--info {
    svg {
      fill: var(--blue-500);
    }
  }
  .Toastify__toast--default {
    svg {
      fill: var(--gray-900);

      animation: rotate-center 1s cubic-bezier(0.455, 0.03, 0.515, 0.955)
        infinite both;

      @keyframes rotate-center {
        0% {
          -webkit-transform: rotate(0);
          transform: rotate(0);
        }
        100% {
          -webkit-transform: rotate(360deg);
          transform: rotate(360deg);
        }
      }
    }
  }
  .Toastify__toast--success {
    svg {
      fill: var(--green-500);
    }
  }
  .Toastify__toast--error {
    svg {
      fill: var(--red-500);
    }
  }
  .Toastify__close-button {
    svg {
      ${props => {
        if (props.theme === 'dark') return 'fill: var(--violet-300);'
      }}
      width: 16px;
      height: 16px;
    }
  }
  .Toastify__progress-bar--info {
    background: var(--blue-400);
  }
  .Toastify__progress-bar--success {
    background: var(--green-400);
  }
  .Toastify__progress-bar--warning {
    background: var(--yellow-400);
  }
  .Toastify__progress-bar--error {
    background: var(--red-400);
  }
`
