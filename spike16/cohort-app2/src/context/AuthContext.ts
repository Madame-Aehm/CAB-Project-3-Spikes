import { createContext } from "react";

interface AuthContext {
  user: User | "No provider"
}

const defaultValue: AuthContext = {
  user: "No provider"
}

export const AuthContext = createContext(defaultValue);