import React from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'

function About() {
  const location = useLocation();
  // console.log(location);
  return (
    <div>
      { location.pathname.includes("dev") || location.pathname.includes("app") ? <Outlet /> : 
      <>
        <h1>About</h1>
        <p>This app will show characters from Rick and Morty</p>
      </> }
    </div>
  )
}

export default About