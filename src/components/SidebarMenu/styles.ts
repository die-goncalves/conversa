import {
  DialogClose,
  DialogContent,
  DialogOverlay,
  DialogTitle,
  DialogTrigger
} from '@radix-ui/react-dialog'
import styled from 'styled-components'

export const StyledOverlay = styled(DialogOverlay)`
  background: rgba(0, 0, 0, 0.7);
  position: fixed;
  inset: 0;
  animation: overlayShow 300ms ease-in;

  @keyframes overlayShow {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`

export const StyledTrigger = styled(DialogTrigger)`
  width: 40px;
  height: 40px;
  border: 2px solid transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
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
    width: 24px;
    height: 24px;
    fill: var(--violet-50);
  }
`

export const StyledContent = styled(DialogContent)`
  background: var(--gray-800);
  border-radius: 0;
  box-shadow: hsl(206 22% 7% / 35%) 0px 10px 38px -10px,
    hsl(206 22% 7% / 20%) 0px 10px 20px -15px;
  width: 80vw;
  height: 100svh;
  position: fixed;
  top: 0;
  left: 0;

  &[data-state='open'] {
    animation: contentShowOpen 300ms ease-in;
  }

  &[data-state='closed'] {
    animation: contentShowClose 300ms ease-out;
  }

  @keyframes contentShowOpen {
    from {
      transform: translate(-100%, 0);
    }
    to {
      transform: translate(0, 0);
    }
  }
  @keyframes contentShowClose {
    from {
      transform: translate(0, 0);
    }
    to {
      transform: translate(-100%, 0);
    }
  }

  overflow: auto;
  scrollbar-gutter: auto;

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

export const StyledTitle = styled(DialogTitle)`
  display: flex;
  align-items: center;
  height: 56px;
  padding: 0 16px;
  gap: 16px;

  a {
    display: flex;
    align-items: center;

    span {
      margin-left: 0.5rem;
      margin-right: 0.5rem;

      font-family: 'Montserrat', sans-serif;
      font-size: 1rem;
      line-height: 1.5rem;
      font-weight: 400;
      transition: opacity 150ms linear;
      color: var(--violet-50);
    }
    text-decoration: none;

    transition: opacity 150ms linear, outline-offset 150ms linear;
    &:hover {
      span {
        opacity: 0.8;
      }
    }
    &:focus-visible {
      border-radius: 1px;
      outline-style: solid;
      outline-width: 2px;
      outline-offset: 2px;
      outline-color: var(--violet-300);
    }
  }
`

export const StyledMain = styled.div`
  display: flex;
  flex-direction: column;
  padding: 12px 16px;
  gap: 12px;
`

export const StyledClose = styled(DialogClose)`
  width: 40px;
  height: 40px;
  border: 2px solid transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
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

  svg {
    width: 24px;
    height: 24px;
    fill: var(--violet-50);
  }
`

export const SignOutButton = styled.button`
  border: 2px solid transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  border-radius: 4px;
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
`

export const RoomsBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

export const StyledSection = styled.section``
