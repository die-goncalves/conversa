import { type FormEvent, useContext, useMemo } from 'react'
import { useOutlet } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext'
import { RoomContext } from '../../contexts/RoomContext'
import { LogoSVG } from '../LogoSVG'
import { NavLink } from '../NavLink'
import {
  ActionsBox,
  DashboardLayoutContainer,
  Header,
  LogoBox,
  RoomsBox,
  SidebarContainer,
  FormNewRoom
} from './styles'

export function DashboardLayout(): JSX.Element {
  const outlet = useOutlet()
  const { rooms, writeNewMember } = useContext(RoomContext)
  const { userState, onSignOut } = useContext(AuthContext)

  async function handleSubmit(ev: FormEvent): Promise<void> {
    ev.preventDefault()
    const form = ev.currentTarget as unknown as { roomId: HTMLInputElement }
    const roomId = form.roomId.value

    try {
      if (userState.user != null) {
        await writeNewMember({
          userId: userState.user?.uid,
          roomId
        })
        form.roomId.value = ''
      }
    } catch (error) {
      console.error(error)
    }
  }

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
          <LogoBox>
            <LogoSVG />
            <span>Conversa</span>
          </LogoBox>
        </Header>

        <ActionsBox>
          <button onClick={onSignOut}>Sair</button>
        </ActionsBox>

        <FormNewRoom>
          <header>Entrar em sala</header>

          <form onSubmit={handleSubmit}>
            <input type="text" name="roomId" />
            <button type="submit">Entrar</button>
          </form>
        </FormNewRoom>

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
