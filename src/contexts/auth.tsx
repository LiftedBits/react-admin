"use client"
import React, { createContext, useContext, ReactNode } from "react"
import { User } from "firebase/auth"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "../firebase"
import { GradientCircularProgress } from "../components/spinner"

interface AuthContextType {
  user: User | null | undefined
  loading: boolean
  error: Error | undefined
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, loading, error] = useAuthState(auth)

  const logout = async () => {
    await auth.signOut()
  }

  const value = { user, loading, error, logout }

  return (
    <AuthContext.Provider value={value}>
      {!loading ? children : <GradientCircularProgress />}
    </AuthContext.Provider>
  )
}
