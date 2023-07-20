import { useContext, type ReactNode } from 'react'
import { AuthContext } from '../context/AuthContext'
import { Navigate } from 'react-router-dom'

type Props = {
  children: ReactNode
}

const ProtectedRoute = ({ children }: Props) => {
  const { user, userChecked } = useContext(AuthContext);
  return (
    userChecked ?
      user ?
        (
          <>
            { children }
          </>
        ) 
      : <Navigate to={"/"} replace={true} /> 
    : <p>Searching for active user...</p>)
}

export default ProtectedRoute