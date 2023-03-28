import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { CallOptionsContainer, IconButton } from './styles'

interface ICallActions {
  media: {
    audio: boolean
    video: boolean
  }
  onToggleCamera: () => void
  onToggleMic: () => void
  onHangup: () => Promise<void>
  isScreenShare: boolean
  onScreenShare: () => Promise<void>
  onForceStopScreenShare: () => Promise<void>
}

export function CallActions({
  media,
  onToggleCamera,
  onToggleMic,
  onHangup,
  isScreenShare,
  onScreenShare,
  onForceStopScreenShare
}: ICallActions): JSX.Element {
  const navigate = useNavigate()

  const handleHangup = useCallback(async () => {
    await onHangup()
    navigate('/dashboard')
  }, [])

  return (
    <CallOptionsContainer>
      <IconButton
        onClick={!isScreenShare ? onScreenShare : onForceStopScreenShare}
      >
        {!isScreenShare ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            preserveAspectRatio="xMidYMid meet"
          >
            <path d="M18.15 28.65q.65 0 1.075-.425.425-.425.425-1.075v-3q0-1.2.8-2t2-.8h4.05v1.7q0 .5.475.675.475.175.825-.175l3.15-3.15q.05-.05.25-.55 0-.1-.25-.55l-3.15-3.15q-.35-.35-.825-.175t-.475.675v1.7h-4.05q-2.4 0-4.1 1.7-1.7 1.7-1.7 4.1v3q0 .65.425 1.075.425.425 1.075.425ZM7 36q-1.25 0-2.125-.875T4 33V9q0-1.25.875-2.125T7 6h34q1.25 0 2.125.875T44 9v24q0 1.25-.875 2.125T41 36Zm0-3h34V9H7v24Zm-3.5 9q-.65 0-1.075-.425Q2 41.15 2 40.5q0-.65.425-1.075Q2.85 39 3.5 39h41q.65 0 1.075.425Q46 39.85 46 40.5q0 .65-.425 1.075Q45.15 42 44.5 42ZM7 9v24V9Z" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            preserveAspectRatio="xMidYMid meet"
          >
            <path d="m27.6 23.75-5.4-5.4h4.3v-1.7q0-.5.475-.675.475-.175.825.175l3.15 3.15q.05.05.25.55 0 .1-.25.55Zm12.65 12.7-3-3h3.45V9.3H13.1l-3-3h30.6q1.2 0 2.1.9.9.9.9 2.1v24.15q0 1.3-1 2.2-1 .9-2.45.8Zm.55 9.05L37 41.75H3.5q-.65 0-1.075-.425Q2 40.9 2 40.25q0-.65.425-1.075.425-.425 1.075-.425H34l-2.3-2.3H7.35q-1.2 0-2.1-.9-.9-.9-.9-2.1V9.1l-1.7-1.7q-.45-.45-.45-1.075t.45-1.075q.45-.45 1.075-.45t1.075.45L42.95 43.4q.45.45.45 1.05 0 .6-.45 1.05-.45.45-1.075.45T40.8 45.5ZM19.65 24.4v2.75q0 .65-.425 1.075-.425.425-1.075.425-.65 0-1.075-.425-.425-.425-.425-1.075v-3q0-.5.1-1.125t.35-1.175L7.35 12.1v21.35H28.7Zm4.4-2.6Zm-6 .95Z" />
          </svg>
        )}
      </IconButton>

      <IconButton onClick={onToggleCamera}>
        {media.video ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            preserveAspectRatio="xMidYMid meet"
          >
            <path d="M7 40q-1.2 0-2.1-.9Q4 38.2 4 37V11q0-1.2.9-2.1Q5.8 8 7 8h26q1.2 0 2.1.9.9.9.9 2.1v10.75l8-8v20.5l-8-8V37q0 1.2-.9 2.1-.9.9-2.1.9Zm0-3h26V11H7v26Zm0 0V11v26Z" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            preserveAspectRatio="xMidYMid meet"
          >
            <path d="m44 34.25-8-8v5.55l-3-3V11H15.2l-3-3H33q1.2 0 2.1.9.9.9.9 2.1v10.75l8-8Zm-1.6 12.4L1.95 6.2l2.1-2.1L44.5 44.55ZM24.2 20Zm-4.35 4.1ZM7.95 8l3 3H7v26h26v-3.95l3 3V37q0 1.2-.9 2.1-.9.9-2.1.9H7q-1.2 0-2.1-.9Q4 38.2 4 37V11q0-1.2.9-2.1Q5.8 8 7 8Z" />
          </svg>
        )}
      </IconButton>

      <IconButton onClick={onToggleMic}>
        {media.audio ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            preserveAspectRatio="xMidYMid meet"
          >
            <path d="M24 26.85q-2.15 0-3.6-1.55-1.45-1.55-1.45-3.75V9q0-2.1 1.475-3.55Q21.9 4 24 4t3.575 1.45Q29.05 6.9 29.05 9v12.55q0 2.2-1.45 3.75-1.45 1.55-3.6 1.55Zm0-11.4ZM22.5 42v-6.8q-5.3-.55-8.9-4.45-3.6-3.9-3.6-9.2h3q0 4.55 3.225 7.65Q19.45 32.3 24 32.3q4.55 0 7.775-3.1Q35 26.1 35 21.55h3q0 5.3-3.6 9.2-3.6 3.9-8.9 4.45V42ZM24 23.85q.9 0 1.475-.675.575-.675.575-1.625V9q0-.85-.6-1.425Q24.85 7 24 7t-1.45.575q-.6.575-.6 1.425v12.55q0 .95.575 1.625T24 23.85Z" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            preserveAspectRatio="xMidYMid meet"
          >
            <path d="m34.3 29.95-2.15-2.15q1.05-1.3 1.55-2.925.5-1.625.5-3.325h3q0 2.3-.75 4.45-.75 2.15-2.15 3.95ZM23.05 18.7Zm4.85 4.85-2.65-2.6V9.05q0-.85-.6-1.45T23.2 7q-.85 0-1.45.6t-.6 1.45v7.75l-3-3V9.05q0-2.1 1.475-3.575T23.2 4q2.1 0 3.575 1.475T28.25 9.05v12.5q0 .4-.075 1t-.275 1ZM21.7 42v-6.8q-5.3-.55-8.9-4.45-3.6-3.9-3.6-9.2h3q0 4.55 3.225 7.65 3.225 3.1 7.775 3.1 1.9 0 3.65-.625t3.2-1.725l2.15 2.15q-1.55 1.3-3.45 2.075-1.9.775-4.05 1.025V42Zm19.85 3.25L1.8 5.5l1.9-1.9 39.75 39.75Z" />
          </svg>
        )}
      </IconButton>

      <IconButton onClick={handleHangup}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 48 48"
          preserveAspectRatio="xMidYMid meet"
        >
          <path d="M40.65 45.15 28.9 33.45q-5.35 4.35-10.4 6.475-5.05 2.125-9.9 2.125-1.15 0-1.9-.65t-.75-1.65V33q0-.8.5-1.4.5-.6 1.25-.75l5.95-1.3q.65-.15 1.3.075.65.225 1.15.775l4.75 4.9q1.45-.7 3.05-1.85 1.6-1.15 2.85-2.15L3.2 7.7l2.15-2.15 37.45 37.5Zm-22.55-8.4-3.95-4.15L9 33.65V39q2.25-.1 4.65-.7 2.4-.6 4.45-1.55Zm15.05-7.6L31 27q1.05-1.25 2.125-2.825Q34.2 22.6 35.05 21.3l-5-5.05q-.4-.4-.55-.975-.15-.575 0-1.275l1.3-6.25q.15-.8.675-1.275Q32 6 32.7 6h7q.95 0 1.625.65T42 8.25q0 5.1-2.4 10.725T33.15 29.15Zm3.3-10.7q1.3-3 1.9-5.25.6-2.25.55-4.2h-5.3l-1.15 5.45Zm0 0ZM18.1 36.75Z" />
        </svg>
      </IconButton>
    </CallOptionsContainer>
  )
}
