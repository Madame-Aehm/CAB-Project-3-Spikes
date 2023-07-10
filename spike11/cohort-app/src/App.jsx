/* eslint-disable react/prop-types */
import './App.css'
// import App2 from './App2'

function App(props) {
  const variable = "this is a variable that I want to pass down";
  return (
    <div>
      <h1>This is app 1</h1>
      <div>{props.children}</div>
      {/* <App2 prop1={"this is my first prop"}>This is where the children go</App2> */}
      <App2 prop1={"This is my first prop"} variable={variable}>Here are the children</App2>
    </div>
  )
}

function App2({children, prop1, variable}) {
  // const variable2 = "this is a variable that I want to pass up";
  return (
    <div>
      <h1>This is app 2</h1>
      <p>{children}</p>
      <p>{prop1}</p>
      <p>{variable}</p>
    </div>
  )
}

export default App
