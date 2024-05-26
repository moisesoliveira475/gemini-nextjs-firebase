import { AuthContextProvider } from "@/context/auth-context";

interface IProviderProps {
  children: React.ReactNode
}

export function Providers({ children }: IProviderProps) {

  return (
    <AuthContextProvider>
      {children}
    </AuthContextProvider>
  )
}