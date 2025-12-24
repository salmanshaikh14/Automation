const tabsSelect = document.getElementById("tabs");
const selectorInput = document.getElementById("selector");
const intervalInput = document.getElementById("interval");
const startBtn = document.getElementById("start");
const stopBtn = document.getElementById("stop");
const status = document.getElementById("status");
const errorBox = document.getElementById("error");

function setRunning(running) {
  startBtn.style.display = running ? "none" : "block";
  stopBtn.style.display = running ? "block" : "none";
  status.textContent = running ? "Auto clicking is running in background..." : "";
}

function showError(msg) { errorBox.textContent = msg || ""; }

chrome.tabs.query({}, (tabs) => {
  tabs.forEach(tab => {
    const option = document.createElement("option");
    option.value = tab.id;
    option.textContent = tab.title || tab.url;
    tabsSelect.appendChild(option);
  });
});

chrome.runtime.sendMessage({ action: "status" }, (res) => {
  if (res && res.running) {
    setRunning(true);
    if (res.selector) selectorInput.value = res.selector;
    if (res.interval) intervalInput.value = res.interval;
    if (res.tabId) tabsSelect.value = String(res.tabId);
  }
});

startBtn.addEventListener("click", () => {
  showError("");
  const tabId = Number(tabsSelect.value);
  const selector = selectorInput.value.trim();
  const interval = Number(intervalInput.value) || 30;

  if (!tabId) return showError("Please select a tab.");
  if (!selector) return showError("Please enter a CSS selector.");
  if (interval < 1) return showError("Interval must be at least 1 second.");

  chrome.runtime.sendMessage({ action: "start", tabId, selector, interval }, (res) => {
    if (chrome.runtime.lastError) return showError(chrome.runtime.lastError.message);
    if (res && res.ok) setRunning(true);
    else showError(res?.error || "Failed to start.");
  });
});

stopBtn.addEventListener("click", () => {
  showError("");
  chrome.runtime.sendMessage({ action: "stop" }, (res) => {
    if (chrome.runtime.lastError) return showError(chrome.runtime.lastError.message);
    if (res && res.ok) {
      setRunning(false);
      status.textContent = "Stopped.";
    } else showError(res?.error || "Failed to stop.");
  });
});
