import React from 'react'
import { useParams } from 'react-router-dom'

function Character() {
  const params = useParams();
  console.log(params);
  return (
    <div>
      <h1>Selected Character</h1>
    </div>
  )
}

export default Character