import { useEffect, useRef, useState } from 'react'
import { get, ref } from 'firebase/database'
import { database } from '../../services/firebaseConfig'
import { DefaultVideoContainer } from './styles'

interface IDefaultVideo {
  userId: string
  participant: [string, { peerConnection: RTCPeerConnection }] | undefined
  media: [string, { video: boolean; audio: boolean }] | undefined
  stream: MediaStream | undefined
  isFeatured: boolean
  onAddFeaturedVideo: (id: string) => void
}
export function DefaultVideo({
  userId,
  participant,
  media,
  stream,
  isFeatured,
  onAddFeaturedVideo
}: IDefaultVideo): JSX.Element | null {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [photoURL, setPhotoURL] = useState<string>('')

  useEffect(() => {
    if (participant === undefined) return

    if (userId === participant[0]) {
      if (videoRef.current != null && stream !== undefined)
        videoRef.current.srcObject = stream
    } else {
      const peerConnection = participant[1].peerConnection
      const remoteStream = new MediaStream()

      peerConnection.ontrack = event => {
        event.streams[0].getTracks().forEach(track => {
          remoteStream.addTrack(track)
        })
        if (videoRef.current != null) videoRef.current.srcObject = remoteStream
      }
    }
  }, [userId, participant, stream, isFeatured])

  useEffect(() => {
    async function getPhotoURL(): Promise<void> {
      if (participant != null) {
        const user = await get(ref(database, `users/${participant[0]}`))
        if (user.exists()) {
          if (user.key !== null) {
            setPhotoURL(user.val().photoURL)
          }
        }
      }
    }
    void getPhotoURL()
  }, [participant])

  const id = participant !== undefined ? participant[0] : ''

  return (
    <DefaultVideoContainer
      id={`default-video-container-${id}`}
      isFeatured={isFeatured}
      {...(userId !== id && {
        onMouseEnter: () => {
          const zoomInVideoEl = document.getElementById(`zoom-in-video-${id}`)
          if (zoomInVideoEl != null) zoomInVideoEl.classList.toggle('featured')
        },
        onMouseLeave: () => {
          const zoomInVideoEl = document.getElementById(`zoom-in-video-${id}`)
          if (zoomInVideoEl != null) zoomInVideoEl.classList.toggle('featured')
        }
      })}
    >
      <video id={id} ref={videoRef} autoPlay playsInline />

      {media !== undefined
        ? !media[1].video && (
            <div>
              <img src={photoURL} alt="" />
            </div>
          )
        : null}

      {media !== undefined
        ? !media[1].audio && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              preserveAspectRatio="xMidYMid meet"
            >
              <path d="m34.3 29.95-2.15-2.15q1.05-1.3 1.55-2.925.5-1.625.5-3.325h3q0 2.3-.75 4.45-.75 2.15-2.15 3.95ZM23.05 18.7Zm4.85 4.85-2.65-2.6V9.05q0-.85-.6-1.45T23.2 7q-.85 0-1.45.6t-.6 1.45v7.75l-3-3V9.05q0-2.1 1.475-3.575T23.2 4q2.1 0 3.575 1.475T28.25 9.05v12.5q0 .4-.075 1t-.275 1ZM21.7 42v-6.8q-5.3-.55-8.9-4.45-3.6-3.9-3.6-9.2h3q0 4.55 3.225 7.65 3.225 3.1 7.775 3.1 1.9 0 3.65-.625t3.2-1.725l2.15 2.15q-1.55 1.3-3.45 2.075-1.9.775-4.05 1.025V42Zm19.85 3.25L1.8 5.5l1.9-1.9 39.75 39.75Z" />
            </svg>
          )
        : null}

      <button
        id={`zoom-in-video-${id}`}
        onClick={() => {
          onAddFeaturedVideo(id)
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="48"
          viewBox="0 96 960 960"
          width="48"
        >
          <path d="M120 936V636h60v198l558-558H540v-60h300v300h-60V318L222 876h198v60H120Z" />
        </svg>
      </button>
    </DefaultVideoContainer>
  )
}
