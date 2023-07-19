// type Props = {}

import { Character, RickMorty } from "../@types/api";
import useFetch from "../hooks/useFetch"

const Characters = () => {
  const [ data, loading, error] = useFetch<RickMorty>("https://rickandmortyapi.com/api/character");
  console.log(data);

  const [ data2 ] = useFetch<Character>("https://rickandmortyapi.com/api/character/1");
  console.log("data2", data2);

  return (
    <div>
      <h1>Characters</h1>
      { error && <p>{ error }</p> }
      { loading && <p>Loading....</p> }
      { data && 
        <div style={{ display: "flex", flexFlow: "row wrap", gap: "1em", padding: "1em", justifyContent: "center" }}>
          { data.results.map((c) => {
            return (
              <div style={{ border: "solid 1px black", padding: "0 1em", minWidth: "200px", minHeight: "300px", display: "flex", flexDirection: "column", alignItems: "center" }}>
                <p>{c.name}</p>
              
              </div>
            )
          }) }
        </div>
      }
      
    </div>
  )
}

export default Characters