import { ProgressContainer, ProgressIndicator, ProgressRoot } from './styles'

export function Progress(): JSX.Element {
  return (
    <ProgressContainer id="progress-bar">
      <ProgressRoot value={null}>
        <ProgressIndicator />
      </ProgressRoot>
    </ProgressContainer>
  )
}
