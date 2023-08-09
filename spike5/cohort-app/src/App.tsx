import './App.css'
import Profile from './Profile'
import { User } from './@types'

function App() {
  // const user: User = {
  //   username: "Emily",
  //   star_sign: "Cancer"
  // }

  return (
    <>
      <h1>Hello</h1>
      <Profile user={{ username: "Emily", star_sign: "Cancer" }} />
    </>
  )
}

export default App
