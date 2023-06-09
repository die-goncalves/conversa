import styled from 'styled-components'

interface IDefaultVideoContainer {
  isFeatured: boolean
}
export const DefaultVideoContainer = styled.div<IDefaultVideoContainer>`
  display: ${props => (props.isFeatured ? 'none' : 'inline-block')};
  position: relative;
  vertical-align: middle;
  align-self: center;
  overflow: hidden;
  background: var(--gray-800);
  border: 4px solid var(--gray-700);
  box-shadow: var(--shadow-md);
  border-radius: 4px;

  video {
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
