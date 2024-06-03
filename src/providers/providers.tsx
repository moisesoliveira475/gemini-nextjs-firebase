import { AuthContextProvider } from "@/context/auth-context";
import { VertexAIContextProvider } from "@/context/vertexai-context";

interface IProviderProps {
  children: React.ReactNode
}

export function Providers({ children }: IProviderProps) {

  return (
    <AuthContextProvider>
      <VertexAIContextProvider>
        {children}
      </VertexAIContextProvider>
    </AuthContextProvider>
  )
}