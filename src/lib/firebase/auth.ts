import { OAuthProvider, browserSessionPersistence, getAuth } from "firebase/auth";
import { app } from "./app";

const auth = getAuth(app);

auth.setPersistence(browserSessionPersistence);

const tenant = String(process.env.NEXT_PUBLIC_FIREBASE_TENANT);

const provider = new OAuthProvider('microsoft.com');

provider.setCustomParameters({
  tenant
});

export { auth, provider }