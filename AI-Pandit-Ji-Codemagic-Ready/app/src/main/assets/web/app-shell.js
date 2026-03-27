let deferredInstallPrompt = null;

function updateAppModeBadge() {
  const badge = document.getElementById("appModeBadge");
  if (!badge) {
    return;
  }

  const isStandalone =
    window.matchMedia("(display-mode: standalone)").matches ||
    window.navigator.standalone === true;

  badge.textContent = isStandalone ? "Installed App" : "Mobile Web App";
}

function showInstallControls(note) {
  const installButton = document.getElementById("installAppButton");
  const installNote = document.getElementById("appInstallNote");

  if (installButton) {
    installButton.classList.remove("hidden-app-action");
  }

  if (installNote && note) {
    installNote.textContent = note;
    installNote.classList.remove("hidden-app-action");
  }
}

function hideInstallControls() {
  const installButton = document.getElementById("installAppButton");
  const installNote = document.getElementById("appInstallNote");

  if (installButton) {
    installButton.classList.add("hidden-app-action");
  }

  if (installNote) {
    installNote.classList.add("hidden-app-action");
    installNote.textContent = "";
  }
}

function setupInstallPrompt() {
  const installButton = document.getElementById("installAppButton");
  if (!installButton) {
    return;
  }

  installButton.addEventListener("click", async () => {
    if (!deferredInstallPrompt) {
      return;
    }

    deferredInstallPrompt.prompt();
    try {
      await deferredInstallPrompt.userChoice;
    } catch (_error) {
      // Keep the UI stable even if the browser rejects the prompt.
    }
    deferredInstallPrompt = null;
    hideInstallControls();
    updateAppModeBadge();
  });

  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    deferredInstallPrompt = event;
    showInstallControls("Install AI Pandit Ji on this device for a full-screen app experience.");
  });

  window.addEventListener("appinstalled", () => {
    deferredInstallPrompt = null;
    hideInstallControls();
    updateAppModeBadge();
  });
}

function setupIosInstallHint() {
  const isIos = /iphone|ipad|ipod/i.test(window.navigator.userAgent);
  const isStandalone =
    window.matchMedia("(display-mode: standalone)").matches ||
    window.navigator.standalone === true;

  if (isIos && !isStandalone) {
    showInstallControls("On iPhone or iPad, use Share > Add to Home Screen to install this app.");
  }
}

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch(() => {
      // Keep the app usable even if service worker registration fails.
    });
  });
}

window.addEventListener("DOMContentLoaded", () => {
  updateAppModeBadge();
  setupInstallPrompt();
  setupIosInstallHint();
});
