import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import { auth } from '../firebaseConfig'
import { signInWithEmailAndPassword } from "firebase/auth";

export const AuthContext = createContext();

export const AuthContextProvider = (props) => {
  const [user, setUser] = useState(null);

  function logIn(email, password) {
    // setUser(fakeUser);
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("user logged in: ", user);
      setUser(user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("error: ", errorMessage);
    });
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