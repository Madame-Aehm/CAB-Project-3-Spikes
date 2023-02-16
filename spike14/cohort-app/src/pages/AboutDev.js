import React from 'react'
import { useNavigate } from 'react-router-dom'

function AboutDev() {
  const navigate = useNavigate();
  return (
    <div>
      <h1>About the Dev</h1>
      <p>My name is Emily and I love learning React and Javascript!</p>
      <button onClick={() => navigate(-1)}>Back...</button>
    </div>
  )
}

export default AboutDev