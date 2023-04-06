import { usePeerConnection } from './usePeerConnection'
import { CallActions } from '../../components/CallActions'
import { CallParticipants } from '../../components/CallParticipants'
import { CallContainer } from './styles'

export function Call(): JSX.Element | null {
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
  } = usePeerConnection()

  if (!isMounted) return null

  return (
    <CallContainer>
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
    </CallContainer>
  )
}
