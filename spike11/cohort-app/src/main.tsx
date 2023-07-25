import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom"
// import { BrowserRouter, Routes, Route, Outlet, } from 'react-router-dom'
import { AuthContextProvider } from './context/AuthContext.tsx'
import Homepage from './pages/Homepage.tsx'
import Characters from './pages/Characters.tsx'
import ProtectedRoute from './components/ProtectedRoute.tsx'
// import Nav from './components/Nav.tsx'
import Login from './pages/Login.tsx'
import Chat from './pages/Chat.tsx'
import NavLayout from './components/NavLayout.tsx'
import Error404 from './pages/Error404.tsx'
import LiveChat from './pages/LiveChat.tsx'


const protectedRoutes = [
  {
    path: '/characters',
    element: <Characters />
  },
  {
    path: '/chatroom',
    element: <Chat />
  },
  {
    path: '/live-chat',
    element: <LiveChat />
  }
]
const navLayoutRoutes = [
  {
    path: "/",
    element: <Homepage />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    element: <ProtectedRoute><Outlet /></ProtectedRoute>,
    children: protectedRoutes
  }
]

const router = createBrowserRouter([
  {
    element: <NavLayout><Outlet /></NavLayout>,
    children: navLayoutRoutes
  },
  {
    path: "*",
    element: <Error404 />
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthContextProvider>
      {/* <BrowserRouter>
      <Nav />
        <Routes>
          <Route path='/' element={ <Homepage /> } />
          <Route path='/login' element={ <Login /> } />
          <Route element={<ProtectedRoute><Outlet /></ProtectedRoute>}>
            <Route path='/characters' element={ <Characters /> } />
            <Route path='/chatroom' element={ <Chat /> } />
            <Route path= '/live-chat' element={ <LiveChat /> } />
          </Route>
        </Routes>
      </BrowserRouter> */}
      <RouterProvider router={router} />
    </AuthContextProvider>
  </React.StrictMode>,
)
