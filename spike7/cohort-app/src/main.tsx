import React from 'react'
import ReactDOM from 'react-dom/client'
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom'
import './index.css'
import Error404 from './pages/Error404'
import Homepage from './pages/Homepage'
import Characters from './pages/Characters'
import About from './pages/About'
import AboutDev from './pages/AboutDev'
import AboutCompany from './pages/AboutCompany'
import WithNav from './components/layouts/WithNav'
import Character from './pages/Character'
import ErrorElement from './components/ErrorElement'

const router = createBrowserRouter([
  {
    element: <WithNav><Outlet /></WithNav>,
    children: [
      {
        path: "/",
        element: <Homepage />
      },
      {
        path: "/characters",
        element: <Characters />,
        loader:async () => {
          return fetch("https://rickandmortyapi.com/api/character");
        },
        errorElement: <ErrorElement />
      },
      {
        path: "/characters/:id",
        element: <Character />,
        loader:async ({ params }) => {
          return fetch(`https://rickandmortyapi.com/api/character/${params.id!}`);
        },
        errorElement: <ErrorElement />
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
    ]
  },
  {
    path: "*",
    element: <Error404 />
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
