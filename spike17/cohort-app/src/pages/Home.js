import React, { useEffect, useState, useContext } from 'react'
import CharacterCard from '../components/CharacterCard';
import useFetch from '../hooks/useFetch';

function Home() {

  const { result: characters, error, loading } = useFetch("https://rickandmortyapi.com/api/character", "all");
  
  return (
    <div>
      <h1>Homepage</h1>
      <h2>Characters</h2>
      <div style={{ display: "flex", flexFlow: "row wrap", gap: "1em", textAlign: "center", justifyContent: "space-around" }}>
        {loading && <p>...Loading</p>}
        {error && <p>Something went wrong...</p>}
        {characters && characters.map((c) => {
          return (
            <CharacterCard key={c.id} c={c} />
          )
        })}
      </div>
    </div>
  )
}

export default Home