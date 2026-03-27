AI Pandit Ji Matching Reference Standard

Purpose
This file defines the current reference stack for kundli matching logic in this project.
It is meant to reduce rule drift and keep future logic changes aligned to a known baseline.

Current intended positioning
- Guidance tool with tradition-informed logic
- Not a classical-authority astrology engine
- Not a substitute for full horoscope judgment by a qualified astrologer

Primary matching families in this project
1. Ashtakoota / Guna Milan
   Used as the primary family for most Indian states in the current build.
2. South Porutham
   Used for Andhra Pradesh, Karnataka, and Telangana.
3. Tamil Porutham
   Used for Tamil Nadu.
4. Kerala Porutham
   Used for Kerala.

Reference hierarchy
1. Published traditional-structure references
   Used to define which checks belong to each family.
2. Stable modern astrology references and API docs
   Used to confirm score ranges, names, and practical interpretation.
3. Internal product policy
   Used only where the references do not define a complete rule in implementation detail.

Reference links currently used
- Drik Panchang horoscope matching
  https://www.drikpanchang.com/jyotisha/horoscope-match/horoscope-match.html
- Prokerala Porutham
  https://www.prokerala.com/astrology/porutham/
- Prokerala marriage mantras / caveats
  https://www.prokerala.com/astrology/marriage-mantras.htm
- Vedic Rishi match making detailed report
  https://www.vedicrishiastro.com/docs/api-ref/118/match_making_detailed_report
- AstrologyAPI match making detailed report
  https://astrologyapi.com/docs/api-ref/118/match_making_detailed_report
- Prokerala API demo
  https://api.prokerala.com/demo/
- Prokerala sample PDF reports
  https://api.prokerala.com/pdf-reports
- AstroVed Tamil Rasi Porutham article
  https://www.astroved.com/articles/rasi-porutham-tamil

Project rules
- Do not add new region or state engines unless there is a source-backed traditional family behind them.
- Do not soften failed red-flag checks just to improve average scores.
- If a factor is treated as a major blocker in the reference family, the implementation should not quietly award fallback points unless a reference-backed exception is also implemented.
- If a rule is modeled rather than directly sourced, the UI/copy should stay honest about that.

Red-flag policy in current build
- Nadi failure reduces the final score.
- Bhakoot failure reduces the final score in the Ashtakoota family.
- Rajju failure reduces the final score in porutham families.
- Low-confidence input data reduces the final score slightly.

Known limitations
- No full classical book-by-book validation yet
- No complete dosha cancellation engine
- No full exception tables for every matching family
- OCR and birth-place confidence still affect result reliability

Future upgrade rule
Before changing any scoring table or threshold:
1. update this file if the reference source changes
2. update MATCHING_VALIDATION_CHECKLIST.md
3. test at least one good, one average, and one red-flag case
