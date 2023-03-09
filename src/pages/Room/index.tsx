import { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { useLoaderData } from 'react-router-dom'
import {
  child,
  endBefore,
  get,
  limitToLast,
  onChildAdded,
  orderByKey,
  query,
  ref,
  type Unsubscribe
} from 'firebase/database'
import { AuthContext } from '../../contexts/AuthContext'
import { database } from '../../services/firebaseConfig'
import { Progress } from '../../components/Progress'
import { Message } from '../../components/Message'
import { MessageInput } from '../../components/MessageInput'
import { RoomContainer, MessagesBox, ContentContainer } from './styles'

const MESSAGE_PER_PAGE = 11

interface IDatabaseMessage {
  message: string
  sender: Record<string, boolean>
  timestamp: number
}

interface IMessage {
  id: string | null
  message: string
  sender: {
    id: string | null
    displayName: string
    email: string
    isAnonymous: boolean
    photoURL: string
  }
  timestamp: number
}

export function Room(): JSX.Element {
  const { roomId } = useLoaderData() as { roomId: string }
  const { userState } = useContext(AuthContext)

  const [loading, setLoading] = useState(false)
  const [messages, setMessages] = useState<IMessage[]>([])
  const [hasNextPage, setHasNextPage] = useState<boolean>(true)
  const [isIntersection, setIsIntersection] = useState(false)
  const [finishFirstLoader, setFinishFirstLoader] = useState(false)

  const usersListRef = ref(database, 'users')
  const messagesListRef = ref(database, 'messages/' + roomId)
  const onChildAddedRef = useRef<{ unsubscribe: Unsubscribe | null }>({
    unsubscribe: null
  })

  useEffect(() => {
    setHasNextPage(true)
    setMessages([])
    setIsIntersection(false)
    setLoading(false)
    setFinishFirstLoader(false)
  }, [roomId])

  useEffect(() => {
    if (onChildAddedRef.current.unsubscribe != null) {
      onChildAddedRef.current.unsubscribe()
    }

    if (finishFirstLoader) {
      onChildAddedRef.current.unsubscribe = onChildAdded(
        query(messagesListRef, limitToLast(1)),
        snapMessages => {
          let newMessage: IMessage = {} as unknown as IMessage

          if (snapMessages.exists()) {
            get(child(usersListRef, Object.keys(snapMessages.val().sender)[0]))
              .then(snapUsers => {
                if (snapUsers.exists()) {
                  newMessage = {
                    id: snapMessages.key,
                    message: snapMessages.val().message,
                    sender: {
                      ...snapUsers.val(),
                      id: snapUsers.key
                    },
                    timestamp: snapMessages.val().timestamp
                  }
                  setMessages(prevState => {
                    if (
                      prevState.length > 0 &&
                      prevState[prevState.length - 1].id === newMessage.id
                    )
                      return prevState
                    return [...prevState, newMessage]
                  })
                } else {
                  console.log('Mensagem enviado por usuário desconhecido')
                }
              })
              .catch(error => {
                console.error(error)
              })
          }
        }
      )
    }

    return () => {
      if (onChildAddedRef.current.unsubscribe != null)
        onChildAddedRef.current.unsubscribe()
    }
  }, [roomId, finishFirstLoader])

  const scrollableRootRef = useRef<HTMLDivElement | null>(null)
  const lastScrollDistanceToBottomRef = useRef<number>()

  useEffect(() => {
    const scrollableRoot = scrollableRootRef.current
    const lastScrollDistanceToBottom =
      lastScrollDistanceToBottomRef.current ?? 0
    if (scrollableRoot != null) {
      scrollableRoot.scrollTop =
        scrollableRoot.scrollHeight - lastScrollDistanceToBottom
    }
  }, [messages])

  const rootRefSetter = useCallback((node: HTMLDivElement) => {
    scrollableRootRef.current = node
  }, [])

  const handleRootScroll = useCallback(() => {
    const rootNode = scrollableRootRef.current
    if (rootNode != null) {
      const scrollDistanceToBottom = rootNode.scrollHeight - rootNode.scrollTop
      lastScrollDistanceToBottomRef.current = scrollDistanceToBottom
    }
  }, [])

  const observer = useRef<IntersectionObserver>()
  useEffect(() => {
    const callbackFunction: IntersectionObserverCallback = entry => {
      if (entry[0].isIntersecting) {
        setIsIntersection(true)
      } else {
        setIsIntersection(false)
      }
    }

    if (observer.current != null) {
      observer.current.disconnect()
    }

    observer.current = new IntersectionObserver(callbackFunction, {
      root: null,
      rootMargin: '0px',
      threshold: 0.5
    })

    const entryElement = document.getElementById(`infinite-loader`)
    if (entryElement != null) observer.current?.observe(entryElement)

    return () => observer.current?.disconnect()
  }, [hasNextPage])

  async function getMoreTen(): Promise<void> {
    setLoading(true)
    const queries =
      messages.length > 0
        ? query(
            messagesListRef,
            orderByKey(),
            endBefore(messages[0].id),
            limitToLast(MESSAGE_PER_PAGE)
          )
        : query(messagesListRef, limitToLast(MESSAGE_PER_PAGE))

    try {
      const snapshot = await get(queries)
      const oldestMessagesDataSnapshot = snapshot.val() as Record<
        string,
        IDatabaseMessage
      > | null

      if (oldestMessagesDataSnapshot !== null) {
        const oldestMessagesMatrix = Object.entries(oldestMessagesDataSnapshot)

        let oldestMessagesTail: Array<[string, IDatabaseMessage]>
        if (oldestMessagesMatrix.length === MESSAGE_PER_PAGE) {
          setHasNextPage(true)
          const removeLastMessage = ([, ...vector]: Array<
            [string, IDatabaseMessage]
          >): Array<[string, IDatabaseMessage]> => vector
          oldestMessagesTail = removeLastMessage(oldestMessagesMatrix)
        } else {
          setHasNextPage(false)
          oldestMessagesTail = oldestMessagesMatrix
        }

        let oldMessagePackage: IMessage[] = []
        for (const oneMessage of oldestMessagesTail) {
          const snapUsers = await get(
            child(usersListRef, Object.keys(oneMessage[1].sender)[0])
          )

          if (snapUsers.exists()) {
            const newMessage = {
              id: oneMessage[0],
              message: oneMessage[1].message,
              sender: {
                ...snapUsers.val(),
                id: snapUsers.key
              },
              timestamp: oneMessage[1].timestamp
            }
            oldMessagePackage = [...oldMessagePackage, newMessage]
          } else {
            console.log('Mensagem enviado por usuário desconhecido')
          }
        }
        setMessages(prev => [...oldMessagePackage, ...prev])
      } else {
        setHasNextPage(false)
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
      setFinishFirstLoader(true)
    }
  }

  useEffect(() => {
    if (isIntersection) void getMoreTen()
  }, [isIntersection])

  return (
    <RoomContainer
      id="root-scroll"
      ref={rootRefSetter}
      onScroll={handleRootScroll}
    >
      <ContentContainer>
        <MessagesBox>
          {(hasNextPage || loading) && <Progress id={`infinite-loader`} />}
          {messages.map(message => (
            <Message
              key={message.id}
              message={message}
              sender={userState.user?.uid}
            />
          ))}
        </MessagesBox>

        <MessageInput
          roomId={roomId}
          userId={userState.user != null ? userState.user.uid : ''}
        />
      </ContentContainer>
    </RoomContainer>
  )
}
