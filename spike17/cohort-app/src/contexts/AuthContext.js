import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";


export const AuthContext = createContext();

export const AuthContextProvider = (props) => {
  const [user, setUser] = useState(null);

  function logIn() {
    setUser(fakeUser);
  }

  function logOut() {
    setUser(null);
  }

  const fakeUser = {
    username: "Emily12345",
    email: "email@email.com",
    password: "12345"
  }

  useEffect(() => {
    console.log("user: ", user);
  }, [user])
  

  return (
    <AuthContext.Provider value={{ user, logIn, logOut }} >
      { props.children }
    </AuthContext.Provider>
  )
}