import { useState, useEffect } from 'react'
import { Character, RickMorty } from '../@types';
import CharacterCard from '../components/CharacterCard';
import { useLoaderData } from 'react-router';

// type Props = {}

function Characters() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [error, setError] = useState("");
  const loaderData = useLoaderData() as RickMorty;
  console.log("loader data", loaderData);

  useEffect(() => {
    const { results } = loaderData;
    const { error } = loaderData;
    results && setCharacters(results);
    error && setError(error);
  }, [loaderData])

  // useEffect(() => {
  //   const fetchCharacters = async () => {
  //     try {
  //       const response = await fetch("https://rickandmortyapi.com/api/character");
  //       const result = await response.json() as RickMorty;
  //       result.results && setCharacters(result.results);
  //     } catch (e) {
  //       console.log(e)
  //     }
  //   }
  //   fetchCharacters().catch((e) => console.log(e))
  // }, [])
  
  return (
    <>
      <h1>Characters</h1>
      { error && <p>{ error }</p> }
      <div style={{ display: "flex", flexFlow: "row wrap", gap: "1em", justifyContent: "center" }}>
        { characters.map((c) => {
          return (
            <CharacterCard character={c} key={c.id}/>
          )
        }) }
      </div>
    </>
  )
}

export default Characters