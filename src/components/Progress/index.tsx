import * as ProgressRadix from '@radix-ui/react-progress'
import { ProgressContainer } from './styles'

interface IProgressProps {
  id: string
}
export function Progress({ id }: IProgressProps): JSX.Element {
  return (
    <ProgressContainer id={id}>
      <ProgressRadix.Root className="ProgressRoot" value={null}>
        <ProgressRadix.Indicator className="ProgressIndicator" />
      </ProgressRadix.Root>
    </ProgressContainer>
  )
}
