import { useEffect, useState } from 'react'
import { Dialog } from '../Dialog'
import {
  Anchor,
  DialogContentDescription,
  DialogContentFooter,
  DialogContentHeader,
  DialogContentMain
} from './styles'

export function Presentation(): JSX.Element {
  const [open, setOpen] = useState(false)

  function handlePreventClose(ev: Event): void {
    ev.preventDefault()
  }

  function handleClose(): void {
    const storage = sessionStorage.getItem('@conversa-v0.1.0')
    if (storage != null) {
      const data = JSON.parse(storage)
      sessionStorage.setItem(
        '@conversa-v0.1.0',
        JSON.stringify({ ...data, presentation: false })
      )
    }
  }

  useEffect(() => {
    const storage = sessionStorage.getItem('@conversa-v0.1.0')
    if (storage != null) {
      const data = JSON.parse(storage)
      setOpen(data.presentation)
    } else {
      sessionStorage.setItem(
        '@conversa-v0.1.0',
        JSON.stringify({ presentation: true })
      )
      setOpen(true)
    }
  }, [])

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Content
        onCloseAutoFocus={ev => {
          handleClose()
        }}
        onEscapeKeyDown={ev => {
          handleClose()
        }}
        onPointerDownOutside={handlePreventClose}
        onInteractOutside={handlePreventClose}
        onInteractOverlay={ev => {
          setOpen(false)
          handleClose()
        }}
      >
        <DialogContentHeader>
          <Dialog.Title asChild>Bem vindo!</Dialog.Title>
          <Dialog.Close
            onClick={ev => {
              handleClose()
            }}
          />
        </DialogContentHeader>

        <Dialog.Description asChild>
          <DialogContentDescription>
            Sou Diego Gonçalves e apresento a você o projeto&nbsp;
            <a
              href="https://github.com/die-goncalves/conversa"
              target="_blank"
              rel="noreferrer"
            >
              Conversa
            </a>
          </DialogContentDescription>
        </Dialog.Description>

        <DialogContentMain>
          <div>
            <p>
              Conversa é uma plataforma de conversação que permite a realização
              de bate-papo (apenas texto) e de videoconferência. Cadastre-se,
              crie sua sala de bate-papo e videoconferência, partilhe a sala com
              as pessoas, comece a conversar.
            </p>
            <div>
              O que um usuário na plataforma pode fazer:
              <ul role="list">
                <li>Criar conta</li>
                <li>Iniciar/Encerrar sessão</li>
                <li>Criar salas de bate-papo/video conferência</li>
                <li>
                  Convidar mais pessoas para sua sala compartilhando o id da
                  sala
                </li>
                <li>
                  Excluir, bloquear e adicionar/remover permissão de
                  administrador de pessoas se administrador da sala;
                </li>
                <li>Excluir sala se for administrador dela</li>
                <li>
                  Na sala de videoconferência pode encerrar chamada, desabilitar
                  áudio/video, compartilhar tela e colocar um video em destaque
                </li>
                <li>
                  Na sala de bate-papo pode carregar mensagens antigas até a
                  data que se inscreveu na sala, enviar mensagens e se
                  desbloqueado pode ver novas mensagens sendo carregadas.
                </li>
                <li>Sair de uma sala</li>
              </ul>
            </div>
          </div>

          <Anchor
            href="https://github.com/die-goncalves/conversa"
            target="_blank"
            rel="noreferrer"
          >
            <div>
              <img
                src="data:image/svg+xml;base64,PHN2ZyB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBoZWlnaHQ9IjMyIiBhcmlhLWhpZGRlbj0idHJ1ZSIgdmlld0JveD0iMCAwIDE2IDE2IiB2ZXJzaW9uPSIxLjEiIHdpZHRoPSIzMiIgZGF0YS12aWV3LWNvbXBvbmVudD0idHJ1ZSIgY2xhc3M9Im9jdGljb24gb2N0aWNvbi1tYXJrLWdpdGh1YiB2LWFsaWduLW1pZGRsZSI+CiAgICA8cGF0aCBkPSJNOCAwYzQuNDIgMCA4IDMuNTggOCA4YTguMDEzIDguMDEzIDAgMCAxLTUuNDUgNy41OWMtLjQuMDgtLjU1LS4xNy0uNTUtLjM4IDAtLjI3LjAxLTEuMTMuMDEtMi4yIDAtLjc1LS4yNS0xLjIzLS41NC0xLjQ4IDEuNzgtLjIgMy42NS0uODggMy42NS0zLjk1IDAtLjg4LS4zMS0xLjU5LS44Mi0yLjE1LjA4LS4yLjM2LTEuMDItLjA4LTIuMTIgMCAwLS42Ny0uMjItMi4yLjgyLS42NC0uMTgtMS4zMi0uMjctMi0uMjctLjY4IDAtMS4zNi4wOS0yIC4yNy0xLjUzLTEuMDMtMi4yLS44Mi0yLjItLjgyLS40NCAxLjEtLjE2IDEuOTItLjA4IDIuMTItLjUxLjU2LS44MiAxLjI4LS44MiAyLjE1IDAgMy4wNiAxLjg2IDMuNzUgMy42NCAzLjk1LS4yMy4yLS40NC41NS0uNTEgMS4wNy0uNDYuMjEtMS42MS41NS0yLjMzLS42Ni0uMTUtLjI0LS42LS44My0xLjIzLS44Mi0uNjcuMDEtLjI3LjM4LjAxLjUzLjM0LjE5LjczLjkuODIgMS4xMy4xNi40NS42OCAxLjMxIDIuNjkuOTQgMCAuNjcuMDEgMS4zLjAxIDEuNDkgMCAuMjEtLjE1LjQ1LS41NS4zOEE3Ljk5NSA3Ljk5NSAwIDAgMSAwIDhjMC00LjQyIDMuNTgtOCA4LThaIiBmaWxsPSIjRkZGRkZGIj48L3BhdGg+Cjwvc3ZnPg=="
                alt=""
              />
              <span>Github</span>
            </div>
            <span>die-goncalves/conversa</span>
          </Anchor>
        </DialogContentMain>

        <DialogContentFooter>
          <div>
            <p>Contatos</p>
            <div>
              <Anchor
                href="https://www.linkedin.com/in/diego-goncalves1990"
                target="_blank"
                rel="noreferrer"
              >
                <div>
                  <img
                    src="data:image/svg+xml;base64,PHN2ZyB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgMjQgMjQiIGRhdGEtc3VwcG9ydGVkLWRwcz0iMjR4MjQiIGZpbGw9ImN1cnJlbnRDb2xvciIgY2xhc3M9Im1lcmNhZG8tbWF0Y2giIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgZm9jdXNhYmxlPSJmYWxzZSI+CiAgPHBhdGggZD0iTTIwLjUgMmgtMTdBMS41IDEuNSAwIDAwMiAzLjV2MTdBMS41IDEuNSAwIDAwMy41IDIyaDE3YTEuNSAxLjUgMCAwMDEuNS0xLjV2LTE3QTEuNSAxLjUgMCAwMDIwLjUgMnpNOCAxOUg1di05aDN6TTYuNSA4LjI1QTEuNzUgMS43NSAwIDExOC4zIDYuNWExLjc4IDEuNzggMCAwMS0xLjggMS43NXpNMTkgMTloLTN2LTQuNzRjMC0xLjQyLS42LTEuOTMtMS4zOC0xLjkzQTEuNzQgMS43NCAwIDAwMTMgMTQuMTlhLjY2LjY2IDAgMDAwIC4xNFYxOWgtM3YtOWgyLjl2MS4zYTMuMTEgMy4xMSAwIDAxMi43LTEuNGMxLjU1IDAgMy4zNi44NiAzLjM2IDMuNjZ6IiBmaWxsPSIjMEE2NkMyIj48L3BhdGg+Cjwvc3ZnPg=="
                    alt=""
                  />
                  <span>Linkedin</span>
                </div>
                <span>diego-goncalves1990</span>
              </Anchor>

              <Anchor
                href="mailto:die.goncalves1990@gmail.com"
                target="_blank"
                rel="noreferrer"
              >
                <div>
                  <img
                    src="data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjI1MDAiIHdpZHRoPSIyNTAwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgNDkuNCA1MTIgMzk5LjQyMDAwMDAwMDAwMDEiPjxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+PGcgZmlsbC1ydWxlPSJub256ZXJvIj48cGF0aCBkPSJNMzQuOTEgNDQ4LjgxOGg4MS40NTRWMjUxTDAgMTYzLjcyN1Y0MTMuOTFjMCAxOS4yODcgMTUuNjIyIDM0LjkxIDM0LjkxIDM0LjkxeiIgZmlsbD0iIzQyODVmNCIvPjxwYXRoIGQ9Ik0zOTUuNjM2IDQ0OC44MThoODEuNDU1YzE5LjI4NyAwIDM0LjkwOS0xNS42MjIgMzQuOTA5LTM0LjkwOVYxNjMuNzI3TDM5NS42MzYgMjUxeiIgZmlsbD0iIzM0YTg1MyIvPjxwYXRoIGQ9Ik0zOTUuNjM2IDk5LjcyN1YyNTFMNTEyIDE2My43Mjd2LTQ2LjU0NWMwLTQzLjE0Mi00OS4yNS02Ny43ODItODMuNzgyLTQxLjg5MXoiIGZpbGw9IiNmYmJjMDQiLz48L2c+PHBhdGggZD0iTTExNi4zNjQgMjUxVjk5LjcyN0wyNTYgMjA0LjQ1NSAzOTUuNjM2IDk5LjcyN1YyNTFMMjU2IDM1NS43Mjd6IiBmaWxsPSIjZWE0MzM1Ii8+PHBhdGggZD0iTTAgMTE3LjE4MnY0Ni41NDVMMTE2LjM2NCAyNTFWOTkuNzI3TDgzLjc4MiA3NS4yOTFDNDkuMjUgNDkuNCAwIDc0LjA0IDAgMTE3LjE4eiIgZmlsbD0iI2M1MjIxZiIgZmlsbC1ydWxlPSJub256ZXJvIi8+PC9nPjwvc3ZnPg=="
                    alt=""
                  />
                  <span>Gmail</span>
                </div>
                <span>die.goncalves1990@gmail.com</span>
              </Anchor>
            </div>
          </div>
        </DialogContentFooter>
      </Dialog.Content>
    </Dialog.Root>
  )
}
