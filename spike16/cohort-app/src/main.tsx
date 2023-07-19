import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
// import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom"
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthContextProvider } from './context/AuthContext.tsx'
import Homepage from './pages/Homepage.tsx'
import Characters from './pages/Characters.tsx'
import ProtectedRoute from './components/ProtectedRoute.tsx'
import Nav from './components/Nav.tsx'


// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Homepage />
//   },
//   {
//     path: '/characters',
//     element: <ProtectedRoute><Characters /></ProtectedRoute>
//   }, 
//   {
//     element: <ProtectedRoute><Outlet /></ProtectedRoute>,
//     children: [
//       {
//         path: '/characters',
//         element: <Characters />
//       }
//     ]
//   }
// ])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthContextProvider>
      <BrowserRouter>
      <Nav />
        <Routes>
          <Route path='/' element={ <Homepage /> } />
          <Route path='/characters' element={ <ProtectedRoute><Characters /></ProtectedRoute> } />
        </Routes>
      </BrowserRouter>
      {/* <RouterProvider router={router} /> */}
    </AuthContextProvider>
      
  </React.StrictMode>,
)
