import { useContext, useEffect, useReducer, useState } from 'react'
import { useLoaderData, useNavigate } from 'react-router-dom'
import { get, onValue, ref, remove, set } from 'firebase/database'
import { AuthContext } from '../../contexts/AuthContext'
import { database } from '../../services/firebaseConfig'
import { ParticipantCard } from '../../components/ParticipantCard'
import { Progress } from '../../components/Progress'
import {
  ActionSection,
  ParticipantGallery,
  ParticipantSection,
  RoomDetailsContainer
} from './styles'

export function Details(): JSX.Element | null {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [inTheRoom, setInTheRoom] = useState(false)
  const { userState } = useContext(AuthContext)
  const { roomId } = useLoaderData() as {
    roomId: string
  }
  const [state, dispatch] = useReducer(
    function reducer(
      state: {
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
      },
      action: any
    ) {
      switch (action.type) {
        case 'adms': {
          return { ...state, adms: action.payload }
        }
        case 'users': {
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
        default:
          throw new Error('Ação desconhecida')
      }
    },
    {
      adms: {},
      users: {}
    }
  )

  useEffect(() => {
    if (userState.user === null) return

    const unsubscribe = onValue(
      ref(database, `rooms/${roomId}/users/${userState.user.uid}`),
      async snapshot => {
        if (!snapshot.exists()) {
          setInTheRoom(false)
          navigate('/dashboard')
        } else {
          setInTheRoom(true)
        }
      }
    )

    return () => {
      unsubscribe()
    }
  }, [userState.user, roomId])

  useEffect(() => {
    const unsubscribe = onValue(
      ref(database, `rooms/${roomId}/adms`),
      async snapshot => {
        if (snapshot.exists()) {
          dispatch({ type: 'adms', payload: snapshot.val() })
        }
      }
    )

    return () => {
      unsubscribe()
    }
  }, [roomId])

  useEffect(() => {
    const unsubscribe = onValue(
      ref(database, `rooms/${roomId}/users`),
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
          dispatch({ type: 'users', payload: users })
        }
      }
    )

    return () => {
      unsubscribe()
    }
  }, [roomId])

  const iOwnTheRoom =
    userState.user?.uid !== undefined &&
    Object.keys(state.adms).includes(userState.user.uid)
  const hasMoreThanOneAdm = Object.keys(state.adms).length > 1

  async function addParticipantAdm(participantId: string): Promise<void> {
    await set(ref(database, `rooms/${roomId}/adms/${participantId}`), true)
  }
  async function removeParticipantAdm(participantId: string): Promise<void> {
    await remove(ref(database, `rooms/${roomId}/adms/${participantId}`))
  }
  async function removeParticipant(participantId: string): Promise<void> {
    await remove(ref(database, `rooms/${roomId}/adms/${participantId}`))
    await remove(ref(database, `rooms/${roomId}/users/${participantId}`))

    await remove(ref(database, `users/${participantId}/rooms/${roomId}`))
  }
  async function removeUserFromRoom(id: string | undefined): Promise<void> {
    if (id !== undefined) {
      if (iOwnTheRoom) await remove(ref(database, `rooms/${roomId}/adms/${id}`))
      await remove(ref(database, `rooms/${roomId}/users/${id}`))

      await remove(ref(database, `users/${id}/rooms/${roomId}`))
      navigate('/dashboard')
    }
  }
  async function deleteRoom(roomId: string): Promise<void> {
    const roomParticipants = await get(ref(database, `rooms/${roomId}/users`))
    if (roomParticipants.exists()) {
      for (const participantId of Object.keys(roomParticipants.val())) {
        await remove(ref(database, `users/${participantId}/rooms/${roomId}`))
      }
    }
    await remove(ref(database, `rooms/${roomId}`))
    await remove(ref(database, `messages/${roomId}`))

    navigate('/dashboard')
  }
  async function removeUserAdm(userId: string | undefined): Promise<void> {
    if (userId !== undefined)
      await remove(ref(database, `rooms/${roomId}/adms/${userId}`))
  }

  if (!inTheRoom) return null

  return (
    <RoomDetailsContainer>
      {loading ? (
        <Progress />
      ) : (
        <>
          <ParticipantSection>
            <h2>{Object.entries(state.users).length} participantes</h2>

            <ParticipantGallery>
              {Object.entries(state.users).map(p => {
                return (
                  <ParticipantCard
                    key={p[0]}
                    userId={userState.user?.uid}
                    adms={state.adms}
                    participant={{ [p[0]]: p[1] }}
                    onRemoveParticipant={removeParticipant}
                    onAddParticipantAdm={addParticipantAdm}
                    onRemoveParticipantAdm={removeParticipantAdm}
                  />
                )
              })}
            </ParticipantGallery>
          </ParticipantSection>

          <ActionSection>
            <h2>Ações do usuário</h2>

            <div>
              {iOwnTheRoom && (
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
                  Excluir sala
                </button>
              )}

              <button
                onClick={async () => {
                  await removeUserFromRoom(userState.user?.uid)
                }}
                disabled={iOwnTheRoom && !hasMoreThanOneAdm}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="48"
                  viewBox="0 96 960 960"
                  width="48"
                >
                  <path d="M180 936q-24 0-42-18t-18-42V276q0-24 18-42t42-18h291v60H180v600h291v60H180Zm486-185-43-43 102-102H375v-60h348L621 444l43-43 176 176-174 174Z" />
                </svg>
                Sair da sala
              </button>
              {iOwnTheRoom && !hasMoreThanOneAdm && (
                <span role="alert">
                  Para sair indique um novo administrador para a sala.
                </span>
              )}

              {iOwnTheRoom && (
                <>
                  <button
                    onClick={async () => {
                      await removeUserAdm(userState.user?.uid)
                    }}
                    disabled={!hasMoreThanOneAdm}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="48"
                      viewBox="0 96 960 960"
                      width="48"
                    >
                      <path d="m743 761-45-46q20-35 31-89.5t11-93.5V336l-260-96-188 69-46-46 234-88 320 119v238q0 59.444-15 117.722Q770 708 743 761Zm67 238L670 861q-44 44-90 72t-100 42q-143-39-231.5-164.431Q160 685.137 160 532V349L55 244l43-43 755 755-43 43ZM426 616Zm73-101Zm-19 398q42.071-14.02 80.535-39.51Q599 848 628 818L220 409v123q0 130.103 73 236.552Q366 875 480 913Z" />
                    </svg>
                    Remover permissão de administrador
                  </button>

                  {!hasMoreThanOneAdm && (
                    <span role="alert">
                      Para remover sua permissão de administrador indique um
                      novo para a sala.
                    </span>
                  )}
                </>
              )}
            </div>
          </ActionSection>
        </>
      )}
    </RoomDetailsContainer>
  )
}
