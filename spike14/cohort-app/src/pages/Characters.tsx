// type Props = {}

import { useLocation } from "react-router"
import NavBar from "../components/NavBar"

function Characters() {
  const location = useLocation();
  console.log(location);
  return (
    <>
      <NavBar />
      <h1>Characters</h1>
    </>
  )
}

export default Characters