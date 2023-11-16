import { Outlet } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive'
import { Layout } from './styles'
import { SidebarMenu } from '../../components/SidebarMenu'

export function Root(): JSX.Element {
  const isLargerThan768 = useMediaQuery({
    query: '(min-width: 768px)'
  })

  return (
    <Layout>
      {isLargerThan768 && <SidebarMenu />}

      <Outlet />
    </Layout>
  )
}
