import styled from 'styled-components'

export const CallContainer = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height: 100svh;

  @media (min-width: 320px) {
    flex-direction: column;
  }
  @media (min-width: 768px) {
    flex-direction: row;
    flex: 1;
  }
`

export const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;

  @media (min-width: 320px) {
    padding: 1rem;
  }
  @media (min-width: 640px) {
    padding: 1.5rem;
  }
`

export const StyledCall = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
`
