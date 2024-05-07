import React from 'react'

function LoginForm({ submitFunction, setEmail, setPassword }) {
  const inputStyle = {
    display: "flex", 
    flexDirection: "column", 
    alignItems: "flex-start",
    marginBottom: "1em"
  }

  const formStyle = {
    border: "solid 1px black",
    padding: "1em"
  }

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  return (
    <form style={formStyle} onSubmit={submitFunction}>

      <div style={inputStyle}>
        <label>Email:</label>
        <input type='email' onChange={handleEmailChange} />
      </div>

      <div style={inputStyle}>
        <label>Password:</label>
        <input type='password' onChange={handlePasswordChange} />
      </div>

      <button type='submit'>Submit</button>
      
    </form>
  )
}

export default LoginForm