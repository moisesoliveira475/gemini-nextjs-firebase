import { User } from "firebase/auth"
import { DocumentReference } from "firebase/firestore"

export interface IChat {
  id: string,
  owner: User,
  history: IChatHistory[]
  subject: string
  documentRef: DocumentReference
}

export interface IChatHistory {
  role: string,
  parts: IChatHistoryParts[]
}

interface IChatHistoryParts {
  text: string
}