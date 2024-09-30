// src/services/storage.ts
import { storage } from "../lib/firebase";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

/**
 * Uploads a file to Firebase Storage under the user's directory.
 * @param file - The file to upload.
 * @param userId - The unique identifier for the user.
 * @returns The download URL of the uploaded file or null if failed.
 */
export const uploadFile = async (
  file: File,
  userId: string
): Promise<string | null> => {
  const storageRef = ref(storage, `users/${userId}/files/${file.name}`);
  try {
    const snapshot = await uploadBytes(storageRef, file);
    const url = await getDownloadURL(snapshot.ref);
    return url;
  } catch (error) {
    console.error("Error uploading file:", error);
    return null;
  }
};

/**
 * Deletes a file from Firebase Storage.
 * @param filePath - The path of the file to delete.
 */
export const deleteFile = async (filePath: string): Promise<void> => {
  const fileRef = ref(storage, filePath);
  try {
    await deleteObject(fileRef);
  } catch (error) {
    console.error("Error deleting file:", error);
    throw error;
  }
};

// Add more Storage operations as needed
