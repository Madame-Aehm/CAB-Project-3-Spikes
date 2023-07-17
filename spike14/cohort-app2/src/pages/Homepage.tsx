import { useLocation } from "react-router"
import NavBar from "../components/NavBar"

const Homepage = () => {
  const location = useLocation();
  console.log(location);
  return (
    <>
      <NavBar />
      <h1>Homepage</h1>
    </>
  )
}

export default Homepage