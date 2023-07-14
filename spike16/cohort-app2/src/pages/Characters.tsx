// type Props = {}

import { RickAndMorty } from "../@types/api";
import useFetch from "../hooks/useFetch"

type FetchResult = {
  data: RickAndMorty
}

const Characters = () => {
  const data = useFetch("https://rickandmortyapi.com/api/character") as FetchResult;
  console.log(data);
  return (
    <h1>Characters</h1>
  )
}

export default Characters