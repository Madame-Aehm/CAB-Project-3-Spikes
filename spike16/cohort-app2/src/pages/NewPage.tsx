
import { useContext } from 'react'
// type Props = {}

import { AuthContext } from "../context/AuthContext"


const NewPage = () => {
  const auth = useContext(AuthContext);
  console.log(auth)
  return (
    <h1>NewPage</h1>
  )
}

export default NewPage