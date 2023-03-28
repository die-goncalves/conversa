import styled from 'styled-components'

export const CallParticipantsContainer = styled.div`
  overflow: hidden;
  display: flex;
  flex: 1;
  padding-top: 2rem;
  padding-right: 2rem;
  padding-left: 2rem;
  padding-bottom: 0;
`

export const FlexWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  align-content: center;
  vertical-align: middle;
  border-radius: 4px;
`

interface IVideoContainer {
  videoWidth: number
  videoHeight: number
  videoMargin: number
}
export const VideoContainer = styled.div<IVideoContainer>`
  display: flex;
  position: relative;
  vertical-align: middle;
  align-self: center;
  overflow: hidden;
  display: inline-block;
  background: var(--gray-800);
  border: 2px solid var(--gray-700);
  box-shadow: var(--shadow-md);
  border-radius: 4px;

  padding: 0.5rem;

  margin: ${props => {
    return props.videoMargin
  }}px;
  width: ${props => {
    return props.videoWidth
  }}px;
  height: ${props => {
    return props.videoHeight
  }}px;

  transition: all 250ms linear;

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
    top: 0.5rem;
    left: 0.5rem;
    width: calc(100% - 1rem);
    height: calc(100% - 1rem);
    border-radius: 4px;
    background: var(--gray-700);
    box-shadow: var(--shadow);

    img {
      margin: auto;
      width: 25%;
      aspect-ratio: 1 / 1;
      object-fit: cover;
      border-radius: 4px;
      box-shadow: var(--shadow);
    }
  }

  svg {
    position: absolute;
    right: 1rem;
    bottom: 1rem;
    width: 1.5rem;
    height: 1.5rem;
    fill: var(--violet-300);
  }
`
