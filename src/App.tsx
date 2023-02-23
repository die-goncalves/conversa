import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AuthLayout } from './components/AuthLayout'
import { SignIn } from './pages/SignIn'
import { SignUp } from './pages/SignUp'

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
        path: 'dashboard',
        element: <h1>Dashboard</h1>
      }
    ]
  }
])

function App(): JSX.Element {
  return <RouterProvider router={router} />
}

export default App
