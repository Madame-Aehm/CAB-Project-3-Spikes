import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config"


export const AuthContext = createContext();

export const AuthContextProvider = (props) => {
  const [user, setUser] = useState(null);

  const signUp = async(email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log(user);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    }
  }

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
    <AuthContext.Provider value={{ user, logIn, logOut, signUp }} >
      { props.children }
    </AuthContext.Provider>
  )
}