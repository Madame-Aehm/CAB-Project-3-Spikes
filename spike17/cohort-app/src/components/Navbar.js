import React, { useContext } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext';



function Navbar() {
  const location = useLocation();
  const { user, logIn, logOut } = useContext(AuthContext);
  
  return (
    <nav style={{ 
      height: "5em", 
      backgroundColor: "peachpuff", 
      display: "flex", 
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 1em",
      gap: "1em" }}>
      
      <div style={{ display: "flex", gap: "1em" }}>
        <NavLink className={({ isActive }) => isActive ? "active" : null} to={"/"}>Home</NavLink>
        <NavLink className={({ isActive }) => isActive ? "active" : null} to={"/about"}>About</NavLink>
        {/* <Link to={"/"} className={ location.pathname === "/" ? "active" : null }>Home</Link>
        <Link to={"/about"} className={ location.pathname.includes("about") ? "active" : null }>About</Link> */}
        { location.pathname.includes("about") && 
          <>
            - 
            <Link to={"/about/dev"}>About Dev</Link>
            <Link to={"/about/app"}>About App</Link>
          </> 
        }
      </div>

      { !user && <p>You should <u onClick={logIn} style={{ cursor: "pointer" }}>log in!</u></p> }
      { user && 
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
        <p>Welcome back, {user.username}</p>
        <p onClick={logOut} style={{ cursor: "pointer", textDecoration: "underline" }}>Logout?</p>
      </div> }
    </nav>
  )
}

export default Navbar