import './App.css'
import Profile from './Profile'
import { User } from './@types'
import { SyntheticEvent, useState } from 'react'
import style from './styles/testing.module.css'

function App() {
  const [inputValue, setInputValue] = useState("");
  // const user: User = {
  //   username: "Emily",
  //   star_sign: "Cancer"
  // }
  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    console.log("event", e);
    console.log("find the event by first sending it as param in anon function, hover to copy/paste");
  }

  const handleSubmit = async(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    try {
      const response = await fetch("https://rickandmortyapi.com/api/character");
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const result = await response.json();
      console.log(result)
    } catch (error) {
      console.log(error)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (e.key === "Enter") {
      console.log("Enter")
    }
  }


  return (
    <>
      <h1 className={`${style.red} ${style.mb}`}>Hello</h1>
      <form >
        <input value={inputValue} type='text' onChange={(e) => setInputValue(e.target.value)} />
        <button type='submit' onClick={(e) => void handleSubmit(e)}>submit</button>
      </form>
      <Profile user={{ username: "Emily", star_sign: "Cancer" }} />
    </>
  )
}

export default App
