import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AuthLayout } from './components/AuthLayout'
import { ProtectedLayout } from './components/ProtectedLayout'

import { SignUp } from './routes/signup'
import { SignIn } from './routes/signin'
import {
  Element as ChatRoom,
  loader as chatRoomLoader
} from './routes/chat-room'
import { Root } from './routes/root'
import { Index } from './routes/index'
import {
  Element as RoomDetails,
  loader as roomDetailsLoader
} from './routes/room-details'
import {
  Element as CallRoom,
  loader as callRoomLoader
} from './routes/call-room'

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
            element: <Root />,
            children: [
              { index: true, element: <Index /> },
              {
                path: 'chat/:roomId',
                element: <ChatRoom />,
                loader: chatRoomLoader
              },
              {
                path: 'chat/:roomId/detail',
                element: <RoomDetails />,
                loader: roomDetailsLoader
              },
              {
                path: 'call/:roomId',
                element: <CallRoom />,
                loader: callRoomLoader
              },
              {
                path: 'call/:roomId/detail',
                element: <RoomDetails />,
                loader: roomDetailsLoader
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
