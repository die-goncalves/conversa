import styled from 'styled-components'

export const RoomContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100svh;

  overflow: auto;
  scrollbar-gutter: stable;

  &::-webkit-scrollbar {
    width: 1vw;
    height: 1vw;
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

export const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 56px;
  padding: 8px 16px;
  gap: 16px;

  & > div {
    display: flex;
    align-items: center;
    gap: 8px;
  }
`

export const ContentContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`

export const MessagesBox = styled.ul`
  display: flex;
  flex-direction: column;
  list-style: none;
  gap: 1rem;

  @media (min-width: 320px) {
    margin-top: 1rem;
    margin-right: 1rem;
    margin-bottom: 0rem;
    margin-left: 1rem;
  }
  @media (min-width: 640px) {
    margin-top: 2rem;
    margin-right: 2rem;
    margin-bottom: 1rem;
    margin-left: 2rem;
  }
`

export const Loader = styled.div`
  width: 100%;
  height: 100px;
  background: red;
`

export const FABScrollToEndOfMessages = styled.button`
  position: fixed;
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

  @media (min-width: 320px) {
    right: 28px;
    bottom: 88px;
  }
  @media (min-width: 640px) {
    right: 48px;
    bottom: 104px;
  }
`

export const FABGetOldMessages = styled.button`
  /* position: absolute; */
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

  @media (min-width: 320px) {
    /* top: 16px;
    right: 16px; */
  }
  @media (min-width: 640px) {
    /* top: 32px;
    right: 32px; */
  }
`
