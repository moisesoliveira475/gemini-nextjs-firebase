import { OAuthProvider, getAuth } from "firebase/auth";
import { app } from "./app";

const auth = getAuth(app);

const tenant = String(process.env.NEXT_PUBLIC_FIREBASE_TENANT);

const provider = new OAuthProvider('microsoft.com');

provider.setCustomParameters({
  tenant,
  persistence: 'SESSION',
});

export { auth, provider };
