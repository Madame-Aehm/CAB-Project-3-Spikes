import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext';


const navContainer: React.CSSProperties = { width: "100%", height: "50px", display: "flex", justifyContent: "space-between" };
const linksContainer: React.CSSProperties = { display: "flex", gap: "1em", alignItems: "center" }


const Nav = () => {
  const { user, logout } = useContext(AuthContext);
  return (
    <div style={navContainer}>
      <div style={linksContainer}>
        <Link to={"/"}>Home</Link>
        { user ? 
          <>
            <Link to={"/characters"}>Characters</Link>
            <Link to={"/chatroom"}>Chatroom</Link>
            <Link to={"/live-chat"}>Live Chat</Link>
            <button onClick={logout}>Logout</button>
          </> 
        : <Link to={"/login"}>Login</Link>
        }
      </div>
        { user && <p>Welcome, <i>{user.email}</i></p> }
    </div>
  )
}

export default Nav