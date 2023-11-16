import { type LoaderFunctionArgs, useLoaderData } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive'
import { CallActions } from '../../components/CallActions'
import { CallParticipants } from '../../components/CallParticipants'
import { SidebarMenu } from '../../components/SidebarMenu'
import { usePeerConnection } from './usePeerConnection'
import { CallContainer, StyledCall, StyledHeader } from './styles'

export function loader({ params }: LoaderFunctionArgs): {
  roomId: string | undefined
} {
  return {
    roomId: params.roomId
  }
}
export function Element(): JSX.Element | null {
  const { roomId } = useLoaderData() as {
    roomId: string
  }
  return <CallRoom key={roomId} roomId={roomId} />
}

interface ICallRoom {
  roomId: string
}
export function CallRoom({ roomId }: ICallRoom): JSX.Element | null {
  const isLargerThan768 = useMediaQuery({
    query: '(min-width: 768px)'
  })
  const {
    toggleCamera,
    toggleMic,
    hangup,
    isScreenShare,
    screenShare,
    forceStopScreenShare,
    call,
    userMedia,
    isMounted
  } = usePeerConnection({ roomId })

  if (!isMounted) return null

  return (
    <CallContainer>
      {!isLargerThan768 && (
        <StyledHeader>
          <SidebarMenu />

          {userMedia != null && (
            <CallActions
              media={userMedia[1]}
              onToggleMic={toggleMic}
              onToggleCamera={toggleCamera}
              onHangup={hangup}
              isScreenShare={isScreenShare}
              onScreenShare={screenShare}
              onForceStopScreenShare={forceStopScreenShare}
            />
          )}
        </StyledHeader>
      )}

      {!isLargerThan768 ? (
        <StyledCall>
          <CallParticipants call={call} />
        </StyledCall>
      ) : (
        <StyledCall>
          <CallParticipants call={call} />

          {userMedia != null && (
            <CallActions
              media={userMedia[1]}
              onToggleMic={toggleMic}
              onToggleCamera={toggleCamera}
              onHangup={hangup}
              isScreenShare={isScreenShare}
              onScreenShare={screenShare}
              onForceStopScreenShare={forceStopScreenShare}
            />
          )}
        </StyledCall>
      )}
    </CallContainer>
  )
}
