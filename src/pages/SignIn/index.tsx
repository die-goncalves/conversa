import { useForm } from 'react-hook-form'
import zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { LogoSVG } from '../../components/LogoSVG'
import {
  Footer,
  Header,
  LogoBox,
  Main,
  PageContainer,
  Separator,
  SignInContainer
} from './styles'
import { useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext'

const schema = zod.object({
  email: zod
    .string()
    .min(1, { message: 'Campo obrigatório' })
    .email('Deve ser um e-mail válido.'),
  password: zod.string().min(6, { message: 'Deve ter no mínimo 6 caracteres' })
})
type Schema = zod.infer<typeof schema>

export function SignIn(): JSX.Element {
  const { onSignInWithEmailAndPassword, onSignInWithGoogle } =
    useContext(AuthContext)
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const onSubmit = async (data: Schema): Promise<void> => {
    await onSignInWithEmailAndPassword({
      email: data.email,
      password: data.password
    })
  }

  return (
    <PageContainer>
      <SignInContainer>
        <LogoBox>
          <LogoSVG />
          <span>Conversa</span>
        </LogoBox>

        <Header>
          <h1>Faça o seu login</h1>
        </Header>

        <Main>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="email">E-mail</label>
            <input
              id="email"
              type="text"
              {...register('email')}
              {...(errors.email != null && {
                'aria-invalid': true,
                'aria-describedby': 'email_error'
              })}
            />
            {errors.email != null && (
              <span id="email_error" role="alert">
                {errors.email.message}
              </span>
            )}

            <label htmlFor="password">Senha</label>
            <input
              id="password"
              type="password"
              {...register('password')}
              {...(errors.password != null && {
                'aria-invalid': true,
                'aria-describedby': 'password_error'
              })}
            />
            {errors.password != null && (
              <span id="password_error" role="alert">
                {errors.password.message}
              </span>
            )}

            <button type="submit">Entrar</button>
          </form>

          <Separator>outras opções</Separator>

          <button onClick={onSignInWithGoogle}>
            <img src="data:image/svg+xml;base64,PHN2ZyBpZD0i0KHQu9C+0LlfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmlld0JveD0iLTM4MC4yIDI3NC43IDY1LjcgNjUuOCI+PHN0eWxlPi5zdDB7ZmlsbDojZTBlMGUwfS5zdDF7ZmlsbDojZmZmfS5zdDJ7Y2xpcC1wYXRoOnVybCgjU1ZHSURfMl8pO2ZpbGw6I2ZiYmMwNX0uc3Qze2NsaXAtcGF0aDp1cmwoI1NWR0lEXzRfKTtmaWxsOiNlYTQzMzV9LnN0NHtjbGlwLXBhdGg6dXJsKCNTVkdJRF82Xyk7ZmlsbDojMzRhODUzfS5zdDV7Y2xpcC1wYXRoOnVybCgjU1ZHSURfOF8pO2ZpbGw6IzQyODVmNH08L3N0eWxlPjxjaXJjbGUgY2xhc3M9InN0MCIgY3g9Ii0zNDcuMyIgY3k9IjMwNy42IiByPSIzMi45Ii8+PGNpcmNsZSBjbGFzcz0ic3QxIiBjeD0iLTM0Ny4zIiBjeT0iMzA3LjEiIHI9IjMyLjQiLz48Zz48ZGVmcz48cGF0aCBpZD0iU1ZHSURfMV8iIGQ9Ik0tMzI2LjMgMzAzLjNoLTIwLjV2OC41aDExLjhjLTEuMSA1LjQtNS43IDguNS0xMS44IDguNS03LjIgMC0xMy01LjgtMTMtMTNzNS44LTEzIDEzLTEzYzMuMSAwIDUuOSAxLjEgOC4xIDIuOWw2LjQtNi40Yy0zLjktMy40LTguOS01LjUtMTQuNS01LjUtMTIuMiAwLTIyIDkuOC0yMiAyMnM5LjggMjIgMjIgMjJjMTEgMCAyMS04IDIxLTIyIDAtMS4zLS4yLTIuNy0uNS00eiIvPjwvZGVmcz48Y2xpcFBhdGggaWQ9IlNWR0lEXzJfIj48dXNlIHhsaW5rOmhyZWY9IiNTVkdJRF8xXyIgb3ZlcmZsb3c9InZpc2libGUiLz48L2NsaXBQYXRoPjxwYXRoIGNsYXNzPSJzdDIiIGQ9Ik0tMzcwLjggMzIwLjN2LTI2bDE3IDEzeiIvPjxkZWZzPjxwYXRoIGlkPSJTVkdJRF8zXyIgZD0iTS0zMjYuMyAzMDMuM2gtMjAuNXY4LjVoMTEuOGMtMS4xIDUuNC01LjcgOC41LTExLjggOC41LTcuMiAwLTEzLTUuOC0xMy0xM3M1LjgtMTMgMTMtMTNjMy4xIDAgNS45IDEuMSA4LjEgMi45bDYuNC02LjRjLTMuOS0zLjQtOC45LTUuNS0xNC41LTUuNS0xMi4yIDAtMjIgOS44LTIyIDIyczkuOCAyMiAyMiAyMmMxMSAwIDIxLTggMjEtMjIgMC0xLjMtLjItMi43LS41LTR6Ii8+PC9kZWZzPjxjbGlwUGF0aCBpZD0iU1ZHSURfNF8iPjx1c2UgeGxpbms6aHJlZj0iI1NWR0lEXzNfIiBvdmVyZmxvdz0idmlzaWJsZSIvPjwvY2xpcFBhdGg+PHBhdGggY2xhc3M9InN0MyIgZD0iTS0zNzAuOCAyOTQuM2wxNyAxMyA3LTYuMSAyNC0zLjl2LTE0aC00OHoiLz48Zz48ZGVmcz48cGF0aCBpZD0iU1ZHSURfNV8iIGQ9Ik0tMzI2LjMgMzAzLjNoLTIwLjV2OC41aDExLjhjLTEuMSA1LjQtNS43IDguNS0xMS44IDguNS03LjIgMC0xMy01LjgtMTMtMTNzNS44LTEzIDEzLTEzYzMuMSAwIDUuOSAxLjEgOC4xIDIuOWw2LjQtNi40Yy0zLjktMy40LTguOS01LjUtMTQuNS01LjUtMTIuMiAwLTIyIDkuOC0yMiAyMnM5LjggMjIgMjIgMjJjMTEgMCAyMS04IDIxLTIyIDAtMS4zLS4yLTIuNy0uNS00eiIvPjwvZGVmcz48Y2xpcFBhdGggaWQ9IlNWR0lEXzZfIj48dXNlIHhsaW5rOmhyZWY9IiNTVkdJRF81XyIgb3ZlcmZsb3c9InZpc2libGUiLz48L2NsaXBQYXRoPjxwYXRoIGNsYXNzPSJzdDQiIGQ9Ik0tMzcwLjggMzIwLjNsMzAtMjMgNy45IDEgMTAuMS0xNXY0OGgtNDh6Ii8+PC9nPjxnPjxkZWZzPjxwYXRoIGlkPSJTVkdJRF83XyIgZD0iTS0zMjYuMyAzMDMuM2gtMjAuNXY4LjVoMTEuOGMtMS4xIDUuNC01LjcgOC41LTExLjggOC41LTcuMiAwLTEzLTUuOC0xMy0xM3M1LjgtMTMgMTMtMTNjMy4xIDAgNS45IDEuMSA4LjEgMi45bDYuNC02LjRjLTMuOS0zLjQtOC45LTUuNS0xNC41LTUuNS0xMi4yIDAtMjIgOS44LTIyIDIyczkuOCAyMiAyMiAyMmMxMSAwIDIxLTggMjEtMjIgMC0xLjMtLjItMi43LS41LTR6Ii8+PC9kZWZzPjxjbGlwUGF0aCBpZD0iU1ZHSURfOF8iPjx1c2UgeGxpbms6aHJlZj0iI1NWR0lEXzdfIiBvdmVyZmxvdz0idmlzaWJsZSIvPjwvY2xpcFBhdGg+PHBhdGggY2xhc3M9InN0NSIgZD0iTS0zMjIuOCAzMzEuM2wtMzEtMjQtNC0zIDM1LTEweiIvPjwvZz48L2c+PC9zdmc+" />
            <span>Entrar com Google</span>
          </button>
          <button>
            <img src="data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjI1MDAiIHZpZXdCb3g9IjExNy44MDYgMTYxLjI4OCA0NjQuMzg4IDM3Ny40MjQiIHdpZHRoPSIyNTAwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Im01ODIuMTk0IDIwNS45NzZjLTE3LjA3OCA3LjU2Ny0zNS40MjQgMTIuNjgtNTQuNzEgMTQuOTkxIDE5LjY3NS0xMS43OCAzNC43NjktMzAuNDc0IDQxLjg4Ni01Mi43MjYtMTguNDA3IDEwLjkyMi0zOC43OTggMTguODU3LTYwLjQ5NyAyMy4xMTEtMTcuMzg1LTE4LjQ4OC00Mi4xMzItMzAuMDY0LTY5LjUzOC0zMC4wNjQtNTIuNjAzIDAtOTUuMjY2IDQyLjY2My05NS4yNjYgOTUuMzA3YTk3LjMgOTcuMyAwIDAgMCAyLjQ1NCAyMS42OGMtNzkuMjExLTMuOTg5LTE0OS4zODMtNDEuOTI4LTE5Ni4zODItOTkuNTYyLTguMTggMTQuMTEyLTEyLjg4NSAzMC40NzQtMTIuODg1IDQ3Ljg5OSAwIDMzLjA1IDE2LjgzMyA2Mi4yMzYgNDIuMzc3IDc5LjMxNGE5NS4wNTEgOTUuMDUxIDAgMCAxIC00My4xNTQtMTEuOTI0djEuMjI3YzAgNDYuMTYgMzIuODI2IDg0LjY3MiA3Ni40MyA5My40MjZhOTUuOTcgOTUuOTcgMCAwIDEgLTI1LjA5NSAzLjMxMyA5NS45MjkgOTUuOTI5IDAgMCAxIC0xNy45MzYtMS42NzdjMTIuMTI4IDM3LjgzNiA0Ny4zMDYgNjUuNDA2IDg5LjAwOCA2Ni4xNDItMzIuNjIyIDI1LjU2NS03My43MSA0MC44MDItMTE4LjMzNyA0MC44MDItNy42OSAwLTE1LjI3OC0uNDUtMjIuNzQzLTEuMzMgNDIuMTczIDI3LjA2IDkyLjI0IDQyLjgwNyAxNDYuMDI5IDQyLjgwNyAxNzUuMjc1IDAgMjcxLjA5NC0xNDUuMTcgMjcxLjA5NC0yNzEuMDczIDAtNC4wOS0uMTAzLTguMjIyLS4yODctMTIuMzEyIDE4LjYxMi0xMy40NTggMzQuNzY5LTMwLjIwOCA0Ny41MS00OS4yOXoiIGZpbGw9IiMxZGExZjIiLz48L3N2Zz4=" />
            <span>Entrar com Twitter</span>
          </button>
          <button>
            <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjUwMCIgaGVpZ2h0PSIyNDMyIiB2aWV3Qm94PSIwIDAgMjU2IDI0OSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJ4TWluWU1pbiBtZWV0Ij48ZyBmaWxsPSIjMTYxNjE0Ij48cGF0aCBkPSJNMTI3LjUwNSAwQzU3LjA5NSAwIDAgNTcuMDg1IDAgMTI3LjUwNWMwIDU2LjMzNiAzNi41MzQgMTA0LjEzIDg3LjE5NiAxMjAuOTkgNi4zNzIgMS4xOCA4LjcxMi0yLjc2NiA4LjcxMi02LjEzNCAwLTMuMDQtLjExOS0xMy4wODUtLjE3My0yMy43MzktMzUuNDczIDcuNzEzLTQyLjk1OC0xNS4wNDQtNDIuOTU4LTE1LjA0NC01LjgtMTQuNzM4LTE0LjE1Ny0xOC42NTYtMTQuMTU3LTE4LjY1Ni0xMS41NjgtNy45MTQuODcyLTcuNzUyLjg3Mi03Ljc1MiAxMi44MDQuOSAxOS41NDYgMTMuMTQgMTkuNTQ2IDEzLjE0IDExLjM3MiAxOS40OTMgMjkuODI4IDEzLjg1NyAzNy4xMDQgMTAuNiAxLjE0NC04LjI0MiA0LjQ0OS0xMy44NjYgOC4wOTUtMTcuMDUtMjguMzItMy4yMjUtNTguMDkyLTE0LjE1OC01OC4wOTItNjMuMDE0IDAtMTMuOTIgNC45ODEtMjUuMjk1IDEzLjEzOC0zNC4yMjQtMS4zMjQtMy4yMTItNS42ODgtMTYuMTggMS4yMzUtMzMuNzQzIDAgMCAxMC43MDctMy40MjcgMzUuMDczIDEzLjA3IDEwLjE3LTIuODI2IDIxLjA3OC00LjI0MiAzMS45MTQtNC4yOSAxMC44MzYuMDQ4IDIxLjc1MiAxLjQ2NCAzMS45NDIgNC4yOSAyNC4zMzctMTYuNDk3IDM1LjAyOS0xMy4wNyAzNS4wMjktMTMuMDcgNi45NCAxNy41NjMgMi41NzQgMzAuNTMxIDEuMjUgMzMuNzQzIDguMTc1IDguOTI5IDEzLjEyMiAyMC4zMDMgMTMuMTIyIDM0LjIyNCAwIDQ4Ljk3Mi0yOS44MjggNTkuNzU2LTU4LjIyIDYyLjkxMiA0LjU3MyAzLjk1NyA4LjY0OCAxMS43MTcgOC42NDggMjMuNjEyIDAgMTcuMDYtLjE0OCAzMC43OTEtLjE0OCAzNC45OTEgMCAzLjM5MyAyLjI5NSA3LjM2OSA4Ljc1OSA2LjExNyA1MC42MzQtMTYuODc5IDg3LjEyMi02NC42NTYgODcuMTIyLTEyMC45NzNDMjU1LjAwOSA1Ny4wODUgMTk3LjkyMiAwIDEyNy41MDUgMCIvPjxwYXRoIGQ9Ik00Ny43NTUgMTgxLjYzNGMtLjI4LjYzMy0xLjI3OC44MjMtMi4xODUuMzg5LS45MjUtLjQxNi0xLjQ0NS0xLjI4LTEuMTQ1LTEuOTE2LjI3NS0uNjUyIDEuMjczLS44MzQgMi4xOTYtLjM5Ni45MjcuNDE1IDEuNDU1IDEuMjg3IDEuMTM0IDEuOTIzTTU0LjAyNyAxODcuMjNjLS42MDguNTY0LTEuNzk3LjMwMi0yLjYwNC0uNTg5LS44MzQtLjg4OS0uOTktMi4wNzctLjM3My0yLjY1LjYyNy0uNTYzIDEuNzgtLjMgMi42MTYuNTkuODM0Ljg5OS45OTYgMi4wOC4zNiAyLjY1TTU4LjMzIDE5NC4zOWMtLjc4Mi41NDMtMi4wNi4wMzQtMi44NDktMS4xLS43ODEtMS4xMzMtLjc4MS0yLjQ5My4wMTctMy4wMzguNzkyLS41NDUgMi4wNS0uMDU1IDIuODUgMS4wNy43OCAxLjE1My43OCAyLjUxMy0uMDE5IDMuMDY5TTY1LjYwNiAyMDIuNjgzYy0uNjk5Ljc3LTIuMTg3LjU2NC0zLjI3Ny0uNDg4LTEuMTE0LTEuMDI4LTEuNDI1LTIuNDg3LS43MjQtMy4yNTguNzA3LS43NzIgMi4yMDQtLjU1NSAzLjMwMi40ODggMS4xMDcgMS4wMjYgMS40NDUgMi40OTYuNyAzLjI1OE03NS4wMSAyMDUuNDgzYy0uMzA3Ljk5OC0xLjc0MSAxLjQ1Mi0zLjE4NSAxLjAyOC0xLjQ0Mi0uNDM3LTIuMzg2LTEuNjA3LTIuMDk1LTIuNjE2LjMtMS4wMDUgMS43NC0xLjQ3OCAzLjE5NS0xLjAyNCAxLjQ0LjQzNSAyLjM4NiAxLjU5NiAyLjA4NiAyLjYxMk04NS43MTQgMjA2LjY3Yy4wMzYgMS4wNTItMS4xODkgMS45MjQtMi43MDUgMS45NDMtMS41MjUuMDMzLTIuNzU4LS44MTgtMi43NzQtMS44NTIgMC0xLjA2MiAxLjE5Ny0xLjkyNiAyLjcyMS0xLjk1MSAxLjUxNi0uMDMgMi43NTguODE1IDIuNzU4IDEuODZNOTYuMjI4IDIwNi4yNjdjLjE4MiAxLjAyNi0uODcyIDIuMDgtMi4zNzcgMi4zNi0xLjQ4LjI3LTIuODUtLjM2My0zLjAzOS0xLjM4LS4xODQtMS4wNTIuODktMi4xMDUgMi4zNjctMi4zNzggMS41MDgtLjI2MiAyLjg1Ny4zNTUgMy4wNDkgMS4zOTgiLz48L2c+PC9zdmc+" />
            <span>Entrar com Github</span>
          </button>
        </Main>

        <Footer>
          <a href="/">Criar conta</a>
        </Footer>
      </SignInContainer>
    </PageContainer>
  )
}
