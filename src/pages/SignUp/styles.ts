import styled from 'styled-components'

export const PageContainer = styled.div`
  width: 100vw;
  height: 100svh;

  overflow: auto;
  scrollbar-gutter: auto;

  &::-webkit-scrollbar {
    width: 1vw;
    height: 1vw;
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
    background: var(--gray-800);
  }
  @media (min-width: 640px) {
    display: flex;
    padding: 2.75rem 0;
    background: var(--gray-900);
  }
`

export const SignUpContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (min-width: 320px) {
    width: 100%;
    height: 100%;
    padding: 1rem;
  }
  @media (min-width: 640px) {
    width: 30rem;
    margin: auto;
    padding: 1.5rem;
    border-radius: 4px;
    background: var(--gray-800);
    box-shadow: var(--shadow);
  }
  @media (min-width: 1024px) {
    padding: 2rem;
  }
`

export const Header = styled.header`
  display: flex;

  h1 {
    font-family: 'Montserrat', sans-serif;
  }

  @media (min-width: 320px) {
    flex-direction: column;
    align-items: center;
    margin-bottom: 1rem;
  }
  @media (min-width: 640px) {
    margin: 0 auto;
  }
`

export const Main = styled.main`
  display: flex;
  flex-direction: column;

  form {
    display: flex;
    flex-direction: column;

    input[type='text'],
    input[type='password'] {
      border: 2px solid var(--gray-700);
      width: 100%;
      height: 2.5rem;
      padding: 0 1rem;
      border-radius: 0.25rem;
      background: transparent;
      box-shadow: var(--shadow);

      transition: border-color 150ms linear, box-shadow 150ms linear;
      outline: 0;
      &:focus-visible {
        border-color: var(--violet-300);
        box-shadow: var(--shadow-md);
      }

      &:not(:focus-visible):hover {
        border-color: var(--gray-600);
        box-shadow: var(--shadow-md);
      }
    }
    input[type='password'] {
      ::-ms-reveal {
        filter: invert(100%);
      }
    }

    span[role='alert'] {
      padding: 0 1rem;
      margin-top: 0.25rem;
      margin-bottom: 1rem;

      font-size: 0.875rem;
      line-height: 1.25rem;
      color: var(--red-300);
    }

    input + label,
    input + button {
      margin-top: 1rem;
    }

    label {
      margin-bottom: 0.5rem;
      font-weight: 500;
    }

    button[type='submit'] {
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
  }

  & > button {
    border: 2px solid transparent;
    display: flex;
    align-items: center;
    height: 2.5rem;
    padding-right: 1.5rem;
    padding-left: 1rem;
    border-radius: 4px;
    background: var(--gray-700);
    cursor: pointer;
    transition: background-color 150ms linear, border-color 150ms linear,
      box-shadow 150ms linear;

    box-shadow: var(--shadow);

    &:disabled {
      cursor: default;
      opacity: 0.8;
    }

    &:not(:disabled):hover {
      background: var(--gray-600);
      box-shadow: var(--shadow-md);
    }

    outline: 0;
    &:focus-visible {
      border-color: var(--violet-300);
    }

    img {
      width: 1.5rem;
      height: 1.5rem;
      margin-right: 0.5rem;
    }

    & + button {
      margin-top: 1rem;
    }

    svg {
      margin-left: auto;
      width: 1.5rem;
      height: 1.5rem;
      fill: var(--yellow-300);
      opacity: 0.6;
    }

    &:nth-child(n + 5) {
      img {
        filter: invert(100%);
      }
    }
  }

  @media (min-width: 320px) {
    width: 100%;
  }
`

export const Separator = styled.span`
  display: flex;
  align-items: center;
  padding: 1rem 0;

  color: var(--violet-50);
  &::after {
    content: '';
    display: flex;
    align-self: center;
    flex: 1;
    height: 0.125rem;
    margin-left: 0.5rem;
    background: var(--violet-50);
    opacity: 0.2;
  }
  &::before {
    content: '';
    display: flex;
    flex: 1;
    height: 0.125rem;
    margin-right: 0.5rem;
    background: var(--violet-50);
    opacity: 0.2;
  }
`

export const Footer = styled.footer`
  display: flex;
  margin-top: 1rem;

  a {
    margin: auto;
  }
`

export const LogoBox = styled.div`
  display: flex;
  align-items: center;

  span {
    margin-right: 0.5rem;

    font-family: 'Montserrat', sans-serif;
    font-size: 1rem;
    line-height: 1.5rem;
    font-weight: 400;
    transition: opacity 150ms linear;
    color: var(--violet-50);
  }

  @media (min-width: 320px) {
    position: absolute;
    top: 16px;
    left: 50%;
    transform: translateX(-50%);
  }
  @media (min-width: 640px) {
    border-radius: 4px;
    padding: 0.5rem;
    background: var(--gray-800);
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
  }
`
