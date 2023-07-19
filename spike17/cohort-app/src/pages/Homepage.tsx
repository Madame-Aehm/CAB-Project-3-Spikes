// import { useContext } from 'react'
// import { AuthContext } from '../context/AuthContext'

import { app } from "../firebase"

// type Props = {}

const Homepage = () => {
  // const auth = useContext(AuthContext);
  // console.log(auth)
  console.log(app);
  return (
    <h1>Homepage</h1>
  )
}

export default Homepage