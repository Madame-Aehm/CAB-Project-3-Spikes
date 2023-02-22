import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";


export const AuthContext = createContext();

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  function logIn() {
    setIsLoggedIn(true);
    setUser(fakeUser);
  }

  function logOut() {
    setIsLoggedIn(false);
    setUser(null);
  }

  const fakeUser = {
    username: "Emily12345",
    email: "email@email.com",
    password: "12345"
  }

  useEffect(() => {
    console.log("user: ", user);
    console.log("isLoggedIn: ", isLoggedIn);
  }, [user, isLoggedIn])
  

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, logIn, logOut }} >
      { props.children }
    </AuthContext.Provider>
  )
}