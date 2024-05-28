import { Timestamp } from "firebase/firestore";

export interface IFirebaseUser {
  name: string,
  createdAT: Timestamp,
  id: string,
  lastLogin?: Timestamp
}