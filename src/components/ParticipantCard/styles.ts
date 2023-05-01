import {
  DropdownMenuContent,
  DropdownMenuArrow,
  DropdownMenuItem
} from '@radix-ui/react-dropdown-menu'
import styled, { css } from 'styled-components'

const DefaultParticipantCard = css`
  position: relative;
  display: flex;
  height: 3.5rem;
  width: 100%;
  border: 2px solid transparent;
  align-items: center;
  margin-bottom: 1rem;
  background-color: var(--gray-800);
  box-shadow: var(--shadow);
  border-radius: 4px;

  img {
    height: 100%;
    margin-right: 0.5rem;
    border-radius: 4px;
    object-fit: cover;
  }

  & > div:first-of-type {
    display: flex;
    padding-right: 8px;
    flex-direction: column;
    flex: 1;
    &,
    & > * {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    & > span:first-of-type {
      text-align: start;
      font-size: 0.875rem;
      line-height: 1.25rem;
      font-weight: 500;
    }
    & > span:last-of-type {
      text-align: start;
      font-size: 0.875rem;
      line-height: 1.25rem;
      font-weight: 400;
      opacity: 0.6;
    }
  }

  &.adm {
    & > div:last-of-type {
      display: flex;
      flex: none;
      padding-right: 8px;
      svg {
        margin: auto;
        width: 1.5rem;
        height: 1.5rem;
        fill: var(--violet-300);
      }
    }
  }
`

export const ParticipantCardContainer = styled.div`
  ${DefaultParticipantCard}
`

export const DropdownMenuParticipantCard = styled.button`
  ${DefaultParticipantCard}
  cursor: pointer;

  transition: background-color 150ms linear, border-color 150ms linear,
    box-shadow 150ms linear;
  &:hover {
    background-color: var(--gray-700);
    box-shadow: var(--shadow-md);
  }

  outline: 0;
  &:focus-visible {
    border-color: var(--violet-300);
  }
`

export const StyledDropdownMenuContent = styled(DropdownMenuContent)`
  min-width: 220px;
  background-color: var(--gray-700);
  border-radius: 4px;
  padding: 0.5rem;
  box-shadow: var(--shadow-md);
  animation-name: scaleIn;
  animation-duration: 150ms;
  animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);

  transform-origin: var(--radix-dropdown-menu-content-transform-origin);

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

  div[role='menuitem'] + div[role='menuitem'] {
    margin-top: 0.5rem;
  }
`

export const StyledDropdownMenuArrow = styled(DropdownMenuArrow)`
  fill: var(--gray-700);
`

export const StyledDropdownMenuItem = styled(DropdownMenuItem)`
  display: flex;
  align-items: center;
  width: 100%;
  background-color: transparent;
  border: 2px solid transparent;
  padding: 0.5rem;
  border-radius: 4px;
  cursor: pointer;

  transition: background-color 150ms linear, border-color 150ms linear,
    box-shadow 150ms linear;

  outline: 0;
  &:focus-visible {
    border-color: var(--violet-300);
  }

  svg {
    margin-right: 0.5rem;
    width: 1.5rem;
    height: 1.5rem;
    fill: var(--red-300);

    transition: fill 150ms linear;
  }

  &.add-adm {
    svg {
      fill: var(--green-300);
    }
  }

  &:hover {
    background-color: var(--gray-600);
    box-shadow: var(--shadow);
    svg {
      fill: var(--red-400);
    }

    &.add-adm {
      svg {
        fill: var(--green-400);
      }
    }
  }
`
