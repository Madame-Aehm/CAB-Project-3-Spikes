import React, { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { Navigate } from 'react-router-dom'

function ProtectedRoute({ children }) {
  const { user, userChecked } = useContext(AuthContext); 

  return (
    <>
      { userChecked && user ? children : userChecked && !user ? <Navigate to={'/login'} replace={true} /> : <p>Loading...</p> }
    </>
  )
}

export default ProtectedRoute