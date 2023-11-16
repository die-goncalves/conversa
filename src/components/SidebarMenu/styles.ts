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
  cursor: pointer;
  transition: background-color 150ms linear, border-color 150ms linear,
    box-shadow 150ms linear;

  box-shadow: var(--shadow);
  &:hover {
    @media (min-width: 320px) {
      background: var(--gray-600);
      box-shadow: var(--shadow-md);
    }
    @media (min-width: 640px) {
      background: var(--gray-700);
    }
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

  @media (min-width: 320px) {
    background: var(--gray-700);
  }
  @media (min-width: 640px) {
    background: var(--gray-800);
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
`

export const StyledSidebarContent = styled.aside`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: stretch;
  height: 100svh;
  background: var(--gray-800);
  border-radius: 0;
  box-shadow: var(--shadow);

  position: sticky;
  top: 0;
  width: 100%;

  overflow: auto;
  scrollbar-gutter: auto;
`

export const StyledTitle = styled(DialogTitle)`
  display: flex;
  align-items: center;
  justify-content: space-between;

  a {
    height: 40px;
    border: 2px solid transparent;
    border-radius: 4px;
    display: flex;
    align-items: center;
    transition: border-color 150ms linear;

    span {
      margin-right: 0.5rem;
      font-weight: 400;
      font-size: 1rem;
    }
    svg {
      width: 40px;
      height: 40px;
    }
    text-decoration: none;

    outline: 0;
    &:focus-visible {
      border-color: var(--violet-300);
    }
  }

  @media (min-width: 320px) {
    padding: 1rem 1rem 0;
  }
  @media (min-width: 640px) {
    padding: 1.5rem 1.5rem 0;
  }
`

export const StyledSidebarTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  a {
    height: 40px;
    border: 2px solid transparent;
    border-radius: 4px;
    display: flex;
    align-items: center;
    transition: border-color 150ms linear;

    span {
      margin-right: 0.5rem;
    }
    svg {
      width: 40px;
      height: 40px;
    }
    text-decoration: none;

    outline: 0;
    &:focus-visible {
      border-color: var(--violet-300);
    }
  }

  @media (min-width: 768px) {
    padding: 1.5rem 1.5rem 0;
  }
  @media (min-width: 1024px) {
    padding: 2rem 2rem 0;
  }
`

export const StyledMain = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 0.75rem;

  @media (min-width: 320px) {
    padding: 0.75rem 1rem;
  }
  @media (min-width: 640px) {
    padding: 1rem 1.5rem;
  }
  @media (min-width: 1024px) {
    padding: 1rem 2rem;
  }
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
