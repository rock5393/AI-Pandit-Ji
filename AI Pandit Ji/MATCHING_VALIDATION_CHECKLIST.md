AI Pandit Ji Matching Validation Checklist

Use this checklist before shipping any horoscope-logic change.

Core logic
- Confirm the change belongs to one of the supported families:
  - Ashtakoota
  - South Porutham
  - Tamil Porutham
  - Kerala Porutham
- Confirm the rule has a source-backed basis.
- Confirm failed red-flag checks do not still earn soft fallback points without a cited reason.

Red-flag checks
- Nadi failure should visibly reduce the score.
- Bhakoot failure should visibly reduce the score in Ashtakoota.
- Rajju failure should visibly reduce the score in porutham flows.
- Weak chart or OCR confidence should reduce the score slightly and add caution notes.

Score-band sanity
- Weak case should not read as “good”.
- Borderline case should not read as “very good”.
- Strong case should require both score support and lack of major blockers.

Test cases to run
1. Strong match
   Expected:
   - no major blockers
   - score in good or strong band
2. Average match
   Expected:
   - moderate score
   - caution wording visible
3. Nadi fail case
   Expected:
   - final score reduced
   - trust/care notes mention the issue
4. Bhakoot fail case
   Expected:
   - Ashtakoota result reduced
   - long-term/family caution visible
5. Rajju fail case
   Expected:
   - porutham result reduced
   - marriage stability caution visible
6. Low-confidence birth-place case
   Expected:
   - confidence warning visible
   - final score reduced slightly
7. Low-confidence OCR case
   Expected:
   - OCR warning visible
   - final score reduced slightly

UI honesty
- The visible copy should match the actual engine family used.
- State labels must not imply a fully separate state engine unless one exists.
- Compare mode should clearly compare the two reference styles being used.

Report/download
- UI score and downloaded score must match.
- Match level wording must use the adjusted final score, not the raw pre-penalty score.
- Caution notes should appear in the download if they appear in the UI.

Before release
- Reload extension and test at least 3 real sample pairs.
- Verify app/shared asset sync has been run:
  zsh scripts/sync-app-assets.sh
