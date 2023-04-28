import { useCallback, useEffect, useRef, useState } from 'react'
import { largestRect } from 'rect-scaler'
import { useMediaQuery } from 'react-responsive'
import { DefaultVideo } from '../DefaultVideo'
import { FeaturedVideo } from '../FeaturedVideo'
import { CallParticipantsContainer, CallWrapper, FlexWrapper } from './styles'

interface ICallParticipants {
  call: {
    localStream: MediaStream | null
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
  const isSmallScreen = useMediaQuery({
    query: '(min-width: 320px) and (max-width: 639px)'
  })
  const isMediumScreen = useMediaQuery({
    query: '(min-width: 640px) and (max-width: 1023px)'
  })
  const [featuredDefaultVideo, setFeaturedDefaultVideo] =
    useState<HTMLVideoElement | null>(null)
  const resizeObserverRef = useRef<ResizeObserver>()

  useEffect(() => {
    if (call.participants.length === 0) return

    if (resizeObserverRef.current != null) {
      resizeObserverRef.current.disconnect()
    }

    resizeObserverRef.current = new ResizeObserver(entries => {
      const { width, height } = entries[0].contentRect
      console.log({ width, height })
      const margin = isSmallScreen ? 8 : isMediumScreen ? 12 : 16

      const numRects =
        featuredDefaultVideo !== null && call.participants.length > 1
          ? call.participants.length - 1
          : call.participants.length
      const rectWidth = 4
      const rectHeight = 3

      const rect = largestRect(width, height, numRects, rectWidth, rectHeight)
      const sizes = {
        width: rect.width - 2 * margin,
        height: rect.height - 2 * margin,
        margin
      }

      call.participants.forEach(p => {
        const defaultVideoContainerElement = document.getElementById(
          `default-video-container-${p[0]}`
        )
        if (defaultVideoContainerElement !== null) {
          defaultVideoContainerElement.style.width = `${sizes.width}px`
          defaultVideoContainerElement.style.height = `${sizes.height}px`
          defaultVideoContainerElement.style.margin = `${sizes.margin}px`
        }
      })
    })

    const callParticipantsElement = document.getElementById('call-participants')
    if (callParticipantsElement != null)
      resizeObserverRef.current.observe(callParticipantsElement)

    return () => {
      resizeObserverRef.current?.disconnect()
    }
  }, [call.participants, featuredDefaultVideo, isSmallScreen, isMediumScreen])

  const handleAddFeaturedVideo = (id: string): void => {
    const videoEl = document.getElementById(id) as HTMLVideoElement
    setFeaturedDefaultVideo(videoEl)
  }

  const handleRemoveFeaturedVideo = useCallback(() => {
    setFeaturedDefaultVideo(null)
  }, [])

  useEffect(() => {
    if (featuredDefaultVideo !== null) {
      const el = call.participants.find(p => p[0] === featuredDefaultVideo.id)
      if (el === undefined) setFeaturedDefaultVideo(null)
    }
  }, [featuredDefaultVideo, call.participants])

  function isFeatured(
    featuredDefaultVideoElement: HTMLVideoElement | null,
    participant:
      | [string, { peerConnection: RTCPeerConnection; joinDate: number }]
      | undefined
  ): boolean {
    if (featuredDefaultVideoElement !== null && participant !== undefined) {
      return featuredDefaultVideoElement.id === participant[0]
    } else {
      return false
    }
  }

  return (
    <CallWrapper>
      {featuredDefaultVideo !== null && (
        <FeaturedVideo
          media={call.media}
          participants={call.participants}
          onRemoveFeaturedVideo={handleRemoveFeaturedVideo}
          featuredDefaultVideo={featuredDefaultVideo}
        />
      )}

      <CallParticipantsContainer
        id="call-participants"
        hasFeaturedVideo={featuredDefaultVideo}
      >
        <FlexWrapper>
          {call.participants.map(ps => {
            return (
              <DefaultVideo
                key={ps[0]}
                userId={call.participants[0][0]}
                isFeatured={isFeatured(
                  featuredDefaultVideo,
                  call.participants.find(p => p[0] === ps[0])
                )}
                media={call.media.find(m => m[0] === ps[0])}
                participant={call.participants.find(p => p[0] === ps[0])}
                stream={call.localStream}
                onAddFeaturedVideo={handleAddFeaturedVideo}
              />
            )
          })}
        </FlexWrapper>
      </CallParticipantsContainer>
    </CallWrapper>
  )
}
