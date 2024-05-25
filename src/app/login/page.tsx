"use client";

import { Button } from "@/components/button";
import { useAuthContext } from "@/hook/use-auth-context";
import Link from "next/link";

export default function Login() {

	const { handleSignIn , handleLogout} = useAuthContext();

	return (
		<div className="flex flex-col items-center justify-center h-screen w-screen">
			<div className="flex flex-col items-center justify-center border border-gray-600 bg-zinc-900 text-lime-400 rounded-xl mx-auto w-64 h-52">
				<label htmlFor="">Clique no botão para logar</label>
				<Button onClick={handleSignIn}>
					Login
				</Button>
				<Button onClick={handleLogout}>
					Logout
				</Button>
				<Link href='/'>
          <button className="absolute top-5 right-10 border border-gray-600 rounded-lg p-2">
            Home
          </button>
        </Link>
			</div>
		</div>
	)
};