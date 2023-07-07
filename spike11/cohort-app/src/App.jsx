import { useState } from 'react'
import './App.css'

function App() {
  return (
    <div>
      <h1>This is app 1</h1>
      <App2 prop1={"this is my first prop"}>This is where the children go</App2>
    </div>
  )
}

function App2(props) {
  console.log(props)
  return (
    <div>
      <h1>This is app 2</h1>
    </div>
  )
}

export default App
