import { initializeApp } from "firebase/app";
import { OAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCWs2KiQSjsYBUtFs5QyPYRr4dcS6c9Elk",
  authDomain: "gemini-nodejs-f5e47.firebaseapp.com",
  projectId: "gemini-nodejs-f5e47",
  storageBucket: "gemini-nodejs-f5e47.appspot.com",
  messagingSenderId: "943445133341",
  appId: "1:943445133341:web:926bcc7652b38cf1d3def4"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

const tenant = String(process.env.TENANT)

const provider = new OAuthProvider('microsoft.com');

provider.setCustomParameters({
  tenant: "fe773896-0311-40e8-b521-2efeed058938"
});

export { auth, db, provider };