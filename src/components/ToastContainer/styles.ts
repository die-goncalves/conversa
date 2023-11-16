import { ToastContainer, type ToastContainerProps } from 'react-toastify'
import styled from 'styled-components'

export const StyledToastContainer = styled(ToastContainer)<ToastContainerProps>`
  &&&.Toastify__toast-container--top-right {
    @media (min-width: 320px) {
      top: 16px;
      right: 16px;
      width: calc(100% - 32px);
      margin-left: auto;
    }
    @media (min-width: 412px) {
      width: 320px;
    }
    @media (min-width: 480px) {
      padding: 0;
    }
    @media (min-width: 640px) {
      top: 24px;
      right: 24px;
    }
    @media (min-width: 1024px) {
      top: 32px;
      right: 32px;
    }
  }
  .Toastify__toast {
    ${props => {
      if (props.theme === 'dark') return 'background: var(--gray-400);'
    }}
    border-radius: 4px;
    box-shadow: var(--shadow-2xl);

    @media (min-width: 320px) {
      margin-bottom: 8px;
    }
    @media (min-width: 640px) {
      margin-bottom: 12px;
    }
    @media (min-width: 1024px) {
      margin-bottom: 16px;
    }
  }
  .Toastify__toast-icon {
    margin-bottom: auto;
    width: 24px;
    height: 24px;
  }
  .Toastify__toast-body {
    color: var(--violet-50);

    font-family: 'Josefin Sans', sans-serif;
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
