import styled from 'styled-components'

export const NavLinkContainer = styled.div`
  display: flex;
  align-items: center;
  padding-left: 0.5rem;

  img {
    border-radius: 4px;
    margin-right: 1rem;

    object-fit: cover;

    width: 2.5rem;
    height: 2.5rem;
  }

  & > a:first-of-type {
    all: unset;

    margin-right: auto;
    text-decoration: none;
    cursor: pointer;

    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    transition: opacity 150ms linear, outline-color 150ms linear;
    &:not(:focus-visible):hover {
      opacity: 0.8;
    }
    outline: 0;
    outline-color: transparent;
    &:focus-visible {
      outline-style: solid;
      outline-offset: 2px;
      outline-width: 2px;
      border-radius: 0.25px;
      outline-color: var(--violet-300);
    }
    &.active {
      line-height: 1.75rem;
      text-decoration-line: underline;
      text-decoration-style: wavy;
      text-decoration-thickness: 2px;
      text-decoration-color: var(--violet-300);
    }
  }

  & > div {
    display: flex;
    margin: 0 1rem;
    svg {
      width: 14px;
      height: 14px;
      fill: var(--violet-300);
    }
  }

  & > a:last-of-type {
    display: flex;
    flex: none;
    align-items: center;
    justify-content: center;
    border: 2px solid transparent;
    height: 40px;
    width: 40px;
    border-radius: 4px;
    background: var(--gray-700);
    cursor: pointer;
    transition: background-color 150ms linear, border-color 150ms linear,
      box-shadow 150ms linear;

    box-shadow: var(--shadow);
    &:not(:focus-visible):hover {
      background: var(--gray-600);
      box-shadow: var(--shadow-md);
    }

    outline: 0;
    &:focus-visible {
      border-color: var(--violet-300);
    }

    line-height: 0;
    svg {
      width: 1.5rem;
      height: 1.5rem;
      fill: var(--violet-50);
    }
  }
`
