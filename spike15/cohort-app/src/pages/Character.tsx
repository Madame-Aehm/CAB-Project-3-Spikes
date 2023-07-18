// type Props = {}

import { useLoaderData, useParams } from "react-router"
import { useState, useEffect } from 'react'
import { Character as CharacterType, RickMortyByID } from "../@types";


const Character = () => {
  const { id } = useParams();
  const [character, setCharacter] = useState<CharacterType | null>(null);
  const [error, setError] = useState("");

  const loaderData = useLoaderData() as RickMortyByID;
  console.log("loader data", loaderData);

  useEffect(() => {
    loaderData.error ? setError(loaderData.error) : setCharacter(loaderData);
  }, [loaderData])


  // const handleError = (e: Error) => {
  //   console.log(e)
  //   const { message } = e
  //   setError(message);
  // }

  // useEffect(() => {
  //   const fetchCharacterById = async() => {
  //     setError("");
  //     try {
  //       const response = await fetch(`https://rickandmortyapi.com/api/character/${id!}`);
  //       if (response.ok) {
  //         const result = await response.json() as CharacterType;
  //         setCharacter(result);
  //       } else {
  //         const result = await response.json() as ErrorMessage;
  //         setError(result.error);
  //       } 
  //     } catch(e) {
  //       handleError(e as Error)
  //     }
  //     }
  //   fetchCharacterById().catch((e: Error) => {
  //     handleError(e)
  //   });
  // }, [id])
  
  return (
    <div style={{ textAlign: "center" }}>
      Single Character with ID: <b>{ id }</b>
      { error && <p>{error}</p> }
      { character && (
        <div>
          <h1>{ character.name }</h1>
          <img src={character.image} />
        </div>
      )}
    </div>
  )
}

export default Character