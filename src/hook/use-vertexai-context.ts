"use client";

import { VertexAIContext } from "@/context/vertexai-context";
import { useContext } from "react";

export function useVertexAIContext() {
  const context = useContext(VertexAIContext);

  if(context === undefined) {
    throw new Error("Não está dentro do contexto do VerterAI")
  }

  return context
}