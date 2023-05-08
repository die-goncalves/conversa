import { memo, useEffect, useRef, useState } from 'react'
import { timeAgo } from '../../utils/formatDate'
import { get, ref, set } from 'firebase/database'
import { database } from '../../services/firebaseConfig'
import { ADMMessage, MessageLine, Viewed } from './styles'

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
    type?: 'enter' | 'exit' | 'info'
    timestamp: number
  }
  sender: string
  roomId: string | null
}

export function MessageComponent({
  message,
  sender,
  roomId
}: IMessageProps): JSX.Element | null {
  const diffDate = timeAgo(Date.now(), message.timestamp)
  const [isMe, setIsMe] = useState(() => sender === message.sender?.id)
  const [iHaveSeen, setIHaveSeen] = useState(() =>
    Object.keys(message.viewed ?? {}).includes(sender)
  )
  const [isVisible, setIsVisible] = useState<boolean>()

  const observer = useRef<IntersectionObserver>()
  useEffect(() => {
    if (observer.current != null) {
      observer.current.disconnect()
    }

    if (message.id === null) return

    async function callbackFunction(
      entry: IntersectionObserverEntry[]
    ): Promise<void> {
      if (entry[0].isIntersecting) {
        setIsVisible(true)
        observer.current?.disconnect()
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
  }, [message.id])

  useEffect(() => {
    if (!(isVisible ?? false) || iHaveSeen || isMe) return

    async function storeLastViewedMessage(): Promise<void> {
      if (message.id !== null && roomId !== null)
        try {
          await set(
            ref(database, `messages/${roomId}/${message.id}/viewed/${sender}`),
            true
          )

          const snapshotLastViewedMessage = await get(
            ref(database, `rooms/${roomId}/users/${sender}/last-viewed-message`)
          )

          if (snapshotLastViewedMessage.exists()) {
            const timestampLastViewedMessage = (
              await get(
                ref(
                  database,
                  `messages/${roomId}/${
                    snapshotLastViewedMessage.val() as string
                  }/timestamp`
                )
              )
            ).val()

            const orderMessages = [
              timestampLastViewedMessage,
              message.timestamp
            ].sort((a, b) => a - b)
            if (orderMessages[0] === timestampLastViewedMessage) {
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

    void storeLastViewedMessage()
  }, [
    message.id,
    message.timestamp,
    roomId,
    sender,
    isVisible,
    iHaveSeen,
    isMe
  ])

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
    if (message.type === 'exit')
      return (
        <ADMMessage id={message.id ?? ''} type="exit">
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
    <MessageLine id={message.id ?? ''} isMe={isMe}>
      <div className="message-container">
        {isMe ? null : (
          <img
            className="message-avatar"
            src={message.sender?.photoURL}
            alt=""
          />
        )}

        <div className="message-balloon">
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
      </div>
    </MessageLine>
  )
}

export const Message = memo(MessageComponent)
