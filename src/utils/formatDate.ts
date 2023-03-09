import { formatDistance } from 'date-fns'
import ptBr from 'date-fns/locale/pt-BR'

function timeAgo(forwardDate: number, backwardDate: number): string {
  const result = formatDistance(forwardDate, backwardDate, {
    locale: ptBr,
    includeSeconds: true,
    addSuffix: true
  })
  return `~ ${result}`
}

export { timeAgo }
