import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { AuthContext } from '../../contexts/AuthContext'
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
          <LogoSVG animation />
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
        </Main>

        <Footer>
          <Link to="/">Criar conta</Link>
        </Footer>
      </SignInContainer>
    </PageContainer>
  )
}
