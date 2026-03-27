# Android Release Checklist

## Ready In Project

- Android WebView app shell exists in `android-app/`
- launcher icon setup added
- Android splash screen setup added
- local web app assets bundled in `android-app/app/src/main/assets/web/`
- Android file save bridge added for report card export

## Blockers Before Go-Live

1. Gradle wrapper is missing, so CLI build cannot be run from this workspace right now.
2. A release keystore is missing.
3. A signed APK or AAB has not been generated yet.
4. Privacy policy must be hosted on a public URL.
5. Play Console listing assets are still needed if publishing to Play Store.
6. Final device testing is still required for:
   - kundli file upload
   - OCR
   - report card download
   - language switching
   - app install/open behavior

## Fastest Path In The Next 2 Hours

1. Open `android-app/` in Android Studio.
2. Let Android Studio sync dependencies.
3. Generate the Gradle wrapper if prompted.
4. Build a debug APK first.
5. Test on one Android phone.
6. Create a release keystore.
7. Build a signed release APK or AAB.
8. Host `PRIVACY_POLICY.md` content on a public page.
9. Prepare Play listing assets if using Play Store.

## If You Need A Direct APK Fast

The fastest realistic option is:

1. Build a signed APK in Android Studio
2. Share it directly for sideload testing

This is faster than full Play Store review and listing setup.
