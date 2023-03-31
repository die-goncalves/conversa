import styled from 'styled-components'

export const RoomContainer = styled.div`
  position: relative;
  display: flex;
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

export const ContentContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: auto;
`

export const MessagesBox = styled.ul`
  display: flex;
  flex-direction: column;
  list-style: none;
  gap: 1rem;
  margin-top: 2rem;
  margin-right: 2rem;
  margin-bottom: 1rem;
  margin-left: 2rem;
`

export const Loader = styled.div`
  width: 100%;
  height: 100px;
  background: red;
`
