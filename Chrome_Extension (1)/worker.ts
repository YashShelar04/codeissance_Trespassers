import {
  getFirestore,
  collection,
  query,
  where,
  orderBy,
  getDocs,
} from "firebase/firestore";
import { initializeApp } from "firebase/app";

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase app and Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Define the data structure for each log entry
interface TimeLog {
  url: string;
  duration: number;
  timestamp: number;
}

// Function to fetch time spent data for a specific user
export async function fetchTimeSpentData(userId: string): Promise<TimeLog[]> {
  const timeLogRef = collection(db, "users", userId, "timeLogs");
  const twentyFourHoursAgo = Date.now() - 24 * 60 * 60 * 1000;

  // Create a query to get logs from the last 24 hours
  const q = query(
    timeLogRef,
    where("timestamp", ">=", twentyFourHoursAgo),
    orderBy("timestamp", "desc")
  );

  // Execute the query and store the results
  const querySnapshot = await getDocs(q);
  const data: TimeLog[] = [];

  // Iterate over the results and push them to the data array
  querySnapshot.forEach((doc) => {
    data.push(doc.data() as TimeLog); // Type assertion to TimeLog
  });

  return data; // Return the fetched data
}
