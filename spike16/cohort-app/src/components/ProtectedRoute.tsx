import { useContext, type ReactNode } from 'react'
import { AuthContext } from '../context/AuthContext'
import { Navigate } from 'react-router-dom'

type Props = {
  children: ReactNode
}

const ProtectedRoute = ({ children }: Props) => {
  const { user } = useContext(AuthContext);
  return user ?
   (
    <>
      { children }
    </>
  ) : <Navigate to={"/"} replace={true} />
}

export default ProtectedRoute