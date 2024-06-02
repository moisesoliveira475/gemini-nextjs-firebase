import { IFirebaseUser } from "@/types/firebase-user";
import { User } from "firebase/auth";
import { Timestamp, addDoc, collection, connectFirestoreEmulator, doc, getDoc, getDocs, getFirestore, query, setDoc, updateDoc, where } from "firebase/firestore";
import { app } from "./app";

const db = getFirestore(app);

connectFirestoreEmulator(db, '127.0.0.1', 8080)

export interface IChat {
  id: string,
  owner: string,
  response: string
}

export async function getChats(user: User) {
  const collectionRef = collection(db, "chats")

  const q = query(collectionRef, where("data.owner", "==", user.uid))

  const querySnapshot = await getDocs(q);

  const documents: IChat[] = []

  querySnapshot.forEach((doc) => {
    documents.push({
      id: doc.id,
      owner: doc.get('data.owner'),
      response: doc.get('data.response')
    })
  })

  return documents
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

export async function createChatHistory(text: string, user: User) {
  const response = text;

  const collectionRef = collection(db, "chats")

  const data = {
    response,
    owner: user.uid
  }
  await addDoc(collectionRef, {
    data
  })
}