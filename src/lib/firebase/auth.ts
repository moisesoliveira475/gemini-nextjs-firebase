import { OAuthProvider, getAuth, connectAuthEmulator } from "firebase/auth";
import { app } from "./app";

const auth = getAuth(app);

const tenant = String(process.env.NEXT_PUBLIC_FIREBASE_TENANT);

const provider = new OAuthProvider('microsoft.com');

provider.setCustomParameters({
  tenant,
  persistence: 'SESSION',
});

/* connectAuthEmulator(auth, 'http://127.0.0.1:4000') */

export { auth, provider };
