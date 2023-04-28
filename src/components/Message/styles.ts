import styled from 'styled-components'

interface IMessageLine {
  isMe: boolean
}
export const MessageLine = styled.li<IMessageLine>`
  display: flex;
  position: relative;
  justify-content: ${props => (props.isMe ? 'flex-end' : 'flex-start')};

  .message-container {
    position: relative;
    display: flex;
    justify-content: ${props => (props.isMe ? 'flex-end' : 'flex-start')};

    @media (min-width: 320px) {
      max-width: ${props => (props.isMe ? 'calc(80% - 2.5rem)' : '80%')};
      min-width: ${props => (props.isMe ? 'calc(50% - 2.5rem)' : '50%')};
    }
    @media (min-width: 640px) {
      max-width: ${props => (props.isMe ? 'calc(70% - 3.25rem)' : '70%')};
      min-width: ${props => (props.isMe ? 'calc(50% - 3.25rem)' : '50%')};
    }
  }

  img {
    position: sticky;
    top: 8px;
    object-fit: cover;
    margin-top: 8px;
    margin-bottom: 8px;
    border-radius: 4px 0 0 4px;

    box-shadow: var(--shadow);

    @media (min-width: 320px) {
      width: 2.5rem;
      height: 2.5rem;
    }
    @media (min-width: 640px) {
      width: 3.25rem;
      height: 3.25rem;
    }
  }

  .message-balloon {
    display: flex;
    flex-direction: column;
    border-radius: 4px;
    background: ${props =>
      props.isMe ? 'var(--gray-700)' : 'var(--gray-800)'};
    box-shadow: ${props => (props.isMe ? 'var(--shadow-md)' : 'var(--shadow)')};

    &,
    & > * {
      white-space: pre-wrap;
      overflow-wrap: break-word;
    }

    @media (min-width: 320px) {
      padding: 0.5rem;
      width: ${props => (props.isMe ? '100%' : 'calc(100% - 2.5rem)')};
    }
    @media (min-width: 640px) {
      padding: 1rem;
      width: ${props => (props.isMe ? '100%' : 'calc(100% - 3.25rem)')};
    }
    @media (min-width: 768px) {
      padding: 0.5rem;
    }
  }

  header {
    border-radius: 4px;

    @media (min-width: 320px) {
      padding: 0;
    }
    @media (min-width: 640px) {
      padding: 0.5rem 1rem;
      background: var(--gray-700);
      box-shadow: var(--shadow);
    }
    @media (min-width: 768px) {
      padding: 0;
      background: transparent;
      box-shadow: none;
    }
  }
  main {
    max-width: 100%;
    margin-top: ${props => (props.isMe ? 0 : '0.5rem')};
    align-self: ${props => (props.isMe ? 'flex-end' : 'flex-start')};
  }
  footer {
    ${props =>
      props.isMe
        ? {
            display: 'grid',
            gridTemplateColumns: '1fr auto'
          }
        : {
            display: 'flex'
          }};

    margin-top: 0.5rem;

    span {
      ${props =>
        props.isMe
          ? {
              marginLeft: 'auto'
            }
          : { marginRight: 'auto' }};
      opacity: 0.6;
    }

    svg {
      display: ${props => (props.isMe ? 'block' : 'none')};
      margin-left: 1rem;
      width: 1.5rem;
      height: 1.5rem;
      filter: drop-shadow(0px 0.3px 0.7px rgba(0, 0, 0, 0.141))
        drop-shadow(0px 1.1px 2.2px rgba(0, 0, 0, 0.209))
        drop-shadow(0px 5px 10px rgba(0, 0, 0, 0.35));
    }
  }
`

interface IViewed {
  isViewed: boolean
}
export const Viewed = styled.div<IViewed>`
  svg {
    fill: ${props =>
      props.isViewed ? 'var(--violet-300)' : 'var(--gray-400)'};
  }
`

interface IADMMessage {
  type: 'enter' | 'out' | 'info'
}
export const ADMMessage = styled.li<IADMMessage>`
  display: flex;
  margin: 0 auto;
  background: var(--gray-800);

  min-width: auto;
  border-radius: 4px;
  box-shadow: var(--shadow);

  svg {
    fill: ${props => {
      if (props.type === 'enter') {
        return 'var(--green-300)'
      }
      if (props.type === 'out') {
        return 'var(--red-300)'
      }
    }};
    width: 1.5rem;
    height: 1.5rem;
    filter: drop-shadow(0px 0.3px 0.7px rgba(0, 0, 0, 0.141))
      drop-shadow(0px 1.1px 2.2px rgba(0, 0, 0, 0.209))
      drop-shadow(0px 5px 10px rgba(0, 0, 0, 0.35));
  }

  div {
    display: flex;
    flex-direction: column;
    span {
      margin-top: 0.5rem;
      opacity: 0.6;
    }
  }

  @media (min-width: 320px) {
    padding: 0.5rem;
    gap: 0.5rem;
  }
  @media (min-width: 640px) {
    padding: 1rem;
    gap: 1rem;
  }
  @media (min-width: 768px) {
    padding: 0.5rem;
    gap: 0.5rem;
  }
`
