import { useEffect, useMemo, useRef, useState } from 'react'
import { get, ref } from 'firebase/database'
import { database } from '../../services/firebaseConfig'
import { VideoBox, FeaturedVideoContainer } from './styles'

interface IFeaturedVideo {
  featuredDefaultVideo: HTMLVideoElement | null
  onRemoveFeaturedVideo: () => void
  media: Array<[string, { video: boolean; audio: boolean }]>
  participants: Array<[string, { peerConnection: RTCPeerConnection }]>
}
export function FeaturedVideo({
  featuredDefaultVideo,
  onRemoveFeaturedVideo,
  participants,
  media
}: IFeaturedVideo): JSX.Element | null {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [photoURL, setPhotoURL] = useState<string>('')

  useEffect(() => {
    if (featuredDefaultVideo === null) {
      if (videoRef.current != null) {
        videoRef.current.id = ''
        videoRef.current.style.height = '0'
        videoRef.current.srcObject = null
      }
    } else {
      if (videoRef.current != null) {
        videoRef.current.id = featuredDefaultVideo.id
        videoRef.current.style.height = '100%'
        videoRef.current.srcObject = featuredDefaultVideo.srcObject
      }
    }
  }, [featuredDefaultVideo])

  useEffect(() => {
    async function getPhotoURL(): Promise<void> {
      if (featuredDefaultVideo !== null) {
        const user = await get(
          ref(database, `users/${featuredDefaultVideo.id.split('-')[0]}`)
        )
        if (user.exists()) {
          if (user.key !== null) {
            setPhotoURL(user.val().photoURL)
          }
        }
      }
    }
    void getPhotoURL()
  }, [participants, featuredDefaultVideo])

  const participantMedia = useMemo(() => {
    if (featuredDefaultVideo !== null)
      return media.find(m => m[0] === featuredDefaultVideo.id)
  }, [media, featuredDefaultVideo])

  if (featuredDefaultVideo === null) return null

  return (
    <FeaturedVideoContainer>
      <VideoBox
        onMouseEnter={() => {
          const zoomInVideoEl = document.getElementById('zoom-out-video')
          if (zoomInVideoEl != null) zoomInVideoEl.classList.toggle('featured')
        }}
        onMouseLeave={() => {
          const zoomInVideoEl = document.getElementById('zoom-out-video')
          if (zoomInVideoEl != null) zoomInVideoEl.classList.toggle('featured')
        }}
      >
        <video ref={videoRef} autoPlay playsInline />

        {participantMedia !== undefined
          ? !participantMedia[1].video && (
              <div>
                <img src={photoURL} alt="" />
              </div>
            )
          : null}

        {participantMedia !== undefined
          ? !participantMedia[1].audio && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                preserveAspectRatio="xMidYMid meet"
              >
                <path d="m34.3 29.95-2.15-2.15q1.05-1.3 1.55-2.925.5-1.625.5-3.325h3q0 2.3-.75 4.45-.75 2.15-2.15 3.95ZM23.05 18.7Zm4.85 4.85-2.65-2.6V9.05q0-.85-.6-1.45T23.2 7q-.85 0-1.45.6t-.6 1.45v7.75l-3-3V9.05q0-2.1 1.475-3.575T23.2 4q2.1 0 3.575 1.475T28.25 9.05v12.5q0 .4-.075 1t-.275 1ZM21.7 42v-6.8q-5.3-.55-8.9-4.45-3.6-3.9-3.6-9.2h3q0 4.55 3.225 7.65 3.225 3.1 7.775 3.1 1.9 0 3.65-.625t3.2-1.725l2.15 2.15q-1.55 1.3-3.45 2.075-1.9.775-4.05 1.025V42Zm19.85 3.25L1.8 5.5l1.9-1.9 39.75 39.75Z" />
              </svg>
            )
          : null}

        <button id="zoom-out-video" onClick={onRemoveFeaturedVideo}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="48"
            viewBox="0 96 960 960"
            width="48"
          >
            <path d="m122 976-42-42 298-298H180v-60h300v300h-60V678L122 976Zm358-400V276h60v198l298-298 42 42-298 298h198v60H480Z" />
          </svg>
        </button>
      </VideoBox>
    </FeaturedVideoContainer>
  )
}
