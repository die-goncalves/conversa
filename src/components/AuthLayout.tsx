import { useOutlet } from 'react-router-dom'
import { AuthContext, AuthProvider } from '../contexts/AuthContext'
import { Loading } from './Loading'

export const AuthLayout: () => JSX.Element = () => {
  const outlet = useOutlet()

  return (
    <AuthProvider>
      <AuthContext.Consumer>
        {({ userState }) => {
          if (userState.loadingUser) return <Loading size={96} />
          return outlet
        }}
      </AuthContext.Consumer>
    </AuthProvider>
  )
}
