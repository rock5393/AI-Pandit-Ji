# Extension Improvement Backlog

This file turns the current review and internet research into a practical build order.

## Priority 1

- Add a persistent `sidePanel` experience for long-form result reading, kundali viewing, and chart snapshots. Keep the popup for quick input only.
- Add a real options/settings page for:
  - default report language
  - OCR language preference
  - export defaults
  - privacy and data controls
- Harden red-flag logic for:
  - `Nadi`
  - `Rajju`
  - `Kuja / Manglik`
  - `Vedha`
  - severe `Bhakoot / Rashi` conflicts
- Split export into two explicit modes:
  - `Share Card`
  - `Detailed Report`
- Add OCR traceability in results:
  - `Entered manually`
  - `Read from file`
  - `Derived from Lagna`
  - `Approximate from birth chart`

## Priority 2

- Add a structured OCR review step before final auto-fill confirmation.
- Add multi-page PDF review for chart extraction.
- Add source confidence per extracted field.
- Add `Navamsa` as a first-class visible module, not just hidden support data.
- Add `Panchanga`, `Dasha`, and `Dosha` modules in a clearer layered output.
- Make the Odisha-style kundali board closer to the traditional East-India/Odia visual layout.

## Priority 3

- Add accessibility pass:
  - keyboard navigation
  - focus styling
  - screen-reader labels
  - non-color-only status states
- Tighten Chrome Web Store readiness:
  - permissions review
  - privacy language
  - screenshots
  - store copy
- Add regression test cases for:
  - strong match
  - average match
  - weak match
  - `Nadi` conflict
  - `Rajju` conflict
  - `Kuja / Manglik` caution

## Logic Gaps To Keep Honest

- Birth-details mode is stronger than chart-file mode.
- OCR-extracted chart mode is only as reliable as the parsed structure.
- The extension still does not match the private Odia Calendar engine exactly.
- The current astrology engine is reference-informed, but not a book-grade authoritative implementation.

## Source Benchmarks

- Chrome extension UX and UI:
  - https://developer.chrome.com/docs/extensions/develop/ui
  - https://developer.chrome.com/docs/extensions/reference/api/sidePanel
  - https://developer.chrome.com/docs/extensions/develop/ui/options-page
- Chrome store/privacy/accessibility:
  - https://developer.chrome.com/docs/webstore/best-practices
  - https://developer.chrome.com/docs/webstore/cws-dashboard-privacy
  - https://developer.chrome.com/docs/extensions/how-to/ui/a11y
- OCR/file reliability:
  - https://ocr.space/ocrapi
  - https://www.nutrient.io/guides/document-engine/ocr/best-practices/
- Astrology / matchmaking benchmarks:
  - https://www.vedicrishiastro.com/docs/api-ref/118/match_making_detailed_report
  - https://api.prokerala.com/pdf-reports
  - https://www.prokerala.com/astrology/porutham/
