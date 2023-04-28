import styled from 'styled-components'

export const CallWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: calc(100svh - 56px);
  overflow: hidden;
`

interface ICallParticipantsContainer {
  hasFeaturedVideo: HTMLVideoElement | null
}
export const CallParticipantsContainer = styled.div<ICallParticipantsContainer>`
  overflow: hidden;
  display: flex;
  flex: 1;

  @media (min-width: 320px) {
    padding: 0 1rem;
  }
  @media (min-width: 640px) {
    padding: 0 1.5rem;
  }
  @media (min-width: 768px) {
    padding: ${props =>
      props.hasFeaturedVideo != null ? '0 1.5rem 0' : '1.5rem 1.5rem 0'};
  }
  @media (min-width: 1024px) {
    padding: ${props =>
      props.hasFeaturedVideo != null ? '0 2rem 0' : '2rem 2rem 0'};
  }
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
