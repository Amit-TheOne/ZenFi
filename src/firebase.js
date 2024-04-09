// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { GoogleAuthProvider, getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
  authDomain: "zenfi-3af11.firebaseapp.com",
  projectId: "zenfi-3af11",
  storageBucket: "zenfi-3af11.appspot.com",
  messagingSenderId: "214254535058",
  appId: "1:214254535058:web:0f407eee2991755026014b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()

export const db = getFirestore(app)