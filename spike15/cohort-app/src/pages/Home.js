import React, { useEffect, useState } from 'react'
import CharacterCard from '../components/CharacterCard';

function Home() {
  const [characters, setcharacters] = useState([]);

  useEffect(() => {
    getCharacters();
  }, [])

  const getCharacters = async() => {
    const response = await fetch("https://rickandmortyapi.com/api/character");
    const result = await response.json();
    setcharacters(result.results)
  }
  
  return (
    <div>
      <h1>Homepage</h1>
      <h2>Characters</h2>
      <div style={{ display: "flex", flexFlow: "row wrap", gap: "1em", textAlign: "center", justifyContent: "space-around" }}>
        {characters.map((c) => {
          return (
            <CharacterCard key={c.id} c={c} />
          )
        })}
      </div>
    </div>
  )
}

export default Home