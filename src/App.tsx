import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { SignIn } from './pages/SignIn'
import { SignUp } from './pages/SignUp'
import { AuthLayout } from './components/AuthLayout'
import { ProtectedLayout } from './components/ProtectedLayout'

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
            element: <h1>Dashboard</h1>
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
