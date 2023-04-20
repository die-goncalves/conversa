import { createContext, type ReactNode, useEffect, useReducer } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  type User,
  signInWithEmailAndPassword,
  signInAnonymously
} from 'firebase/auth'
import { child, get, ref, set } from 'firebase/database'
import { auth, database } from '../services/firebaseConfig'
import { toast } from 'react-toastify'

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

async function addUserToRoom(userId: string, roomId: string): Promise<void> {
  const roomSnapshot = await get(
    child(ref(database), `users/${userId}/rooms/${roomId}`)
  )
  if (!roomSnapshot.exists()) {
    await set(ref(database, `users/${userId}/rooms/${roomId}`), true)
    await set(ref(database, `rooms/${roomId}/users/${userId}`), true)
  }
}

async function writeUserData({
  uid,
  displayName,
  email,
  photoURL,
  isAnonymous
}: IUserData): Promise<void> {
  const userSnapshot = await get(child(ref(database), `users/${uid}`))
  if (!userSnapshot.exists()) {
    await set(ref(database, 'users/' + uid), {
      displayName,
      email,
      photoURL,
      isAnonymous
    })

    await addUserToRoom(uid, import.meta.env.VITE_APP_GLOBAL_ROOM_CHAT_ID)
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
  onSignInAnonymous: () => Promise<void>
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
      toast.success('Sessão iniciada.')
      navigate('dashboard')
    } catch (error) {
      toast.error('Falha ao iniciar sessão.')
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
      toast.success('Sessão iniciada.')
      navigate('dashboard')
    } catch (error) {
      toast.error('Falha ao iniciar sessão.')
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
      toast.success('Sessão iniciada.')
      navigate('dashboard')
    } catch (error) {
      toast.error('Falha ao iniciar sessão.')
      console.error(error)
    }
  }

  const onSignInAnonymous: () => Promise<void> = async () => {
    try {
      const { user } = await signInAnonymously(auth)
      await writeUserData({
        uid: user.uid,
        displayName: 'Anônimo',
        email: user.email,
        photoURL: '/anonym_avatar.png',
        isAnonymous: user.isAnonymous
      })
      toast.success('Sessão iniciada.')
      navigate('dashboard')
    } catch (error) {
      toast.error('Falha ao iniciar sessão.')
      console.log(error)
    }
  }

  const onSignOut: () => Promise<void> = async () => {
    try {
      await auth.signOut()
      toast.error('Sessão encerrada.')
    } catch (error) {
      toast.error('Falha ao encerrar sessão.')
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
        onSignInAnonymous,
        userState
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider }
