import { useState } from 'react';
import './App.css'

function App() {
  const [myName, setMyName] = useState("Emily");
  let newName = "";
  console.log("component is being rendered");
  return (
    <>
      <p>My name is: <b>{myName}</b></p>
      <input onChange={(e) => {
        newName = e.target.value;
        // console.log("newName", newName);
      }}/>
      <br/><br/>
      <button onClick={() => {
        // console.log("before", myName);
        setMyName(newName);
        // console.log("after", myName);
      }}>Click me! </button>
    </>
  )
}

export default App
