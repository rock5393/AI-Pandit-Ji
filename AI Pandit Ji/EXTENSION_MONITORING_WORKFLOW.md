# Extension Monitoring Workflow

This project does not have a true always-on agent. Use this file as the standing workflow for periodic review.

## Cadence

- Weekly:
  - review Chrome extension platform changes
  - review OCR/file-upload reliability patterns
  - review current kundli/matchmaking competitor signals
- Before release:
  - rerun the full checklist below
- After any major logic change:
  - compare against known benchmark cases

## What To Monitor

### Chrome Extension Platform

- popup vs side-panel UX guidance
- permission and privacy policy changes
- Web Store policy changes
- accessibility guidance updates

Primary sources:
- https://developer.chrome.com/docs/extensions/develop/ui
- https://developer.chrome.com/docs/extensions/reference/api/sidePanel
- https://developer.chrome.com/docs/webstore/best-practices
- https://developer.chrome.com/docs/webstore/program-policies/policies

### OCR / File Reliability

- PDF extraction patterns
- image preprocessing guidance
- OCR confidence and low-quality handling
- multilingual OCR support limits

Primary sources:
- https://ocr.space/ocrapi
- OCR/document processing vendor docs with image-quality guidance

### Kundli / Matchmaking Signals

- Ashtakoota thresholds
- Rajju / Nadi / Kuja handling
- South/Tamil/Kerala porutham presentation
- report content depth: chart, dosha, navamsa, dasha, export

Benchmark sources:
- https://www.vedicrishiastro.com/docs/api-ref/118/match_making_detailed_report
- https://www.prokerala.com/astrology/porutham/
- https://api.prokerala.com/pdf-reports

## Review Questions

- Did Chrome guidance change in a way that affects popup, side panel, permissions, or store listing?
- Did OCR best practices suggest a change in preprocessing, confidence thresholds, or field review flow?
- Are competitors now showing deeper chart context that the extension still lacks?
- Are we still overstating any astrology logic that is only approximate?
- Are export/report features keeping up with user expectations?

## Output Format For Each Review

Create a short review note with:

1. Date of review
2. What changed on the internet
3. Whether code changes are needed
4. Priority of each change:
   - `P1`
   - `P2`
   - `P3`
5. What to test after implementation

## Suggested Prompt For Future Review Agent Runs

Use this prompt when asking for a new review:

`Review current internet-facing best practices and competitive signals for this Chrome extension: Chrome extension UX, OCR/file-upload reliability, astrology/kundli matching presentation, and report/export UX. Return only actionable improvement points, grouped by severity, with source links.`
