import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { SignIn } from './pages/SignIn'
import { SignUp } from './pages/SignUp'
import { Dashboard } from './pages/Dashboard'
import { Room } from './pages/Room'
import { Call } from './pages/Call'
import { Details } from './pages/Details'
import { AuthLayout } from './components/AuthLayout'
import { ProtectedLayout } from './components/ProtectedLayout'
import { DashboardLayout } from './components/DashboardLayout'

const router = createBrowserRouter([
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <SignUp />
      },
      {
        path: 'signin',
        element: <SignIn />
      },
      {
        element: <ProtectedLayout />,
        children: [
          {
            path: 'dashboard',
            element: <DashboardLayout />,
            children: [
              {
                index: true,
                element: <Dashboard />
              },
              {
                path: 'room',
                children: [
                  {
                    path: ':roomId',
                    children: [
                      {
                        index: true,
                        element: <Room />,
                        loader: ({ params }) => ({
                          roomId: params.roomId
                        })
                      },
                      {
                        path: 'detail',
                        element: <Details />,
                        loader: async ({ params }) => {
                          if (params.roomId !== undefined)
                            return {
                              roomId: params.roomId
                            }
                        }
                      }
                    ]
                  }
                ]
              },
              {
                path: 'call',
                children: [
                  {
                    path: ':callId',
                    children: [
                      {
                        index: true,
                        element: <Call />,
                        loader: ({ params }) => ({
                          callId: params.callId
                        })
                      },
                      {
                        path: 'detail',
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
            ]
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
