import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState
} from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import {
  child,
  get,
  push,
  ref,
  set,
  serverTimestamp,
  onValue
} from 'firebase/database'
import { database } from '../services/firebaseConfig'
import { AuthContext } from './AuthContext'
import { convertCompressedFileToBase64 } from '../utils/toBase64'

interface IRoom {
  id: string | null
  type: 'chat' | 'voice' | 'video'
  displayName: string
  image: string
  timestamp: number
  adms: Record<string, boolean>
  users: Record<string, { 'join-date': number }>
}

interface INewRoom {
  type: 'chat' | 'voice' | 'video'
  displayName: string
  adm: string
  image: FileList
}

interface RoomContextData {
  writeNewRoom: ({ type, displayName, adm, image }: INewRoom) => Promise<void>
  writeNewMember: ({
    roomId,
    userId
  }: {
    roomId: string
    userId: string
  }) => Promise<void>
  writeNewMessage: ({
    roomId,
    userId,
    message
  }: {
    roomId: string
    userId: string
    message: string
  }) => Promise<void>
  rooms: IRoom[]
}
const RoomContext = createContext({} as unknown as RoomContextData)

interface RoomProviderProps {
  children: ReactNode
}
function RoomProvider({ children }: RoomProviderProps): JSX.Element {
  const { userState } = useContext(AuthContext)
  const navigate = useNavigate()
  const [rooms, setRooms] = useState<IRoom[]>([])

  const writeNewRoom = useCallback(
    async ({ type, displayName, adm, image }: INewRoom) => {
      try {
        const compressedBase64 = await convertCompressedFileToBase64(image[0])

        const roomListRef = child(ref(database), 'rooms')
        const newRoomRef = push(roomListRef)

        if (newRoomRef.key != null) {
          const timestamp = Date.now()
          await set(newRoomRef, {
            type,
            displayName,
            adms: {
              [adm]: true
            },
            image: compressedBase64,
            timestamp,
            users: {
              [adm]: {
                'join-date': timestamp
              }
            }
          })

          await set(ref(database, `users/${adm}/rooms/${newRoomRef.key}`), true)

          if (type !== 'video') {
            const user = (await get(ref(database, `users/${adm}`))).val() as {
              displayName: string
            }
            const messageListRef = child(
              ref(database),
              `messages/${newRoomRef.key}`
            )
            const newMessageRef = push(messageListRef)
            await set(newMessageRef, {
              message: `Bem vindo, ${user.displayName}`,
              type: 'enter',
              timestamp: serverTimestamp()
            })
            await set(
              ref(
                database,
                `rooms/${newRoomRef.key}/users/${adm}/first-message`
              ),
              newMessageRef.key
            )
            toast.success(`Sala ${displayName} criada!`)
            navigate(`/dashboard/room/${String(newRoomRef.key)}`)
          } else {
            toast.success(`Sala ${displayName} criada!`)
            navigate(`/dashboard/call/${String(newRoomRef.key)}`)
          }
        }
      } catch (error) {
        toast.error('Falha ao criar sala.')
        console.error(error)
      }
    },
    []
  )

  const writeNewMember = useCallback(
    async ({ roomId, userId }: { roomId: string; userId: string }) => {
      try {
        const roomType = (
          await get(ref(database, `rooms/${roomId}/type`))
        ).val() as string

        const snapshotRoomByUser = await get(
          child(ref(database), `users/${userId}/rooms/${roomId}`)
        )
        const snapshotRoom = await get(child(ref(database), `rooms/${roomId}`))

        if (!snapshotRoomByUser.exists() && snapshotRoom.exists()) {
          await set(ref(database, `users/${userId}/rooms/${roomId}`), true)
          await set(ref(database, `rooms/${roomId}/users/${userId}`), {
            'join-date': serverTimestamp()
          })

          if (roomType !== 'video') {
            const user = (
              await get(ref(database, `users/${userId}`))
            ).val() as {
              displayName: string
            }
            const messageListRef = child(ref(database), `messages/${roomId}`)
            const newMessageRef = push(messageListRef)
            await set(newMessageRef, {
              message: `Bem vindo, ${user.displayName}`,
              type: 'enter',
              timestamp: serverTimestamp()
            })
            await set(
              ref(database, `rooms/${roomId}/users/${userId}/first-message`),
              newMessageRef.key
            )
          }

          toast.success('Você entrou na sala especificada!')
        } else {
          toast.error('Falha ao entrar em sala.')
        }
      } catch (error) {
        toast.error('Falha ao entrar em sala.')
        console.error(error)
      }
    },
    []
  )

  const writeNewMessage = useCallback(
    async ({
      roomId,
      userId,
      message
    }: {
      roomId: string
      userId: string
      message: string
    }) => {
      try {
        const messageListRef = child(ref(database), `messages/${roomId}`)
        const newMessageRef = push(messageListRef)

        if (newMessageRef.key != null) {
          await set(newMessageRef, {
            message,
            sender: {
              [userId]: true
            },
            timestamp: serverTimestamp()
          })
          await set(
            ref(
              database,
              `rooms/${roomId}/users/${userId}/last-viewed-message`
            ),
            newMessageRef.key
          )
        }
      } catch (error) {
        toast.error('Falha ao enviar mensagem.')
        console.error(error)
      }
    },
    []
  )

  useEffect(() => {
    if (userState.user === null) return

    const unsubscribe = onValue(
      ref(database, `users/${userState.user.uid}/rooms`),
      async snapshotRoomsByUser => {
        let roomsTemp: IRoom[] = []
        if (snapshotRoomsByUser.exists()) {
          for (const room of Object.keys(snapshotRoomsByUser.val())) {
            const snapshotRooms = await get(ref(database, `/rooms/${room}`))
            if (snapshotRooms.exists()) {
              const newRoom = {
                id: snapshotRooms.key,
                type: snapshotRooms.val().type,
                displayName: snapshotRooms.val().displayName,
                image: snapshotRooms.val().image,
                timestamp: snapshotRooms.val().timestamp,
                adms: snapshotRooms.val().adms,
                users: snapshotRooms.val().users
              }
              roomsTemp = [...roomsTemp, newRoom]
            }
          }
          setRooms(roomsTemp)
        } else {
          setRooms([])
        }
      }
    )

    return () => {
      unsubscribe()
    }
  }, [userState.user])

  return (
    <RoomContext.Provider
      value={{ writeNewRoom, writeNewMember, writeNewMessage, rooms }}
    >
      {children}
    </RoomContext.Provider>
  )
}

export { RoomContext, RoomProvider }
