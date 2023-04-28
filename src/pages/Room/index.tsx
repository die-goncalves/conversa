import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef
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
import { SidebarMenu } from '../../components/SidebarMenu'
import {
  RoomContainer,
  MessagesBox,
  ContentContainer,
  FABScrollToEndOfMessages,
  FABGetOldMessages,
  StyledHeader
} from './styles'
import { useMediaQuery } from 'react-responsive'

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

interface IState {
  roomId: string | null
  isInTheRoom: {
    'join-date': number
  } | null
  messages: IMessage[]
  lastMessageId: {
    loading: boolean
    id: string | null
  }
  lastViewedMessage: string | null | undefined
  haveMoreOldMessages: {
    loading: false
    have: false
  }
  isBlocked: boolean | undefined
  firstMessageId: string
}
enum Actions {
  'set-room-id',
  'set-is-in-the-room',
  'set-raw-messages',
  'set-old-messages',
  'update-viewed-messages',
  'add-messages',
  'set-last-message-id',
  'set-last-viewed-message',
  'set-have-more-old-messages',
  'set-is-blocked',
  'set-first-message'
}
interface IActions {
  type: keyof typeof Actions
  payload?: any
}

export function Room(): JSX.Element | null {
  const isLargerThan768 = useMediaQuery({
    query: '(min-width: 768px)'
  })
  const navigate = useNavigate()
  const { roomId } = useLoaderData() as { roomId: string }
  const { userState } = useContext(AuthContext)
  const [state, dispatch] = useReducer(
    function reducer(state: IState, actions: IActions): IState {
      switch (actions.type) {
        case 'set-room-id':
          return {
            ...state,
            roomId: actions.payload,
            isInTheRoom: null,
            messages: [],
            lastMessageId: {
              loading: true,
              id: null
            },
            lastViewedMessage: undefined,
            haveMoreOldMessages: {
              loading: false,
              have: false
            },
            isBlocked: undefined,
            firstMessageId: ''
          }
        case 'set-old-messages':
          return { ...state, messages: [...actions.payload, ...state.messages] }
        case 'set-raw-messages':
          return { ...state, messages: actions.payload }
        case 'set-is-in-the-room':
          return { ...state, isInTheRoom: actions.payload }
        case 'set-is-blocked':
          return { ...state, isBlocked: actions.payload }
        case 'set-have-more-old-messages':
          return {
            ...state,
            haveMoreOldMessages: {
              ...state.haveMoreOldMessages,
              ...actions.payload
            }
          }
        case 'set-last-viewed-message':
          return {
            ...state,
            lastViewedMessage: actions.payload
          }
        case 'set-last-message-id':
          return {
            ...state,
            lastMessageId: {
              ...state.lastMessageId,
              ...actions.payload
            }
          }
        case 'update-viewed-messages': {
          const updatedMessages = state.messages.map(m => {
            if (m.id === actions.payload.snapshotKey) {
              return {
                ...m,
                viewed: { ...m.viewed, [actions.payload.userId]: true }
              }
            }
            return m
          })
          return { ...state, messages: updatedMessages }
        }
        case 'add-messages': {
          if (state.messages.length === 0)
            return { ...state, messages: [...state.messages, actions.payload] }

          if (
            state.messages[state.messages.length - 1].id !== actions.payload.id
          )
            return { ...state, messages: [...state.messages, actions.payload] }

          return state
        }
        default:
          throw new Error('Ação desconhecida')
      }
    },
    {
      roomId: null,
      isInTheRoom: null,
      messages: [],
      lastMessageId: {
        loading: true,
        id: null
      },
      lastViewedMessage: null,
      haveMoreOldMessages: {
        loading: false,
        have: false
      },
      isBlocked: undefined,
      firstMessageId: ''
    }
  )

  const getMoreOldMessages = useCallback(async () => {
    dispatch({ type: 'set-have-more-old-messages', payload: { loading: true } })
    if (state.roomId !== null && userState.user !== null) {
      try {
        const firstMessage = (
          await get(
            ref(
              database,
              `rooms/${state.roomId}/users/${userState.user.uid}/first-message`
            )
          )
        ).val() as string

        const snapshot = await get(
          query(
            ref(database, `messages/${state.roomId}`),
            orderByKey(),
            startAt(firstMessage),
            endBefore(state.messages[0].id),
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
            dispatch({
              type: 'set-have-more-old-messages',
              payload: { have: true }
            })
            const removeLastMessage = <T,>([, ...vector]: T[]): T[] => vector
            newSnapshotMatrix = removeLastMessage(snapshotMatrix)
          } else {
            dispatch({
              type: 'set-have-more-old-messages',
              payload: { have: false }
            })
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
          dispatch({ type: 'set-old-messages', payload: newMessages })
        } else {
          dispatch({
            type: 'set-have-more-old-messages',
            payload: { have: false }
          })
        }
      } catch (error) {
        console.error(error)
      } finally {
        dispatch({
          type: 'set-have-more-old-messages',
          payload: { loading: false }
        })
      }
    }
  }, [state.roomId, state.messages, userState.user])

  const hasUnreadMessages = useMemo(() => {
    if (userState.user != null && state.messages.length > 1) {
      if (state.messages[state.messages.length - 1].sender === undefined)
        return false
      if (
        state.messages[state.messages.length - 1].sender?.id ===
        userState.user.uid
      )
        return false
      if (state.messages[state.messages.length - 1].viewed !== undefined) {
        if (
          state.messages[state.messages.length - 1].viewed[
            userState.user.uid
          ] !== undefined
        )
          return false
      }
      return true
    } else {
      return null
    }
  }, [state.messages, userState.user])

  const endOfMessages = useCallback(() => {
    const id = state.messages[state.messages.length - 1].id
    if (id != null) {
      const el = document.getElementById(id) as HTMLLIElement | null
      if (el != null) {
        scrollIntoView(el, { align: { top: 1, topOffset: -104 } }) // 104 = 88[altura input] + 16[gap entre mensagens]
      }
    }
  }, [state.messages])

  // VERIFICA TROCA DE SALA
  useEffect(() => {
    dispatch({ type: 'set-room-id', payload: roomId })
  }, [roomId])

  // VERIFICA SE USUÁRIO ESTÁ NA SALA
  const unsubscribeIsInTheRoom = useRef<{
    unsubscribe: Unsubscribe | null
  }>({
    unsubscribe: null
  })
  useEffect(() => {
    if (unsubscribeIsInTheRoom.current.unsubscribe != null)
      unsubscribeIsInTheRoom.current.unsubscribe()

    if (userState.user === null || state.roomId === null) return

    try {
      unsubscribeIsInTheRoom.current.unsubscribe = onValue(
        ref(
          database,
          `rooms/${state.roomId}/users/${userState.user.uid}/join-date`
        ),
        async snapshot => {
          if (!snapshot.exists()) {
            dispatch({ type: 'set-is-in-the-room', payload: null })
            navigate('/dashboard')
          } else {
            dispatch({
              type: 'set-is-in-the-room',
              payload: {
                'join-date': snapshot.val()
              }
            })
          }
        }
      )
    } catch (error) {
      console.error(error)
    }

    return () => {
      if (unsubscribeIsInTheRoom.current.unsubscribe != null)
        unsubscribeIsInTheRoom.current.unsubscribe()
    }
  }, [userState.user, state.roomId])

  // VERIFICA SE USUÁRIO ESTÁ BLOQUEADO
  const unsubscribeIsBlocked = useRef<{
    unsubscribe: Unsubscribe | null
  }>({
    unsubscribe: null
  })
  useEffect(() => {
    if (unsubscribeIsBlocked.current.unsubscribe != null)
      unsubscribeIsBlocked.current.unsubscribe()
    if (userState.user === null || state.roomId === null) return

    try {
      unsubscribeIsBlocked.current.unsubscribe = onValue(
        ref(database, `rooms/${state.roomId}/blocked/${userState.user.uid}`),
        snapshot => {
          if (snapshot.exists()) {
            dispatch({ type: 'set-is-blocked', payload: true })
          } else {
            dispatch({ type: 'set-is-blocked', payload: false })
          }
        }
      )
    } catch (error) {
      console.error(error)
    }

    return () => {
      if (unsubscribeIsBlocked.current.unsubscribe != null)
        unsubscribeIsBlocked.current.unsubscribe()
    }
  }, [userState.user, state.roomId])

  // VERIFICA ÚLTIMA MENSAGEM VISTA
  useEffect(() => {
    if (
      userState.user === null ||
      state.isInTheRoom === null ||
      state.roomId === null
    )
      return

    async function getLastViewedMessage(): Promise<void> {
      if (userState.user !== null && state.roomId !== null) {
        const snapshotLastViewedMessage = await get(
          ref(
            database,
            `rooms/${state.roomId}/users/${userState.user.uid}/last-viewed-message`
          )
        )
        if (snapshotLastViewedMessage.exists()) {
          dispatch({
            type: 'set-last-viewed-message',
            payload: snapshotLastViewedMessage.val()
          })
        } else {
          dispatch({
            type: 'set-last-viewed-message',
            payload: null
          })
        }
      }
    }

    try {
      void getLastViewedMessage()
    } catch (error) {
      console.error(error)
    }
  }, [state.roomId, state.isInTheRoom, userState.user])

  // PRIMEIRO CARREGAMENTO DE MENSAGENS
  useEffect(() => {
    if (
      userState.user === null ||
      state.roomId === null ||
      state.isInTheRoom === null ||
      state.lastViewedMessage === undefined ||
      state.isBlocked === undefined
    )
      return

    async function getMessages(): Promise<void> {
      if (
        state.roomId !== null &&
        userState.user !== null &&
        state.lastViewedMessage !== undefined
      ) {
        const firstMessage = (
          await get(
            ref(
              database,
              `rooms/${state.roomId}/users/${userState.user.uid}/first-message`
            )
          )
        ).val() as string

        let snapshotMessagesBefore
        if (state.lastViewedMessage === null) {
          const snapshot = await get(
            ref(database, `messages/${state.roomId}/${firstMessage}`)
          )
          if (snapshot.key != null)
            snapshotMessagesBefore = { [snapshot.key]: snapshot.val() }
        } else {
          snapshotMessagesBefore = (
            await get(
              query(
                ref(database, `messages/${state.roomId}`),
                startAt(firstMessage),
                endAt(state.lastViewedMessage),
                orderByKey(),
                limitToLast(11)
              )
            )
          ).val()
        }

        const messageEntries = Object.entries({
          ...snapshotMessagesBefore
        })

        let messagesBefore
        if (messageEntries.length === 11) {
          dispatch({
            type: 'set-have-more-old-messages',
            payload: { have: true }
          })
          const [first, ...rest] = messageEntries
          messagesBefore = Object.fromEntries(rest)
        } else {
          messagesBefore = snapshotMessagesBefore
        }

        let messagesAfter
        if (state.isBlocked !== undefined && state.isBlocked) {
          messagesAfter = null
        } else {
          const snapshotMessagesAfter = await get(
            query(
              ref(database, `messages/${state.roomId}`),
              startAfter(state.lastViewedMessage)
            )
          )
          messagesAfter = snapshotMessagesAfter.val()
        }

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
          ...messagesAfter
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

          dispatch({ type: 'set-raw-messages', payload: newMessages })
          dispatch({
            type: 'set-last-message-id',
            payload: {
              loading: false,
              id: newMessages[newMessages.length - 1].id
            }
          })
        } else {
          dispatch({
            type: 'set-last-message-id',
            payload: {
              loading: false,
              id: null
            }
          })
        }
      }
    }

    void getMessages()
  }, [
    state.roomId,
    state.isInTheRoom,
    state.lastViewedMessage,
    state.isBlocked,
    userState.user
  ])

  // MONITORANDO ADIÇÃO DE MENSAGENS
  const unsubscribeRefOnChildAdded = useRef<{
    unsubscribe: Unsubscribe | null
  }>({
    unsubscribe: null
  })
  useEffect(() => {
    if (unsubscribeRefOnChildAdded.current.unsubscribe != null)
      unsubscribeRefOnChildAdded.current.unsubscribe()

    if (
      state.roomId === null ||
      state.isInTheRoom === null ||
      state.lastMessageId.loading ||
      (state.isBlocked ?? true)
    )
      return

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
          dispatch({ type: 'add-messages', payload: newMessage })
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

            dispatch({ type: 'add-messages', payload: newMessage })
          }
        }
      }
    }

    if (state.lastMessageId.id != null) {
      unsubscribeRefOnChildAdded.current.unsubscribe = onChildAdded(
        query(
          ref(database, `messages/${state.roomId}`),
          startAt(state.lastMessageId.id),
          orderByKey()
        ),
        dataSnapshot
      )
    } else {
      unsubscribeRefOnChildAdded.current.unsubscribe = onChildAdded(
        ref(database, `messages/${state.roomId}`),
        dataSnapshot
      )
    }

    return () => {
      if (unsubscribeRefOnChildAdded.current.unsubscribe != null)
        unsubscribeRefOnChildAdded.current.unsubscribe()
    }
  }, [state.roomId, state.isInTheRoom, state.lastMessageId, state.isBlocked])

  // MONITORAR SE MENSAGEM FOI VISUALIZADA
  const unsubscribeUpdateViewedMessages = useRef<{
    unsubscribe: Unsubscribe | null
  }>({
    unsubscribe: null
  })
  useEffect(() => {
    if (unsubscribeUpdateViewedMessages.current.unsubscribe != null)
      unsubscribeUpdateViewedMessages.current.unsubscribe()

    if (userState.user === null || state.roomId === null) return

    try {
      unsubscribeUpdateViewedMessages.current.unsubscribe = onChildChanged(
        ref(database, `messages/${state.roomId}`),
        snapshot => {
          dispatch({
            type: 'update-viewed-messages',
            payload: {
              userId: userState.user?.uid,
              snapshotKey: snapshot.key
            }
          })
        }
      )
    } catch (error) {
      console.error(error)
    }

    return () => {
      if (unsubscribeUpdateViewedMessages.current.unsubscribe != null)
        unsubscribeUpdateViewedMessages.current.unsubscribe()
    }
  }, [state.roomId, userState.user])

  // SCROLLBAR: IR ATÈ A ÚLTIMA MENSAGEM VISUALIZADA
  useEffect(() => {
    if (state.lastMessageId.loading || state.lastViewedMessage == null) return

    const el = document.getElementById(
      state.lastViewedMessage
    ) as HTMLLIElement | null
    if (el != null) {
      scrollIntoView(el, { align: { top: 1, topOffset: -104 } }) // 104 = 88[altura input] + 16[gap entre mensagens]
    }
  }, [state.lastMessageId.loading, state.lastViewedMessage])

  if (state.isInTheRoom == null) return null

  console.log(isLargerThan768)
  return (
    <RoomContainer>
      {(state.lastMessageId.loading || state.haveMoreOldMessages.loading) &&
        !isLargerThan768 && <Progress />}

      {isLargerThan768 ? (
        <SidebarMenu />
      ) : (
        <StyledHeader>
          <SidebarMenu />

          {!state.lastMessageId.loading && state.haveMoreOldMessages.have && (
            <FABGetOldMessages
              disabled={state.haveMoreOldMessages.loading}
              onClick={getMoreOldMessages}
            >
              Carregar mais mensagens
            </FABGetOldMessages>
          )}
        </StyledHeader>
      )}

      <ContentContainer id="content-container">
        {(state.lastMessageId.loading || state.haveMoreOldMessages.loading) &&
          isLargerThan768 && <Progress />}

        <MessagesBox>
          {state.messages.map(message => (
            <Message
              key={message.id}
              roomId={state.roomId}
              message={message}
              sender={userState.user?.uid ?? ''}
            />
          ))}
        </MessagesBox>

        {!state.lastMessageId.loading &&
          state.haveMoreOldMessages.have &&
          isLargerThan768 && (
            <FABGetOldMessages
              disabled={state.haveMoreOldMessages.loading}
              onClick={getMoreOldMessages}
            >
              Carregar mais mensagens
            </FABGetOldMessages>
          )}

        {(hasUnreadMessages ?? false) && state.isBlocked === false && (
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

        <MessageInput
          roomId={state.roomId}
          userId={userState.user?.uid ?? ''}
          disable={state.isBlocked}
        />
      </ContentContainer>
    </RoomContainer>
  )
}
