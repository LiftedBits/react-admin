import { initializeApp } from "firebase/app"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_APP_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_APP_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_FIREBASE_APP_ID,
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)

export const handleSignIn = async (email: string, password: string) => {
  try {
    await signInWithEmailAndPassword(auth, email, password)
    console.log("User signed in")
    return true
  } catch (error) {
    console.error("Error signing in", error)
    return false
  }
}
