import styled from 'styled-components'

export const RoomDetailsContainer = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height: 100svh;
  padding-bottom: 1rem;

  background: var(--gray-900);

  overflow: auto;

  @media (min-width: 320px) {
    flex-direction: column;
  }
  @media (min-width: 768px) {
    flex-direction: row;
    & > div {
      width: 100%;
    }
  }
`

export const StyledHeader = styled.header`
  display: flex;
  align-items: center;

  gap: 1rem;
  @media (min-width: 320px) {
    padding: 1rem;
  }
  @media (min-width: 640px) {
    padding: 1.5rem;
  }
`

export const StyledInputPassword = styled.label`
  position: relative;
  display: flex;
  height: 2.5rem;
  border: 2px solid var(--gray-700);
  border-radius: 4px;
  background: transparent;
  box-shadow: var(--shadow);
  transition: border-color 150ms linear, box-shadow 150ms linear;

  outline: 0;
  &:has(input:focus-visible) {
    border-color: var(--violet-300);
    box-shadow: var(--shadow-md);
  }
  &:not(:has(input:focus-visible)):hover {
    border-color: var(--gray-600);
    box-shadow: var(--shadow-md);
  }

  & > input {
    width: 100%;
    background: transparent;
    border: none;
    padding: 0 1rem;
    outline: 0;

    &[type='password'] {
      ::-ms-reveal {
        filter: invert(100%);
      }
    }
  }

  & > button {
    border: 2px solid transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: auto 2px;
    height: 2rem;
    padding-right: 0.5rem;
    padding-left: 0.5rem;
    border-radius: 4px;
    background: var(--gray-800);
    cursor: pointer;
    transition: background-color 150ms linear, border-color 150ms linear,
      box-shadow 150ms linear;

    box-shadow: var(--shadow);
    &:hover {
      background: var(--gray-700);
      box-shadow: var(--shadow-md);
    }

    outline: 0;
    &:focus-visible {
      border-color: var(--violet-300);
    }
  }

  @media (min-width: 320px) {
    width: 100%;
  }
  @media (min-width: 640px) {
    width: fit-content;
  }
`

export const RoomIdSection = styled.section`
  display: flex;
  width: 100%;
  flex-direction: column;

  h2 {
    font-weight: 700;
    font-size: 1rem;
  }

  span {
    display: inline-block;
    padding: 0 1rem;
    margin-top: 0.25rem;
    margin-bottom: 1rem;

    font-size: 0.875rem;
    line-height: 1.25rem;
    color: var(--violet-300);
  }

  & > div {
    display: flex;
    gap: 8px;

    & > button {
      flex: none;
      border: 2px solid transparent;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 2.5rem;
      padding-right: 1.5rem;
      padding-left: 1.5rem;
      border-radius: 0.25rem;
      background: var(--gray-800);
      cursor: pointer;
      transition: background-color 150ms linear, border-color 150ms linear,
        box-shadow 150ms linear;

      box-shadow: var(--shadow);
      &:hover {
        background: var(--gray-700);
        box-shadow: var(--shadow-md);
      }

      outline: 0;
      &:focus-visible {
        border-color: var(--violet-300);
      }
    }

    @media (min-width: 320px) {
      flex-direction: column;
    }
    @media (min-width: 412px) {
      flex-direction: row;
    }
  }

  & + section {
    @media (min-width: 320px) {
      margin-top: 1rem;
    }
    @media (min-width: 640px) {
      margin-top: 1.5rem;
    }
    @media (min-width: 1024px) {
      margin-top: 2rem;
    }
  }

  @media (min-width: 320px) {
    padding: 0 1rem;
  }
  @media (min-width: 640px) {
    padding: 0 1.5rem;
  }
  @media (min-width: 768px) {
    margin-top: 1.5rem;
  }
  @media (min-width: 1024px) {
    margin-top: 2rem;
    padding: 0 2rem;
  }
`

export const ParticipantSection = styled.section`
  display: flex;
  width: 100%;
  flex-direction: column;

  & + section {
    @media (min-width: 320px) {
      margin-top: 1rem;
    }
    @media (min-width: 640px) {
      margin-top: 1.5rem;
    }
    @media (min-width: 1024px) {
      margin-top: 2rem;
    }
  }

  h2 {
    font-weight: 700;
    font-size: 1rem;
    margin-bottom: 1rem;
  }

  @media (min-width: 320px) {
    padding: 0 1rem;
  }
  @media (min-width: 640px) {
    padding: 0 1.5rem;
  }
  @media (min-width: 768px) {
    margin-top: 1.5rem;
  }
  @media (min-width: 1024px) {
    margin-top: 2rem;
    padding: 0 2rem;
  }
`

export const ParticipantGallery = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;

  @media (min-width: 320px) {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
  @media (min-width: 640px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  @media (min-width: 768px) {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
  @media (min-width: 1024px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  @media (min-width: 1280px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`

export const ActionSection = styled.section`
  display: flex;
  width: 100%;
  flex-direction: column;

  & + section {
    @media (min-width: 320px) {
      margin-top: 1rem;
    }
    @media (min-width: 640px) {
      margin-top: 1.5rem;
    }
    @media (min-width: 1024px) {
      margin-top: 2rem;
    }
  }

  h2 {
    font-weight: 700;
    font-size: 1rem;
    margin-bottom: 1rem;
  }

  button {
    position: relative;
    display: flex;
    width: 100%;
    height: 40px;
    padding: 0 0.5rem;
    border: 2px solid transparent;
    align-items: center;
    background-color: var(--gray-800);
    box-shadow: var(--shadow);
    border-radius: 4px;
    cursor: pointer;

    span {
      text-align: start;
      vertical-align: bottom;
    }

    & + button {
      margin-top: 1rem;
    }

    transition: background-color 150ms linear, border-color 150ms linear,
      box-shadow 150ms linear;
    &:not(:disabled):hover {
      background-color: var(--gray-700);
      box-shadow: var(--shadow-md);
      svg {
        fill: var(--red-400);
      }
    }

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

    &:disabled {
      cursor: not-allowed;
      opacity: 0.8;
    }
  }

  span[role='alert'] {
    display: inline-block;
    padding: 0 1rem;
    margin-top: 0.25rem;
    margin-bottom: 1rem;

    font-size: 0.875rem;
    line-height: 1.25rem;
    color: var(--red-300);
  }

  @media (min-width: 320px) {
    padding: 0 1rem;
  }
  @media (min-width: 640px) {
    padding: 0 1.5rem;
  }
  @media (min-width: 1024px) {
    padding: 0 2rem;
  }
`

export const BlockedSection = styled.section`
  display: flex;
  width: 100%;
  flex-direction: column;

  h2 {
    font-weight: 700;
    font-size: 1rem;
    margin-bottom: 1rem;
  }

  @media (min-width: 320px) {
    padding: 0 1rem;
  }
  @media (min-width: 640px) {
    padding: 0 1.5rem;
  }
  @media (min-width: 1024px) {
    padding: 0 2rem;
  }
`

export const BlockedParticipantGallery = styled.div`
  column-count: 3;
  column-gap: 1rem;

  @media (min-width: 320px) {
    column-count: 1;
  }
  @media (min-width: 640px) {
    column-count: 2;
  }
  @media (min-width: 768px) {
    column-count: 1;
  }
  @media (min-width: 1024px) {
    column-count: 2;
  }
  @media (min-width: 1280px) {
    column-count: 3;
  }
`
