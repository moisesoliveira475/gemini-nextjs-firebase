import { User } from "firebase/auth";
import { getGenerativeModel, getVertexAI } from "firebase/vertexai-preview";
import { app } from "./app";


const vertexAI = getVertexAI(app);
export const model = getGenerativeModel(vertexAI, { model: "gemini-1.5-flash-preview-0514" });

export async function handleVertexAITextFromText(prompt: string, user: User) {
	const result = await model.generateContent(prompt)

	const response = result.response
	const text = response.text()

	return text
}

export async function handleVertexAITextFromTextStream(prompt: string, user: User) {
	const result = await model.generateContentStream(prompt);

	const streamArray: string[] = []

	for await (const chunk of result.stream) {
		const chunkText = chunk.text();
		streamArray.push(chunkText)
	}

	return streamArray
}