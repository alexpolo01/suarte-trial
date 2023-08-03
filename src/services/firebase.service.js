import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithCustomToken,signInWithPopup, signOut } from "firebase/auth";

import config from "@/config";

const app = initializeApp(config.firebase);
const auth = getAuth(app);

auth.languageCode = auth.useDeviceLanguage();

const signInWithGoogle = async () => {
  const googleProvider = new GoogleAuthProvider();

  try {
    const firebase_res = await signInWithPopup(auth, googleProvider);
    return firebase_res;
  } catch (err) {
    console.error(err);
    return err;
  }
};

function loginWithCustomToken(token) {
  return signInWithCustomToken(auth, token);
}

const logoutUser = () => {
  signOut(auth);
};

export {
  auth,
  signInWithGoogle,
  logoutUser,
  loginWithCustomToken,
};