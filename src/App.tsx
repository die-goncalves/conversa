import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { SignIn } from './pages/SignIn'
import { SignUp } from './pages/SignUp'
import { Dashboard } from './pages/Dashboard'
import { Room } from './pages/Room'
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
                path: 'room/:roomId',
                element: <Room />,
                loader: ({ params }) => ({
                  roomId: params.roomId
                })
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
