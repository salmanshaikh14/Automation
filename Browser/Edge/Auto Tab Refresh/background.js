let refreshTabId = null;
let intervalId = null;

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.action === "start") {
    if (!msg.tabId) {
      sendResponse({ ok: false, error: "Invalid tab selected." });
      return true;
    }
    refreshTabId = msg.tabId;

    if (intervalId) clearInterval(intervalId);

    intervalId = setInterval(() => {
      if (refreshTabId !== null) {
        chrome.tabs.reload(refreshTabId, () => {
          if (chrome.runtime.lastError) {
            console.warn("Reload failed:", chrome.runtime.lastError.message);
          }
        });
      }
    }, 5000); // 5 seconds

    sendResponse({ ok: true });
    return true;
  }

  if (msg.action === "stop") {
    refreshTabId = null;
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
    sendResponse({ ok: true });
    return true;
  }
});
