import styled from 'styled-components'

export const NavLinkContainer = styled.div`
  display: flex;
  align-items: center;
  /* padding: 0 1rem; */
  padding-left: 8px;

  img {
    border-radius: 4px;
    margin-right: 1rem;
    width: 1.5rem;
    height: 1.5rem;
    object-fit: cover;
  }

  & > a:first-of-type {
    margin-right: auto;
    text-decoration: none;
    cursor: pointer;

    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

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

      @media (min-width: 320px) {
        line-height: 1.75rem;
      }
      @media (min-width: 640px) {
        line-height: 1.25rem;
      }
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
    svg {
      width: 1.5rem;
      height: 1.5rem;
      fill: var(--violet-50);
    }
  }
`
