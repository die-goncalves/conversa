import styled from 'styled-components'

export const RoomDetailsContainer = styled.div`
  position: relative;
  display: flex;
  width: 100vw;
  height: 100svh;

  background: var(--gray-900);

  overflow: auto;
  scrollbar-gutter: stable;

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

  height: 56px;
  gap: 1rem;
  @media (min-width: 320px) {
    padding: 0.5rem 1rem;
  }
  @media (min-width: 640px) {
    padding: 0.5rem 1.5rem;
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
    margin-top: 1rem;
    padding: 0 1rem;
  }
  @media (min-width: 640px) {
    margin-top: 1.5rem;
    padding: 0 1.5rem;
  }
  @media (min-width: 1024px) {
    margin-top: 2rem;
    padding: 0 2rem;
  }
`

export const ParticipantGallery = styled.div`
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
      margin-top: 0 1.5rem;
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
    height: 3.5rem;
    width: 100%;
    padding: 0 1rem;
    border: 2px solid transparent;
    align-items: center;
    background-color: var(--gray-800);
    box-shadow: var(--shadow);
    border-radius: 4px;
    cursor: pointer;

    span {
      text-align: start;
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
      margin-right: 1rem;
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
`
