import React from 'react'
import { Link } from 'react-router-dom'

function CharacterCard({ c }) {
  return (
    <div style={{ border: "solid 2px black", padding: "0 1em" }}>
      <p>{c.name}: </p>
      <Link to={`character/${c.id}`} >Learn more..</Link>
    </div>
  )
}

export default CharacterCard