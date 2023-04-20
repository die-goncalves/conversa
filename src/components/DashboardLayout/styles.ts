import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const DashboardLayoutContainer = styled.div`
  position: relative;
  width: 100vw;
  height: 100svh;
  display: flex;

  background: var(--gray-900);
`

export const SidebarContainer = styled.div`
  position: relative;
  width: 28rem;
  height: 100%;

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

export const Header = styled.div`
  position: sticky;
  display: flex;
  justify-content: space-between;
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

export const LogoBox = styled(Link)`
  display: flex;
  align-items: center;

  span {
    margin-left: 0.5rem;
    margin-right: 0.5rem;

    font-family: 'Montserrat', sans-serif;
    font-weight: 500;
    transition: opacity 150ms linear;
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
