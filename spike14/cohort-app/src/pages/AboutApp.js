import React from 'react'
import { useNavigate } from 'react-router-dom';


function AboutApp() {
  const navigate = useNavigate();
  return (
    <div>
      <h1>About the App</h1>
      <p>This app was created with React and utilized the free Rick and Morty API.</p>
      <button onClick={() => navigate(-1)}>Back...</button>
    </div>
  )
}

export default AboutApp