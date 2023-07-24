/* eslint-disable react/prop-types */
function App2(props) {
  console.log(props)
  return (
    <div>
      <h1>This is app 2</h1>
      <p>{props.children}</p>
    </div>
  )
}

export default App2