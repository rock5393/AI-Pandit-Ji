# AI Pandit Ji - Codemagic-ready Android project

This package is flattened so Codemagic can detect it as a native Android app from the repository root.

## What to upload to GitHub
Upload everything in this folder directly to the repository root.

## Codemagic setup
1. Add the repo to Codemagic.
2. If prompted, choose the repository root as the project path.
3. Commit `codemagic.yaml` to the repository root.
4. Start the workflow named `android_webview_build`.

## What this workflow builds
- Always: debug APK (`app/build/outputs/apk/debug/...`)
- If signing variables are present: release AAB (`app/build/outputs/bundle/release/...`)

## Optional signing variables for release AAB
Create these in Codemagic only if you want a signed Play Store bundle:
- `CM_KEYSTORE_PATH`
- `CM_KEYSTORE_PASSWORD`
- `CM_KEY_ALIAS`
- `CM_KEY_PASSWORD`

## Notes
- This setup does not require committing `gradle-wrapper.jar`.
- The workflow installs Gradle 8.7 on the Codemagic build machine if Gradle is not already available.
