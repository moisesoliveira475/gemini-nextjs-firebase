"use client"

import { useAuthContext } from "@/hook/use-auth-context";
import { getChatsHistory } from "@/lib/firebase/firestore";
import { IChat } from "@/types/chats";
import { User } from "firebase/auth";
import { Suspense, useEffect, useState } from "react";
import { ChatHistoryList } from "./chat-history-lits";
import { Loading } from "./loading";
import { NavSideBarBottom } from "./nav-sidebar-bottom";
import { NavSideBarTop } from "./nav-sidebar-top";

export function SideBar() {

  const [chats, setChats] = useState<IChat[]>([])

  const { user } = useAuthContext()

  async function handleGetChats(user: User) {
    const chats = await getChatsHistory(user)
    setChats(chats)
  }

  if (user) {
    useEffect(() => {
      handleGetChats(user)
    }, [])
  }


  return (
    <aside className="flex flex-col w-64 h-full bg-zinc-900 p-6 border-r border-lime-400">
      <NavSideBarTop />
      <div className="flex flex-1 w-full h-[70%] mb-2">
        <Suspense fallback={<Loading />}>
          <ChatHistoryList chats={chats}/>
        </Suspense>
      </div>
      <NavSideBarBottom className="flex mb-auto mt-3 justify-between pl-1 pr-1" />
    </aside>
  )
} 