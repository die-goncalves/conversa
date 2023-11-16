import styled from 'styled-components'

export const Layout = styled.div`
  position: relative;
  display: grid;
  grid-template-rows: 1fr;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  width: 100%;
  max-width: 1536px;
  margin: 0 auto;

  @media (min-width: 768px) {
    grid-template-columns: 0.4fr 1fr;
  }
  @media (min-width: 1024px) {
    grid-template-columns: 0.35fr 1fr;
  }
  @media (min-width: 1366px) {
    grid-template-columns: 0.3fr 1fr;
  }
`
