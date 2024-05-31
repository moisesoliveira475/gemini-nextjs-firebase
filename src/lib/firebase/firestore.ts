import { User } from "firebase/auth";
import { Timestamp, collection, getDocs, getFirestore, setDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { app } from "./app";
import { IFirebaseUser } from "@/types/firebase-user";
import { GenerateContentStreamResult } from "firebase/vertexai-preview";

const db = getFirestore(app);

export async function getChats() {
  const collectionRef = collection(db, "chats")

  const result = await getDocs(collectionRef);

  return result.docs
};

export async function setFirebaseUser(user: User) {
  const userData = convertUserToFirebaseUser(user)
  await getDoc(doc(db, "users", user.uid)).then(async response => {
    if(response.exists()) {
      await updateDoc(doc(db, "users", user.uid), {
        lastLogin: Timestamp.now()
      });
    } else {
      await setDoc(doc(db, "users", user.uid), userData)
    }
  })
  
  return user
}

function convertUserToFirebaseUser(user: User) {
  const userData: IFirebaseUser = {
    id: user.uid,
    name: user.displayName || "default displayName",
    createdAT: Timestamp.now(),
    lastLogin: Timestamp.now()
  }
  return userData
}

export async function getFirebaseUsers(user: User) {
  const userRef = collection(db, "users")
  const docs = await getDocs(userRef)

  return docs
}

export async function createChatHistory(streamResult: GenerateContentStreamResult) {
  
  const response = streamResult.response

  console.log(response)
}