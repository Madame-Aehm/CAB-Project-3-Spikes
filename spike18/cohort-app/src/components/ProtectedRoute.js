import React, { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'

function ProtectedRoute({ children }) {
  const { user } = useContext(AuthContext); //make custom hook!

  return (
    <>{ user ? children : <p>You need to log in to view this page</p> }</>
  )
}

export default ProtectedRoute