import { useContext } from 'react'
import { useOutlet, Navigate } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'
import { RoomProvider } from '../contexts/RoomContext'

export const ProtectedLayout: () => JSX.Element = () => {
  const outlet = useOutlet()
  const { userState } = useContext(AuthContext)

  if (userState.user === undefined || userState.user === null)
    return <Navigate to="/" />

  return <RoomProvider>{outlet}</RoomProvider>
}
