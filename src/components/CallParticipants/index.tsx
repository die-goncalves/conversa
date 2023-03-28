import { useEffect, useRef, useState } from 'react'
import { get, ref } from 'firebase/database'
import { largestRect } from 'rect-scaler'
import { database } from '../../services/firebaseConfig'
import {
  CallParticipantsContainer,
  FlexWrapper,
  VideoContainer
} from './styles'

interface ICallParticipants {
  call: {
    localStream?: MediaStream
    userId: string
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
  }
}

export function CallParticipants({ call }: ICallParticipants): JSX.Element {
  const [photoURL, setPhotoURL] = useState<Record<string, string>>({})
  const resizeObserverRef = useRef<ResizeObserver>()
  const [sizes, setSizes] = useState<{
    width: number
    height: number
    margin: number
  }>({ width: 0, height: 0, margin: 0 })

  useEffect(() => {
    if (call.participants.length === 0) return

    call.participants.forEach((p, index) => {
      const videoElementParticipant = document.getElementById(
        `video-${p[0]}`
      ) as HTMLVideoElement | null

      if (index === 0) {
        if (videoElementParticipant != null && call.localStream !== undefined)
          videoElementParticipant.srcObject = call.localStream
      } else {
        const peerConnection = p[1].peerConnection
        const remoteStream = new MediaStream()

        peerConnection.ontrack = event => {
          event.streams[0].getTracks().forEach(track => {
            remoteStream.addTrack(track)
          })
          if (videoElementParticipant != null)
            videoElementParticipant.srcObject = remoteStream
        }
      }
    })
  }, [call.participants, call.localStream])

  useEffect(() => {
    if (call.participants.length === 0) return

    if (resizeObserverRef.current != null) {
      resizeObserverRef.current.disconnect()
    }

    resizeObserverRef.current = new ResizeObserver(entries => {
      const { width, height } = entries[0].contentRect
      const margin = 8

      const numRects = call.participants.length
      const rectWidth = 4
      const rectHeight = 3

      const rect = largestRect(width, height, numRects, rectWidth, rectHeight)
      setSizes({
        width: rect.width - 2 * margin,
        height: rect.height - 2 * margin,
        margin
      })
    })

    const callParticipantsElement = document.getElementById('call-participants')
    if (callParticipantsElement != null)
      resizeObserverRef.current.observe(callParticipantsElement)

    return () => {
      resizeObserverRef.current?.disconnect()
    }
  }, [call.participants])

  useEffect(() => {
    async function getPhotoURL(): Promise<void> {
      setPhotoURL({})
      for (const p of call.participants) {
        const user = await get(ref(database, `users/${p[0]}`))
        if (user.exists()) {
          if (user.key !== null) {
            setPhotoURL(prev => ({
              ...prev,
              ...{ [user.key!]: user.val().photoURL }
            }))
          }
        }
      }
    }
    if (call.userId.length > 0 && call.participants.length > 0)
      void getPhotoURL()
  }, [call.participants, call.userId])

  return (
    <CallParticipantsContainer id="call-participants">
      <FlexWrapper>
        {call.media.map(m => {
          return (
            <VideoContainer
              key={m[0]}
              videoWidth={sizes.width}
              videoHeight={sizes.height}
              videoMargin={sizes.margin}
            >
              <video id={`video-${m[0]}`} autoPlay playsInline />

              {!m[1].video && (
                <div>
                  <img src={photoURL[m[0]]} alt="" />
                </div>
              )}

              {!m[1].audio && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 48 48"
                  preserveAspectRatio="xMidYMid meet"
                >
                  <path d="m34.3 29.95-2.15-2.15q1.05-1.3 1.55-2.925.5-1.625.5-3.325h3q0 2.3-.75 4.45-.75 2.15-2.15 3.95ZM23.05 18.7Zm4.85 4.85-2.65-2.6V9.05q0-.85-.6-1.45T23.2 7q-.85 0-1.45.6t-.6 1.45v7.75l-3-3V9.05q0-2.1 1.475-3.575T23.2 4q2.1 0 3.575 1.475T28.25 9.05v12.5q0 .4-.075 1t-.275 1ZM21.7 42v-6.8q-5.3-.55-8.9-4.45-3.6-3.9-3.6-9.2h3q0 4.55 3.225 7.65 3.225 3.1 7.775 3.1 1.9 0 3.65-.625t3.2-1.725l2.15 2.15q-1.55 1.3-3.45 2.075-1.9.775-4.05 1.025V42Zm19.85 3.25L1.8 5.5l1.9-1.9 39.75 39.75Z" />
                </svg>
              )}
            </VideoContainer>
          )
        })}
      </FlexWrapper>
    </CallParticipantsContainer>
  )
}
