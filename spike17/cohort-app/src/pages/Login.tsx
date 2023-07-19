import { useContext } from 'react'
import { FormEvent, useState } from 'react';
import { AuthContext } from '../context/AuthContext';

function Login() {
  const { handleRegister } = useContext(AuthContext);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPW, setLoginPW] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPW, setRegisterPW] = useState("");

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //write code to log in user
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input placeholder="enter email" type='email' value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)}/>
        <input placeholder="enter password" type="password" value={loginPW} onChange={(e) => setLoginPW(e.target.value)}/>
        <button type='submit'>Login!</button>
      </form>

      <hr/>

      <h1>Register</h1>
      <form onSubmit={(e) => handleRegister(e, registerEmail, registerPW)}>
        <input placeholder="enter email" type='email' value={registerEmail} onChange={(e) => setRegisterEmail(e.target.value)}/>
        <input placeholder="enter password" type="password" value={registerPW} onChange={(e) => setRegisterPW(e.target.value)}/>
        <button type='submit'>Register!</button>
      </form>
    </div>
  )
}

export default Login