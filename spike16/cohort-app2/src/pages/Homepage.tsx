import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

// type Props = {}

const Homepage = () => {
  const auth = useContext(AuthContext);
  console.log(auth)
  return (
    <h1>Homepage</h1>
  )
}

export default Homepage