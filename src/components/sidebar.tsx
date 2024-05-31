"use client"

import { CircleHelpIcon, HomeIcon, SettingsIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import logo from "@/../public/logo-oba.png"
import { Suspense, useEffect } from "react";
import { Loading } from "./loading";
import { useAuthContext } from "@/hook/use-auth-context";
import { handleVertexAITextFromText } from "@/lib/firebase/vertex-ai";

export function SideBar() {

  const { user } = useAuthContext()

/*   async function handleGetChats() {
    if(user) {
      const docsRef = await getFirebaseUsers(user)
      console.log(docsRef.docs)
    }
  }

  if (user) {
    useEffect(() => {
      handleGetChats()
  }, [])
  } */

  return (
    <aside className="flex flex-col w-64 bg-zinc-900 p-6 border-r border-lime-400">
      <div>
        <button>
          <Image src={logo} alt="logo da Opice Blum" priority />
        </button>
      </div>
      <div className="flex flex-1 w-full">
        <Suspense fallback={<Loading />}>
          <ul>
            <li>chat 1</li>
            <li>chat 2</li>
            <li>chat 3</li>
            <li>chat 4</li>
            <li>chat 5</li>
            <li>chat 6</li>
          </ul>
        </Suspense>
      </div>
      <div className="flex mb-auto justify-between pl-3 pr-3">
        <Link href="/">
          <HomeIcon className="text-lime-400 hover:text-lime-400/30" />
        </Link>
        <button>
          <SettingsIcon className="text-lime-400 hover:text-lime-400/30" />
        </button>
        <button>
          <CircleHelpIcon className="text-lime-400 hover:text-lime-400/30" />
        </button>
      </div>
    </aside>
  )
}