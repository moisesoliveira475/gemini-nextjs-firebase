import { app } from "./app";
import { User } from "firebase/auth";
import { HarmBlockThreshold, HarmCategory, getGenerativeModel, getVertexAI } from "firebase/vertexai-preview";

const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
];

const generationConfig = {
  max_output_tokens: 200,
  stop_sequences: ["red"],
  temperature: 0.9,
  top_p: 0.1,
  top_k: 16,
};

const systemInstruction = ""

const vertexAI = getVertexAI(app);

export const model = getGenerativeModel(vertexAI, { model: "gemini-1.5-flash-preview-0514" });

export async function handleVertexAITextFromText(prompt: string, user: User) {
	const result = await model.generateContent(prompt)
  const subject = (await model.generateContent("Gere um assunto de até 5 palavras com base nesse prompt para ser mostrado no histórico de prompts enviados por usuários da minha aplicação: ".concat(prompt))).response.text()

	const response = result.response
	const text = response.text()

  const responseObj = {
    text,
    subject
  }

	return responseObj
}

export async function handleVertexAITextFromTextStream(prompt: string, user: User) {
	const result = await model.generateContentStream(prompt);

	const streamArray: string[] = []

	for await (const chunk of result.stream) {
		const chunkText = chunk.text();
		streamArray.push(chunkText)
	}
  return streamArray;
}

export async function handleVertexAIChat(prompt: string, user: User) {
  const chat = model.startChat({
    history: [
      {
        role: "user",
        parts: [{text: "Oi, eu tenho dois cachorros"}]
      }
    ],
    generationConfig: {
      maxOutputTokens: 100,
    }
  });

  const subject = (await model.generateContent("Gere um assunto de até 5 palavras com base nesse prompt para ser mostrado no histórico de prompts enviados por usuários da minha aplicação: ".concat(prompt))).response.text()

  const result = await chat.sendMessage(prompt)

  const response = result.response;
  const text = response.text()

  const responseObj = {
    text,
    subject
  }

	return responseObj
}