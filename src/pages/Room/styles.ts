import styled from 'styled-components'

export const RoomContainer = styled.div`
  position: relative;
  display: flex;
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

  @media (min-width: 320px) {
    flex-direction: column;
  }
  @media (min-width: 768px) {
    flex-direction: row;
  }
`

export const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;

  & > div {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  @media (min-width: 320px) {
    padding: 1rem 1rem 0;
  }
  @media (min-width: 640px) {
    padding: 1.5rem 1.5rem 0;
  }
`

export const ContentContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  @media (min-width: 768px) {
    width: 60%;
  }
  @media (min-width: 1024px) {
    width: 65%;
  }
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
    margin-top: 1.5rem;
    margin-right: 1.5rem;
    margin-left: 1.5rem;
  }
  @media (min-width: 1024px) {
    margin-top: 2rem;
    margin-right: 2rem;
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
  height: 40px;
  width: 40px;
  border-radius: 4px;
  border: none;
  align-items: center;
  justify-content: center;
  background: var(--violet-300);
  cursor: pointer;

  transition: background-color 150ms linear, outline-color 150ms linear,
    box-shadow 150ms linear;

  box-shadow: var(--shadow);
  &:hover {
    background: var(--violet-400);
    box-shadow: var(--shadow-md);
  }

  outline-color: transparent;
  &:focus-visible {
    outline-style: solid;
    outline-width: 2px;
    outline-offset: 2px;
    outline-color: var(--violet-300);
  }

  svg {
    width: 24px;
    height: 24px;
    fill: var(--gray-800);
  }

  @media (min-width: 320px) {
    right: calc(26px + 1vw);
    bottom: 104px;
  }
  @media (min-width: 640px) {
    right: calc(34px + 1vw);
    bottom: 104px;
  }
  @media (min-width: 1024px) {
    right: calc(42px + 1vw);
    bottom: 104px;
  }
`

export const FABGetOldMessages = styled.button`
  box-sizing: border-box;
  display: flex;
  height: 40px;
  padding: 0 1rem;
  border-radius: 4px;
  border: none;
  align-items: center;
  justify-content: center;
  background: var(--violet-300);
  color: var(--gray-900);
  font-weight: 500;
  cursor: pointer;

  transition: background-color 150ms linear, outline-color 150ms linear,
    box-shadow 150ms linear;

  box-shadow: var(--shadow);
  &:not(:disabled):hover {
    background: var(--violet-400);
    box-shadow: var(--shadow-md);
  }

  outline-color: transparent;
  &:focus-visible {
    outline-style: solid;
    outline-width: 2px;
    outline-offset: 2px;
    outline-color: var(--violet-300);
  }

  &:disabled {
    cursor: wait;
    opacity: 0.8;
  }

  @media (min-width: 768px) {
    position: absolute;
    top: 24px;
    right: 24px;
  }
  @media (min-width: 1024px) {
    position: absolute;
    top: 32px;
    right: 32px;
  }
`
