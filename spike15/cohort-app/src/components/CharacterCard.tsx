import { Link } from "react-router-dom"
import { Character } from "../@types"

type Props = {
  character: Character
}



function CharacterCard({ character }: Props) {
  return (
    <div style={{ border: "solid 1px black", padding: "1em", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <h3>{ character.name }</h3>
      <img src={character.image} style={{ width: "200px", height: "200px" }}/>
      <Link to={`/characters/${character.id}`}>Learn more..</Link>
    </div>
  )
}

export default CharacterCard