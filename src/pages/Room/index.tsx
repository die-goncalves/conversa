import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react'
import { useLoaderData, useNavigate } from 'react-router-dom'
import {
  child,
  get,
  onChildAdded,
  onChildChanged,
  onValue,
  orderByKey,
  query,
  ref,
  startAt,
  startAfter,
  limitToLast,
  endAt,
  type Unsubscribe,
  type DataSnapshot,
  endBefore
} from 'firebase/database'
import scrollIntoView from 'scroll-into-view'
import { AuthContext } from '../../contexts/AuthContext'
import { database } from '../../services/firebaseConfig'
import { Progress } from '../../components/Progress'
import { Message } from '../../components/Message'
import { MessageInput } from '../../components/MessageInput'
import {
  RoomContainer,
  MessagesBox,
  ContentContainer,
  FABScrollToEndOfMessages,
  FABGetOldMessages
} from './styles'

interface IMessage {
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
  viewed: Record<string, boolean>
  timestamp: number
}

export function Room(): JSX.Element | null {
  const navigate = useNavigate()
  const { roomId } = useLoaderData() as { roomId: string }
  const { userState } = useContext(AuthContext)
  const [isInTheRoom, setIsInTheRoom] = useState<{
    'join-date': number
  } | null>(null)
  const [messages, setMessages] = useState<IMessage[]>([])
  const [lastMessageId, setLastMessageId] = useState<{
    loading: boolean
    id: string | null
  }>({
    loading: true,
    id: null
  })
  const [lastViewedMessage, setLastViewedMessage] = useState<string | null>()
  const [haveMoreOldMessages, setHaveMoreOldMessages] = useState({
    loading: false,
    have: false
  })

  async function getMoreOldMessages(): Promise<void> {
    setHaveMoreOldMessages(prev => ({ ...prev, loading: true }))
    try {
      const snapshot = await get(
        query(
          ref(database, `messages/${roomId}`),
          orderByKey(),
          endBefore(messages[0].id),
          limitToLast(11)
        )
      )
      const snapshotTyped = snapshot.val() as Record<
        string,
        {
          message: string
          sender?: Record<string, boolean>
          viewed: Record<string, boolean>
          timestamp: number
          type?: 'enter' | 'out' | 'info'
        }
      > | null
      if (snapshotTyped !== null) {
        const snapshotMatrix = Object.entries(snapshotTyped)

        let newSnapshotMatrix: Array<
          [
            string,
            {
              message: string
              sender?: Record<string, boolean> | undefined
              viewed: Record<string, boolean>
              timestamp: number
              type?: 'enter' | 'out' | 'info'
            }
          ]
        >
        if (snapshotMatrix.length === 11) {
          setHaveMoreOldMessages(prev => ({ ...prev, have: true }))
          const removeLastMessage = <T,>([, ...vector]: T[]): T[] => vector
          newSnapshotMatrix = removeLastMessage(snapshotMatrix)
        } else {
          setHaveMoreOldMessages(prev => ({ ...prev, have: false }))
          newSnapshotMatrix = snapshotMatrix
        }

        let newMessages: IMessage[] = []
        for (const msg of newSnapshotMatrix) {
          if (msg[1].sender === undefined) {
            newMessages = [
              ...newMessages,
              {
                id: msg[0],
                message: msg[1].message,
                viewed: msg[1].viewed,
                timestamp: msg[1].timestamp,
                type: msg[1].type
              }
            ]
          } else {
            const snapshotUser = await get(
              child(ref(database, 'users'), Object.keys(msg[1].sender)[0])
            )
            if (snapshotUser.exists()) {
              newMessages = [
                ...newMessages,
                {
                  id: msg[0],
                  message: msg[1].message,
                  sender: {
                    ...snapshotUser.val(),
                    id: snapshotUser.key
                  },
                  viewed: msg[1].viewed,
                  timestamp: msg[1].timestamp
                }
              ]
            }
          }
        }
        setMessages(prev => [...newMessages, ...prev])
      } else {
        setHaveMoreOldMessages(prev => ({ ...prev, have: false }))
      }
    } catch (error) {
      console.error(error)
    } finally {
      setHaveMoreOldMessages(prev => ({ ...prev, loading: false }))
    }
  }

  const hasUnreadMessages = useMemo(() => {
    if (userState.user != null && messages.length > 1) {
      if (messages[messages.length - 1].sender === undefined) return false
      if (messages[messages.length - 1].sender?.id === userState.user.uid)
        return false
      if (messages[messages.length - 1].viewed !== undefined) {
        if (
          messages[messages.length - 1].viewed[userState.user.uid] !== undefined
        )
          return false
      }
      return true
    } else {
      return null
    }
  }, [messages, userState.user])

  const endOfMessages = useCallback(() => {
    const id = messages[messages.length - 1].id
    if (id != null) {
      const el = document.getElementById(id) as HTMLLIElement | null
      if (el != null) {
        scrollIntoView(el, { align: { top: 1, topOffset: -104 } }) // 104 = 88[altura input] + 16[gap entre mensagens]
      }
    }
  }, [messages])

  // VERIFICA SE USUÁRIO ESTÁ NA SALA
  useEffect(() => {
    if (userState.user === null) return

    const unsubscribe = onValue(
      ref(database, `rooms/${roomId}/users/${userState.user.uid}/join-date`),
      async snapshot => {
        if (!snapshot.exists()) {
          setIsInTheRoom(null)
          navigate('/dashboard')
        } else {
          setIsInTheRoom({
            'join-date': snapshot.val()
          })
        }
      }
    )

    return () => {
      unsubscribe()
    }
  }, [userState.user, roomId])

  // VERIFICA ÚLTIMA MENSAGEM VISTA
  useEffect(() => {
    if (userState.user === null || isInTheRoom == null) return

    const unsubscribe = onValue(
      ref(
        database,
        `rooms/${roomId}/users/${userState.user.uid}/last-viewed-message`
      ),
      async snapshotLastViewedMessage => {
        if (snapshotLastViewedMessage.exists()) {
          setLastViewedMessage(snapshotLastViewedMessage.val())
        }
      },
      { onlyOnce: true }
    )

    return () => {
      unsubscribe()
    }
  }, [isInTheRoom, userState.user, roomId])

  // PRIMEIRO CARREGAMENTO DE MENSAGENS
  useEffect(() => {
    if (isInTheRoom == null || lastViewedMessage === undefined) return

    async function getMessages(): Promise<void> {
      if (lastViewedMessage !== undefined) {
        const snapshotMessagesBefore = await get(
          query(
            ref(database, `messages/${roomId}`),
            endAt(lastViewedMessage),
            limitToLast(11)
          )
        )
        let messagesBefore
        const messageEntries = Object.entries({
          ...snapshotMessagesBefore.val()
        })
        if (messageEntries.length === 11) {
          setHaveMoreOldMessages(prev => ({ ...prev, have: true }))
          const [first, ...rest] = messageEntries
          messagesBefore = Object.fromEntries(rest)
        } else {
          messagesBefore = snapshotMessagesBefore.val()
        }

        const snapshotMessagesAfter = await get(
          query(
            ref(database, `messages/${roomId}`),
            startAfter(lastViewedMessage)
          )
        )
        const snapshotMessages: Record<
          string,
          {
            message: string
            sender?: Record<string, boolean>
            viewed: Record<string, boolean>
            timestamp: number
            type?: 'enter' | 'out' | 'info'
          }
        > = {
          ...messagesBefore,
          ...snapshotMessagesAfter.val()
        }

        if (Object.keys(snapshotMessages).length > 0) {
          let newMessages: IMessage[] = []
          for (const msg of Object.entries(snapshotMessages)) {
            if (msg[1].sender === undefined) {
              newMessages = [
                ...newMessages,
                {
                  id: msg[0],
                  message: msg[1].message,
                  viewed: msg[1].viewed,
                  timestamp: msg[1].timestamp,
                  type: msg[1].type
                }
              ]
            } else {
              const snapshotUser = await get(
                child(ref(database, 'users'), Object.keys(msg[1].sender)[0])
              )
              if (snapshotUser.exists()) {
                newMessages = [
                  ...newMessages,
                  {
                    id: msg[0],
                    message: msg[1].message,
                    sender: {
                      ...snapshotUser.val(),
                      id: snapshotUser.key
                    },
                    viewed: msg[1].viewed,
                    timestamp: msg[1].timestamp
                  }
                ]
              }
            }
          }

          setMessages(newMessages)
          setLastMessageId({
            loading: false,
            id: newMessages[newMessages.length - 1].id
          })
        } else {
          setLastMessageId({
            loading: false,
            id: null
          })
        }
      }
    }

    void getMessages()
  }, [roomId, isInTheRoom, lastViewedMessage])

  // MONITORANDO ADIÇÃO DE MENSAGENS
  const unsubscribeRefOnChildAdded = useRef<{
    unsubscribe: Unsubscribe | null
  }>({
    unsubscribe: null
  })
  useEffect(() => {
    if (unsubscribeRefOnChildAdded.current.unsubscribe != null)
      unsubscribeRefOnChildAdded.current.unsubscribe()
    if (isInTheRoom == null || lastMessageId.loading) return

    async function dataSnapshot(snapshotMessage: DataSnapshot): Promise<void> {
      if (snapshotMessage.exists()) {
        if (snapshotMessage.val().sender === undefined) {
          const newMessage = {
            id: snapshotMessage.key,
            message: snapshotMessage.val().message,
            viewed: snapshotMessage.val().viewed,
            timestamp: snapshotMessage.val().timestamp,
            type: snapshotMessage.val().type
          }
          setMessages(prev => {
            if (prev.length === 0) return [...prev, newMessage]
            if (prev[prev.length - 1].id !== newMessage.id) {
              return [...prev, newMessage]
            } else {
              return prev
            }
          })
        } else {
          const snapshotUser = await get(
            child(
              ref(database, 'users'),
              Object.keys(snapshotMessage.val().sender)[0]
            )
          )
          if (snapshotUser.exists()) {
            const newMessage = {
              id: snapshotMessage.key,
              message: snapshotMessage.val().message,
              sender: {
                ...snapshotUser.val(),
                id: snapshotUser.key
              },
              viewed: snapshotMessage.val().viewed,
              timestamp: snapshotMessage.val().timestamp
            }

            setMessages(prev => {
              if (prev.length === 0) return [...prev, newMessage]
              if (prev[prev.length - 1].id !== newMessage.id) {
                return [...prev, newMessage]
              } else {
                return prev
              }
            })
          }
        }
      }
    }

    if (lastMessageId.id != null) {
      unsubscribeRefOnChildAdded.current.unsubscribe = onChildAdded(
        query(
          ref(database, `messages/${roomId}`),
          startAt(lastMessageId.id),
          orderByKey()
        ),
        dataSnapshot
      )
    } else {
      unsubscribeRefOnChildAdded.current.unsubscribe = onChildAdded(
        ref(database, `messages/${roomId}`),
        dataSnapshot
      )
    }

    return () => {
      if (unsubscribeRefOnChildAdded.current.unsubscribe != null)
        unsubscribeRefOnChildAdded.current.unsubscribe()
    }
  }, [isInTheRoom, lastMessageId])

  // MONITORAR SE MENSAGEM FOI VISUALIZADA
  useEffect(() => {
    if (userState.user === null) return

    const unsubscribe = onChildChanged(
      ref(database, `messages/${roomId}`),
      snapshot => {
        setMessages(prev => {
          return prev.map(m => {
            if (m.id === snapshot.key) {
              if (snapshot.key != null && userState.user !== null)
                return {
                  ...m,
                  viewed: { ...m.viewed, [userState.user?.uid]: true }
                }
            }
            return m
          })
        })
      }
    )

    return () => {
      unsubscribe()
    }
  }, [roomId, userState.user])

  // SCROLLBAR: IR ATÈ A ÚLTIMA MENSAGEM VISUALIZADA
  useEffect(() => {
    if (lastMessageId.loading || lastViewedMessage == null) return
    const el = document.getElementById(
      lastViewedMessage
    ) as HTMLLIElement | null
    if (el != null) {
      scrollIntoView(el, { align: { top: 1, topOffset: -104 } }) // 104 = 88[altura input] + 16[gap entre mensagens]
    }
  }, [lastMessageId.loading, lastViewedMessage])

  // LIMPAR ESTADOS AO DESMONTAR COMPONENTE
  useEffect(() => {
    return () => {
      setIsInTheRoom(null)
      setLastViewedMessage(undefined)
      setMessages([])
      setLastMessageId({ loading: true, id: '' })
      setHaveMoreOldMessages({
        loading: false,
        have: false
      })
    }
  }, [roomId])

  if (isInTheRoom == null) return null

  return (
    <RoomContainer>
      <ContentContainer id="content-container">
        {(lastMessageId.loading || haveMoreOldMessages.loading) && <Progress />}
        <MessagesBox>
          {messages.map(message => (
            <Message
              key={message.id}
              roomId={roomId}
              message={message}
              sender={userState.user?.uid ?? ''}
            />
          ))}
        </MessagesBox>

        {(hasUnreadMessages ?? false) && (
          <FABScrollToEndOfMessages onClick={endOfMessages}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="48"
              viewBox="0 96 960 960"
              width="48"
            >
              <path d="M480 856 240 616l42-42 198 198 198-198 42 42-240 240Zm0-253L240 363l42-42 198 198 198-198 42 42-240 240Z" />
            </svg>
          </FABScrollToEndOfMessages>
        )}

        {!lastMessageId.loading && haveMoreOldMessages.have && (
          <FABGetOldMessages
            disabled={haveMoreOldMessages.loading}
            onClick={getMoreOldMessages}
          >
            Carregar mais mensagens
          </FABGetOldMessages>
        )}

        <MessageInput
          roomId={roomId}
          userId={userState.user != null ? userState.user.uid : ''}
        />
      </ContentContainer>
    </RoomContainer>
  )
}
