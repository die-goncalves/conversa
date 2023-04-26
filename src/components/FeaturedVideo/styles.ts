import styled from 'styled-components'

export const FeaturedVideoContainer = styled.div`
  position: relative;
  display: flex;

  @media (min-width: 320px) {
    padding: 0.5rem 1rem 0rem;
    width: 100%;
    height: 80%;
  }
  @media (min-width: 640px) {
    padding: 0rem 1.5rem 0rem;
    height: 70%;
  }
  @media (min-width: 768px) {
    width: 80%;
    margin-right: 2rem;
  }
`

export const VideoBox = styled.div`
  display: inline-block;
  position: relative;
  vertical-align: middle;
  align-self: center;
  overflow: hidden;
  background: var(--gray-800);
  border: 4px solid var(--gray-700);
  box-shadow: var(--shadow-md);
  border-radius: 4px;

  width: 100%;
  height: 100%;

  & > video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    background-size: cover;
    border-radius: 4px;
    box-shadow: var(--shadow);
  }

  & > div {
    position: absolute;
    display: flex;
    inset: 0;
    background: var(--gray-800);

    img {
      margin: auto;
      width: 25%;
      aspect-ratio: 1 / 1;
      object-fit: cover;
      border-radius: 4px;
      box-shadow: var(--shadow);
    }
  }

  & > svg {
    position: absolute;
    right: 12px;
    bottom: 12px;
    width: 1.5rem;
    height: 1.5rem;
    fill: var(--violet-300);
  }

  & > button {
    &.featured {
      display: flex;
    }

    display: none;
    position: absolute;
    border: none;
    top: 4px;
    right: 4px;
    background: transparent;
    padding: 0.5rem;

    cursor: pointer;

    & > svg {
      width: 1.5rem;
      height: 1.5rem;
      fill: var(--violet-300);
    }
  }
`
