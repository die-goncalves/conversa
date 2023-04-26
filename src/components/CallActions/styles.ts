import styled from 'styled-components'

export const CallOptionsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;

  @media (min-width: 320px) {
    margin-left: auto;
  }
  @media (min-width: 640px) {
    margin: 2rem 0;
  }
`

export const IconButton = styled.button`
  box-sizing: border-box;
  display: flex;
  height: 2.5rem;
  width: 2.5rem;
  border-radius: 4px;
  border: 2px solid transparent;
  align-items: center;
  justify-content: center;
  background: var(--gray-800);
  cursor: pointer;

  transition: background-color 150ms linear, border-color 150ms linear,
    box-shadow 150ms linear;

  box-shadow: var(--shadow);
  &:hover {
    background: var(--gray-700);
    box-shadow: var(--shadow-md);
  }

  outline: 0;
  &:focus-visible {
    border-color: var(--violet-300);
  }

  svg {
    width: 1.5rem;
    height: 1.5rem;
    fill: var(--violet-300);
  }
`
