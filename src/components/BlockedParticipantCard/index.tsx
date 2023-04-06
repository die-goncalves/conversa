import { useEffect, useMemo, useState } from 'react'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { get, ref, remove } from 'firebase/database'
import { database } from '../../services/firebaseConfig'
import {
  DropdownMenuParticipantCard,
  ParticipantCardContainer,
  StyledDropdownMenuArrow,
  StyledDropdownMenuContent,
  StyledDropdownMenuItem
} from './styles'

interface IBlockedParticipantCard {
  roomId: string
  userId: string | undefined
  participantId: string
  adms: Record<
    string,
    {
      displayName: string
      email: string
      isAnonymous: boolean
      photoURL: string
    }
  >
}

export function BlockedParticipantCard({
  roomId,
  userId,
  participantId,
  adms
}: IBlockedParticipantCard): JSX.Element | null {
  console.log(participantId)
  const [participant, setParticipant] = useState<
    Record<
      string,
      {
        displayName: string
        email: string
        isAnonymous: boolean
        photoURL: string
      }
    >
  >()
  async function handleUnblockParticipant(
    participantId: string
  ): Promise<void> {
    await remove(ref(database, `rooms/${roomId}/blocked/${participantId}`))
  }

  const isUserAdm = useMemo(() => {
    return userId !== undefined && Object.keys(adms).includes(userId)
  }, [userId, adms])

  useEffect(() => {
    void (async () => {
      const res = await get(ref(database, `users/${participantId}`))
      if (res.exists()) {
        if (res.key != null) setParticipant({ [res.key]: res.val() })
      }
    })()
  }, [participantId])

  if (participant === undefined) return null

  if (!isUserAdm) {
    return (
      <ParticipantCardContainer>
        <img src={Object.values(participant)[0].photoURL} alt="" />
        <div>
          <span>{Object.values(participant)[0].displayName}</span>
          <span>{Object.values(participant)[0].email}</span>
        </div>
      </ParticipantCardContainer>
    )
  }

  return (
    <DropdownMenu.Root modal>
      <DropdownMenu.Trigger asChild>
        <DropdownMenuParticipantCard aria-label="Desbloquear participante">
          <img src={Object.values(participant)[0].photoURL} alt="" />
          <div>
            <span>{Object.values(participant)[0].displayName}</span>
            <span>{Object.values(participant)[0].email}</span>
          </div>
        </DropdownMenuParticipantCard>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <StyledDropdownMenuContent sideOffset={8}>
          <StyledDropdownMenuItem
            onClick={() => {
              handleUnblockParticipant(Object.keys(participant)[0]).catch(
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
              <path d="M200 606v-60h560v60H200Z" />
            </svg>
            <span>Desbloquear participante</span>
          </StyledDropdownMenuItem>

          <StyledDropdownMenuArrow className="DropdownMenuArrow" />
        </StyledDropdownMenuContent>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}
