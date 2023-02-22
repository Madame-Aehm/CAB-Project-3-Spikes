import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function Character() {
  // const params = useParams();
  const { id } = useParams();
  const [character, setCharacter] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCharacter();
  }, [id])
  
  const fetchCharacter = async() => {
    try {
      const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
      const result = await response.json();
      console.log(result);
      if (result.id) {
        setCharacter(result);
      } else {
        setError(result)
      }
    } catch (e) {
      setError(e);
    }
    
  }


  return (
    <div>
      {character && 
        <>
          <h1>Selected Character: { character.name }</h1>
          <img src={ character.image } />
          <h5>Location: { character.location.name }</h5>
        </>
      }
      {error && <p>{ error.error }</p>}
    </div>
  )
}

export default Character