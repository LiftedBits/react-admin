import { initializeApp } from "firebase/app"
import { getAuth, signOut, signInWithEmailAndPassword } from "firebase/auth"
import { deleteObject, getStorage, ref } from "firebase/storage"

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
export const storage = getStorage(app)

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

export const handleLogout = async (): Promise<void> => {
  try {
    const auth = getAuth()
    await signOut(auth)
    console.log("User logged out successfully.")
  } catch (error) {
    console.error("Error logging out:", error)
  }
}

export const deleteFileFromUrl = async (fileUrl: string): Promise<void> => {
  try {
    const storageBucket = "upayaa-website-backend.firebasestorage.app"
    const baseUrl = `https://firebasestorage.googleapis.com/v0/b/${storageBucket}/o/`
    if (!fileUrl.startsWith(baseUrl)) {
      throw new Error("Invalid file URL")
    }

    const encodedPath = fileUrl.replace(baseUrl, "").split("?")[0]
    const filePath = decodeURIComponent(encodedPath)

    const fileRef = ref(storage, filePath)

    await deleteObject(fileRef)
    console.log("File deleted successfully!")
  } catch (error) {
    console.error("Error deleting file:", error)
  }
}
