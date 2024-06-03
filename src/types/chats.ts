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