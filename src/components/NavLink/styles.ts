import styled from 'styled-components'

export const NavLinkContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 0 1rem;

  & > div {
    display: flex;
    align-items: center;

    img {
      border-radius: 4px;
      margin-right: 1rem;
      width: 2.5rem;
      height: 2.5rem;
      object-fit: cover;
    }

    a {
      text-decoration: none;
      cursor: pointer;

      transition: opacity 150ms linear, outline-offset 150ms linear;
      &:hover {
        opacity: 0.8;
      }
      &:focus-visible {
        border-radius: 1px;
        outline-style: solid;
        outline-width: 2px;
        outline-offset: 2px;
        outline-color: var(--violet-300);
      }
      &.active {
        text-decoration-line: underline;
        text-decoration-style: wavy;
        text-decoration-thickness: 2px;
        text-decoration-color: var(--violet-300);
      }
    }
  }

  & > a {
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid transparent;
    height: 2.5rem;
    width: 2.5rem;
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

    line-height: 0;
    margin-left: auto;
    svg {
      width: 1.5rem;
      height: 1.5rem;
      fill: var(--violet-50);
    }
  }
`
