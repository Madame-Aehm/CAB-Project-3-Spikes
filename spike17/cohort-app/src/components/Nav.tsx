import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext';


const navContainer = { width: "100%", height: "50px", display: "flex" };
const linksContainer = { display: "flex", gap: "1em", alignItems: "center" }


const Nav = () => {
  const { user, logout } = useContext(AuthContext);
  return (
    <div style={navContainer}>
      <div style={linksContainer}>
        <Link to={"/"}>Home</Link>
        { user ? 
          <>
            <Link to={"/characters"}>Characters</Link>
            <button onClick={logout}>Logout</button>
          </> 
        : <Link to={"/login"}>Login</Link>
        }
      </div>
        { user && <p>Welcome {user.email}</p> }
    </div>
  )
}

export default Nav