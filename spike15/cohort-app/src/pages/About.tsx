import { Outlet, useLocation } from "react-router"
import { navContainerStyles } from "../styles/navbar"
import { Link, NavLink } from "react-router-dom"

function About() {
  const path = useLocation().pathname;

  return (
    <div>
      {/* { path === "/about" && <h1>About Main</h1>} */}
      <h1>About Main</h1>
      <div style={navContainerStyles}>
        <NavLink to="developer">Learn about the Developer</NavLink>
        ||
        <NavLink to="company">Learn about the Company</NavLink>
      </div>
      <Outlet />
    </div>
  )
}

export default About