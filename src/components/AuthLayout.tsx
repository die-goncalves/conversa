import { useOutlet } from 'react-router-dom'
import { AuthContext, AuthProvider } from '../contexts/AuthContext'
import { Loading } from './Loading'
import { IceServersProvider } from '../contexts/IceServersContext'

export const AuthLayout: () => JSX.Element = () => {
  const outlet = useOutlet()

  return (
    <AuthProvider>
      <AuthContext.Consumer>
        {({ userState }) => {
          if (userState.loadingUser) return <Loading size={96} />
          return <IceServersProvider>{outlet}</IceServersProvider>
        }}
      </AuthContext.Consumer>
    </AuthProvider>
  )
}
