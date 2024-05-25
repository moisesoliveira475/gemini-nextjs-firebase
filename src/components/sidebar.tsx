import { CircleHelpIcon, HomeIcon, SettingsIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/logo-oba.png"

export function SideBar() {
  return (
    <aside className="flex flex-col w-64 bg-zinc-900 p-6 border-r border-lime-400">
      <div>
        <button>
          <Image src={logo} alt="logo da Opice Blum" priority />
        </button>
      </div>
      <div className="flex flex-1 w-full">
        chat-history
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