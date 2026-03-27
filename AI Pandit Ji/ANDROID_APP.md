# AI Pandit Ji Android App

This page is only for the app side of the project.

## What Exists

- `app/` - standalone mobile web app and PWA
- `android-app/` - Android WebView wrapper project
- `scripts/sync-app-assets.sh` - syncs shared web assets into the app and Android folders

## App Structure

- `app/index.html` - app entry page
- `app/app.css` - app-specific layout and mobile styling
- `app/app-shell.js` - install prompt and app shell behavior
- `app/manifest.webmanifest` - PWA manifest
- `app/sw.js` - service worker
- `app/shared/` - shared logo, styles, matching logic, and astronomy library

## Android Structure

- `android-app/app/src/main/java/com/aipanditji/app/MainActivity.kt` - Android host activity
- `android-app/app/src/main/assets/web/` - bundled web app assets for Android
- `android-app/app/build.gradle.kts` - Android app module config

## How To Keep App Files In Sync

Run:

```bash
zsh scripts/sync-app-assets.sh
```

Use this after changing shared UI or logic like:

- `popup.js`
- `styles.css`
- `logo.svg`
- `vendor/astronomy.browser.min.js`
- files inside `app/`

## Open The App Version

1. Open `app/index.html` in a browser, or serve the folder with any static server.
2. Use the same kundli matching flow outside the extension popup.
3. Install it as a PWA from the browser if supported.

## Open The Android Project

1. Open `android-app/` in Android Studio.
2. Run `zsh scripts/sync-app-assets.sh`.
3. Build and run from Android Studio.

## Android Release-Ready Next Steps

These are the next polish items for the app path:

1. Add proper launcher icons in all Android sizes.
2. Add splash screen branding.
3. Finalize APK/AAB build settings.
4. Add release signing config.
5. Test file upload, OCR, language switching, and report-card download on device.
