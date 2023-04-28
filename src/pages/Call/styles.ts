import styled from 'styled-components'

export const CallContainer = styled.div`
  @media (min-width: 320px) {
    width: 100vw;
    height: 100svh;
    position: relative;
    display: flex;
    flex-direction: column;
    background: var(--gray-900);
  }
  @media (min-width: 768px) {
    position: relative;
    display: flex;
    flex-direction: row;
    flex: 1;
    background: var(--gray-900);
  }
`

export const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
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

export const StyledCall = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
`
