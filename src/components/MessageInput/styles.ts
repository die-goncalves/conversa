import styled from 'styled-components'

export const SendMessageContainer = styled.div`
  display: flex;
  margin-top: auto;
  position: sticky;
  bottom: 0;
  width: 100%;
  background: var(--gray-900);

  form {
    position: relative;
    display: flex;
    width: 100%;

    label {
      box-sizing: border-box;
      display: flex;
      flex: 1;
      height: 3.5rem;
      align-items: center;
      border: 2px solid var(--gray-800);
      border-radius: 4px;
      gap: 0.5rem;
      cursor: text;

      &:has(textarea:disabled) {
        cursor: not-allowed;
        opacity: 0.8;
      }

      transition: border-color 150ms linear;
      &:has(textarea:focus-visible) {
        border-color: var(--violet-300);
      }

      textarea {
        height: 100%;
        flex: 1;
        box-sizing: border-box;
        padding: calc(1rem - 2px) 1rem;
        border-bottom-left-radius: 4px;
        border-top-left-radius: 4px;
        background: var(--gray-900);
        resize: none;
        outline: none;
        border: none;

        overflow: auto;
        scrollbar-gutter: stable;
        &::-webkit-scrollbar {
          width: 16px;
        }
        &::-webkit-scrollbar-thumb {
          border-radius: 2px;
          background: var(--gray-600);
          box-shadow: var(--shadow-lg);
        }
        &::-webkit-scrollbar-thumb:hover {
          background: var(--gray-700);
          box-shadow: inset var(--shadow-md);
        }
        &::-webkit-scrollbar-thumb:active {
          background-color: var(--gray-800);
          box-shadow: var(--shadow);
        }
        &::-webkit-scrollbar-track {
          background: var(--gray-900);
        }

        &:disabled {
          cursor: not-allowed;
          opacity: 0.8;
        }
      }

      button {
        margin-right: 0.5rem;
        width: 40px;
        height: 40px;
        display: flex;
        border: 2px solid transparent;
        border-radius: 4px;
        padding: 0.5rem;
        cursor: pointer;
        background: var(--gray-800);

        transition: background 150ms linear, border-color 150ms linear,
          box-shadow 150ms linear;

        box-shadow: var(--shadow);
        &:not(:disabled):hover {
          background: var(--gray-700);
          box-shadow: var(--shadow-md);
        }
        outline: 0;
        &:focus-visible {
          border-color: var(--violet-300);
        }

        svg {
          margin: auto;
          width: 1.5rem;
          height: 1.5rem;
          fill: var(--violet-300);
        }

        &:disabled {
          cursor: not-allowed;
          opacity: 0.8;
        }
      }
    }
  }

  @media (min-width: 320px) {
    padding: 1rem;
  }
  @media (min-width: 640px) {
    padding: 1rem 2rem;
  }
`
