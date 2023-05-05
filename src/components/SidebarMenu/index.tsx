import * as Dialog from '@radix-ui/react-dialog'
import { useContext, useMemo, useState } from 'react'
import { LogoSVG } from '../LogoSVG'
import { Link } from 'react-router-dom'
import { RoomContext } from '../../contexts/RoomContext'
import { AuthContext } from '../../contexts/AuthContext'
import { FormJoinRoom } from '../FormJoinRoom'
import { NavLink } from '../NavLink'
import { Notification } from '../Notification'
import {
  SignOutButton,
  RoomsBox,
  StyledClose,
  StyledContent,
  StyledMain,
  StyledOverlay,
  StyledTitle,
  StyledTrigger,
  StyledSidebarContent,
  StyledSidebarTitle
} from './styles'
import { useMediaQuery } from 'react-responsive'

export function SidebarMenu(): JSX.Element {
  const isLargerThan768 = useMediaQuery({
    query: '(min-width: 768px)'
  })
  const { rooms } = useContext(RoomContext)
  const { onSignOut } = useContext(AuthContext)
  const [open, setOpen] = useState(false)

  const typedRooms = useMemo(() => {
    return rooms.reduce(
      (acc, currentValue) => {
        if (currentValue.type === 'chat') return { ...acc, chat: acc.chat + 1 }
        return { ...acc, video: acc.video + 1 }
      },
      {
        chat: 0,
        video: 0
      }
    )
  }, [rooms])

  if (isLargerThan768) {
    return (
      <StyledSidebarContent>
        <StyledSidebarTitle>
          <Link to={'/dashboard'}>
            <LogoSVG />
            &nbsp;
            <span>Conversa</span>
          </Link>

          <Notification />
        </StyledSidebarTitle>
        <StyledMain>
          <SignOutButton onClick={onSignOut}>Sair</SignOutButton>

          <FormJoinRoom />

          {typedRooms.chat !== 0 && (
            <RoomsBox>
              <header>Chat</header>

              {rooms.map(room => {
                if (room.type === 'chat') {
                  return (
                    <NavLink
                      key={room.id}
                      roomId={room.id ?? ''}
                      roomImage={room.image}
                      roomType={room.type}
                      roomDisplayName={room.displayName}
                    />
                  )
                } else return null
              })}
            </RoomsBox>
          )}

          {typedRooms.video !== 0 && (
            <RoomsBox>
              <header>Video Chamada</header>

              {rooms.map(room => {
                if (room.type === 'video') {
                  return (
                    <NavLink
                      key={room.id}
                      roomId={room.id ?? ''}
                      roomImage={room.image}
                      roomType={room.type}
                      roomDisplayName={room.displayName}
                    />
                  )
                } else return null
              })}
            </RoomsBox>
          )}
        </StyledMain>
      </StyledSidebarContent>
    )
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <StyledTrigger>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="48"
          viewBox="0 96 960 960"
          width="48"
        >
          <path d="M120 816v-60h720v60H120Zm0-210v-60h720v60H120Zm0-210v-60h720v60H120Z" />
        </svg>
      </StyledTrigger>

      <Dialog.Portal>
        <StyledOverlay />
        <StyledContent>
          <StyledTitle>
            <StyledClose>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="48"
                viewBox="0 96 960 960"
                width="48"
              >
                <path d="M447 875 169 597q-5-5-7-10t-2-11q0-6 2-11t7-10l279-279q8-8 20-8t21 9q9 9 9 21t-9 21L262 546h496q13 0 21.5 8.5T788 576q0 13-8.5 21.5T758 606H262l228 228q8 8 8 20t-9 21q-9 9-21 9t-21-9Z" />
              </svg>
            </StyledClose>

            <Link to={'/dashboard'}>
              <LogoSVG />
              &nbsp;
              <span>Conversa</span>
            </Link>

            <Notification />
          </StyledTitle>
          <StyledMain>
            <SignOutButton onClick={onSignOut}>Sair</SignOutButton>

            <FormJoinRoom />

            {typedRooms.chat !== 0 && (
              <RoomsBox>
                <header>Chat</header>

                {rooms.map(room => {
                  if (room.type === 'chat') {
                    return (
                      <NavLink
                        key={room.id}
                        roomId={room.id ?? ''}
                        roomImage={room.image}
                        roomType={room.type}
                        roomDisplayName={room.displayName}
                      />
                    )
                  } else return null
                })}
              </RoomsBox>
            )}

            {typedRooms.video !== 0 && (
              <RoomsBox>
                <header>Video Chamada</header>

                {rooms.map(room => {
                  if (room.type === 'video') {
                    return (
                      <NavLink
                        key={room.id}
                        roomId={room.id ?? ''}
                        roomImage={room.image}
                        roomType={room.type}
                        roomDisplayName={room.displayName}
                      />
                    )
                  } else return null
                })}
              </RoomsBox>
            )}
          </StyledMain>
        </StyledContent>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
