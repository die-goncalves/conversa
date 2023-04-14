import { memo } from 'react'
import { timeAgo } from '../../utils/formatDate'
import { ADMMessage, MessageContainer, RowContainer } from './styles'

interface IMessageProps {
  message: {
    id: string | null
    message: string
    sender?: {
      id: string | null
      displayName: string
      email: string
      isAnonymous: boolean
      photoURL: string
    }
    type?: 'enter' | 'out' | 'info'
    timestamp: number
  }
  sender: string
}

export function MessageComponent({
  message,
  sender
}: IMessageProps): JSX.Element {
  const diffDate = timeAgo(Date.now(), message.timestamp)
  const isMe = sender === message.sender?.id

  if (message.sender === undefined) {
    if (message.type === 'enter')
      return (
        <ADMMessage type="enter">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="48"
            viewBox="0 96 960 960"
            width="48"
          >
            <path d="M489 936v-60h291V276H489v-60h291q24 0 42 18t18 42v600q0 24-18 42t-42 18H489Zm-78-185-43-43 102-102H120v-60h348L366 444l43-43 176 176-174 174Z" />
          </svg>
          <div>
            <p>{message.message}</p>
            <span>{diffDate}</span>
          </div>
        </ADMMessage>
      )
    if (message.type === 'out')
      return (
        <ADMMessage type="out">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="48"
            viewBox="0 96 960 960"
            width="48"
          >
            <path d="M180 936q-24 0-42-18t-18-42V276q0-24 18-42t42-18h291v60H180v600h291v60H180Zm486-185-43-43 102-102H375v-60h348L621 444l43-43 176 176-174 174Z" />
          </svg>
          <div>
            <p>{message.message}</p>
            <span>{diffDate}</span>
          </div>
        </ADMMessage>
      )
  }

  return (
    <RowContainer>
      <MessageContainer isMe={isMe}>
        {isMe ? null : <img src={message.sender?.photoURL} alt="" />}

        <div>
          {isMe ? null : (
            <header>
              <span>{message.sender?.displayName}</span>
            </header>
          )}

          <main>{message.message}</main>
          <span>{diffDate}</span>
        </div>
      </MessageContainer>
    </RowContainer>
  )
}

export const Message = memo(MessageComponent)
