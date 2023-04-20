import { format, formatDistance } from 'date-fns'
import ptBr from 'date-fns/locale/pt-BR'

function timeAgo(forwardDate: number, backwardDate: number): string {
  const result = formatDistance(forwardDate, backwardDate, {
    locale: ptBr,
    includeSeconds: true,
    addSuffix: true
  })
  return `~ ${result}`
}

function notificationFormat(timestamp: number): string {
  return format(timestamp, "HH:mm:ss dd'/'MM'/'yyyy", {
    locale: ptBr
  })
}

export { timeAgo, notificationFormat }
