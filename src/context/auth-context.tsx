"use client";

import { auth, provider } from "@/lib/firebase/auth";
import { setFirebaseUser } from "@/lib/firebase/firestore";
import { User, onAuthStateChanged, signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";
import { createContext, useEffect, useState } from "react";


interface IAuthContextProviderProps {
  children: React.ReactNode,
}

interface IAuthContext {
  handleSignIn: () => Promise<void>,
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
        const user = result.user

        if(user) {
          setFirebaseUser(user)
          setUser(user)
          router.push('/home')
        }
        console.log(result.user)

      })
      .catch((error) => {
        // Handle error.
        console.log('Sign-in error:', error)
      });
  }

  async function handleLogout() {
    if (user) {
      await auth.signOut()
      .then(() => {
        setUser(null)
        user.refreshToken
      })
    }
  }

  function listenFirebaseUserAuth() {
    useEffect(() => {
      const unsubscrive = onAuthStateChanged(auth, (user) => {
        if (user) {
          setUser(user);
        }
      });
      return () => unsubscrive();
    }, [user])

    return user
  }

  listenFirebaseUserAuth()

  return (
    <AuthContext.Provider value={{ handleSignIn, handleLogout, user }}>
      {children}
    </AuthContext.Provider>
  )
}