console.log("Popup script starting...");

function formatTime(ms) {
  if (!ms || ms <= 0) return "0h 0m 0s";
  const seconds = Math.floor(ms / 1000) % 60;
  const minutes = Math.floor(ms / (1000 * 60)) % 60;
  const hours = Math.floor(ms / (1000 * 60 * 60));
  return `${hours}h ${minutes}m ${seconds}s`;
}

async function displayTime() {
  try {
    const response = await chrome.runtime.sendMessage({
      action: "getTimeSpent",
    });
    console.log("Received response:", response);

    if (response && typeof response.timeSpent === "number") {
      document.getElementById("time").textContent = formatTime(
        response.timeSpent
      );
    } else if (response.error) {
      console.warn("Error:", response.error);
      document.getElementById("time").textContent = "Error: " + response.error;
    } else {
      console.warn("Unexpected response format:", response);
      document.getElementById("time").textContent = "No data available";
    }

    // Display current URL
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs && tabs[0] && tabs[0].url) {
        const url = new URL(tabs[0].url).hostname;
        document.getElementById("current-url").textContent = url;
      }
    });
  } catch (error) {
    console.error("Error getting time:", error.message);
    document.getElementById("time").textContent = "Error occurred";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  console.log("Popup DOM loaded, running scripts...");
  displayTime();
});

console.log("Popup script loaded successfully");
