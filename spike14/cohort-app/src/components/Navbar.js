import React from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'

function Navbar() {
  const location = useLocation();
  return (
    <nav style={{ 
      height: "5em", 
      backgroundColor: "peachpuff", 
      display: "flex", 
      alignItems: "center",
      padding: "0 1em",
      gap: "1em" }}>
      
      <NavLink className={(params) => {
        console.log(params)
        return params.isActive ? "active" : null
      }} to={"/"}>Home</NavLink>
      <NavLink className={({ isActive }) => isActive ? "active" : null} to={"/about"}>About</NavLink>
      {/* <Link to={"/"} className={ location.pathname === "/" ? "active" : null }>Home</Link>
      <Link to={"/about"} state={"this is a state message"} className={ location.pathname.includes("about") ? "active" : null }>About</Link> */}
      { location.pathname.includes("about") && 
        <>
          - 
          <Link to={"/dev"}>About Dev</Link>
          <Link to={"/app"}>About App</Link>
        </> 
      }
    </nav>
  )
}

export default Navbar