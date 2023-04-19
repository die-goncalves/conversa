import styled from 'styled-components'

export const FormJoinRoomContainer = styled.form`
  display: flex;
  flex-direction: column;
  background: var(--gray-800);
  box-shadow: var(--shadow);
  margin: 1rem;
  padding: 1rem;
  border-radius: 4px;

  label {
    margin-bottom: 0.5rem;
    font-weight: 500;
  }

  input + label,
  input + button {
    margin-top: 1rem;
  }

  input[type='text'] {
    border: 2px solid var(--gray-700);
    width: 100%;
    height: 2.5rem;
    padding: 0 1rem;
    border-radius: 0.25rem;
    background: transparent;

    transition: border-color 150ms linear;
    outline: 0;
    &:focus-visible {
      border-color: var(--violet-300);
    }
  }

  span[role='alert'] {
    padding: 0 1rem;
    margin-top: 0.25rem;
    margin-bottom: 1rem;

    font-size: 0.875rem;
    line-height: 1.25rem;
    color: var(--red-300);
  }

  button[type='submit'] {
    border: 2px solid transparent;
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    height: 2.5rem;
    padding-right: 1.5rem;
    padding-left: 1.5rem;
    border-radius: 0.25rem;
    background: var(--gray-700);
    cursor: pointer;
    transition: background-color 150ms linear, border-color 150ms linear,
      box-shadow 150ms linear;

    box-shadow: var(--shadow);
    &:hover {
      background: var(--gray-600);
      box-shadow: var(--shadow-md);
    }

    outline: 0;
    &:focus-visible {
      border-color: var(--violet-300);
    }
  }
`
