import {
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState
} from 'react'
import { useLoaderData, useNavigate } from 'react-router-dom'
import { compareAsc } from 'date-fns'
import {
  child,
  get,
  onChildAdded,
  onChildChanged,
  onChildRemoved,
  onDisconnect,
  onValue,
  ref,
  remove,
  set,
  type Unsubscribe
} from 'firebase/database'
import { database } from '../../services/firebaseConfig'
import {
  createPeerConnection,
  handleMakeCall,
  listeners,
  updateMedia
} from '../../utils/signaling'
import { AuthContext } from '../../contexts/AuthContext'
import { IceServersContext } from '../../contexts/IceServersContext'

interface ICall {
  callId: string
  userId: string
  localStream: MediaStream | null
  participants: Array<
    [
      string,
      {
        peerConnection: RTCPeerConnection
        joinDate: number
      }
    ]
  >
  media: Array<
    [
      string,
      {
        video: boolean
        audio: boolean
      }
    ]
  >
  iceServers: RTCIceServer[] | undefined
}
enum Actions {
  'user-id',
  'local-stream',
  'add-participant',
  'remove-participant',
  'add-media',
  'update-media',
  'clear-state'
}
interface IActions {
  type: keyof typeof Actions
  payload?: any
}
function reducer(state: ICall, action: IActions): ICall {
  switch (action.type) {
    case 'user-id': {
      const timestamp = Date.now()
      return {
        ...state,
        userId: `${String(action.payload)}-${timestamp}`
      }
    }
    case 'local-stream': {
      return {
        ...state,
        localStream: action.payload
      }
    }
    case 'add-participant': {
      if (state.localStream === null) return state
      if (state.participants.findIndex(p => p[0] === action.payload[0]) !== -1)
        return state

      const newParticipant = action.payload as [
        string,
        {
          peerConnection: RTCPeerConnection
          joinDate: number
        }
      ]

      const pc = createPeerConnection(state.localStream, state.iceServers)
      newParticipant[1].peerConnection = pc

      if (action.payload[0] !== state.userId) {
        const userParticipant = state.participants.find(
          p => p[0] === state.userId
        )

        if (userParticipant !== undefined) {
          const orderAscId = [
            userParticipant[1].joinDate,
            newParticipant[1].joinDate
          ].sort(compareAsc)

          // IMPEDE A CRIAÇÃO DE OFERTA PARA NOVAS ADIÇÕES DE PARTICIPANTES. QUANDO UM USUÁRIO ENTRA, AS OFERTAS SÃO CRIADAS ENTRE O USUÁRIO E CADA PARTICIPANTE PRESENTE NA SALA
          if (orderAscId[0] !== userParticipant[1].joinDate) {
            handleMakeCall(
              pc,
              state.callId,
              newParticipant[0],
              state.userId
            ).catch(error => {
              console.error(
                'Failure to exchange information between peers',
                error
              )
            })
          }
        }
      }

      return {
        ...state,
        participants: [...state.participants, newParticipant]
      }
    }
    case 'remove-participant': {
      const pc = state.participants.find(p => p[0] === action.payload)
      if (pc !== undefined) pc[1].peerConnection.close()
      const newStateParticipant = state.participants.filter(p => {
        return p[0] !== action.payload
      })
      const newStateMedia = state.media.filter(p => {
        return p[0] !== action.payload
      })

      return {
        ...state,
        media: newStateMedia,
        participants: newStateParticipant
      }
    }
    case 'add-media': {
      return { ...state, media: [...state.media, action.payload] }
    }
    case 'update-media': {
      const updatedMedia = state.media.map(p => {
        if (p[0] === action.payload[0]) {
          return [
            p[0],
            {
              ...p[1],
              ...action.payload[1]
            }
          ] as [
            string,
            {
              audio: boolean
              video: boolean
            }
          ]
        }
        return p
      })

      return { ...state, media: updatedMedia }
    }
    case 'clear-state': {
      return {
        ...state,
        callId: '',
        userId: '',
        localStream: null,
        participants: [],
        media: []
      }
    }
    default:
      throw new Error('Ação desconhecida')
  }
}

interface IPeerConnection {
  call: ICall
  isScreenShare: boolean
  userMedia:
    | [
        string,
        {
          video: boolean
          audio: boolean
        }
      ]
    | undefined
  toggleCamera: () => void
  toggleMic: () => void
  hangup: () => Promise<void>
  screenShare: () => Promise<void>
  forceStopScreenShare: () => Promise<void>
  isMounted: boolean
}

export function usePeerConnection(): IPeerConnection {
  const navigate = useNavigate()
  const [isMounted, setIsMounted] = useState(false)
  const videoTrackRef = useRef<MediaStreamTrack>()
  const { callId } = useLoaderData() as { callId: string }
  const [mediaPermissionGranted, setMediaPermissionGranted] = useState(false)
  const [isScreenShare, setIsScreenShare] = useState(false)
  const { userState } = useContext(AuthContext)
  const { iceServers } = useContext(IceServersContext)
  const [call, dispatch] = useReducer(reducer, {
    callId,
    userId: '',
    localStream: null,
    participants: [],
    media: [],
    iceServers
  })
  const onChildAddedRef = useRef<{ unsubscribe: Unsubscribe | null }>({
    unsubscribe: null
  })
  const onChildRemovedRef = useRef<{ unsubscribe: Unsubscribe | null }>({
    unsubscribe: null
  })
  const onValuePresenceRef = useRef<{ unsubscribe: Unsubscribe | null }>({
    unsubscribe: null
  })

  const toggleCamera = useCallback(() => {
    if (call.localStream != null) {
      const videoTrack = call.localStream
        .getTracks()
        .find(track => track.kind === 'video')

      if (videoTrack !== undefined) {
        if (videoTrack.enabled) {
          videoTrack.enabled = false
        } else {
          videoTrack.enabled = true
        }
        dispatch({
          type: 'update-media',
          payload: [call.userId, { video: videoTrack.enabled }]
        })
        updateMedia(callId, call.userId, { video: videoTrack.enabled })
      }
    }
  }, [call.userId, call.localStream])

  const toggleMic = useCallback(() => {
    if (call.localStream != null) {
      const audioTrack = call.localStream
        .getTracks()
        .find(track => track.kind === 'audio')

      if (audioTrack !== undefined) {
        if (audioTrack.enabled) {
          audioTrack.enabled = false
        } else {
          audioTrack.enabled = true
        }
        dispatch({
          type: 'update-media',
          payload: [call.userId, { audio: audioTrack.enabled }]
        })
        updateMedia(callId, call.userId, { audio: audioTrack.enabled })
      }
    }
  }, [call.userId, call.localStream])

  const screenShare = useCallback(async () => {
    const stream = await navigator.mediaDevices.getDisplayMedia()
    const [videoTrack] = stream.getVideoTracks()

    if (call.localStream != null)
      videoTrack.enabled = call.localStream.getVideoTracks()[0].enabled

    for (const p of call.participants) {
      if (p[0] !== call.userId) {
        const senders = p[1].peerConnection.getSenders()
        for (const sender of senders) {
          if (sender.track != null) {
            if (sender.track.kind === 'video')
              await sender.replaceTrack(videoTrack)
          }
        }
      } else {
        if (call.localStream != null) {
          videoTrackRef.current = call.localStream.getVideoTracks()[0]
          call.localStream.removeTrack(call.localStream.getVideoTracks()[0])
          call.localStream.addTrack(videoTrack)
        }
      }
    }

    setIsScreenShare(true)
    stream.getVideoTracks()[0].onended = async () => {
      if (videoTrackRef.current !== undefined && call.localStream != null) {
        videoTrackRef.current.enabled =
          call.localStream.getVideoTracks()[0].enabled

        for (const p of call.participants) {
          if (p[0] !== call.userId) {
            const sender = p[1].peerConnection
              .getSenders()
              .find(s => s.track?.kind === 'video')
            if (sender !== undefined)
              await sender.replaceTrack(videoTrackRef.current)
          } else {
            if (call.localStream != null) {
              call.localStream.removeTrack(call.localStream.getVideoTracks()[0])
              call.localStream.addTrack(videoTrackRef.current)
            }
          }
        }
        videoTrackRef.current = undefined
        setIsScreenShare(false)
      }
    }
  }, [call.participants, call.userId, call.media, call.localStream])

  const forceStopScreenShare = useCallback(async () => {
    if (videoTrackRef.current !== undefined && call.localStream != null) {
      videoTrackRef.current.enabled =
        call.localStream.getVideoTracks()[0].enabled

      for (const p of call.participants) {
        if (p[0] !== call.userId) {
          const sender = p[1].peerConnection
            .getSenders()
            .find(s => s.track?.kind === 'video')
          if (sender !== undefined)
            await sender.replaceTrack(videoTrackRef.current)
        } else {
          if (call.localStream != null) {
            call.localStream.removeTrack(call.localStream.getVideoTracks()[0])
            call.localStream.addTrack(videoTrackRef.current)
          }
        }
      }
      videoTrackRef.current = undefined
      setIsScreenShare(false)
    }
  }, [call.participants, call.userId, call.media, call.localStream])

  const hangup = useCallback(async (): Promise<void> => {
    await forceStopScreenShare()
    if (call.localStream != null) {
      call.participants.forEach(p => {
        p[1].peerConnection.close()
      })

      call.localStream.getTracks().forEach(t => {
        t.stop()
        call.localStream?.removeTrack(t)
      })

      dispatch({ type: 'clear-state' })
      await remove(
        ref(database, `rooms/${callId}/signaling-users/${call.userId}`)
      )
    }
  }, [call.localStream, call.participants, call.userId])

  const userMedia = call.media.find(m => m[0] === call.userId)

  // TIRA O USUÁRIO DA SALA SE NÃO ESTIVER ENTRE OS PARTICIPANTES
  useEffect(() => {
    if (userState.user === null) return

    const unsubscribe = onValue(
      ref(database, `rooms/${callId}/users/${userState.user.uid}`),
      async snapshot => {
        if (!snapshot.exists()) {
          setIsMounted(false)
          navigate('/dashboard')
        } else {
          setIsMounted(true)
        }
      }
    )

    return () => {
      unsubscribe()
    }
  }, [userState.user])

  // PEDE PERMISSÃO MICROFONE E CÂMERA
  useEffect(() => {
    async function getUserMedia(): Promise<void> {
      if (userState.user != null) {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true
        })
        dispatch({ type: 'local-stream', payload: stream })
        dispatch({
          type: 'user-id',
          payload: userState.user.uid
        })
        setMediaPermissionGranted(true)
      }
    }
    if (isMounted) void getUserMedia()
  }, [userState.user, isMounted])

  // MONITORA STATUS DE CONEXÃO DO USUÁRIO
  useEffect(() => {
    if (!isMounted) return
    if (!mediaPermissionGranted) return

    const connectedRef = ref(database, '.info/connected')
    const userRef = ref(
      database,
      `rooms/${callId}/signaling-users/${call.userId}`
    )

    if (onValuePresenceRef.current.unsubscribe !== null)
      onValuePresenceRef.current.unsubscribe()

    onValuePresenceRef.current.unsubscribe = onValue(
      connectedRef,
      async snap => {
        if (snap.val() === true) {
          dispatch({
            type: 'add-participant',
            payload: [
              call.userId,
              {
                joinDate: Number(call.userId.split('-')[1])
              }
            ]
          })
          dispatch({
            type: 'add-media',
            payload: [
              call.userId,
              {
                video: true,
                audio: true
              }
            ]
          })

          await set(userRef, {
            media: { audio: true, video: true },
            'join-date': Number(call.userId.split('-')[1])
          })

          await onDisconnect(userRef).remove()
        }
      }
    )

    return () => {
      if (onValuePresenceRef.current.unsubscribe != null) {
        onValuePresenceRef.current.unsubscribe()
      }
    }
  }, [mediaPermissionGranted, isMounted])

  // RECUPERA A LISTA DE USUÁRIOS PRESENTES NA SALA E DETECTA ADIÇÕES DE NOVOS USUÁRIOS
  useEffect(() => {
    if (!isMounted) return
    if (!mediaPermissionGranted) return

    const usersRef = ref(database, `rooms/${callId}/signaling-users`)

    if (onChildAddedRef.current.unsubscribe !== null)
      onChildAddedRef.current.unsubscribe()

    onChildAddedRef.current.unsubscribe = onChildAdded(usersRef, snap => {
      if (snap.exists()) {
        if (snap.key != null) {
          onChildChanged(
            ref(database, `rooms/${callId}/signaling-users/${snap.key}/media`),
            snapshot => {
              if (snapshot.key != null) {
                dispatch({
                  type: 'update-media',
                  payload: [
                    snap.key,
                    {
                      [snapshot.key]: snapshot.val()
                    }
                  ]
                })
              }
            }
          )

          if (call.userId !== snap.key) {
            dispatch({
              type: 'add-participant',
              payload: [
                snap.key,
                {
                  joinDate: snap.val()['join-date']
                }
              ]
            })
            dispatch({
              type: 'add-media',
              payload: [snap.key, snap.val().media]
            })
          }
        }
      }
    })

    return () => {
      if (onChildAddedRef.current.unsubscribe !== null)
        onChildAddedRef.current.unsubscribe()
    }
  }, [mediaPermissionGranted, isMounted])

  // MONITORA SAÍDA DE UM USUÁRIO DA CHAMADA
  useEffect(() => {
    if (!isMounted) return
    if (call.userId.length === 0) return

    if (onChildRemovedRef.current.unsubscribe !== null)
      onChildRemovedRef.current.unsubscribe()

    onChildRemovedRef.current.unsubscribe = onChildRemoved(
      ref(database, `rooms/${callId}/signaling-users`),
      async snap => {
        if (snap.exists() && snap.key !== null) {
          dispatch({ type: 'remove-participant', payload: snap.key })

          const snapshotCallers = await get(
            child(
              ref(database),
              `rooms/${callId}/signaling-users/${call.userId}/caller-candidates`
            )
          )
          if (snapshotCallers.exists()) {
            const callers = Object.entries(
              snapshotCallers.val()
            ) as unknown as Array<[string, any]>

            for (const c of callers) {
              if (c[1].caller === snap.key) {
                await remove(
                  ref(
                    database,
                    `rooms/${callId}/signaling-users/${call.userId}/caller-candidates/${c[0]}`
                  )
                )
              }
            }
          }

          const snapshotCallee = await get(
            child(
              ref(database),
              `rooms/${callId}/signaling-users/${call.userId}/callee-candidates`
            )
          )
          if (snapshotCallee.exists()) {
            const callee = Object.entries(
              snapshotCallee.val()
            ) as unknown as Array<[string, any]>

            for (const c of callee) {
              if (c[1].callee === snap.key) {
                await remove(
                  ref(
                    database,
                    `rooms/${callId}/signaling-users/${call.userId}/callee-candidates/${c[0]}`
                  )
                )
              }
            }
          }

          await remove(
            ref(
              database,
              `rooms/${callId}/signaling-users/${call.userId}/video-offer/${snap.key}`
            )
          )

          await remove(
            ref(
              database,
              `rooms/${callId}/signaling-users/${call.userId}/video-answer/${snap.key}`
            )
          )
        }
      }
    )

    return () => {
      if (onChildRemovedRef.current.unsubscribe !== null)
        onChildRemovedRef.current.unsubscribe()
    }
  }, [call.userId, isMounted])

  // MONITORA SAÍDA DE UM USUÁRIO DA SALA
  useEffect(() => {
    if (!isMounted) return
    if (call.userId.length === 0) return

    const unsubscribe = onChildRemoved(
      ref(database, `rooms/${callId}/users`),
      async snapshotUser => {
        if (snapshotUser.exists() && snapshotUser.key !== null) {
          if (snapshotUser.key === call.userId.split('-')[0]) {
            navigate('/dashboard')
          }
        }
      }
    )

    return () => {
      unsubscribe()
    }
  }, [call.userId, isMounted])

  useEffect(() => {
    if (!isMounted) return
    if (!mediaPermissionGranted) return

    const {
      unsubscribeVideoOffer,
      unsubscribeVideoAnswer,
      unsubscribeCallerCandidates,
      unsubscribeCalleeCandidates
    } = listeners(call.participants, callId, call.userId)
    return () => {
      unsubscribeVideoOffer()
      unsubscribeVideoAnswer()
      unsubscribeCallerCandidates()
      unsubscribeCalleeCandidates()
    }
  }, [
    mediaPermissionGranted,
    call.participants,
    callId,
    call.userId,
    isMounted
  ])

  // LIMPAR TODOS OS ESTADOS AO REMOVER O COMPONENTE DO DOM
  useEffect(() => {
    return () => {
      if (call.localStream != null) void hangup()
    }
  }, [call.localStream])

  return {
    call,
    userMedia,
    toggleCamera,
    toggleMic,
    hangup,
    isScreenShare,
    screenShare,
    forceStopScreenShare,
    isMounted
  }
}
