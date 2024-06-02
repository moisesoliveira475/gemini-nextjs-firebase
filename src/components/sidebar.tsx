"use client"

import logo from "@/../public/logo-oba.png";
import { useAuthContext } from "@/hook/use-auth-context";
import { IChat, getChats } from "@/lib/firebase/firestore";
import { User } from "firebase/auth";
import { CircleHelpIcon, HomeIcon, SettingsIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { Loading } from "./loading";
import { ChatHistoryList } from "./chat-history-lits";
import { NavButtons } from "./nav-buttons";

export function SideBar() {

  const [chats, setChats] = useState<IChat[]>([])

  const { user } = useAuthContext()

  async function handleGetChats(user: User) {
    const chats = await getChats(user)
    setChats(chats)
  }

  if (user) {
    useEffect(() => {
      handleGetChats(user)
    }, [])
  }


  return (
    <aside className="flex flex-col w-64 bg-zinc-900 p-6 border-r border-lime-400">
      <div>
        <button>
          <Image src={logo} alt="logo da Opice Blum" priority />
        </button>
      </div>
      <div className="flex flex-1 w-full">
        <Suspense fallback={<Loading />}>
          <ChatHistoryList chats={chats}/>
        </Suspense>
      </div>
      <NavButtons className="flex mb-auto justify-between pl-3 pr-3" />
    </aside>
  )
}