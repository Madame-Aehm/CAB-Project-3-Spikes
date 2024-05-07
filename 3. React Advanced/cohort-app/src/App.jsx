import { useEffect, useState } from 'react';
import './App.css'

function App() {
  const [myName, setMyName] = useState("Emily");
  const [inputValue, setInputValue] = useState("");
  const [characters, setCharacters] = useState([]);
  console.log("characters", characters);

  // let myName = "Emily"
  // let newName = "";
  // console.log("component is being rendered");
  // console.log("myName from page", myName);
  const handleClick = () => {
    const input = document.getElementById("input");
    console.log("before", myName);
    setMyName(input.value);
    console.log("after", myName);
    // const input = document.getElementById("input");
    // myName = input.value;
    // console.log("myName", myName)
  }
  // useEffect(() => {
  //   console.log("useEffect running");

  //   return () => console.log("clean up");
  // })

  async function fetchData () {
    try {
      const response = await fetch("https://rickandmortyapi.com/api/character");
      const result = await response.json();
      console.log(result);
      setCharacters(result.results);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, [])

  // const [count, setCount] = useState(0);
  // console.log(count);
  // useEffect(() => setCount(count + 1));

  return (
    <>
      <p>My name is: <b>{myName}</b></p>
      <input id='input' value={inputValue} onChange={(e) => {
        setInputValue(e.target.value);
        console.log(inputValue);
      }}/>
      <br/><br/>
      <button onClick={handleClick}>Click me! </button>
    </>
  )
}

export default App
