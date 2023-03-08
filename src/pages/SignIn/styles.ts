import styled from 'styled-components'

export const PageContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
`

export const SignInContainer = styled.div`
  position: relative;
  width: 30rem;
  padding: 2rem;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  background: var(--gray-800);
  margin: auto;
  box-shadow: var(--shadow);
`

export const Header = styled.header`
  display: flex;
  margin: 0 auto;

  h1 {
    font-family: 'Montserrat', sans-serif;
    font-size: 1.125rem;
    line-height: 1.75rem;
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

      transition: border-color 150ms linear;
      outline: 0;
      &:focus-visible {
        border-color: var(--violet-300);
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
    &:hover {
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

    &:nth-child(n + 5) {
      img {
        filter: invert(100%);
      }
    }
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
    cursor: pointer;

    text-decoration-line: underline;
    text-decoration-style: wavy;
    text-decoration-thickness: 2px;
    text-decoration-color: var(--violet-300);

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
  }
`

export const LogoBox = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  padding: 0.5rem;
  background: var(--gray-800);
  border-radius: 0.5rem;

  span {
    margin-left: 0.5rem;
    margin-right: 0.5rem;

    font-family: 'Montserrat', sans-serif;
    font-weight: 500;
  }
`
