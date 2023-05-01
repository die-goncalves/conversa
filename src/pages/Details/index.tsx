import { useCallback, useContext, useEffect, useReducer, useState } from 'react'
import { useLoaderData, useNavigate } from 'react-router-dom'
import {
  child,
  get,
  onValue,
  push,
  ref,
  remove,
  serverTimestamp,
  set
} from 'firebase/database'
import { toast } from 'react-toastify'
import { useMediaQuery } from 'react-responsive'
import { AuthContext } from '../../contexts/AuthContext'
import { database } from '../../services/firebaseConfig'
import { ParticipantCard } from '../../components/ParticipantCard'
import { Progress } from '../../components/Progress'
import { BlockedParticipantCard } from '../../components/BlockedParticipantCard'
import { SidebarMenu } from '../../components/SidebarMenu'
import { Popover } from '../../components/Popover'
import {
  ActionSection,
  BlockedParticipantGallery,
  BlockedSection,
  ParticipantGallery,
  ParticipantSection,
  RoomDetailsContainer,
  StyledHeader,
  RoomIdSection,
  StyledInputPassword
} from './styles'

interface IState {
  roomId: string | null
  room: {
    displayName: string
    image: string
    timestamp: number
    type: 'chat' | 'voice'
  } | null
  iAmAdm: boolean | null
  hasMoreThanOneAdm: boolean | null
  iAmInTheRoom: boolean | null
  adms: Record<
    string,
    {
      displayName: string
      email: string
      isAnonymous: boolean
      photoURL: string
    }
  >
  users: Record<
    string,
    {
      displayName: string
      email: string
      isAnonymous: boolean
      photoURL: string
    }
  >
  blocked: Record<string, boolean>
  showPassword: boolean
}
enum Actions {
  'set-room-id',
  'set-i-am-adm',
  'set-i-am-in-the-room',
  'set-adms',
  'set-users',
  'set-blocked',
  'has-more-than-one-adm',
  'set-show-password'
}
interface IActions {
  type: keyof typeof Actions
  payload?: any
}

export function Details(): JSX.Element | null {
  const isLargerThan768 = useMediaQuery({
    query: '(min-width: 768px)'
  })
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const { userState } = useContext(AuthContext)
  const [open, setOpen] = useState(false)
  const { roomId } = useLoaderData() as {
    roomId: string
  }
  const [detail, dispatch] = useReducer(
    function reducer(state: IState, action: IActions) {
      switch (action.type) {
        case 'set-room-id': {
          const typedPayload = action.payload as {
            id: string | null
            room: {
              displayName: string
              image: string
              timestamp: number
              type: 'chat' | 'voice'
            }
          }
          return {
            ...state,
            roomId: typedPayload.id,
            room: typedPayload.room,
            iAmAdm: null,
            hasMoreThanOneAdm: null,
            iAmInTheRoom: null,
            adms: {},
            users: {},
            blocked: {},
            showPassword: false
          }
        }
        case 'set-i-am-adm': {
          return {
            ...state,
            iAmAdm: Object.keys(state.adms).includes(action.payload)
          }
        }
        case 'has-more-than-one-adm': {
          return {
            ...state,
            hasMoreThanOneAdm: Object.keys(state.adms).length > 1
          }
        }
        case 'set-i-am-in-the-room': {
          return {
            ...state,
            iAmInTheRoom: action.payload
          }
        }
        case 'set-adms': {
          return {
            ...state,
            adms: action.payload as Record<
              string,
              {
                displayName: string
                email: string
                isAnonymous: boolean
                photoURL: string
              }
            >
          }
        }
        case 'set-users': {
          return {
            ...state,
            users: action.payload as Record<
              string,
              {
                displayName: string
                email: string
                isAnonymous: boolean
                photoURL: string
              }
            >
          }
        }
        case 'set-blocked': {
          return {
            ...state,
            blocked: action.payload as Record<string, boolean>
          }
        }
        case 'set-show-password':
          return {
            ...state,
            showPassword: !state.showPassword
          }
        default:
          throw new Error('Ação desconhecida')
      }
    },
    {
      roomId: null,
      room: null,
      iAmAdm: null,
      hasMoreThanOneAdm: null,
      iAmInTheRoom: null,
      adms: {},
      users: {},
      blocked: {},
      showPassword: false
    }
  )

  useEffect(() => {
    async function getRoomInfo(): Promise<void> {
      const room = (await get(ref(database, `rooms/${roomId}`))).val() as {
        displayName: string
        image: string
        timestamp: number
        type: 'chat' | 'voice'
      }

      dispatch({ type: 'set-room-id', payload: { id: roomId, room } })
    }
    void getRoomInfo()
  }, [roomId])

  useEffect(() => {
    if (detail.roomId != null)
      dispatch({ type: 'set-i-am-adm', payload: userState.user?.uid })
  }, [detail.roomId, detail.adms, userState.user])

  useEffect(() => {
    if (detail.roomId != null) dispatch({ type: 'has-more-than-one-adm' })
  }, [detail.roomId, detail.adms])

  const removeUserFromRoom = useCallback(
    async (id: string | undefined) => {
      try {
        if (id !== undefined && detail.roomId != null) {
          const userDisplayName = (
            await get(ref(database, `users/${id}/displayName`))
          ).val() as string

          await set(push(child(ref(database), `messages/${detail.roomId}`)), {
            message: `${userDisplayName} saiu da sala`,
            type: 'out',
            timestamp: serverTimestamp()
          })

          if (detail.iAmAdm ?? false)
            await remove(ref(database, `rooms/${detail.roomId}/adms/${id}`))
          await remove(ref(database, `rooms/${detail.roomId}/users/${id}`))
          await remove(ref(database, `users/${id}/rooms/${detail.roomId}`))

          toast.success('Você saiu da sala.')
          navigate('/dashboard')
        }
      } catch (error) {
        toast.error('Falha ao sair da sala.')
        console.error(error)
      }
    },
    [detail.roomId, detail.iAmAdm]
  )

  async function deleteRoom(roomId: string): Promise<void> {
    try {
      const roomDisplayName = (
        await get(ref(database, `rooms/${roomId}/displayName`))
      ).val() as string

      const roomParticipants = await get(ref(database, `rooms/${roomId}/users`))
      if (roomParticipants.exists()) {
        for (const participantId of Object.keys(roomParticipants.val())) {
          await remove(ref(database, `users/${participantId}/rooms/${roomId}`))
        }
      }
      await remove(ref(database, `messages/${roomId}`))
      await remove(ref(database, `rooms/${roomId}`))

      toast.success(`Sala ${roomDisplayName} excluída.`)
      navigate('/dashboard')
    } catch (error) {
      toast.error('Falha ao excluir sala.')
      console.error(error)
    }
  }

  const removeUserAdm = useCallback(
    async (userId: string | undefined) => {
      try {
        if (userId !== undefined && detail.roomId != null) {
          await remove(ref(database, `rooms/${detail.roomId}/adms/${userId}`))
          toast.success('Você não é mais administrador da sala.')
        }
      } catch (error) {
        toast.error('Falha ao remover permissão de administrador.')
        console.error(error)
      }
    },
    [detail.roomId]
  )

  const handleCopyId = useCallback(
    async (ev: React.MouseEvent<HTMLButtonElement>) => {
      try {
        ev.preventDefault()
        const inputElement = document.getElementById(
          'input-text-id'
        ) as HTMLInputElement

        inputElement.select()
        inputElement.setSelectionRange(0, 99999) // For mobile devices

        await navigator.clipboard.writeText(inputElement.value)
        setOpen(prev => !prev)
      } catch (error) {
        console.error(error)
      }
    },
    []
  )

  useEffect(() => {
    if (userState.user === null || detail.roomId === null) return

    const unsubscribe = onValue(
      ref(database, `rooms/${detail.roomId}/users/${userState.user.uid}`),
      async snapshot => {
        if (!snapshot.exists()) {
          dispatch({ type: 'set-i-am-in-the-room', payload: false })
          navigate('/dashboard')
        } else {
          dispatch({ type: 'set-i-am-in-the-room', payload: true })
        }
      }
    )

    return () => {
      unsubscribe()
    }
  }, [userState.user, detail.roomId])

  useEffect(() => {
    if (detail.roomId === null) return

    const unsubscribe = onValue(
      ref(database, `rooms/${detail.roomId}/adms`),
      async snapshot => {
        if (snapshot.exists()) {
          dispatch({ type: 'set-adms', payload: snapshot.val() })
        }
      }
    )

    return () => {
      unsubscribe()
    }
  }, [detail.roomId])

  useEffect(() => {
    if (detail.roomId === null) return

    const unsubscribe = onValue(
      ref(database, `rooms/${detail.roomId}/users`),
      async snapshot => {
        if (snapshot.exists()) {
          let users: Record<
            string,
            {
              displayName: string
              email: string
              isAnonymous: boolean
              photoURL: string
            }
          > = {}
          setLoading(true)
          for (const userId of Object.keys(snapshot.val())) {
            const snapshotUser = await get(ref(database, `users/${userId}`))
            if (snapshotUser.exists()) {
              if (snapshotUser.key != null)
                users = {
                  ...users,
                  ...{
                    [snapshotUser.key]: {
                      displayName: snapshotUser.val().displayName,
                      email: snapshotUser.val().email,
                      isAnonymous: snapshotUser.val().isAnonymous,
                      photoURL: snapshotUser.val().photoURL
                    }
                  }
                }
            }
          }
          setLoading(false)
          dispatch({ type: 'set-users', payload: users })
        }
      }
    )

    return () => {
      unsubscribe()
    }
  }, [detail.roomId])

  useEffect(() => {
    if (detail.roomId === null) return

    const unsubscribe = onValue(
      ref(database, `rooms/${detail.roomId}/blocked`),
      snapshot => {
        if (snapshot.exists()) {
          if (snapshot.key != null)
            dispatch({
              type: 'set-blocked',
              payload: snapshot.val()
            })
        } else {
          dispatch({
            type: 'set-blocked',
            payload: {}
          })
        }
      }
    )

    return () => {
      unsubscribe()
    }
  }, [detail.roomId])

  if (detail.iAmInTheRoom !== true) return null

  return (
    <RoomDetailsContainer>
      {loading && <Progress />}

      {isLargerThan768 ? (
        <SidebarMenu />
      ) : (
        <StyledHeader>
          <SidebarMenu />

          <span>{detail.room?.displayName}</span>
        </StyledHeader>
      )}

      <div>
        <RoomIdSection>
          <h2>Id da sala</h2>
          <span>Use para chamar participantes para sua sala</span>

          <div>
            <StyledInputPassword>
              <input
                id="input-text-id"
                readOnly
                type={detail.showPassword ? 'text' : 'password'}
                value={detail.roomId ?? ''}
              />
              <button
                onClick={() => {
                  dispatch({ type: 'set-show-password' })
                }}
              >
                {detail.showPassword ? 'Esconder' : 'Mostrar'}
              </button>
            </StyledInputPassword>

            <Popover.Root open={open} onOpenChange={setOpen}>
              <Popover.Trigger>
                <button onClick={handleCopyId}>Copiar Id</button>
              </Popover.Trigger>
              <Popover.Content>Copiado</Popover.Content>
            </Popover.Root>
          </div>
        </RoomIdSection>

        <ParticipantSection>
          <h2>{Object.entries(detail.users).length} participantes</h2>

          <ParticipantGallery>
            {Object.entries(detail.users).map(p => {
              return (
                <ParticipantCard
                  key={p[0]}
                  userId={userState.user?.uid}
                  roomId={roomId}
                  adms={detail.adms}
                  blocked={detail.blocked}
                  participant={{ [p[0]]: p[1] }}
                />
              )
            })}
          </ParticipantGallery>
        </ParticipantSection>

        <ActionSection>
          <h2>Ações do usuário</h2>

          <div>
            {(detail.iAmAdm ?? false) && (
              <button
                onClick={async () => {
                  await deleteRoom(roomId)
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="48"
                  viewBox="0 96 960 960"
                  width="48"
                >
                  <path d="m361 757 119-121 120 121 47-48-119-121 119-121-47-48-120 121-119-121-48 48 120 121-120 121 48 48ZM261 936q-24 0-42-18t-18-42V306h-41v-60h188v-30h264v30h188v60h-41v570q0 24-18 42t-42 18H261Zm438-630H261v570h438V306Zm-438 0v570-570Z" />
                </svg>
                <span>Excluir sala</span>
              </button>
            )}

            <button
              onClick={async () => {
                await removeUserFromRoom(userState.user?.uid)
              }}
              disabled={
                (detail.iAmAdm ?? false) && !(detail.hasMoreThanOneAdm ?? false)
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="48"
                viewBox="0 96 960 960"
                width="48"
              >
                <path d="M180 936q-24 0-42-18t-18-42V276q0-24 18-42t42-18h291v60H180v600h291v60H180Zm486-185-43-43 102-102H375v-60h348L621 444l43-43 176 176-174 174Z" />
              </svg>
              <span>Sair da sala</span>
            </button>
            {(detail.iAmAdm ?? false) &&
              !(detail.hasMoreThanOneAdm ?? false) && (
                <span role="alert">
                  Para sair indique um novo administrador para a sala.
                </span>
              )}

            {(detail.iAmAdm ?? false) && (
              <>
                <button
                  onClick={async () => {
                    await removeUserAdm(userState.user?.uid)
                  }}
                  disabled={!(detail.hasMoreThanOneAdm ?? false)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="48"
                    viewBox="0 96 960 960"
                    width="48"
                  >
                    <path d="m743 761-45-46q20-35 31-89.5t11-93.5V336l-260-96-188 69-46-46 234-88 320 119v238q0 59.444-15 117.722Q770 708 743 761Zm67 238L670 861q-44 44-90 72t-100 42q-143-39-231.5-164.431Q160 685.137 160 532V349L55 244l43-43 755 755-43 43ZM426 616Zm73-101Zm-19 398q42.071-14.02 80.535-39.51Q599 848 628 818L220 409v123q0 130.103 73 236.552Q366 875 480 913Z" />
                  </svg>
                  <span>Remover permissão de administrador</span>
                </button>

                {!(detail.hasMoreThanOneAdm ?? false) && (
                  <span role="alert">
                    Para remover sua permissão de administrador indique um novo
                    para a sala.
                  </span>
                )}
              </>
            )}
          </div>
        </ActionSection>

        {(detail.iAmAdm ?? false) &&
          Object.entries(detail.blocked).length > 0 && (
            <BlockedSection>
              <h2>Participantes bloqueados</h2>

              <BlockedParticipantGallery>
                {Object.entries(detail.blocked).map(el => {
                  return (
                    <BlockedParticipantCard
                      key={`blocked-${el[0]}`}
                      roomId={detail.roomId ?? ''}
                      participantId={el[0]}
                    />
                  )
                })}
              </BlockedParticipantGallery>
            </BlockedSection>
          )}
      </div>
    </RoomDetailsContainer>
  )
}
