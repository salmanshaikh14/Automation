let tabId = null;
let selector = null;
let intervalSec = 30;
let intervalId = null;
let timeoutId = null;

function clickButton() {
  if (!tabId || !selector) return;
  chrome.scripting.executeScript({
    target: { tabId },
    func: (sel) => {
      const el = document.querySelector(sel);
      if (el) { el.click(); return true; }
      return false;
    },
    args: [selector]
  }, () => {
    if (chrome.runtime.lastError) {
      console.warn("Script error:", chrome.runtime.lastError.message);
    }
  });
}

function clearTimers() {
  if (timeoutId) { clearTimeout(timeoutId); timeoutId = null; }
  if (intervalId) { clearInterval(intervalId); intervalId = null; }
}

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.action === "status") {
    sendResponse({ running: intervalId !== null || timeoutId !== null, tabId, selector, interval: intervalSec });
    return true;
  }

  if (msg.action === "start") {
    tabId = msg.tabId;
    selector = msg.selector;
    intervalSec = msg.interval || 30;

    clearTimers();

    // First click after 1 second
    timeoutId = setTimeout(() => {
      clickButton();
      // Then repeat every intervalSec
      intervalId = setInterval(clickButton, intervalSec * 1000);
    }, 1000);

    sendResponse({ ok: true });
    return true;
  }

  if (msg.action === "stop") {
    tabId = null;
    selector = null;
    clearTimers();
    sendResponse({ ok: true });
    return true;
  }
});
