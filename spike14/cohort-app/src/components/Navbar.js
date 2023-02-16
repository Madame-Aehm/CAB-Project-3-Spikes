import React from 'react'
import { Link, useLocation } from 'react-router-dom'

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
      
      <Link to={"/"}>Home</Link>
      <Link to={"/about"}>About</Link>
      { location.pathname.includes("about") && 
        <>
          - 
          <Link to={"/about/dev"}>About Dev</Link>
          <Link to={"/about/app"}>About App</Link>
        </> 
      }

    </nav>
  )
}

export default Navbar