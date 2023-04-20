import { useContext, useMemo } from 'react'
import { useOutlet } from 'react-router-dom'
import { LogoSVG } from '../LogoSVG'
import { NavLink } from '../NavLink'
import { FormJoinRoom } from '../FormJoinRoom'
import { AuthContext } from '../../contexts/AuthContext'
import { RoomContext } from '../../contexts/RoomContext'
import {
  ActionsBox,
  DashboardLayoutContainer,
  Header,
  LogoBox,
  RoomsBox,
  SidebarContainer
} from './styles'

export function DashboardLayout(): JSX.Element {
  const outlet = useOutlet()
  const { rooms } = useContext(RoomContext)
  const { onSignOut } = useContext(AuthContext)

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

  return (
    <DashboardLayoutContainer>
      <SidebarContainer>
        <Header>
          <LogoBox to={'/dashboard'} id="logo-svg-container">
            <LogoSVG />
            <span>Conversa</span>
          </LogoBox>
        </Header>

        <ActionsBox>
          <button onClick={onSignOut}>Sair</button>
        </ActionsBox>

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
      </SidebarContainer>
      {outlet}
    </DashboardLayoutContainer>
  )
}
