#!/bin/zsh
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
APP_SHARED_DIR="$ROOT_DIR/app/shared"
ANDROID_WEB_DIR="$ROOT_DIR/android-app/app/src/main/assets/web"
ANDROID_SHARED_DIR="$ANDROID_WEB_DIR/shared"

mkdir -p "$APP_SHARED_DIR/vendor" "$ANDROID_SHARED_DIR/vendor"

cp "$ROOT_DIR/styles.css" "$APP_SHARED_DIR/styles.css"
cp "$ROOT_DIR/popup.js" "$APP_SHARED_DIR/popup.js"
cp "$ROOT_DIR/logo.svg" "$APP_SHARED_DIR/logo.svg"
cp "$ROOT_DIR/vendor/astronomy.browser.min.js" "$APP_SHARED_DIR/vendor/astronomy.browser.min.js"
cp "$ROOT_DIR/vendor/html2canvas.min.js" "$APP_SHARED_DIR/vendor/html2canvas.min.js"

cp "$ROOT_DIR/app/index.html" "$ANDROID_WEB_DIR/index.html"
cp "$ROOT_DIR/app/app.css" "$ANDROID_WEB_DIR/app.css"
cp "$ROOT_DIR/app/app-shell.js" "$ANDROID_WEB_DIR/app-shell.js"
cp "$ROOT_DIR/app/manifest.webmanifest" "$ANDROID_WEB_DIR/manifest.webmanifest"
cp "$ROOT_DIR/app/sw.js" "$ANDROID_WEB_DIR/sw.js"

cp "$ROOT_DIR/styles.css" "$ANDROID_SHARED_DIR/styles.css"
cp "$ROOT_DIR/popup.js" "$ANDROID_SHARED_DIR/popup.js"
cp "$ROOT_DIR/logo.svg" "$ANDROID_SHARED_DIR/logo.svg"
cp "$ROOT_DIR/vendor/astronomy.browser.min.js" "$ANDROID_SHARED_DIR/vendor/astronomy.browser.min.js"
cp "$ROOT_DIR/vendor/html2canvas.min.js" "$ANDROID_SHARED_DIR/vendor/html2canvas.min.js"

printf "Synced shared web assets for app and Android shell.\n"
