---
inclusion: always
---

# News Drafting — App-First Culture

Every news story produced in this workspace is a **live interactive web app**, not a document. Text and images are the floor, not the ceiling.

---

## The Standard Output for Every Story

Every completed story must produce all of the following:

| Output | Description |
|---|---|
| **React app** (`artifacts/<story-slug>/`) | The canonical interactive article — bilingual, with Report and Presentation views |
| **HTML export** | Static HTML rendition of the article for archiving and sharing |
| **DOCX** | Word document for print and editorial review |
| **PDF** | Print-ready PDF |
| **PPTX** | Presentation deck for briefings |

The React app is the source of truth. All other formats are derived from it.

---

## Workflow — How Every New Story Is Built

### Step 1 — Copy the story template

```
artifacts/story-template/   ← source template (never edit this directly)
```

Duplicate it and rename the folder to match the story slug:

```
artifacts/<story-slug>/     ← e.g. artifacts/pwd-road-scam/
```

Update the `name` field in the new `package.json`:
```json
"name": "@workspace/<story-slug>"
```

### Step 2 — Fill in `src/content.ts`

`content.ts` is the **journalist's brief** — the only file that needs to be edited for most stories. It contains every word, date, and claim in the article.

Every `TODO:` marker in the file is a field to fill in. The structure is:

```
stories.en / stories.hi     ← bilingual article text
timelines.en / timelines.hi ← key dates with tone (past / pivot / watch)
slideDecks.en / slideDecks.hi ← 8 speaker-ready presentation slides
deepDives.en / deepDives.hi ← optional long-form analytical deep dives
```

**Rule:** Use plain strings throughout `content.ts`. Do NOT use template literals (backtick strings) with embedded expressions (`${...}`) — use string concatenation (`+`) instead. This avoids TypeScript parsing issues with Devanagari text mixed with interpolations.

**Rule:** For apostrophes inside single-quoted strings (e.g. `'Rajasthan\'s PWD...'`), escape with backslash: `\'`. Inside double-quoted strings, no escaping needed.

### Step 3 — Run the dev server to preview

```bash
pnpm --filter @workspace/<story-slug> dev
```

The app has:
- **Report view** — 4-section article with timeline, evidence table, checklist, public test box
- **Presentation view** — 8 speaker-ready slide cards
- **EN / हिन्दी toggle** — full bilingual switching
- **Reading progress bar**
- **Sticky TOC sidebar**
- **Copy-link + print/export buttons**
- **Deep reading section** (if `deepDives` array is populated)

### Step 4 — Export outputs

Once the app looks correct, generate the document exports:
- Use the browser print dialog (Ctrl+P / Cmd+P) to save as PDF
- The `.html`, `.docx`, and `.pptx` exports follow the same pattern as `artifacts/rajasthan-ifms-crisis/`

---

## Content Structure Reference

### `stories` object fields

| Field | What to write |
|---|---|
| `eyebrow` | Topic tag: `"Investigation / PWD"` or `"Report / IFMS"` |
| `location` | State · Year: `"Rajasthan · 2026"` |
| `title` | Main headline, under 12 words |
| `dek` | 2–3 sentence standfirst explaining what happened |
| `metadata` | `[source tag, "Read time · X min", "Report view"]` |
| `editorQuote` | One-line editorial stance (e.g. "This is a record, not a verdict.") |
| `summary` | One sentence thesis of the entire story |
| `established` | What is confirmed and on record |
| `reported` | What is reported but not yet verified |
| `sections` | 4 chapters — each with `id`, `number`, `title`, `paragraphs[]` |
| `toc` | Exactly 5 short sidebar labels |
| `operational` | 3–5 bullet phrases describing systemic failures |
| `observation` | Editorial caveat on the source |
| `evidence[]` | Evidence table: `label`, `detail`, `status` |
| `distinction` | The "important distinction" disclaimer |
| `checklist[]` | Action items / recommendations |
| `publicTest` | The final accountability question |
| `deskNote` | One editorial guiding principle (right sidebar) |
| `longform` | Array of `DeepDive` entries — set via `deepDives` export |

### `timelines` entry tones

| Tone | Dot colour | Use for |
|---|---|---|
| `'past'` | Primary (dark) | Background facts, established history |
| `'pivot'` | Accent (amber) | Turning points, key decisions |
| `'watch'` | Terracotta (red) | Unresolved concerns, ongoing issues |

### `slides` accent colours

`'amber'` · `'blue'` · `'terracotta'` · `'sage'` · `'ink'`

Suggested slide sequence: Context → What Changed → Timeline → Operational Strain → Evidence Gaps → Risk/Accountability → Public Impact → Recommendations

---

## Design System — Do Not Change

The visual design is locked. **Never edit `src/index.css` in a story folder.** The design system provides:

- **Fonts:** DM Sans (UI) · Instrument Serif (headlines) · DM Mono (labels/metadata)
- **Colors:** Warm navy primary · Amber accent · Terracotta alerts · Sage secondary
- **Dark mode:** Automatic, fully defined
- **Print CSS:** `.no-print` hides nav; body gets paper background
- **Noise texture:** Subtle SVG fractalNoise overlay for editorial feel

If you need to update the design system, update `artifacts/ifms-news-article/src/index.css` as the master, then copy it to `artifacts/story-template/src/index.css`.

---

## Story Template Location

```
artifacts/story-template/
├── package.json          ← copy and rename for each new story
├── tsconfig.json         ← do not edit
├── vite.config.ts        ← do not edit
├── index.html            ← update <title> for each story
├── src/
│   ├── content.ts        ← THE BRIEF — fill in all TODO fields
│   ├── App.tsx           ← do not edit (renderer)
│   ├── index.css         ← do not edit (design system)
│   ├── main.tsx          ← do not edit
│   ├── lib/utils.ts      ← do not edit
│   ├── hooks/            ← do not edit
│   └── components/ui/    ← do not edit (55 shadcn components)
```

---

## Quality Checklist Before Publishing

Before any story is considered complete, verify all of the following:

- [ ] All `TODO:` markers removed from `content.ts`
- [ ] Both EN and HI versions filled in (no `TODO` remaining)
- [ ] `pnpm --filter @workspace/<story-slug> typecheck` passes with 0 errors
- [ ] Report view renders correctly in browser — all 4 sections, timeline, evidence table, checklist
- [ ] Presentation view renders all 8 slides
- [ ] EN ↔ हिन्दी toggle works
- [ ] Reading progress bar moves on scroll
- [ ] Print/export works (Ctrl+P shows clean article)
- [ ] `distinction` field present — story does not overstate what is proven
- [ ] `observation` field present — source limits are acknowledged
- [ ] `publicTest` field present — accountability question is stated

---

## Naming Convention

Story slugs should be lowercase, hyphen-separated, descriptive:

```
pwd-road-scam
ifms-payment-crisis
irrigation-mb-missing
rajasthan-pwd-bitumen
```

The slug becomes: the folder name, the pnpm package name (`@workspace/<slug>`), and the basis for exported file names.

---

## Reference Stories

Completed stories for reference and pattern:

| Story | Folder | Notes |
|---|---|---|
| IFMS 3.0 Payment Crisis | `artifacts/ifms-news-article/` | Full EN+HI · 28 deep dives · bilingual slides |
| Rajasthan IFMS Investigation | `artifacts/rajasthan-ifms-crisis/` | Includes DOCX/PDF/PPTX export pipeline |
