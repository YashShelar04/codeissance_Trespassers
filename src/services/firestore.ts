// src/services/firestore.ts
import { firestore } from "@/lib/firebase";
import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  DocumentData,
} from "firebase/firestore";

/**
 * Adds or updates a user profile in Firestore.
 * @param userId - The unique identifier for the user.
 * @param profileData - The data to store in the user's profile.
 */
export const setUserProfile = async (
  userId: string,
  profileData: DocumentData,
): Promise<void> => {
  try {
    const profileRef = doc(firestore, "users", userId, "profile", "info");
    await setDoc(profileRef, profileData, { merge: true });
  } catch (error) {
    console.error("Error setting user profile:", error);
    throw error;
  }
};

/**
 * Retrieves a user's profile from Firestore.
 * @param userId - The unique identifier for the user.
 * @returns The user's profile data or null if not found.
 */
export const getUserProfile = async (
  userId: string,
): Promise<DocumentData | null> => {
  try {
    const profileRef = doc(firestore, "users", userId, "profile", "info");
    const profileSnap = await getDoc(profileRef);
    if (profileSnap.exists()) {
      return profileSnap.data();
    } else {
      console.log("No profile found for user:", userId);
      return null;
    }
  } catch (error) {
    console.error("Error retrieving user profile:", error);
    return null;
  }
};

// Add more Firestore operations as needed
