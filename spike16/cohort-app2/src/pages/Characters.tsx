// type Props = {}

import useFetch from "../hooks/useFetch"


const Characters = () => {
  const { data } = useFetch("https://rickandmortyapi.com/api/character");
  return (
    <h1>Characters</h1>
  )
}

export default Characters