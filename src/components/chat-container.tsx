"use client"

import logo from "@/../public/logo-oba.png";
import { createChatHistory } from "@/lib/firebase/firestore";
import { handleVertexAITextFromText } from "@/lib/firebase/vertex-ai";
import { SendHorizonalIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ChangeEvent, useState } from "react";


export function ChatContainer() {
  const [prompt, setPrompt] = useState<string>("")

  function onPromptInputChanged(event: ChangeEvent<HTMLInputElement>) {
    setPrompt(event.target.value)
  }

  async function getPromptFromInput() {
    const response = await handleVertexAITextFromText(prompt);
    createChatHistory(response)
    setPrompt("");
  }

  return (
    <main className="bg-zinc-800 flex-1 p-6 sm:flex-grow">
      <Link href="/login">
        <Image className="size-10 absolute right-10 top-5 border border-lime-400 rounded-full" src={logo} alt="" />
      </Link>
      <div className="flex flex-col h-full items-center justify-center">
        <div className="flex h-full w-4/5 flex-1 items-center justify-center">
          chat-container
        </div>
        <div className="flex flex-row w-1/2 rounded-xl border border-lime-400 has-[input:focus]:border-lime-400/30 items-center">
          <input
            placeholder="Digite seu prompt aqui"
            className="w-full h-12 p-6 bg-transparent focus:ring-0 focus-visible:ring-0 dark:bg-transparent focus:outline-none"
            type="text"
            value={prompt}
            onChange={onPromptInputChanged}
          />
          <button className="relative right-0 h-8 w-8 mr-4 border rounded-full border-lime-400 text-lime-400 hover:text-lime-400/30" onClick={getPromptFromInput}>
            <SendHorizonalIcon className="w-6 h-6 pl-1" />
          </button>
        </div>
      </div>
    </main>
  )
}