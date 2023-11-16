import * as DialogPrimitive from '@radix-ui/react-dialog'
import styled from 'styled-components'

export const StyledDialogPrimitiveContent = styled(DialogPrimitive.Content)`
  background: var(--gray-800);
  border-radius: 4px;
  box-shadow: hsl(206 22% 7% / 35%) 0px 10px 38px -10px,
    hsl(206 22% 7% / 20%) 0px 10px 20px -15px; //*
  max-width: 450px;
  max-height: 85svh;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  will-change: contents;

  &:focus-visible {
    outline-style: solid;
    outline-width: 2px;
    outline-color: var(--violet-300);
  }

  &[data-state='open'] {
    animation: contentShowOpen 300ms ease-in;
  }

  @keyframes contentShow {
    from {
      opacity: 0;
      transform: translate(-50%, -48%) scale(0.96);
    }
    to {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1);
    }
  }

  overflow: auto;
  scrollbar-gutter: auto;

  @media (min-width: 320px) {
    width: calc(100% - 32px);
  }
`

export const StyledDialogPrimitiveOverlay = styled(DialogPrimitive.Overlay)`
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

export const StyledDialogPrimitiveClose = styled(DialogPrimitive.Close)`
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
