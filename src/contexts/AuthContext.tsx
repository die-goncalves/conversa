import { createContext, type ReactNode, useEffect, useReducer } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  type User,
  signInWithEmailAndPassword
} from 'firebase/auth'
import { ref, set } from 'firebase/database'
import { auth, database } from '../services/firebaseConfig'

const googleProvider = new GoogleAuthProvider()

interface IUserData {
  uid: string
  displayName: string | null
  email: string | null
  photoURL: string | null
  isAnonymous: boolean
}

interface IEmailAndPassword {
  email: string
  password: string
}

async function writeUserData({
  uid,
  displayName,
  email,
  photoURL,
  isAnonymous
}: IUserData): Promise<void> {
  try {
    await set(ref(database, 'users/' + uid), {
      displayName,
      email,
      photoURL,
      isAnonymous
    })
  } catch (error) {
    console.log(error)
  }
}

interface IUserState {
  user: User | null
  loadingUser: boolean
}
enum Actions {
  'write-user'
}
interface IActions {
  type: keyof typeof Actions
  payload?: any
}
function reducer(state: IUserState, action: IActions): IUserState {
  switch (action.type) {
    case 'write-user':
      return { ...state, user: action.payload.user, loadingUser: false }
    default:
      throw new Error('Ação desconhecida')
  }
}

interface AuthContextData {
  onCreateUserWithEmailAndPassword: ({
    email,
    password
  }: IEmailAndPassword) => Promise<void>
  onSignInWithEmailAndPassword: ({
    email,
    password
  }: IEmailAndPassword) => Promise<void>
  onSignInWithGoogle: () => Promise<void>
  onSignOut: () => Promise<void>
  userState: IUserState
}
const AuthContext = createContext({} as unknown as AuthContextData)

interface AuthProviderProps {
  children: ReactNode
}
function AuthProvider({ children }: AuthProviderProps): JSX.Element {
  const navigate = useNavigate()
  const location = useLocation()
  const [userState, dispatch] = useReducer(reducer, {
    user: null,
    loadingUser: true
  })

  const onCreateUserWithEmailAndPassword: ({
    email,
    password
  }: IEmailAndPassword) => Promise<void> = async ({
    email,
    password
  }: IEmailAndPassword) => {
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )
      await writeUserData({
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        isAnonymous: false
      })
      navigate('dashboard')
    } catch (error) {
      console.error(error)
    }
  }

  const onSignInWithEmailAndPassword: ({
    email,
    password
  }: IEmailAndPassword) => Promise<void> = async ({
    email,
    password
  }: IEmailAndPassword) => {
    try {
      await signInWithEmailAndPassword(auth, email, password)
      navigate('dashboard')
    } catch (error) {
      console.error(error)
    }
  }

  const onSignInWithGoogle: () => Promise<void> = async () => {
    try {
      const { user } = await signInWithPopup(auth, googleProvider)
      await writeUserData({
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        isAnonymous: user.isAnonymous
      })
      navigate('dashboard')
    } catch (error) {
      console.error(error)
    }
  }

  const onSignOut: () => Promise<void> = async () => {
    try {
      await auth.signOut()
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      dispatch({ type: 'write-user', payload: { user, loadingUser: false } })
      if (user != null && !location.pathname.includes('dashboard')) {
        navigate('dashboard')
      }
    })

    return () => {
      unsubscribe()
    }
  }, [])

  return (
    <AuthContext.Provider
      value={{
        onCreateUserWithEmailAndPassword,
        onSignInWithEmailAndPassword,
        onSignInWithGoogle,
        onSignOut,
        userState
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider }
