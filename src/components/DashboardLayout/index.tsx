import { type FormEvent, useContext } from 'react'
import { useOutlet } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext'
import { RoomContext } from '../../contexts/RoomContext'
import { LogoSVG } from '../LogoSVG'
import {
  ActionsBox,
  DashboardLayoutContainer,
  Header,
  StyledNavLink,
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

        <RoomsBox>
          <header>Salas</header>

          {rooms.map(room => (
            <StyledNavLink key={room.id} to={`/dashboard/room/${room.id!}`}>
              <div>
                <img src={room.image} alt="" />
              </div>
              <span>{room.displayName}</span>
            </StyledNavLink>
          ))}
        </RoomsBox>
      </SidebarContainer>
      {outlet}
    </DashboardLayoutContainer>
  )
}
