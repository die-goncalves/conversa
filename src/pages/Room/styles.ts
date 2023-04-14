import styled from 'styled-components'

export const RoomContainer = styled.div`
  position: relative;
  display: flex;
  flex: 1;
  background: var(--gray-900);

  overflow: auto;
  scrollbar-gutter: stable;

  &::-webkit-scrollbar {
    width: 1vw;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 2px;
    background: var(--gray-600);
    box-shadow: var(--shadow-lg);
  }
  &::-webkit-scrollbar-thumb:hover {
    background: var(--gray-700);
    box-shadow: var(--shadow-md);
  }
  &::-webkit-scrollbar-thumb:active {
    background-color: var(--gray-800);
    box-shadow: var(--shadow);
  }
  &::-webkit-scrollbar-track {
    background: var(--gray-900);
  }
`

export const ContentContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: auto;

  & > div[id='progress-bar'] {
    padding-left: 2rem;
    padding-right: 2rem;
  }
`

export const MessagesBox = styled.ul`
  display: flex;
  flex-direction: column;
  list-style: none;
  gap: 1rem;
  margin-top: 2rem;
  margin-right: 2rem;
  margin-bottom: 1rem;
  margin-left: 2rem;
`

export const Loader = styled.div`
  width: 100%;
  height: 100px;
  background: red;
`

export const FABScrollToEndOfMessages = styled.button`
  position: fixed;
  right: 48px;
  bottom: 104px;
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

export const FABGetOldMessages = styled.button`
  position: absolute;
  top: 32px;
  right: 32px;
  box-sizing: border-box;
  display: flex;
  height: 2.5rem;
  padding: 0 1rem;
  border-radius: 4px;
  border: 2px solid transparent;
  align-items: center;
  justify-content: center;
  background: var(--gray-800);
  color: var(--violet-300);
  cursor: pointer;

  transition: background-color 150ms linear, border-color 150ms linear,
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

  &:disabled {
    cursor: wait;
    opacity: 0.8;
  }
`
