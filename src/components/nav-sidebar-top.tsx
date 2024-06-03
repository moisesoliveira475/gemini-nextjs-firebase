"use client"

import logo from "@/../public/logo-oba.png";
import { useAuthContext } from "@/hook/use-auth-context";
import { createChatHistory } from "@/lib/firebase/firestore";
import { HistoryIcon, PlusCircleIcon } from "lucide-react";
import Image from "next/image";


export function NavSideBarTop() {
  
  const { user } = useAuthContext()

  async function handleCreateChat() {
    if(user) {
      createChatHistory(user)
    } else {
      console.log("Usuario precisa estar logado para criar um chat")
    }
  }

  return (
    <div className="flex items-center justify-center gap-7">
      <button>
        <HistoryIcon className="text-lime-400 hover:text-lime-400/30" />
      </button>
      <button className="h-20 w-20 items-center">
        <Image src={logo} alt="logo da Opice Blum" priority />
      </button>
      <button onClick={handleCreateChat}>
        <PlusCircleIcon className="text-lime-400 hover:text-lime-400/30" />
      </button>
    </div>
  )
}