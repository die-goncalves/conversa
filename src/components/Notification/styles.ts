import {
  DropdownMenuArrow,
  DropdownMenuContent,
  DropdownMenuItem
} from '@radix-ui/react-dropdown-menu'
import styled from 'styled-components'

export const NotificationButton = styled.button`
  position: relative;
  height: 2.5rem;
  width: 2.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid transparent;
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
    flex: none;
    width: 1.5rem;
    height: 1.5rem;
    fill: var(--violet-50);
  }

  & > span {
    position: absolute;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 20px;
    height: 20px;
    border-radius: 12px;
    top: -2px;
    left: 16px;
    font-size: 0.75rem;
    font-weight: 500;
    line-height: 1rem;
    background: var(--violet-300);
    border: 2px solid var(--gray-800);
    padding: 2px;
    color: var(--gray-800);
  }
`

export const StyledDropdownMenuContent = styled(DropdownMenuContent)`
  background-color: var(--gray-700);
  border-radius: 4px;
  padding: 0.5rem;
  box-shadow: var(--shadow-md);
  animation-name: scaleIn;
  animation-duration: 150ms;
  animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
  z-index: 5;

  transform-origin: var(--radix-dropdown-menu-content-transform-origin);

  div[role='menuitem'] + div[role='menuitem'] {
    margin-top: 0.5rem;
  }

  max-height: 400px;
  overflow: auto;
  scrollbar-gutter: auto;

  @keyframes scaleIn {
    from {
      opacity: 0;
      transform: scale(0);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

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

  @media (min-width: 320px) {
    min-width: 240px;
    max-width: 320px;
  }
  @media (min-width: 640px) {
    min-width: 320px;
  }
`

interface IStyledDropdownMenuItemNotification {
  status?: 'unread' | 'read' | 'removed'
}
export const StyledDropdownMenuItemNotification = styled(
  DropdownMenuItem
)<IStyledDropdownMenuItemNotification>`
  display: flex;
  align-items: center;
  width: 100%;
  background-color: transparent;
  border: 2px solid transparent;
  border-radius: 4px;

  ${props =>
    props.status === 'unread'
      ? `{
          background: transparent;
          cursor: pointer;
          svg {
            fill: var(--blue-300);
          }
          &:hover {
            background-color: var(--gray-600);
            box-shadow: var(--shadow);
            svg {
              fill: var(--blue-400);
              transition: fill 150ms linear;
            }
          }
          outline: 0;
          &:focus-visible {
            border-color: var(--violet-300);
          }
        }`
      : props.status === 'read' &&
        `{
          cursor: default;
          svg {
            fill: var(--green-300);
          }
          div {
            opacity: 0.6;
          }
          outline: 0;
      }`};

  transition: background-color 150ms linear, border-color 150ms linear,
    box-shadow 150ms linear;

  svg {
    flex: none;
    width: 1.5rem;
    height: 1.5rem;

    @media (min-width: 320px) {
      margin-right: 0.5rem;
    }
    @media (min-width: 640px) {
      margin-right: 1rem;
    }
  }

  & div {
    display: flex;
    flex-direction: column;
    p {
      overflow-wrap: break-word;
    }
    span {
      font-size: 0.875rem;
      line-height: 1.25rem;
      font-weight: 400;
      opacity: 0.6;
      margin-top: 0.25rem;
    }
  }

  @media (min-width: 320px) {
    padding: 0 0.5rem;
  }
  @media (min-width: 640px) {
    padding: 0 1rem;
  }
  @media (min-width: 768px) {
    padding: 0.5rem 1rem;
  }
`

export const StyledDropdownMenuItemClearAll = styled(DropdownMenuItem)`
  display: flex;
  align-items: center;
  height: 3.5rem;
  width: 100%;
  background-color: transparent;
  border: 2px solid transparent;
  padding: 0 1rem;
  border-radius: 4px;
  cursor: pointer;

  transition: background-color 150ms linear, border-color 150ms linear,
    box-shadow 150ms linear;

  outline: 0;
  &:focus-visible {
    border-color: var(--violet-300);
  }

  svg {
    margin-right: 1rem;
    width: 1.5rem;
    height: 1.5rem;
    fill: var(--red-300);

    transition: fill 150ms linear;
  }

  &:hover {
    background-color: var(--gray-600);
    box-shadow: var(--shadow);
    svg {
      fill: var(--red-400);
    }
  }
`

export const StyledDropdownMenuItemEmptyList = styled(DropdownMenuItem)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 3.5rem;
  width: 100%;
  background-color: transparent;
  border: 2px solid transparent;
  padding: 0 1rem;
  border-radius: 4px;
  outline: none;
`

export const StyledDropdownMenuArrow = styled(DropdownMenuArrow)`
  fill: var(--gray-700);
`
