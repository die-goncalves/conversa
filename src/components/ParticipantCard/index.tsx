import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { useMemo } from 'react'
import {
  child,
  get,
  push,
  ref,
  remove,
  serverTimestamp,
  set
} from 'firebase/database'
import { toast } from 'react-toastify'
import { database } from '../../services/firebaseConfig'
import {
  DropdownMenuParticipantCard,
  ParticipantCardContainer,
  StyledDropdownMenuArrow,
  StyledDropdownMenuContent,
  StyledDropdownMenuItem
} from './styles'

interface IParticipantCard {
  userId: string | undefined
  roomId: string
  adms: Record<
    string,
    {
      displayName: string
      email: string
      isAnonymous: boolean
      photoURL: string
    }
  >
  participant: Record<
    string,
    {
      displayName: string
      email: string
      isAnonymous: boolean
      photoURL: string
    }
  >
  blocked: Record<string, boolean>
}

export function ParticipantCard({
  userId,
  adms,
  blocked,
  roomId,
  participant
}: IParticipantCard): JSX.Element | null {
  async function handleRemoveParticipant(participantId: string): Promise<void> {
    try {
      const userDisplayName = (
        await get(ref(database, `users/${participantId}/displayName`))
      ).val() as string

      await set(push(child(ref(database), `messages/${roomId}`)), {
        message: `${userDisplayName} saiu da sala`,
        type: 'exit',
        timestamp: serverTimestamp()
      })

      const roomDisplayName = (
        await get(ref(database, `rooms/${roomId}/displayName`))
      ).val() as string

      await set(push(child(ref(database), `notifications/${participantId}`)), {
        message: `Você foi expulso da sala ${roomDisplayName}`,
        status: 'unread',
        timestamp: serverTimestamp()
      })

      await remove(ref(database, `rooms/${roomId}/adms/${participantId}`))
      await remove(ref(database, `rooms/${roomId}/users/${participantId}`))

      await remove(ref(database, `users/${participantId}/rooms/${roomId}`))
      toast.success(`${userDisplayName} foi removido da sala.`)
    } catch (error) {
      toast.error('Falha ao remover participante.')
      console.error(error)
    }
  }

  async function handleAddParticipantAdm(participantId: string): Promise<void> {
    try {
      const userDisplayName = (
        await get(ref(database, `users/${participantId}/displayName`))
      ).val() as string

      await set(ref(database, `rooms/${roomId}/adms/${participantId}`), true)
      await remove(ref(database, `rooms/${roomId}/blocked/${participantId}`))

      const roomDisplayName = (
        await get(ref(database, `rooms/${roomId}/displayName`))
      ).val() as string

      await set(push(child(ref(database), `notifications/${participantId}`)), {
        message: `Você virou administrador da sala ${roomDisplayName}`,
        status: 'unread',
        timestamp: serverTimestamp()
      })
      toast.success(`${userDisplayName} virou administrador da sala.`)
    } catch (error) {
      toast.error(
        'Falha ao adicionar permissão de administrador à participante.'
      )
      console.error(error)
    }
  }

  async function handleRemoveParticipantAdm(
    participantId: string
  ): Promise<void> {
    try {
      const userDisplayName = (
        await get(ref(database, `users/${participantId}/displayName`))
      ).val() as string

      await remove(ref(database, `rooms/${roomId}/adms/${participantId}`))

      const roomDisplayName = (
        await get(ref(database, `rooms/${roomId}/displayName`))
      ).val() as string

      await set(push(child(ref(database), `notifications/${participantId}`)), {
        message: `Você não é mais administrador da sala ${roomDisplayName}`,
        status: 'unread',
        timestamp: serverTimestamp()
      })
      toast.success(`${userDisplayName} não é mais administrador da sala.`)
    } catch (error) {
      toast.error(
        'Falha ao remover permissão de administrador de participante.'
      )
      console.error(error)
    }
  }

  async function handleBlockParticipant(participantId: string): Promise<void> {
    try {
      const userDisplayName = (
        await get(ref(database, `users/${participantId}/displayName`))
      ).val() as string

      await set(ref(database, `rooms/${roomId}/blocked/${participantId}`), true)

      const roomDisplayName = (
        await get(ref(database, `rooms/${roomId}/displayName`))
      ).val() as string

      await set(push(child(ref(database), `notifications/${participantId}`)), {
        message: `Você foi bloqueado na sala ${roomDisplayName}`,
        status: 'unread',
        timestamp: serverTimestamp()
      })
      toast.success(`${userDisplayName} foi bloqueado da sala.`)
    } catch (error) {
      toast.error('Falha ao bloquear participante.')
      console.error(error)
    }
  }

  const isParticipantAdm = useMemo(() => {
    return Object.keys(adms).includes(Object.keys(participant)[0])
  }, [adms, participant])

  const isUserAdm = useMemo(() => {
    return userId !== undefined && Object.keys(adms).includes(userId)
  }, [userId, adms])

  const isBlocked = Object.entries(blocked).find(
    el => el[0] === Object.keys(participant)[0]
  )?.[1]

  if (
    !isUserAdm ||
    (userId !== undefined && userId === Object.keys(participant)[0])
  ) {
    return (
      <ParticipantCardContainer
        {...(isParticipantAdm && {
          className: 'adm'
        })}
        aria-label="Customize options"
      >
        <img src={Object.values(participant)[0].photoURL} alt="" />
        <div>
          <span>{Object.values(participant)[0].displayName}</span>
          <span>{Object.values(participant)[0].email}</span>
        </div>

        {isParticipantAdm && (
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="48"
              viewBox="0 96 960 960"
              width="48"
            >
              <path d="M480 976q-140-35-230-162.5T160 534V296l320-120 320 120v238q0 152-90 279.5T480 976Zm0-62q106-35 175.5-128.5T737 576H480V241l-260 97v196q0 12 .5 20.5T223 576h257v338Z" />
            </svg>
          </div>
        )}
      </ParticipantCardContainer>
    )
  }

  return (
    <DropdownMenu.Root modal>
      <DropdownMenu.Trigger asChild>
        <DropdownMenuParticipantCard
          {...(isParticipantAdm && {
            className: 'adm'
          })}
          aria-label="Customize options"
        >
          <img src={Object.values(participant)[0].photoURL} alt="" />
          <div>
            <span>{Object.values(participant)[0].displayName}</span>
            <span>{Object.values(participant)[0].email}</span>
          </div>

          {isParticipantAdm && (
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="48"
                viewBox="0 96 960 960"
                width="48"
              >
                <path d="M480 976q-140-35-230-162.5T160 534V296l320-120 320 120v238q0 152-90 279.5T480 976Zm0-62q106-35 175.5-128.5T737 576H480V241l-260 97v196q0 12 .5 20.5T223 576h257v338Z" />
              </svg>
            </div>
          )}
        </DropdownMenuParticipantCard>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <StyledDropdownMenuContent sideOffset={8}>
          <StyledDropdownMenuItem
            onClick={() => {
              handleRemoveParticipant(Object.keys(participant)[0]).catch(
                error => {
                  console.error(error)
                }
              )
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="48"
              viewBox="0 96 960 960"
              width="48"
            >
              <path d="m361 757 119-121 120 121 47-48-119-121 119-121-47-48-120 121-119-121-48 48 120 121-120 121 48 48ZM261 936q-24 0-42-18t-18-42V306h-41v-60h188v-30h264v30h188v60h-41v570q0 24-18 42t-42 18H261Zm438-630H261v570h438V306Zm-438 0v570-570Z" />
            </svg>
            <span>Excluir da sala</span>
          </StyledDropdownMenuItem>

          {!(isBlocked ?? false) && !isParticipantAdm && (
            <StyledDropdownMenuItem
              onClick={() => {
                handleBlockParticipant(Object.keys(participant)[0]).catch(
                  error => {
                    console.error(error)
                  }
                )
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="48"
                viewBox="0 96 960 960"
                width="48"
              >
                <path d="M480 976q-83 0-156-31.5T197 859q-54-54-85.5-127T80 576q0-83 31.5-156T197 293q54-54 127-85.5T480 176q83 0 156 31.5T763 293q54 54 85.5 127T880 576q0 83-31.5 156T763 859q-54 54-127 85.5T480 976Zm0-60q142.375 0 241.188-98.812Q820 718.375 820 576q0-60.662-21-116.831Q778 403 740 357L261 836q45 39 101.493 59.5Q418.987 916 480 916ZM221 795l478-478q-46-39-102.169-60T480 236q-142.375 0-241.188 98.812Q140 433.625 140 576q0 61.013 22 117.506Q184 750 221 795Z" />
              </svg>
              <span>Bloquear</span>
            </StyledDropdownMenuItem>
          )}

          {isParticipantAdm ? (
            <StyledDropdownMenuItem
              onClick={() => {
                handleRemoveParticipantAdm(Object.keys(participant)[0]).catch(
                  error => {
                    console.error(error)
                  }
                )
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="48"
                viewBox="0 96 960 960"
                width="48"
              >
                <path d="m743 761-45-46q20-35 31-89.5t11-93.5V336l-260-96-188 69-46-46 234-88 320 119v238q0 59.444-15 117.722Q770 708 743 761Zm67 238L670 861q-44 44-90 72t-100 42q-143-39-231.5-164.431Q160 685.137 160 532V349L55 244l43-43 755 755-43 43ZM426 616Zm73-101Zm-19 398q42.071-14.02 80.535-39.51Q599 848 628 818L220 409v123q0 130.103 73 236.552Q366 875 480 913Z" />
              </svg>
              <span>Remover permissão de administrador</span>
            </StyledDropdownMenuItem>
          ) : (
            <StyledDropdownMenuItem
              className="add-adm"
              onClick={() => {
                handleAddParticipantAdm(Object.keys(participant)[0]).catch(
                  error => {
                    console.error(error)
                  }
                )
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="48"
                viewBox="0 96 960 960"
                width="48"
              >
                <path d="M480 976q-138-32-229-156.5T160 534V295l320-120 320 120v270q-14-7-30-12.5t-30-7.5V337l-260-96-260 96v197q0 76 24.5 140T307 786.5q38 48.5 84 80.5t89 46q6 12 18 27t20 23q-9 5-19 7.5t-19 5.5Zm212.5 0Q615 976 560 920.5T505 789q0-78.435 54.99-133.718Q614.98 600 693 600q77 0 132.5 55.282Q881 710.565 881 789q0 76-55.5 131.5t-133 55.5ZM678 916h33V806h110v-33H711V663h-33v110H568v33h110v110ZM480 577Z" />
              </svg>
              <span>Adicionar permissão de administrador</span>
            </StyledDropdownMenuItem>
          )}

          <StyledDropdownMenuArrow className="DropdownMenuArrow" />
        </StyledDropdownMenuContent>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}
