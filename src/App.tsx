import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { SignIn } from './pages/SignIn'
import { SignUp } from './pages/SignUp'
import { Dashboard } from './pages/Dashboard'
import { Room } from './pages/Room'
import { Call } from './pages/Call'
import { Details } from './pages/Details'
import { AuthLayout } from './components/AuthLayout'
import { ProtectedLayout } from './components/ProtectedLayout'

const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      {
        path: '/',
        element: <SignUp />
      },
      {
        index: true,
        path: '/signin',
        element: <SignIn />
      },
      {
        element: <ProtectedLayout />,
        children: [
          {
            path: '/dashboard',
            element: <Dashboard />
          },
          {
            path: '/dashboard/room/:roomId',
            element: <Room />,
            loader: ({ params }) => ({
              roomId: params.roomId
            })
          },
          {
            path: '/dashboard/room/:roomId/detail',
            element: <Details />,
            loader: async ({ params }) => {
              if (params.roomId !== undefined)
                return {
                  roomId: params.roomId
                }
            }
          },
          {
            path: '/dashboard/call/:callId',
            element: <Call />,
            loader: ({ params }) => ({
              callId: params.callId
            })
          },
          {
            path: '/dashboard/call/:callId/detail',
            element: <Details />,
            loader: async ({ params }) => {
              if (params.callId !== undefined)
                return {
                  roomId: params.callId
                }
            }
          }
        ]
      }
    ]
  }
])

function App(): JSX.Element {
  return <RouterProvider router={router} />
}

export default App
