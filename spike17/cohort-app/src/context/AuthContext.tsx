import { createUserWithEmailAndPassword, onAuthStateChanged, type User } from 'firebase/auth';
import type { FormEvent, ReactNode } from 'react'
import { createContext, useState, useEffect } from "react";
import { auth } from '../firebase';

interface AuthContextType {
  user: User | null
  login: () => void
  logout: () => void
  handleRegister: (e:FormEvent<HTMLFormElement>, email: string, password: string) => void
  // setUser: React.Dispatch<React.SetStateAction<boolean>>
}

const defaultValue: AuthContextType = {
  user: null,
  login: () => { throw Error("No provider") },
  logout: () => { throw Error("No provider") },
  handleRegister: () => { throw Error("No provider") }
  // setUser: () => void{}
}

export const AuthContext = createContext(defaultValue);

type Props = {
  children: ReactNode
}

export const AuthContextProvider = (props: Props) => {
  const [user, setUser] = useState<User | null>(null);

  const login = () => {
    // setUser();
  }
  
  const logout = () => {
    setUser(null);
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
    });
  }

  useEffect(() => {
    getActiveUser();
  }, [])
  

  return (
    <AuthContext.Provider value={{ user, login, logout, handleRegister }}>
      { props.children }
    </AuthContext.Provider>
  )
}