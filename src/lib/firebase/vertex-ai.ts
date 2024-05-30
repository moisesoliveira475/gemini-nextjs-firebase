import { getGenerativeModel, getVertexAI } from "firebase/vertexai-preview";
import { app } from "./app";


const vertexAI = getVertexAI(app);
const model = getGenerativeModel(vertexAI, { model: "gemini-1.5-flash-preview-0514" });

export async function handleVertexAITextFromText(prompt: string) {

    const { totalTokens, totalBillableCharacters } = await model.countTokens(prompt);
    console.log(`Total tokens: ${totalTokens}, total billable characters: ${totalBillableCharacters}`);

    const result = await model.generateContentStream(prompt);
  
    for await (const chunk of result.stream) {
      const chunkText = chunk.text();
/*       console.log(chunkText); */
    }

/*     console.log('aggregated response: ', await result.response); */

    return result
}