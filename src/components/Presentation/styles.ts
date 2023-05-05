import styled from 'styled-components'

export const DialogContentHeader = styled.header`
  display: flex;
  padding: 1rem;
  align-items: center;
  justify-content: space-between;
`

export const DialogContentDescription = styled.p`
  padding: 0 1rem 1rem;
  text-align: center;
`

export const DialogContentMain = styled.main`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0 1rem 1rem;

  & > div {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    text-indent: 1rem;
    text-align: justify;
    white-space: pre-wrap;
    overflow-wrap: break-word;
    hyphens: auto;
  }

  ul {
    list-style-position: inside;
    list-style-image: url('check.svg');
  }
`

export const DialogContentFooter = styled.footer`
  width: 100%;
  padding: 0 1rem 1rem;

  & > div {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    & > p {
      justify-self: center;
      align-self: center;
    }
    & > div {
      display: grid;
      grid-template-rows: repeat(2, 1fr);
      grid-template-columns: repeat(1, 1fr);
      grid-gap: 1rem;
    }
  }
`

export const Anchor = styled.a`
  display: inline-flex;
  align-items: center;
  width: 100%;
  height: 32px;
  padding: 0 0.5rem;
  text-decoration: none;

  &,
  & > * {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  & > div {
    display: flex;
    align-items: center;
    gap: 8px;

    img {
      width: 24px;
      height: 24px;
      object-fit: cover;
    }
    span {
      font-weight: 500;
    }

    @media (min-width: 320px) {
      min-width: 107px;
    }
    @media (min-width: 412px) {
      min-width: 114px;
    }
  }

  &:not(:focus-visible):hover {
    opacity: initial;
    & > span {
      opacity: 0.8;
    }
  }

  & > span {
    line-height: 1.75rem;
    text-decoration-line: underline;
    text-decoration-style: wavy;
    text-decoration-thickness: 2px;
    text-decoration-color: var(--violet-300);

    transition: opacity 150ms linear;
  }
`
