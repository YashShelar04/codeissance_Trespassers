import {
  auth,
  db,
  signInAnonymously,
  collection,
  addDoc,
  query,
  where,
  orderBy,
  getDocs,
} from "./firebase-config";

let currentUser: firebase.User | null = null; // Specify the type for currentUser
let currentTabId: number | null = null; // Specify the type for currentTabId
let startTime: number | null = null; // Specify the type for startTime

// Authenticate user anonymously
signInAnonymously(auth)
  .then((userCredential) => {
    currentUser = userCredential.user;
    console.log("User signed in anonymously");
  })
  .catch((error) => {
    console.error("Error signing in:", error);
  });

async function logTimeSpent(url: string, duration: number): Promise<void> {
  if (!currentUser) return;

  const timeLogRef = collection(db, "users", currentUser.uid, "timeLogs");
  await addDoc(timeLogRef, {
    url: url,
    duration: duration,
    timestamp: Date.now(),
  });
}

// Log time spent when tabs are activated
chrome.tabs.onActivated.addListener((activeInfo) => {
  if (currentTabId !== null) {
    const endTime = Date.now();
    chrome.tabs.get(currentTabId, (tab) => {
      const url = new URL(tab.url!).hostname; // Using ! to assert that tab.url is not null
      const duration = endTime - (startTime ?? endTime); // Use the startTime if it exists
      logTimeSpent(url, duration);
    });
  }

  currentTabId = activeInfo.tabId;
  startTime = Date.now();
});

// Track tab updates
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (tabId === currentTabId && changeInfo.status === "complete") {
    startTime = Date.now();
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getTimeSpentLast24Hours") {
    getTimeSpentLast24Hours().then((data) => {
      sendResponse({ data: data });
    });
    return true;
  }
});

async function getTimeSpentLast24Hours() {
  if (!currentUser) return null;

  const timeLogRef = collection(db, "users", currentUser.uid, "timeLogs");
  const twentyFourHoursAgo = Date.now() - 24 * 60 * 60 * 1000;

  const q = query(
    timeLogRef,
    where("timestamp", ">=", twentyFourHoursAgo),
    orderBy("timestamp", "desc")
  );

  const querySnapshot = await getDocs(q);
  const data: Record<string, number> = {}; // Specify the type for data

  querySnapshot.forEach((doc) => {
    const logData = doc.data();
    if (!data[logData.url]) {
      data[logData.url] = 0;
    }
    data[logData.url] += logData.duration;
  });

  return data;
}

console.log("Background script loaded successfully");
