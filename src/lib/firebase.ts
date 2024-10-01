// lib/firebase.js
import { initializeApp, getApps } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// import { getStorage } from "firebase/storage";
import { FirebaseOptions } from "firebase/app";

const firebaseConfig: FirebaseOptions = {
  apiKey: "AIzaSyB0GdNN5sTx2MDEJ5x66ptwTfQlOy_A4lI",
  authDomain: "legacylink-555f0.firebaseapp.com",
  projectId: "legacylink-555f0",
  storageBucket: "legacylink-555f0.appspot.com",
  messagingSenderId: "594393961926",
  appId: "1:594393961926:web:d21eef04495d63c5cdcec7",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Function to sign in with Google
const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    // The signed-in user info
    const user = result.user;
    // You can access user details here and save it in your Firestore or handle it as needed.
    console.log(user);
    return user;
  } catch (error) {
    console.error("Error signing in with Google: ", error);
    throw error; // Handle error in your UI
  }
};

export { db, auth, signInWithGoogle };
