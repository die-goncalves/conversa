import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AuthLayout } from './components/AuthLayout'
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
