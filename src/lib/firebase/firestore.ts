import { IChat, IChatHistory } from "@/types/chats";
import { IFirebaseUser } from "@/types/firebase-user";
import { User } from "firebase/auth";
import { DocumentReference, Timestamp, addDoc, arrayUnion, collection, connectFirestoreEmulator, doc, getDoc, getDocs, getFirestore, query, setDoc, updateDoc, where } from "firebase/firestore";
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
    if (response.exists()) {
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

export async function getChatHistory(user: User, docRef: DocumentReference) {

  const querySnapshot = await getDoc(docRef)

  if (user.uid === querySnapshot.get('owner')) {
    return querySnapshot
  }

  throw new Error('Usuário não é dono do chat que está tentando recuperar')
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
      history: doc.get('history'),
      subject: doc.get('subject'),
      documentRef: doc.ref
    })
  })

  return documents
}

export async function createChatHistory(user: User) {

  const collectionRef = collection(db, "chats")

  const data = {
    owner: user.uid,
    subject: "",
    history: []
  }

  const docRef = await addDoc(collectionRef, data)

  return docRef
}

export async function UpdateChatToChatHistory(props: IChat) {

  const { documentRef, history, subject, owner } = props;

  const doc = await getChatHistory(owner, documentRef);

  if (doc.exists()) {
    const docUpdated = await updateDoc(documentRef, {
      history: arrayUnion(history),
      subject
    }
    )
    return docUpdated
  }
  return doc
}