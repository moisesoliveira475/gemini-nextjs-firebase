"use client";

import { Dispatch, SetStateAction, createContext, useState } from "react";

interface IVextexAIContextProviderProps {
  children: React.ReactNode
}

interface IVertexAiContext {
  prompt: string,
  setPrompt: Dispatch<SetStateAction<string>>
}


export const VertexAIContext = createContext({} as IVertexAiContext)

export function VertexAIContextProvider( {children}: IVextexAIContextProviderProps ) {

  const [prompt, setPrompt] = useState<string>("")

  return (
    <VertexAIContext.Provider value={{ prompt, setPrompt }}>
      {children}
    </VertexAIContext.Provider>
  )
}