import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { RoomContext } from '../../contexts/RoomContext'
import { AuthContext } from '../../contexts/AuthContext'
import { ContentContainer, DashboardContainer, FormContainer } from './styles'

const schema = zod.object({
  room: zod.string().min(1, { message: 'Campo obrigatório' }),
  image: zod
    .instanceof(FileList)
    .refine(files => Object.entries(files).length >= 1, {
      message: 'Campo obrigatório'
    }),
  type: zod.enum(['chat', 'voice', 'video'], {
    invalid_type_error: 'Nenhuma opção selecionada'
  })
})
type Schema = zod.infer<typeof schema>

export function Dashboard(): JSX.Element {
  const { writeNewRoom } = useContext(RoomContext)
  const { userState } = useContext(AuthContext)
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: {
      room: ''
    }
  })

  const onSubmit = async (data: Schema): Promise<void> => {
    if (userState.user != null) {
      await writeNewRoom({
        owner: userState.user.uid,
        displayName: data.room,
        type: data.type,
        image: data.image
      })
    }
  }

  return (
    <DashboardContainer>
      <ContentContainer>
        <FormContainer>
          <h1>Criação de sala</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <fieldset>
              <legend>Tipo da sala</legend>

              <div>
                <div>
                  <input
                    id="chat"
                    type="radio"
                    value="chat"
                    {...register('type', { required: true })}
                    {...(errors.type != null && {
                      'aria-invalid': true,
                      'aria-describedby': 'type_error'
                    })}
                  />
                  <label htmlFor="chat">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="48"
                      viewBox="0 96 960 960"
                      width="48"
                    >
                      <path d="M240 657h313v-60H240v60Zm0-130h480v-60H240v60Zm0-130h480v-60H240v60ZM80 976V236q0-23 18-41.5t42-18.5h680q23 0 41.5 18.5T880 236v520q0 23-18.5 41.5T820 816H240L80 976Zm60-145 75-75h605V236H140v595Zm0-595v595-595Z" />
                    </svg>
                    <span>Texto</span>
                  </label>
                </div>

                <div>
                  <input
                    id="voice"
                    type="radio"
                    value="voice"
                    {...register('type', { required: true })}
                    {...(errors.type != null && {
                      'aria-invalid': true,
                      'aria-describedby': 'type_error'
                    })}
                  />
                  <label htmlFor="voice">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="48"
                      viewBox="0 96 960 960"
                      width="48"
                    >
                      <path d="M480 633q-43 0-72-30.917-29-30.916-29-75.083V276q0-41.667 29.441-70.833Q437.882 176 479.941 176t71.559 29.167Q581 234.333 581 276v251q0 44.167-29 75.083Q523 633 480 633Zm0-228Zm-30 531V800q-106-11-178-89t-72-184h60q0 91 64.288 153t155.5 62Q571 742 635.5 680 700 618 700 527h60q0 106-72 184t-178 89v136h-60Zm30-363q18 0 29.5-13.5T521 527V276q0-17-11.788-28.5Q497.425 236 480 236q-17.425 0-29.212 11.5Q439 259 439 276v251q0 19 11.5 32.5T480 573Z" />
                    </svg>
                    <span>Voz</span>
                  </label>
                </div>

                <div>
                  <input
                    id="video"
                    type="radio"
                    value="video"
                    {...register('type', { required: true })}
                    {...(errors.type != null && {
                      'aria-invalid': true,
                      'aria-describedby': 'type_error'
                    })}
                  />
                  <label htmlFor="video">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="48"
                      viewBox="0 96 960 960"
                      width="48"
                    >
                      <path d="M454 454h345q-28-74-89-130.5T571 246L454 454Zm-93 83 174-299q-12-1-27-1.5t-28-.5q-72 0-132 26t-108 72l121 203ZM150 663h237L217 360q-38 45-57.5 100.5T140 576q0 21 2 44t8 43Zm240 242 120-207H162q28 74 88.5 130.5T390 905Zm90 11q72 0 132.5-26T720 818L600 615 425 914q13 1 27.5 1.5t27.5.5Zm264-124q34-42 55-99t21-117q0-22-2-44.5t-7-43.5H574l170 304ZM480 576Zm0 400q-82 0-155-31.5t-127.5-86Q143 804 111.5 731T80 576q0-83 31.5-155.5t86-127Q252 239 325 207.5T480 176q83 0 155.5 31.5t127 86q54.5 54.5 86 127T880 576q0 82-31.5 155t-86 127.5q-54.5 54.5-127 86T480 976Z" />
                    </svg>
                    <span>Vídeo</span>
                  </label>
                </div>
              </div>

              {errors.type != null && (
                <span id="type_error" role="alert">
                  {errors.type.message}
                </span>
              )}
            </fieldset>

            <div>
              <label htmlFor="room">Nome da sala</label>
              <input
                id="room"
                type="text"
                {...register('room')}
                {...(errors.room != null && {
                  'aria-invalid': true,
                  'aria-describedby': 'room_error'
                })}
              />
              {errors.room != null && (
                <span id="room_error" role="alert">
                  {errors.room.message}
                </span>
              )}
            </div>

            <div>
              <label htmlFor="image">Imagem da sala</label>
              <input
                id="image"
                type="file"
                accept="image/*"
                {...register('image')}
                {...(errors.image != null && {
                  'aria-invalid': true,
                  'aria-describedby': 'image_error'
                })}
              />
              {errors.image != null && (
                <span id="image_error" role="alert">
                  {errors.image.message}
                </span>
              )}
            </div>

            <button type="submit">Criar</button>
          </form>
        </FormContainer>
      </ContentContainer>
    </DashboardContainer>
  )
}
