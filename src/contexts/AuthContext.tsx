import { createContext, type ReactNode, useEffect, useReducer } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'
import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  type User,
  signInWithEmailAndPassword,
  signInAnonymously
} from 'firebase/auth'
import { child, get, push, ref, serverTimestamp, set } from 'firebase/database'
import { auth, database } from '../services/firebaseConfig'
import { fetchAvatar, convertCompressedFileToBase64 } from '../utils/toBase64'

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
  const userSnapshot = await get(child(ref(database), `users/${uid}`))
  if (!userSnapshot.exists()) {
    await set(ref(database, 'users/' + uid), {
      displayName,
      email,
      photoURL,
      isAnonymous
    })

    const globalRoomId: string = import.meta.env.VITE_APP_GLOBAL_ROOM_CHAT_ID
    const globalRoomSnapshot = await get(
      child(ref(database), `users/${uid}/rooms/${globalRoomId}`)
    )
    if (!globalRoomSnapshot.exists()) {
      await set(ref(database, `users/${uid}/rooms/${globalRoomId}`), true)
      await set(ref(database, `rooms/${globalRoomId}/users/${uid}`), {
        'join-date': serverTimestamp()
      })
      const messageListRef = child(ref(database), `messages/${globalRoomId}`)
      const newMessageRef = push(messageListRef)
      await set(newMessageRef, {
        message: `Bem vindo, ${String(displayName)}`,
        type: 'enter',
        timestamp: serverTimestamp()
      })
      await set(
        ref(database, `rooms/${globalRoomId}/users/${uid}/first-message`),
        newMessageRef.key
      )
    }
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
      const name = /.*(?=@)/g.exec(email)?.[0] ?? ''
      const avatar =
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAA2xJREFUeJztmtFy2zgMRS9AUraTmd3faKf//1/7ksaSCKAPkt1k2yZ2cik2E9+ZPCUBwENSIAHK1y/f/gPwLz6ptHcAvXUD0DuA3roB6B1Ab90A9A6gt24AegfQWzcAvQPorU8PIG/tMKUETQoRhUIACCIcHgF3g5ltGs8mAHLOGMqAXDJEXl50EYFaK6ZpRK21fWwtjaeccdjvkdLlbkQEpRSUUmBWcTyOqHVuFmMzAMNuh8P+8C4bKWXc32dM44TH43dSZM/VBMDd4Q5lGGj2ht0ATYKHhweazZPoWeCw5w7+pJwL7g73dLtUACUXDDv+4M/2h4KhcO3TAIgI9nfv2/OXaL8/QERo9mgASi7QV1IcQ6JCXQU8ALsdy9SrGgaeLwoAUUFOiWHqImlSaOLMHcVK1sIwc6VPTganANDE+yhd7vMvWgGq218qVTlbjhM5MS1d7pLjk/MRDIaV68RySQHgtHCuUHB8UgCEO8PMVfLg+OQAIM3GNXISdAqAunEZCwCscnxyvgFmm66CWOuHDNES+Bb1u5OMCPxDAmDWCGkA5nnabBtM80SzRQMQEZiJgf1J0zwhnAeaeoifpvYA5mmk2qMCMLOmEOZ5QiWlv5Po17jj+IhocDSOAI7HI90uHUB44PjID3Qcj7TT31M1uchP0wgnng7dDePIhwo0bI/PdeakxYimvcF2pRx3hNd3XVsDAffa9HzRDEAgELEs33jL1TUCYRURba/bzQCICMwqHI5wW34umckAwm2decCsQkSo3aCnatIdTmvFNiLg1SApAXAgHCGydJBkeR2yKBARy0pZITkC9uR+kZLSzwBAAwAigvzkQcTpxUdKaakeR8Dj5YF4ONyeL/ukCSbGqoSdxd0CAgw5/7ZIbGaoZi/WDyOW4orVX7eLCFBKoW8FygoQEaSkSJperJCHO8wdLgJR+d/v4tVvhIpgNxTUajB3SnZ4GwBZmiEqgqR69axEBMLeHnzOCRlLY8TcER5wX16aXW3r0j9UVajKeeB/i5LqupHTkno94B7rs7vX0+dvAZzSzjJg2aTvz5Bg2VqnTt0ZyApjyTTP/ycDISoJouss49f9+VF1BgIAa/t+WR3Ldgl35P1u90/XKDeWqkDxs7H6MdZ2Q90A9A6gt24AegfQWzcAvQPorU8P4AcgEYX8C9EE1QAAAABJRU5ErkJggg=='

      await writeUserData({
        uid: user.uid,
        displayName: user.displayName ?? name,
        email: user.email,
        photoURL: user.photoURL ?? avatar,
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

      let compressedBase64: string | null = null
      if (user.photoURL != null) {
        const file = await fetchAvatar(user.photoURL)
        compressedBase64 = await convertCompressedFileToBase64(file)
      }

      await writeUserData({
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        photoURL: compressedBase64,
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
      console.error(error)
    }
  }

  const onSignOut: () => Promise<void> = async () => {
    try {
      await auth.signOut()
      toast.success('Sessão encerrada.')
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
