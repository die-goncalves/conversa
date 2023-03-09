import { memo } from 'react'
import { timeAgo } from '../../utils/formatDate'
import { MessageContainer, RowContainer } from './styles'

interface IMessageProps {
  message: any
  sender?: string
}

export function MessageComponent({
  message,
  sender
}: IMessageProps): JSX.Element {
  const diffDate = timeAgo(Date.now(), message.timestamp)
  const isMe = sender === message.sender.id
  return (
    <RowContainer>
      <MessageContainer isMe={isMe}>
        {isMe ? null : <img src={message.sender.photoURL} alt="" />}

        <div>
          {isMe ? null : (
            <header>
              <span>{message.sender.displayName}</span>
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
