import { useContext, useEffect, useState } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { limitToLast, onValue, query, ref } from 'firebase/database'
import { database } from '../../services/firebaseConfig'
import { AuthContext } from '../../contexts/AuthContext'
import { NavLinkContainer } from './styles'

interface INavLink {
  roomId: string
  roomImage: string
  roomType: string
  roomDisplayName: string
}

export function NavLink({
  roomId,
  roomImage,
  roomType,
  roomDisplayName
}: INavLink): JSX.Element {
  const { userState } = useContext(AuthContext)
  const [hasNewMessage, setHasNewMessage] = useState<boolean>()
  const active = useLocation().pathname.includes(roomId)

  useEffect(() => {
    if (roomType !== 'chat' || userState.user === null) return

    const unsubscribe = onValue(
      query(ref(database, `messages/${roomId}`), limitToLast(1)),
      snapshot => {
        if (snapshot.exists()) {
          const message = Object.entries(snapshot.val())[0] as unknown as [
            string,
            {
              message: string
              sender?: Record<string, boolean>
              timestamp: number
              viewed?: Record<string, boolean>
            }
          ]

          if (userState.user != null) {
            if (
              Object.keys(message[1]?.sender ?? {}).includes(
                userState.user.uid
              ) ||
              Object.keys(message[1]?.viewed ?? {}).includes(userState.user.uid)
            ) {
              setHasNewMessage(false)
            } else {
              setHasNewMessage(true)
            }
          }
        }
      }
    )

    return () => {
      unsubscribe()
    }
  }, [roomId, roomType, userState])

  return (
    <NavLinkContainer>
      <img src={roomImage} alt="" />

      <Link
        to={
          roomType === 'chat'
            ? `/dashboard/room/${roomId}`
            : `/dashboard/call/${roomId}`
        }
        className={active ? 'active' : ''}
      >
        {roomDisplayName}
      </Link>

      {(hasNewMessage ?? false) && (
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="48"
            viewBox="0 96 960 960"
            width="48"
          >
            <path d="M480 856q-115 0-197.5-82.5T200 576q0-115 82.5-197.5T480 296q115 0 197.5 82.5T760 576q0 115-82.5 197.5T480 856Z" />
          </svg>
        </div>
      )}

      <Link
        to={
          roomType === 'chat'
            ? `/dashboard/room/${roomId}/detail`
            : `/dashboard/call/${roomId}/detail`
        }
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="48"
          viewBox="0 96 960 960"
          width="48"
        >
          <path d="m388 976-20-126q-19-7-40-19t-37-25l-118 54-93-164 108-79q-2-9-2.5-20.5T185 576q0-9 .5-20.5T188 535L80 456l93-164 118 54q16-13 37-25t40-18l20-127h184l20 126q19 7 40.5 18.5T669 346l118-54 93 164-108 77q2 10 2.5 21.5t.5 21.5q0 10-.5 21t-2.5 21l108 78-93 164-118-54q-16 13-36.5 25.5T592 850l-20 126H388Zm92-270q54 0 92-38t38-92q0-54-38-92t-92-38q-54 0-92 38t-38 92q0 54 38 92t92 38Zm0-60q-29 0-49.5-20.5T410 576q0-29 20.5-49.5T480 506q29 0 49.5 20.5T550 576q0 29-20.5 49.5T480 646Zm0-70Zm-44 340h88l14-112q33-8 62.5-25t53.5-41l106 46 40-72-94-69q4-17 6.5-33.5T715 576q0-17-2-33.5t-7-33.5l94-69-40-72-106 46q-23-26-52-43.5T538 348l-14-112h-88l-14 112q-34 7-63.5 24T306 414l-106-46-40 72 94 69q-4 17-6.5 33.5T245 576q0 17 2.5 33.5T254 643l-94 69 40 72 106-46q24 24 53.5 41t62.5 25l14 112Z" />
        </svg>
      </Link>
    </NavLinkContainer>
  )
}
