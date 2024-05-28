import { Loading } from "@/components/loading";
import { Suspense } from "react";
import Login from "./login/page";

export default function Home() {

	return (
		<Suspense fallback={<Loading />}>
			<Login />
		</Suspense>
	)
};