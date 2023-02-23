import styled from 'styled-components'

export const PageContainer = styled.div`
  position: relative;
  display: flex;
  width: 100vw;
  height: 100vh;
  pointer-events: none;

  align-items: center;
  justify-content: center;
`

interface ILoadingIndicator {
  size: number
}
export const LoadingIndicator = styled.div<ILoadingIndicator>`
  position: relative;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  border-radius: 50%;
  overflow: visible;
  background: var(--gray-400);
  box-shadow: var(--shadow-2xl);

  &::before {
    content: '';
    position: absolute;
    top: ${props => props.size / 16}px;
    left: ${props => props.size / 16}px;
    width: calc(100% - ${props => props.size / 8}px);
    height: calc(100% - ${props => props.size / 8}px);

    background: var(--gray-800);
    box-shadow: inset var(--shadow-xl);

    border-radius: 50%;
  }

  &::after {
    box-sizing: border-box;
    content: '';
    position: absolute;

    top: ${props => props.size / 64}px;
    left: ${props => props.size / 64}px;
    width: calc(100% - ${props => props.size / 32}px);
    height: calc(100% - ${props => props.size / 32}px);
    border: ${props => props.size / 32}px solid transparent;
    background: transparent;

    border-top: ${props => props.size / 32}px solid var(--violet-50);
    border-right: ${props => props.size / 32}px solid var(--violet-50);

    border-radius: 50%;
    animation: spin 1500ms linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`
