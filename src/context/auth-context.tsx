"use client";

import { auth, provider } from "@/services/firebase";
import { OAuthProvider, User, onAuthStateChanged, signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";
import { createContext, useState } from "react";


interface IAuthContextProviderProps {
  children: React.ReactNode
}

interface IAuthContext {
  handleSignIn: () => Promise<void>,
  listenUser: () => void,
  handleLogout: () => Promise<void>,
  user: User | null
}

export const AuthContext = createContext<IAuthContext>({} as IAuthContext)

export function AuthContextProvider({ children }: IAuthContextProviderProps) {

  const [user, setUser] = useState<User | null>(null);

  const router = useRouter()

  async function handleSignIn() {
    await signInWithPopup(auth, provider)
      .then((result) => {
        setUser(result.user)
        router.push('/')
      })
      .catch((error) => {
        // Handle error.
        console.log(error)
      });
  }

  async function handleLogout() {
    if(user !== null) {
      setUser(null)
    }
    console.log("Usuário não está logado")
  }

  function listenUser() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
      } else {
        setUser(null)
      }
    });
}
    return (
      <AuthContext.Provider value={{ handleSignIn, listenUser, handleLogout, user }}>
        {children}
      </AuthContext.Provider>
    )
  }