import { User } from "firebase/auth"
import { DocumentReference } from "firebase/firestore"

export interface IChat {
  id: string,
  owner: string,
  response: IChatResponse[]
  subject: string
  documentRef: DocumentReference
}

interface IChatResponse {
  role: string,
  parts: IChatResponseParts[]
}

interface IChatResponseParts {
  text: string
}

/* Interface das informações necessárias para adicionar um chat no firebase */
export interface IAddChatToChatHistoryProps {
  user: User,
  docRef: DocumentReference,
  prompt: string,
  role: string,
  subject: string
}