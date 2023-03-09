import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { RoomContext } from '../../contexts/RoomContext'
import { SendMessageContainer } from './styles'

interface IMessage {
  text: string
}

const schema = zod.object({
  text: zod.string().min(1, { message: 'Campo obrigatório' })
})

interface IMessageInputProps {
  userId: string
  roomId: string
}
export function MessageInput({
  userId,
  roomId
}: IMessageInputProps): JSX.Element {
  const { writeNewMessage } = useContext(RoomContext)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<IMessage>({
    resolver: zodResolver(schema),
    defaultValues: {
      text: ''
    }
  })

  const onSubmit = async (data: IMessage): Promise<void> => {
    await writeNewMessage({
      roomId,
      userId,
      message: data.text
    })
    reset()

    const rootScrollElement = document.getElementById('root-scroll')
    if (rootScrollElement != null)
      rootScrollElement.scroll({
        top: rootScrollElement.scrollHeight
      })
  }

  return (
    <SendMessageContainer>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          <textarea {...register('text')} />
          <button type="submit">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="48"
              viewBox="0 96 960 960"
              width="48"
            >
              <path d="M120 896V256l760 320-760 320Zm60-93 544-227-544-230v168l242 62-242 60v167Zm0 0V346v457Z" />
            </svg>
          </button>
        </label>
      </form>
    </SendMessageContainer>
  )
}
