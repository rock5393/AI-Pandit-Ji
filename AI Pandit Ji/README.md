# AI Pandit Ji

AI Pandit Ji is a kundli matching tool for comparing two profiles from birth details or kundli files.

## Features

- Collects birth details for two people
- Supports kundli image and PDF upload with free OCR auto-fill
- Calculates a compatibility score out of 36
- Shows derived Kundli middle numbers for both profiles
- Explains positive and caution areas in simple language
- Compares East India and South India matching traditions
- Downloads a Compatibility Summary Report PDF
- Saves the latest form values in popup storage
- Includes a separate mobile app / Android track

## Project Files

- `manifest.json` - browser action manifest
- `popup.html` - popup layout
- `styles.css` - popup styling
- `popup.js` - matching logic and rendering
- `app/` - standalone mobile web app and PWA files
- `android-app/` - Android app wrapper project
- `scripts/sync-app-assets.sh` - syncs shared web assets into the app and Android folders
- `ANDROID_APP.md` - separate page for app and Android work
- `EXTENSION_IMPROVEMENT_BACKLOG.md` - prioritized extension improvement list
- `EXTENSION_MONITORING_WORKFLOW.md` - repeatable internet/product review workflow

## Load In Chrome

1. Open `chrome://extensions`
2. Turn on Developer mode
3. Click `Load unpacked`
4. Select this project folder

## App Track

The app and Android work has been moved to a separate page:

- `ANDROID_APP.md`

## Note

The scoring model in this prototype is simplified and educational. It gives a quick compatibility view, but it is not a full astrological horoscope engine.
