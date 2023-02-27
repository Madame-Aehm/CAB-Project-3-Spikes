import React, { useEffect, useState, useContext } from 'react'
import CharacterCard from '../components/CharacterCard';
import useFetch from '../hooks/useFetch';

function Home() {

  // const myFetch = useFetch("https://rickandmortyapi.com/api/character", "all");
  // console.log(myFetch);

  const { result: characters, error, loading } = useFetch("https://rickandmortyapi.com/api/character", "all");


  // const [characters, setcharacters] = useState([]);

  // useEffect(() => {
  //   getCharacters();
  // }, [])

  // const getCharacters = async() => {
  //   const response = await fetch("https://rickandmortyapi.com/api/character");
  //   const result = await response.json();
  //   console.log(result);
  //   setcharacters(result.results)
  // }
  
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