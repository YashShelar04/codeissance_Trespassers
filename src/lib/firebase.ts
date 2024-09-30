// lib/firebase.js
import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  NEXT_PUBLIC_FIREBASE_API_KEY: "AIzaSyB0GdNN5sTx2MDEJ5x66ptwTfQlOy_A4lI",
  NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: "legacylink-555f0.firebaseapp.com",
  NEXT_PUBLIC_FIREBASE_PROJECT_ID: "legacylink-555f0",
  NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: "legacylink-555f0.appspot.com",
  NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: "594393961926",
  NEXT_PUBLIC_FIREBASE_APP_ID: "1:594393961926:web:d21eef04495d63c5cdcec7",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);
export { app, auth, firestore, storage };
