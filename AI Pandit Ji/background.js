chrome.runtime.onInstalled.addListener(() => {
  console.log("AI Pandit Ji background service worker ready.");
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message && message.type === "PING_BACKGROUND") {
    sendResponse({
      ok: true,
      from: "background",
      extensionId: chrome.runtime.id
    });
  }

  return false;
});
