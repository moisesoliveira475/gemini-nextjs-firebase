"use client"

import { ChatContainer } from "@/components/chat-container";
import { Redirect } from "@/components/redirect";
import { SideBar } from "@/components/sidebar";
import { useAuthContext } from "@/hook/use-auth-context";


export default function HomePage() {

  const { user } = useAuthContext()

  return (
    user
      ?
      (
        <div className="h-screen flex">
          <div className="flex flex-1">
            <SideBar />
            <ChatContainer />
          </div>
        </div>
      )
      :
      (
        <Redirect />
      )
  )
}