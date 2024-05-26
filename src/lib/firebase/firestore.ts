import { Firestore, collection, getDocs, getFirestore } from "firebase/firestore";

export async function getChats(db: Firestore) {
  const collectionRef = collection(db, "chats")

  const result = await getDocs(collectionRef);
  
  return result.docs
};