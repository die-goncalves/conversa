import { LoadingIndicator, PageContainer } from './styles'

interface ILoadingProps {
  size: number
}
export function Loading({ size }: ILoadingProps): JSX.Element {
  return (
    <PageContainer>
      <LoadingIndicator size={size} />
    </PageContainer>
  )
}
