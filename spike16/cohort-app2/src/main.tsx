import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
// import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Homepage from './pages/Homepage.tsx'
import NewPage from './pages/NewPage.tsx'
import { AuthContext } from './context/AuthContext.ts'

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <AuthContext.Provider value={{ user: false }}><Homepage /></AuthContext.Provider>
//   },
//   {
//     path: "/new-page",
//     element: <NewPage />
//   }
// ])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthContext.Provider value={{ user: false }}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={ <Homepage /> } />
          <Route path='/new-page' element={ <NewPage /> } />
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
      {/* <RouterProvider router={router} /> */}
  </React.StrictMode>,
)
