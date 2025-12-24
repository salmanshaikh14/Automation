const tabsSelect = document.getElementById("tabs");
const startBtn = document.getElementById("start");
const stopBtn = document.getElementById("stop");
const status = document.getElementById("status");
const errorBox = document.getElementById("error");

function setRunning(running) {
  startBtn.style.display = running ? "none" : "block";
  stopBtn.style.display = running ? "block" : "none";
  status.textContent = running ? "Auto refresh is running..." : "";
}

function showError(msg) {
  errorBox.textContent = msg || "";
}

// Load all open tabs
chrome.tabs.query({}, (tabs) => {
  tabs.forEach(tab => {
    const option = document.createElement("option");
    option.value = tab.id;
    option.textContent = tab.title || tab.url;
    tabsSelect.appendChild(option);
  });
});

startBtn.addEventListener("click", () => {
  showError("");
  const tabId = Number(tabsSelect.value);
  if (!tabId) {
    showError("Please select a valid tab.");
    return;
  }
  chrome.runtime.sendMessage({ action: "start", tabId }, (res) => {
    if (chrome.runtime.lastError) {
      showError(chrome.runtime.lastError.message);
      return;
    }
    if (res && res.ok) {
      setRunning(true);
    } else {
      showError(res?.error || "Failed to start.");
    }
  });
});

stopBtn.addEventListener("click", () => {
  showError("");
  chrome.runtime.sendMessage({ action: "stop" }, (res) => {
    if (chrome.runtime.lastError) {
      showError(chrome.runtime.lastError.message);
      return;
    }
    if (res && res.ok) {
      setRunning(false);
      status.textContent = "Stopped.";
    } else {
      showError(res?.error || "Failed to stop.");
    }
  });
});
