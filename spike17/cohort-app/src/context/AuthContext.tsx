import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, type User } from 'firebase/auth';
import type { FormEvent, ReactNode } from 'react'
import { createContext, useState, useEffect } from "react";
import { auth } from '../firebase';

interface AuthContextType {
  user: User | null
  handleLogin: (e: FormEvent<HTMLFormElement>, email: string, password: string) => void
  logout: () => void
  handleRegister: (e:FormEvent<HTMLFormElement>, email: string, password: string) => void
  userChecked: boolean
  // setUser: React.Dispatch<React.SetStateAction<boolean>>
}

const defaultValue: AuthContextType = {
  user: null,
  handleLogin: () => { throw Error("No provider") },
  logout: () => { throw Error("No provider") },
  handleRegister: () => { throw Error("No provider") },
  userChecked: false
  // setUser: () => void{}
}

export const AuthContext = createContext(defaultValue);

type Props = {
  children: ReactNode
}

export const AuthContextProvider = (props: Props) => {
  // const auth = getAuth();
  const [user, setUser] = useState<User | null>(null);
  const [userChecked, setUserChecked] = useState(false);

  const handleLogin = (e: FormEvent<HTMLFormElement>, email: string, password: string) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      setUser(user);
    })
    .catch((error) => {
      console.log(error);
    });
  }
  
  const logout = () => {
    signOut(auth).then(() => {
      setUser(null);
    })
    .catch((error) => {
      console.log(error);
    });
  }

  const handleRegister = (e:FormEvent<HTMLFormElement>, email: string, password: string) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        setUser(user)
      })
      .catch((error) => {
        console.log(error);
      })
  }

  const getActiveUser = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("active user", user);
        setUser(user);
      } else {
        console.log("no active user");
      }
      setUserChecked(true);
    });
  }

  useEffect(() => {
    getActiveUser();
  }, [])
  

  return (
    <AuthContext.Provider value={{ user, handleLogin, logout, handleRegister, userChecked }}>
      { props.children }
    </AuthContext.Provider>
  )
}