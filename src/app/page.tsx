"use client";
import { ChatContainer } from "@/components/chat-container";
import { SideBar } from "@/components/sidebar";
import { useAuthContext } from "@/hook/use-auth-context";
import { db } from "@/services/firebase";
import { collection, getDocs } from "firebase/firestore";
import Link from "next/link";
import { useEffect, useState } from "react";


export default function Home() {

	const { listenUser, user } = useAuthContext();

	listenUser();

	const [chats, setChats] = useState();

	if (user !== null) {
		useEffect(() => {
			async function handleGetChats() {
				const collectionRef = collection(db, "chats")
				const data = await getDocs(collectionRef)
				const docs = data.docs

				console.log(docs)

				return docs
			}
			handleGetChats()
		}, [])
	}
	return (
		user !== null ? (
			<div className="h-screen flex">
				<div className="flex flex-1">
					<SideBar />
					<ChatContainer />
				</div>
			</div>
		) : (
			<div className="flex flex-col items-center justify-center h-screen">
				<div className="h-auto w-auto">
					<h1 className="text-center"> Apenas usuários autenticados podem ver essa página, <Link href="/login" className="text-lime-400 underline">clique aqui</Link> para ir para a página de login</h1>
				</div>
			</div>
		)
	)
};