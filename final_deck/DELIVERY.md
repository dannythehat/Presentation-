# Building Confidence — LimeChain CFO Board Deck

Final executive board deck built from `deck_master.md`. The narrative is
unchanged; every slide has been **redesigned** into a diagram, timeline,
dashboard, matrix or chart with a single message each.

## The Canva presentation

| | Link |
|---|---|
| **Edit in Canva (v2 — current)** | https://www.canva.com/d/dz4Kxa9aR6mIwao |
| **View / present (v2 — current)** | https://www.canva.com/d/95VEAX8o_dtbsfK |
| Edit (v1, superseded) | https://www.canva.com/d/oyg9HsumHb79fd0 |

v2 applies the board-advisor review: hero treatment on slide 4 (fracture marks
on the spine), slide 8 as a control panel, an explicit week-by-week tripwire
strip on slide 11, and slide 13 reframed as
*"I am not asking for budget. I am asking for decision rights."*

- 14 slides, 1920 × 1080, speaker notes preserved on every slide.
- Ready to present. Open the edit link to tweak anything; use the view link to present.

A portable, print-ready copy is also included: **`Building-Confidence-LimeChain-CFO.pdf`** (vector, 14 pages).

## Design language

Built to read like a strategy-consulting deck (McKinsey / Bain / Stripe Investor Day),
not a template. Minimal, high-contrast, lots of whitespace, one idea per slide.

- **Backgrounds** — warm charcoal (`#161917`) for high-drama slides, warm bone (`#F2F0E9`) for detail slides, alternated to pace the story.
- **Accent** — deep finance green (`#1C6B4A` / `#43A178`), with muted purple (`#6E6796`) reserved for the "Truth" phase and a muted rust (`#B0654A`) for problems / negatives. No bright colour.
- **Type** — Inter Tight (display), Inter (text), Fraunces (hero numerals only).
- Consistent header kicker, running foot label, page numbers, and a green "governing takeaway" strip.

## Slide map

| # | Slide | Redesigned as |
|---|---|---|
| 1 | Building Confidence | Title + three-phase footer |
| 2 | Five working assumptions | Ranked list, #1 flagged decision-shaping |
| 3 | The forecast is not noisy. It is biased. | Hero stat + deviation chart |
| 4 | Every ask is a break in one pipeline | Horizontal process spine (the key slide) |
| 5 | Three journeys, one order | Roadmap + parallel swimlanes |
| 6 | Stop the bleeding, see the truth | Day-dated timeline of 5 moves |
| 7 | €1.8m owed to us | Receivables playbook + risk bar |
| 8 | One version of the truth | Scorecard dashboard (8 KPIs) |
| 9 | What fixed-price actually changes | Today → ambition comparison matrix |
| 10 | Ambition right, sequencing is the risk | Four guardrail cards + readiness gate |
| 11 | Cygnus replayed | Margin-drift line chart vs tripwire |
| 12 | Commit / refuse | Two-column commitments vs refusals |
| 13 | I am asking for decision rights | Three-column ask + closing line |
| 14 | The 13-week cash view | Runway line chart (appendix) |

## How it was built (reproducible)

Everything lives in `design/`:

- `deck.html` + `styles.css` + `fonts/` — the slide source (HTML / CSS / SVG).
- `render.js` — renders each slide to a 2× PNG via Playwright + Chromium → `slides/`.
- `render_pdf.js` — prints the vector PDF.
- `make_canva_import.js` — generates `../canva_import.html`, the multi-page
  wrapper (one full-bleed slide image + `data-speaker-notes` per page) that the
  Canva importer turns into the presentation.
- `notes.json` — speaker notes, keyed by page.

```bash
cd design
NODE_PATH=$(npm root -g) node render.js       # slides/*.png
NODE_PATH=$(npm root -g) node render_pdf.js   # Building-Confidence-LimeChain-CFO.pdf
node make_canva_import.js                      # ../canva_import.html
```
