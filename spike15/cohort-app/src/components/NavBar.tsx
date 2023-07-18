// type Props = {}
import { Link, NavLink, useLocation } from "react-router-dom"
import { navContainerStyles } from "../styles/navbar"

function NavBar() {

  const activeLink = {
    color: "red",
    fontWeight: "bold"
  }

  // const path = useLocation().pathname;

  return (
    <nav style={navContainerStyles}>
      {/* <Link to="/" style={path === "/" ? activeLink : {}}>Homepage</Link>
      <Link to="/characters" style={path === "/characters" ? activeLink : {}} state={"testing..."}>Characters</Link> */}
      <NavLink to="/" style={({ isActive }) => isActive ? activeLink : {}}>Homepage</NavLink>
      <NavLink to="/characters">Characters</NavLink>
      <NavLink to="/about">About</NavLink>
    </nav>
  )
}

export default NavBar