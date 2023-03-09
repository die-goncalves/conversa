import styled from 'styled-components'

export const RowContainer = styled.li`
  position: relative;
  display: grid;
  grid-template-columns: 1fr 3rem 1fr;
`

interface IMessageContainerProps {
  isMe: boolean
}
export const MessageContainer = styled.div<IMessageContainerProps>`
  position: relative;
  display: flex;
  justify-content: ${props => (props.isMe ? 'flex-end' : 'flex-start')};
  grid-column-start: ${props => (props.isMe ? 3 : 1)};
  flex: 1;
  gap: 0.5rem;

  & > div {
    display: flex;
    flex-direction: column;
    background: var(--gray-800);
    padding: 1rem;
    min-width: 50%;
    border-radius: 4px;
    box-shadow: var(--shadow);

    header {
      display: flex;
      padding: 0.5rem 1rem;
      background: var(--gray-700);
      border-radius: 4px;
      box-shadow: var(--shadow);

      span {
        font-family: 'Montserrat', sans-serif;
        font-size: 1rem;
        line-height: 1.5rem;
      }
    }
    main {
      margin-top: 0.5rem;
      border-radius: 4px;
      word-break: break-word;
      align-self: ${props => (props.isMe ? 'flex-end' : 'flex-start')};
    }
    & > span {
      margin-top: 0.5rem;
      text-align: ${props => (props.isMe ? 'right' : 'left')};
      opacity: 0.6;
    }
  }

  img {
    position: sticky;
    top: 8px;
    width: 4rem;
    height: 4rem;
    border-radius: 4px;
    object-fit: cover;

    box-shadow: var(--shadow);
  }
`
