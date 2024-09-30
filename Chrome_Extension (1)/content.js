// content.js

let startTime = null;
let totalTime = 0;

function startTracking() {
  startTime = new Date();
}

function stopTracking() {
  if (startTime) {
    const endTime = new Date();
    const timeSpent = endTime - startTime; // time spent in milliseconds
    totalTime += timeSpent; // accumulate total time spent

    // Send the time spent to the background script
    chrome.runtime.sendMessage({ timeSpent });
  }
}

// Start tracking when the page is loaded
startTracking();

// Stop tracking when the user leaves the page
window.addEventListener("beforeunload", stopTracking);
