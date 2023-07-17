// type Props = {}
import { Link, NavLink, useLocation } from "react-router-dom"

function NavBar() {
  const navContainerStyles = { 
    width: "100%", 
    height: "50px", 
    border: "solid 1px black", 
    display: "flex", 
    gap: "1em", 
    alignItems: "center", 
    padding: "0 1em" 
  }

  const activeLink = {
    color: "red",
    fontWeight: "bold"
  }

  const path = useLocation().pathname;

  return (
    <nav style={navContainerStyles}>
      {/* <Link to="/" style={path === "/" ? activeLink : {}}>Homepage</Link>
      <Link to="/characters" style={path === "/characters" ? activeLink : {}} state={"testing..."}>Characters</Link> */}
      <NavLink to="/" style={({ isActive }) => isActive ? activeLink : {}}>Homepage</NavLink>
      <NavLink to="/characters">Characters</NavLink>
    </nav>
  )
}

export default NavBar