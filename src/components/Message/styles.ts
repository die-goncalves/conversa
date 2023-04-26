import styled from 'styled-components'

export const RowContainer = styled.li`
  position: relative;

  @media (min-width: 320px) {
    display: flex;
  }
  @media (min-width: 640px) {
    display: grid;
    grid-template-columns: 1fr 3rem 1fr;
  }
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

  & > div {
    display: flex;
    flex-direction: column;
    background: ${props =>
      props.isMe ? 'var(--gray-700)' : 'var(--gray-800)'};
    border-radius: 4px;

    box-shadow: ${props => (props.isMe ? 'var(--shadow-md)' : 'var(--shadow)')};
    min-width: 50%;

    header {
      display: flex;
      border-radius: 4px;

      span {
        @media (min-width: 320px) {
          font-size: 0.875rem;
          line-height: 1.25rem;
        }
        @media (min-width: 640px) {
          font-family: 'Montserrat', sans-serif;
          font-size: 1rem;
          line-height: 1.5rem;
        }
      }

      @media (min-width: 320px) {
        padding: 0.5rem 0.5rem 0;
      }
      @media (min-width: 640px) {
        padding: 0.5rem 1rem;
        background: var(--gray-700);
        box-shadow: var(--shadow);
      }
    }
    main {
      margin-top: ${props => (props.isMe ? 0 : '0.5rem')};
      border-radius: 4px;
      word-break: break-word;
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

    @media (min-width: 320px) {
      padding: 0.5rem;
      max-width: 80%;
    }
    @media (min-width: 640px) {
      gap: 0.5rem;
      padding: 1rem;
    }
  }

  img {
    position: sticky;
    top: 8px;
    object-fit: cover;
    margin-top: 8px;
    margin-bottom: 8px;

    box-shadow: var(--shadow);

    @media (min-width: 320px) {
      width: 2.5rem;
      height: 2.5rem;
      border-radius: 4px 0 0 4px;
    }
    @media (min-width: 640px) {
      width: 4rem;
      height: 4rem;
      border-radius: 4px;
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
`
