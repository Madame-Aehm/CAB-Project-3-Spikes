import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './index.css'
import Error404 from './pages/Error404'
import Homepage from './pages/Homepage'
import Characters from './pages/Characters'
import About from './pages/About'
import AboutDev from './pages/AboutDev'
import AboutCompany from './pages/AboutCompany'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />
  },
  {
    path: "*",
    element: <Error404 />
  },
  {
    path: "/characters",
    element: <Characters />
  },
  {
    path: "/about",
    element: <About />,
    children: [
      {
        path: "developer",
        element: <AboutDev />
      },
      {
        path: "company",
        element: <AboutCompany />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
