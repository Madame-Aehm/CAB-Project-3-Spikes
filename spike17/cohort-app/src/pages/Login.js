import React, { useContext, useState } from 'react'
import LoginForm from '../components/LoginForm';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebaseConfig'
import { AuthContext } from '../contexts/AuthContext';

function Login() {

  const { logIn } = useContext(AuthContext);

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('')

  function submitLogin(event) {
    event.preventDefault();
    console.log("log in user now");
    logIn(loginEmail, loginPassword);
  }

  function submitRegister(event) {
    event.preventDefault();
    console.log("register user now");
    createUserWithEmailAndPassword(auth, registerEmail, registerPassword)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("user: ", user);
      setRegisterEmail('');
      setRegisterPassword('');
      alert(`${user.email} has been registered! Now please log in.`)
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("error: ", errorMessage);
    });
  }

  return (
    <div>
      <div>
        <h1>Log in</h1>
        <LoginForm submitFunction={submitLogin} setEmail={setLoginEmail} setPassword={setLoginPassword} />
      </div>
      <p>OR</p>
      <div>
        <h1>Register</h1>
        <LoginForm submitFunction={submitRegister} setEmail={setRegisterEmail} setPassword={setRegisterPassword} />
      </div>
    </div>
  )
}

export default Login