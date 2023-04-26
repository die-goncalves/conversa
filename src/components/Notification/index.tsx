import { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { onValue, ref, remove, set } from 'firebase/database'
import { database } from '../../services/firebaseConfig'
import { AuthContext } from '../../contexts/AuthContext'
import { notificationFormat } from '../../utils/formatDate'
import {
  NotificationButton,
  StyledDropdownMenuArrow,
  StyledDropdownMenuContent,
  StyledDropdownMenuItemNotification,
  StyledDropdownMenuItemClearAll,
  StyledDropdownMenuItemEmptyList
} from './styles'

interface INotification {
  id: string
  message: string
  status: 'unread' | 'read' | 'removed'
  timestamp: string
}

export function Notification(): JSX.Element {
  const { userState } = useContext(AuthContext)
  const [open, setOpen] = useState(false)
  const [notifications, setNotifications] = useState<INotification[]>()

  useEffect(() => {
    if (userState.user === null) return

    const unsubscribe = onValue(
      ref(database, `notifications/${userState.user.uid}`),
      snapshot => {
        if (snapshot.exists()) {
          const newNotification = Object.entries(
            snapshot.val() as Record<
              string,
              {
                message: string
                status: 'unread' | 'read' | 'removed'
                timestamp: number
              }
            >
          ).map(n => {
            return {
              id: n[0],
              message: n[1].message,
              status: n[1].status,
              timestamp: notificationFormat(n[1].timestamp)
            }
          })
          setNotifications(newNotification)
        } else {
          setNotifications([])
        }
      }
    )

    return () => {
      unsubscribe()
    }
  }, [userState.user])

  const handleReadNotification = useCallback(
    async (id: string) => {
      if (userState.user != null)
        await set(
          ref(database, `notifications/${userState.user.uid}/${id}/status`),
          'read'
        )
    },
    [userState.user]
  )

  const clearAllNotifications = useCallback(async () => {
    if (userState.user != null)
      await remove(ref(database, `notifications/${userState.user?.uid}`))
  }, [userState.user])

  const qtyNotifications = useMemo(() => {
    if (notifications === undefined) return { read: 0, unread: 0, total: 0 }

    return notifications.reduce(
      (acc, currentEl) => {
        if (currentEl.status === 'unread')
          return {
            ...acc,
            unread: acc.unread + 1,
            total: acc.total + 1
          }
        if (currentEl.status === 'read')
          return { ...acc, read: acc.read + 1, total: acc.total + 1 }
        return acc
      },
      { read: 0, unread: 0, total: 0 }
    )
  }, [notifications])

  return (
    <DropdownMenu.Root open={open} onOpenChange={setOpen} modal>
      <DropdownMenu.Trigger asChild>
        <NotificationButton>
          {qtyNotifications.unread !== 0 ? (
            qtyNotifications.unread > 0 && qtyNotifications.unread < 100 ? (
              <span>{qtyNotifications.unread}</span>
            ) : (
              <span>+99</span>
            )
          ) : null}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 96 960 960"
            preserveAspectRatio="xMidYMid meet"
          >
            <path d="M160 856v-60h84V490q0-84 49.5-149.5T424 258v-29q0-23 16.5-38t39.5-15q23 0 39.5 15t16.5 38v29q81 17 131 82.5T717 490v306h83v60H160Zm320-295Zm0 415q-32 0-56-23.5T400 896h160q0 33-23.5 56.5T480 976ZM304 796h353V490q0-74-51-126t-125-52q-74 0-125.5 52T304 490v306Z" />
          </svg>
        </NotificationButton>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <StyledDropdownMenuContent sideOffset={8}>
          {notifications?.map(n => {
            return (
              <StyledDropdownMenuItemNotification
                status={n.status}
                disabled={n.status === 'read'}
                key={n.id}
                {...(n.status === 'unread' && {
                  onSelect: ev => {
                    ev.preventDefault()
                    void handleReadNotification(n.id)
                  }
                })}
              >
                {n.status === 'unread' ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 96 960 960"
                    preserveAspectRatio="xMidYMid meet"
                  >
                    <path d="M140 896q-24 0-42-18t-18-42V316q0-24 18-42t42-18h434q-3 15-4 30t1 30H145l335 218 151-98q10 9 21 16.673 11 7.673 23 13.327L480 594 140 371v465h680V476q16.794-4.783 31.397-13.391Q866 454 880 443v393q0 24-18 42t-42 18H140Zm0-580v520-520Zm619.882 90Q714 406 682 373.882q-32-32.117-32-78Q650 250 682.118 218q32.117-32 78-32Q806 186 838 218.118q32 32.117 32 78Q870 342 837.882 374q-32.117 32-78 32Z" />
                  </svg>
                ) : (
                  n.status === 'read' && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 96 960 960"
                      preserveAspectRatio="xMidYMid meet"
                    >
                      <path d="M633 976 472 815l43-43 118 118 244-244 43 43-287 287ZM478 529l334-213H144l334 213Zm0 60L140 372v452h256l60 60H140q-24 0-42-18t-18-42V316q0-24 18-42t42-18h677q24 0 42 18t18 42v244l-60 60V372L478 589Zm1 9Zm-1-69Zm1 60Z" />
                    </svg>
                  )
                )}

                <div>
                  <p>{n.message}</p>
                  <span>{n.timestamp}</span>
                </div>
              </StyledDropdownMenuItemNotification>
            )
          })}

          {qtyNotifications.total === 0 ? (
            <StyledDropdownMenuItemEmptyList disabled>
              Sem notificações
            </StyledDropdownMenuItemEmptyList>
          ) : (
            <StyledDropdownMenuItemClearAll
              onSelect={async ev => {
                ev.preventDefault()
                await clearAllNotifications()
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 96 960 960"
                preserveAspectRatio="xMidYMid meet"
              >
                <path d="M120 776v-60h560v60H120Zm80-170v-60h560v60H200Zm80-170v-60h560v60H280Z" />
              </svg>
              Excluir todas as mensagens
            </StyledDropdownMenuItemClearAll>
          )}

          <StyledDropdownMenuArrow className="DropdownMenuArrow" />
        </StyledDropdownMenuContent>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}
