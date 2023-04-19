import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { database } from '../../services/firebaseConfig'
import { get, ref } from 'firebase/database'
import { AuthContext } from '../../contexts/AuthContext'
import { RoomContext } from '../../contexts/RoomContext'
import { FormJoinRoomContainer } from './styles'

const schema = zod.object({
  roomId: zod.string().min(1, { message: 'Campo obrigatório' })
})
type Schema = zod.infer<typeof schema>

export function FormJoinRoom(): JSX.Element {
  const { userState } = useContext(AuthContext)
  const { writeNewMember } = useContext(RoomContext)
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: {
      roomId: ''
    }
  })

  const onSubmit = async (data: Schema): Promise<void> => {
    try {
      const res = await get(
        ref(
          database,
          `rooms/${data.roomId}/blocked/${userState.user?.uid ?? ''}`
        )
      )

      if (!res.exists()) {
        if (userState.user != null) {
          await writeNewMember({
            userId: userState.user?.uid,
            roomId: data.roomId
          })
        }
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <FormJoinRoomContainer onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="roomId">Id da sala</label>
      <input
        id="roomId"
        type="text"
        {...register('roomId')}
        {...(errors.roomId != null && {
          'aria-invalid': true,
          'aria-describedby': 'roomId_error'
        })}
      />
      {errors.roomId != null && (
        <span id="roomId_error" role="alert">
          {errors.roomId.message}
        </span>
      )}

      <button type="submit">Entrar</button>
    </FormJoinRoomContainer>
  )
}
