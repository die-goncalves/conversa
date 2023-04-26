import styled from 'styled-components'

export const CallWrapper = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;

  @media (min-width: 320px) {
    flex-direction: column;
  }
  @media (min-width: 640px) {
    margin: 2rem 2rem 0;
  }
`

export const CallParticipantsContainer = styled.div`
  overflow: hidden;
  display: flex;
  flex: 1;
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
