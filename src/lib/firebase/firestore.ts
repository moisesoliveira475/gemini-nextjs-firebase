import { IChat } from "@/types/chats";
import { IFirebaseUser } from "@/types/firebase-user";
import { User } from "firebase/auth";
import { DocumentReference, Timestamp, addDoc, collection, connectFirestoreEmulator, doc, getDoc, getDocs, getFirestore, query, setDoc, updateDoc, where } from "firebase/firestore";
import { app } from "./app";

const db = getFirestore(app);

connectFirestoreEmulator(db, '127.0.0.1', 8080)

/* export async function getChats(user: User) {
  const collectionRef = collection(db, "chats")

  const q = query(collectionRef, where("data.owner", "==", user.uid))

  const querySnapshot = await getDocs(q);

  const documents: IChat[] = []

  querySnapshot.forEach((doc) => {
    documents.push({
      id: doc.id,
      owner: doc.get('data.owner'),
      response: doc.get('data.response'),
      subject: doc.get('data.subject')
    })
  })

  return documents
};
 */

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

/* export async function getFirebaseUsers(user: User) {
  const userRef = collection(db, "users")
  const docs = await getDocs(userRef)

  return docs
} */

/* export async function createPromptTextHistory(text: string, subject: string, user: User) {
  const response = text;

  const collectionRef = collection(db, "chats")

  const data = {
    response,
    subject,
    owner: user.uid
  }
  await addDoc(collectionRef, {
    data
  })
} */

export async function createChatHistory(user: User) {

  const collectionRef = collection(db, "chats")

  const data = {
    owner: user.uid,
    response: [
      {
        role: "user",
        parts: [
          {text: ""}
        ]
      }
    ],
    subject: ""
  }

  await addDoc(collectionRef, data)
  .then((res) => {
    return res
  })
  .catch((err) => {
    console.log(err)
  })
}

export async function getChatsHistory(user: User) {
  const collectionRef = collection(db, "chats")

  const q = query(collectionRef, where("owner", "==", user.uid))

  const querySnapshot = await getDocs(q)

  const documents: IChat[] = []

  querySnapshot.forEach((doc) => {
    documents.push({
      id: doc.id,
      owner: doc.get('owner'),
      response: doc.get('response'),
      subject: doc.get('subject'),
      documentRef: doc.ref
    })
  })

  return documents
}

export async function getChatHistory(user: User, docRef: DocumentReference) {

  const querySnapshot = await getDoc(docRef)

  if( user.uid === querySnapshot.get('owner')) {
    return querySnapshot
  } else {
    throw new Error('Usuário não é dono do chat que está tentando recuperar')
  }

}