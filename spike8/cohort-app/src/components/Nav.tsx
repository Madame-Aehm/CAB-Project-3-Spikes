import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext';

// type Props = {}
const navContainer = { width: "100%", height: "50px", display: "flex", gap: "1em", alignItems: "center" };


const Nav = () => {
  const { user, login, logout } = useContext(AuthContext);
  return (
    <div style={navContainer}>
      <Link to={"/"}>Home</Link>
      { user ? 
        <>
          <Link to={"/characters"}>Characters</Link>
          <button onClick={logout}>Logout</button>
        </> 
      : <button onClick={login}>Login</button>
      }
    </div>
  )
}

export default Nav