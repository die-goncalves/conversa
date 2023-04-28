import { usePeerConnection } from './usePeerConnection'
import { CallActions } from '../../components/CallActions'
import { CallParticipants } from '../../components/CallParticipants'
import { CallContainer, StyledCall, StyledHeader } from './styles'
import { SidebarMenu } from '../../components/SidebarMenu'
import { useMediaQuery } from 'react-responsive'
import { Fragment } from 'react'

export function Call(): JSX.Element | null {
  const isSmallScreen = useMediaQuery({
    query: '(min-width: 320px) and (max-width: 767px)'
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
  } = usePeerConnection()

  if (!isMounted) return null

  return (
    <CallContainer>
      {isSmallScreen ? (
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
      ) : (
        <SidebarMenu />
      )}

      {isSmallScreen ? (
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
