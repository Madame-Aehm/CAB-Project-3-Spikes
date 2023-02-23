import React, { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'

function ProtectedRoute({ children }) {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <>{ isLoggedIn ? children : <p>You need to log in to view this page</p> }</>
  )
}

export default ProtectedRoute