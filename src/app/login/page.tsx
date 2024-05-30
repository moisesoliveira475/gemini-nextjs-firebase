"use client";

import { Button } from "@/components/button";
import { useAuthContext } from "@/hook/use-auth-context";
import Link from "next/link";

export default function Login() {

	const { handleSignIn, handleLogout, user } = useAuthContext();

	return (
		<div className="flex flex-col items-center justify-center h-screen w-screen">
			<div
				className="flex flex-col items-center justify-center border border-gray-600 bg-zinc-900 text-lime-400 rounded-xl mx-auto w-[32rem] h-60"
			>
				<label htmlFor="">Gemini OBA</label>
				<Button onClick={handleSignIn}>
					{user ? 'Entrar' : 'Login'}
				</Button>
				{
					user ? (
						<Button onClick={handleLogout}>
							Logout
						</Button>
					) : (
						<></>
					)
				}
				<Link href='/home'>
					<button className="absolute top-5 right-10 border border-gray-600 rounded-lg p-2">
						Home
					</button>
				</Link>
				<span className="text-fuchsia-600">
					Seja bem vindo! no momento você está{' '}
					<span className="text-fuchsia-500 underline">
						{`${user ? 'logado' : 'deslogado'}`}
					</span>
				</span>
			</div>
		</div>
	)
};