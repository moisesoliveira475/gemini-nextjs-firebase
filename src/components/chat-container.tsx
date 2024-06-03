"use client"

import logo from "@/../public/logo-oba.png";
import { useAuthContext } from "@/hook/use-auth-context";
import { useVertexAIContext } from "@/hook/use-vertexai-context";
import { createChatHistory } from "@/lib/firebase/firestore";
import { handleVertexAITextFromText, model } from "@/lib/firebase/vertex-ai";
import { SendHorizonalIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ChangeEvent, useEffect, useState } from "react";
import { ChatResponseContainer } from "./chat-response-container";


export function ChatContainer() {
  const [tokens, setTokens ] = useState<number>(0)
  const [billableCharacters, setBillableCharacters ] = useState<number | undefined>(0)
  const [response, setResponse] = useState<string>("")
  
  const { user } = useAuthContext()
  const { prompt, setPrompt } = useVertexAIContext()

  useEffect(() => {
    countTokens()
  }, [prompt])

  function onPromptInputChanged(event: ChangeEvent<HTMLInputElement>) {
    setPrompt(event.target.value)
  }

  async function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement> | undefined) {
    if(event) {
      if(event.key === "Enter") {
        getPromptFromInput()
      }
    }
  }

  async function getPromptFromInput() {
    if(user) {
      const response = await handleVertexAITextFromText(prompt, user)
      createChatHistory(user)
      setResponse(response.text)
      setPrompt("");
    } else {
      console.log("Usuário precisa se autenticar")
    }
  }

  async function countTokens() {
    const { totalTokens, totalBillableCharacters } = await model.countTokens(prompt);
    setTokens(totalTokens);
    setBillableCharacters(totalBillableCharacters);
  }

  return (
    <main className="bg-zinc-800 flex-1 p-6 sm:flex-grow">
      <Link href="/login">
        <Image priority className="size-10 absolute right-10 top-5 border border-lime-400 rounded-full" src={logo} alt="" />
      </Link>
      <div className="flex flex-col h-full items-center justify-center">
        <div className="flex h-full w-4/5 flex-1 items-center justify-center">
          {response ? (<ChatResponseContainer message={response} />) : (null)}
        </div>
        <div className="flex w-4/5 items-center gap-2">
          <div className="flex flex-1 flex-end
          items-center border border-lime-400 has-[input:focus]:border-lime-400/30 rounded-xl">
            <input
              placeholder="Digite seu prompt aqui"
              className="flex flex-1 w-auto h-12 p-6 bg-transparent focus:ring-0 focus-visible:ring-0 dark:bg-transparent focus:outline-none"
              type="text"
              value={prompt}
              onChange={onPromptInputChanged}
              onKeyDown={handleKeyDown}
            />
            <button className="h-8 w-8 mr-3 border rounded-full border-lime-400 text-lime-400 hover:text-lime-400/30" onClick={getPromptFromInput}>
              <SendHorizonalIcon className="w-6 h-6 pl-1" />
            </button>
          </div>
          <div className="h-18 w-44 text-sm border border-lime-500 p-1 rounded-lg">
            <span>{`Quantidade de tokens e caractéres: ${tokens || 0}, ${billableCharacters || 0}`}</span>
          </div>
        </div>
      </div>
    </main>
  )
}