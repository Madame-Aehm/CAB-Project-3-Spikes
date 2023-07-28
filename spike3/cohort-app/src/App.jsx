// import { useState } from 'react';
import './App.css'

function App() {
  // const [myName, setMyName] = useState("Emily");
  let myName = "Emily"
  // let newName = "";
  console.log("component is being rendered");
  const handleClick = () => {
    // console.log("before", myName);
    // setMyName(newName);
    // console.log("after", myName);
    const input = document.getElementById("input");
    myName = input.value;
    console.log("myName", myName)
  }
  return (
    <>
      <p>My name is: <b>{myName}</b></p>
      <input id='input' />
      <br/><br/>
      <button onClick={handleClick}>Click me! </button>
    </>
  )
}

export default App
