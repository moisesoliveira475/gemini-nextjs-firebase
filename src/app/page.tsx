import { Loading } from "@/components/loading";
import { Suspense } from "react";
import HomePage from "./home/page";

export default function Home() {

	return (
		<Suspense fallback={<Loading />}>
			<HomePage />
		</Suspense>
	)
};