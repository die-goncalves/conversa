import styled from 'styled-components'

export const RoomDetailsContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  flex: 1;

  background: var(--gray-900);

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

export const ParticipantSection = styled.section`
  display: flex;
  padding: 0 2rem;
  width: 100%;
  flex-direction: column;

  margin-top: 2rem;
  & + section {
    margin-top: 2rem;
  }

  h2 {
    font-weight: 700;
    font-size: 1rem;
    margin-bottom: 1rem;
  }
`

export const ParticipantGallery = styled.div`
  /* display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 1rem; */
  column-count: 3;
  column-gap: 1rem;

  /* & > div {
    position: relative;
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
    background: var(--gray-800);
    box-shadow: var(--shadow);
    border-radius: 4px;

    &.adm {
      & > div:last-of-type {
        display: flex;
        flex: 1;
        svg {
          margin: auto;
          width: 1.5rem;
          height: 1.5rem;
          fill: var(--violet-300);
        }
      }
    }

    & > div:first-of-type {
      display: flex;
      flex-direction: column;

      & > span:first-of-type {
        font-size: 0.875rem;
        line-height: 1.25rem;
        font-weight: 500;
      }
      & > span:last-of-type {
        font-size: 0.875rem;
        line-height: 1.25rem;
        font-weight: 400;
        opacity: 0.6;
      }
    }
    img {
      width: 3.5rem;
      height: 3.5rem;
      margin-right: 0.5rem;
      border-radius: 4px;
      object-fit: cover;
    }
  } */
`

export const ActionSection = styled.section`
  display: flex;
  padding: 0 2rem;
  width: 100%;
  flex-direction: column;

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
`
