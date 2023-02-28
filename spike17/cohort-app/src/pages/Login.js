import React, { useContext, useState } from 'react'
import { AuthContext } from '../contexts/AuthContext';

function Login() {
  const { signUp } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmail = (e) => {
    setEmail(e.target.value);
  }

  const handlePassword = (e) => {
    setPassword(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, password);
    signUp(email, password);
  }

  return (
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder='email' onChange={handleEmail} />
        <input type="password" placeholder='password' onChange={handlePassword} />
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default Login