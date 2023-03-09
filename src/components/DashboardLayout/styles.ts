import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

export const DashboardLayoutContainer = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  display: flex;

  background: var(--gray-900);
`

export const SidebarContainer = styled.div`
  position: relative;
  width: 486px;
  height: 100vh;

  overflow: auto;
  scrollbar-gutter: stable;

  &::-webkit-scrollbar {
    width: 16px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 2px;
    background: var(--gray-600);
    box-shadow: var(--shadow-lg);
  }
  &::-webkit-scrollbar-thumb:hover {
    background: var(--gray-700);
    box-shadow: inset var(--shadow-md);
  }
  &::-webkit-scrollbar-thumb:active {
    background-color: var(--gray-800);
    box-shadow: var(--shadow);
  }
  &::-webkit-scrollbar-track {
    background: var(--gray-900);
  }
`

export const Header = styled.div`
  position: sticky;
  top: 0;
  z-index: 5;
  padding: 1rem 2rem;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  background: var(--gray-800);
  box-shadow: var(--shadow);
  margin-right: 1rem;
  margin-bottom: 1rem;
  margin-left: 1rem;
`

const StyledHeader = styled.div`
  padding: 1rem 2rem;
  background-color: #57534e;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
`
export const RoomContainer = styled(StyledHeader)`
  position: sticky;
  top: 72px;
  z-index: 4;
`

export const LogoBox = styled.div`
  display: flex;
  align-items: center;

  span {
    margin-left: 0.5rem;
    margin-right: 0.5rem;

    font-family: 'Montserrat', sans-serif;
    font-weight: 500;
  }
`

const Box = styled.div`
  background: var(--gray-800);
  box-shadow: var(--shadow);
  margin: 1rem;
  padding: 1rem;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

export const ActionsBox = styled(Box)`
  button {
    border: 2px solid transparent;
    display: flex;
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

export const RoomsBox = styled(Box)``

export const StyledNavLink = styled(NavLink)`
  background: var(--gray-700);
  box-shadow: var(--shadow);
  height: 4rem;
  padding: 0 0.5rem;
  border-radius: 4px;
  border: 2px solid transparent;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;

  &.active {
    background: var(--gray-500);
    box-shadow: var(--shadow-lg);
  }

  & > div {
    line-height: 0;

    img {
      border-radius: 4px;
      width: 2.5rem;
      height: 2.5rem;
      object-fit: cover;
    }
  }

  transition: background 150ms linear, border-color 150ms linear,
    box-shadow 150ms linear;
  &:not(.active):hover {
    background: var(--gray-600);
    box-shadow: var(--shadow-md);
  }

  outline: 0;
  &:focus-visible {
    border-color: var(--violet-300);
  }
`

export const FormNewRoom = styled(Box)`
  form {
    display: flex;
    flex-direction: column;

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
  }
`
