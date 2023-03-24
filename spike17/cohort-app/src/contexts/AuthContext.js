import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import { auth } from '../firebaseConfig'
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";

export const AuthContext = createContext();

export const AuthContextProvider = (props) => {
  const [user, setUser] = useState(null);
  const [userChecked, setUserChecked] = useState(false);

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
    signOut(auth).then(() => {
      alert('logged out');
      setUser(null);
    }).catch((error) => {
      console.log("error:", error);
    });
  }

  const fakeUser = {
    username: "Emily12345",
    email: "email@email.com",
    password: "12345"
  }

  function checkForUser() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        console.log('logged in user: ', user);
        setUser(user);
        setUserChecked(true);
      } else {
        console.log("No user logged in");
        setUser(null);
        setUserChecked(true);
      }
    });
  }

  useEffect(() => {
    checkForUser();
    // console.log(auth.currentUser);
    // setUser(auth.currentUser);
  }, [])
  

  return (
    <AuthContext.Provider value={{ user, logIn, logOut, userChecked }} >
      { props.children }
    </AuthContext.Provider>
  )
}