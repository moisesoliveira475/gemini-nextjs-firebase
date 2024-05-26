import Link from "next/link";

export function Redirect() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="h-auto w-auto">
        <h1 className="text-center"> Apenas usuários autenticados podem ver essa página, <Link href="/login" className="text-lime-400 underline">clique aqui</Link> para ir para a página de login</h1>
      </div>
    </div>
  )
}