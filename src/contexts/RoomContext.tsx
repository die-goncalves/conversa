import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState
} from 'react'
import { useNavigate } from 'react-router-dom'
import imageCompression from 'browser-image-compression'
import {
  child,
  get,
  push,
  ref,
  set,
  serverTimestamp,
  onChildAdded,
  query
} from 'firebase/database'
import { database } from '../services/firebaseConfig'
import { AuthContext } from './AuthContext'

interface IRoom {
  id: string | null
  type: 'chat' | 'voice' | 'video'
  displayName: string
  image: string
  timestamp: number
  owner: Record<string, boolean>
  users: Record<string, boolean>
}

interface INewRoom {
  type: 'chat' | 'voice' | 'video'
  displayName: string
  owner: string
  image: FileList
}

const blobToBase64 = async (blob: Blob): Promise<string> =>
  await new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(blob)
    reader.onload = () => {
      resolve(reader.result as string)
    }
    reader.onerror = error => {
      reject(error)
    }
  })

async function handleImageUpload(files: FileList): Promise<string | undefined> {
  try {
    const compressedFile = await imageCompression(files[0], {
      maxSizeMB: 1,
      maxWidthOrHeight: 64
    })
    const base64 = await blobToBase64(compressedFile)
    return base64
  } catch (error) {
    console.log(error)
  }
}

interface RoomContextData {
  writeNewRoom: ({ type, displayName, owner, image }: INewRoom) => Promise<void>
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
    async ({ type, displayName, owner, image }: INewRoom) => {
      try {
        const compressedFile = await handleImageUpload(image)

        const roomListRef = child(ref(database), 'rooms')
        const newRoomRef = push(roomListRef)

        await set(newRoomRef, {
          type,
          displayName,
          owner: {
            [owner]: true
          },
          image: compressedFile,
          timestamp: serverTimestamp()
        })

        await set(
          ref(
            database,
            `users/${userState.user!.uid}/rooms/${newRoomRef.key!}`
          ),
          true
        )

        if (type === 'video')
          navigate(`/dashboard/call/${String(newRoomRef.key)}`)
        navigate(`/dashboard/room/${String(newRoomRef.key)}`)
      } catch (error) {
        console.log(error)
      }
    },
    []
  )

  const writeNewMember = useCallback(
    async ({ roomId, userId }: { roomId: string; userId: string }) => {
      console.log(roomId)
      try {
        const snapshotRoomByUser = await get(
          child(ref(database), `users/${userId}/rooms/${roomId}`)
        )
        const snapshotRoom = await get(child(ref(database), `rooms/${roomId}`))

        if (!snapshotRoomByUser.exists() && snapshotRoom.exists()) {
          await set(ref(database, `users/${userId}/rooms/${roomId}`), true)
          await set(ref(database, `rooms/${roomId}/users/${userId}`), true)
        }
      } catch (error) {
        console.log(error)
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

        await set(newMessageRef, {
          message,
          sender: {
            [userId]: true
          },
          timestamp: serverTimestamp()
        })
      } catch (error) {
        console.log(error)
      }
    },
    []
  )

  useEffect(() => {
    const unsubscribe = onChildAdded(
      query(ref(database, `users/${userState.user!.uid}/rooms`)),
      snapshotRoomsByUser => {
        let newRoom: IRoom = {} as unknown as IRoom

        if (snapshotRoomsByUser.exists()) {
          get(ref(database, 'rooms/' + snapshotRoomsByUser.key!))
            .then(snapshotRooms => {
              if (snapshotRooms.exists()) {
                newRoom = {
                  id: snapshotRoomsByUser.key,
                  type: snapshotRooms.val().type,
                  displayName: snapshotRooms.val().displayName,
                  image: snapshotRooms.val().image,
                  timestamp: snapshotRooms.val().timestamp,
                  owner: snapshotRooms.val().owner,
                  users: snapshotRooms.val().users
                }
                setRooms(prevState => {
                  return [...prevState, newRoom]
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

    return () => {
      unsubscribe()
    }
  }, [])

  return (
    <RoomContext.Provider
      value={{ writeNewRoom, writeNewMember, writeNewMessage, rooms }}
    >
      {children}
    </RoomContext.Provider>
  )
}

export { RoomContext, RoomProvider }
