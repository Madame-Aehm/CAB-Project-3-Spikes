import type { ReactNode } from 'react'
import { createContext, useState } from "react";

interface AuthContextType {
  user: User | "No provider"
  login: () => void
  logout: () => void
  // setUser: React.Dispatch<React.SetStateAction<boolean>>
}

const defaultValue: AuthContextType = {
  user: "No provider",
  login: () => { throw Error("No provider") },
  logout: () => { throw Error("No provider") }
  // setUser: () => void{}
}

export const AuthContext = createContext(defaultValue);

type Props = {
  children: ReactNode
}

export const AuthContextProvider = (props: Props) => {
  const [user, setUser] = useState<User>(false);

  const login = () => {
    setUser(true);
  }
  
  const logout = () => {
    setUser(false);
  }
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      { props.children }
    </AuthContext.Provider>
  )
}