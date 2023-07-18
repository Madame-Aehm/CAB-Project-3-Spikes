import { useLocation } from "react-router"

const Homepage = () => {
  const location = useLocation();
  console.log(location);
  return (
    <>
      <h1>Homepage</h1>
    </>
  )
}

export default Homepage