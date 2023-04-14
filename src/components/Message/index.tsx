import { memo, useEffect, useRef } from 'react'
import { timeAgo } from '../../utils/formatDate'
import { ADMMessage, MessageContainer, RowContainer, Viewed } from './styles'
import { get, ref, set } from 'firebase/database'
import { database } from '../../services/firebaseConfig'

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
    viewed: Record<string, boolean>
    type?: 'enter' | 'out' | 'info'
    timestamp: number
  }
  sender: string
  roomId: string
}

export function MessageComponent({
  message,
  sender,
  roomId
}: IMessageProps): JSX.Element | null {
  const diffDate = timeAgo(Date.now(), message.timestamp)
  const isMe = sender === message.sender?.id

  const observer = useRef<IntersectionObserver>()
  useEffect(() => {
    if (message.id === null || message.sender?.id === sender) return
    if (
      message.viewed !== undefined &&
      message.viewed[message.id] === undefined
    )
      return

    console.log('MESSAGE COMPONENT', message, sender, roomId)
    if (observer.current != null) {
      observer.current.disconnect()
    }

    async function callbackFunction(
      entry: IntersectionObserverEntry[]
    ): Promise<void> {
      if (entry[0].isIntersecting) {
        if (message.id !== null && sender !== undefined)
          try {
            await set(
              ref(
                database,
                `messages/${roomId}/${message.id}/viewed/${sender}`
              ),
              true
            )

            const snapshotLastViewedMessage = await get(
              ref(
                database,
                `rooms/${roomId}/users/${sender}/last-viewed-message`
              )
            )
            if (snapshotLastViewedMessage.exists()) {
              if (
                snapshotLastViewedMessage.val().localeCompare(message.id) < 0
              ) {
                await set(
                  ref(
                    database,
                    `rooms/${roomId}/users/${sender}/last-viewed-message`
                  ),
                  message.id
                )
              }
            } else {
              await set(
                ref(
                  database,
                  `rooms/${roomId}/users/${sender}/last-viewed-message`
                ),
                message.id
              )
            }
          } catch (error) {
            console.error(error)
          } finally {
            observer.current?.disconnect()
          }
      }
    }

    observer.current = new IntersectionObserver(callbackFunction, {
      root: null,
      rootMargin: '0px',
      threshold: 1
    })

    const entryElement = document.getElementById(message.id)
    if (entryElement != null) observer.current?.observe(entryElement)

    return () => {
      observer.current?.disconnect()
    }
  }, [message, sender, roomId])

  if (message.id === null) return null

  if (message.sender === undefined) {
    if (message.type === 'enter')
      return (
        <ADMMessage id={message.id ?? ''} type="enter">
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
        <ADMMessage id={message.id ?? ''} type="out">
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
    <RowContainer id={message.id ?? ''}>
      <MessageContainer isMe={isMe}>
        {isMe ? null : <img src={message.sender?.photoURL} alt="" />}

        <div>
          {isMe ? null : (
            <header>
              <span>{message.sender?.displayName}</span>
            </header>
          )}

          <main>{message.message}</main>

          <footer>
            <span>{diffDate}</span>
            <Viewed
              isViewed={
                message.viewed !== undefined
                  ? !(Object.keys(message.viewed).length === 0)
                  : false
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="48"
                viewBox="0 96 960 960"
                width="48"
              >
                <path d="M294 814 70 590l43-43 181 181 43 43-43 43Zm170 0L240 590l43-43 181 181 384-384 43 43-427 427Zm0-170-43-43 257-257 43 43-257 257Z" />
              </svg>
            </Viewed>
          </footer>
        </div>
      </MessageContainer>
    </RowContainer>
  )
}

export const Message = memo(MessageComponent)
