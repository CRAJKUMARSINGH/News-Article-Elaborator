// =============================================================================
// STORY CONTENT BRIEF
// =============================================================================
//
// HOW TO USE THIS FILE:
//
//   1. Duplicate the `artifacts/story-template/` folder.
//      Rename it to match your story: e.g. `artifacts/pwd-road-scam/`
//
//   2. Fill in every field marked with TODO in the `story` object below.
//      Both English (`en`) and Hindi (`hi`) versions are required.
//
//   3. The App.tsx renders everything from this file automatically.
//      You never need to touch App.tsx, index.css, or any component.
//
//   4. Run `pnpm --filter @workspace/<your-story-name> dev` to preview.
//
// FIELD GUIDE:
//   eyebrow      — Topic tag shown above the headline. e.g. "Investigation / PWD"
//   location     — State & year. e.g. "Rajasthan · 2026"
//   title        — The main headline. Keep it under 12 words.
//   dek          — Subtitle/standfirst. 2-3 sentences explaining the story.
//   metadata     — Array of 3 labels: source tag, read time, view label.
//   editorNote   — Short editorial caveat (established vs. reported).
//   summary      — One-sentence thesis of the story.
//   established  — What is confirmed/on record.
//   reported     — What is reported but not yet verified.
//   sections     — The 4 main report chapters (id, number, title, paragraphs[]).
//   toc          — 5 short labels for the sticky sidebar Table of Contents.
//   operational  — Bullet list of systemic problems or operational failures.
//   observation  — Editorial note on the source and its limits.
//   evidence[]   — Evidence table rows: label, detail, status.
//   distinction  — The "important distinction" disclaimer.
//   checklist[]  — Action items / recommendations.
//   publicTest   — The final accountability question for the reader.
//   deskNote     — One-line editorial guiding principle (right sidebar).
//   timeline[]   — Key dates with tone: 'past' | 'pivot' | 'watch'.
//   slides[]     — 8 speaker-ready presentation slides.
//   deepDives[]  — 10-30 analytical deep-dive entries (optional but powerful).
//
// =============================================================================

export type Language = 'en' | 'hi';
export type Tone = 'past' | 'pivot' | 'watch';

export type TimelineItem = {
  date: string;
  label: string;
  detail: string;
  tone: Tone;
};

export type Slide = {
  number: string;
  kicker: string;
  title: string;
  takeaway: string;
  copy: string;
  accent: 'amber' | 'blue' | 'terracotta' | 'sage' | 'ink';
};

export type EvidenceRowData = {
  label: string;
  detail: string;
  status: string;
};

export type DeepDive = {
  title: string;
  paragraphs: string[];
};

export type StoryContent = {
  eyebrow: string;
  location: string;
  title: string;
  dek: string;
  metadata: [string, string, string];
  editorTitle: string;
  editorQuote: string;
  editorBody: string;
  summaryLabel: string;
  summary: string;
  establishedLabel: string;
  established: string;
  reportedLabel: string;
  reported: string;
  sections: { id: string; number: string; title: string; paragraphs: string[] }[];
  toc: [string, string, string, string, string];
  operational: string[];
  observationTitle: string;
  observation: string;
  evidence: EvidenceRowData[];
  distinction: string;
  checklist: string[];
  publicTestTitle: string;
  publicTest: string;
  publicTestBody: string;
  deskNote: string;
  establishedKey: string;
  reportedKey: string;
  jump: string;
  longform: DeepDive[];
};

// =============================================================================
// FILL IN YOUR STORY BELOW
// =============================================================================

export const stories: Record<Language, StoryContent> = {
  en: {
    // --- HEADER ---
    eyebrow: 'Investigation / TODO-department',           // TODO
    location: 'Rajasthan \u00b7 2026',                   // TODO: update year/state
    title: 'TODO: Your headline goes here',              // TODO
    dek: 'TODO: Write a 2-3 sentence standfirst that explains what happened, who it affects, and why it matters now.',  // TODO
    metadata: ['Source brief', 'Read time \u00b7 10 min', 'Report view'],  // TODO: update read time

    // --- EDITOR NOTE (sidebar) ---
    editorTitle: 'Editor\'s note',
    editorQuote: 'TODO: One-line editorial stance.',     // TODO e.g. "This is a record of what was found, not a verdict."
    editorBody: 'TODO: One or two sentences on how facts vs. reported concerns are distinguished in this piece.',  // TODO

    // --- EXECUTIVE SUMMARY ---
    summaryLabel: 'Executive summary',
    summary: 'TODO: One sentence that captures the central finding or accountability question.',  // TODO
    establishedLabel: 'What is established:',
    established: 'TODO: List the confirmed facts — dates, agencies, actions that are on record.',  // TODO
    reportedLabel: 'What remains reported:',
    reported: 'TODO: List what is reported but not yet independently verified.',  // TODO

    // --- REPORT SECTIONS (4 chapters) ---
    // Each section should be 3-5 paragraphs. Use plain strings (no template literals).
    sections: [
      {
        id: 'chapter-background',
        number: '01',
        title: 'TODO: Background / how it started',     // TODO
        paragraphs: [
          'TODO: Opening paragraph — set the scene. When did this start? What was the system/situation before the problem?',  // TODO
          'TODO: Second paragraph — what changed? What decision, policy, or event triggered the issue?',  // TODO
          'TODO: Third paragraph — who is involved? Departments, contractors, officials, citizens affected.',  // TODO
        ],
      },
      {
        id: 'chapter-problem',
        number: '02',
        title: 'TODO: The problem / what went wrong',   // TODO
        paragraphs: [
          'TODO: Describe the core problem in concrete terms — what broke down, what was missing, what was ignored.',  // TODO
          'TODO: Explain the operational consequences — delays, financial impact, public harm.',  // TODO
          'TODO: Describe who benefits from the current situation and who bears the cost.',  // TODO
        ],
      },
      {
        id: 'chapter-evidence',
        number: '03',
        title: 'TODO: The evidence / what the record shows',  // TODO
        paragraphs: [
          'TODO: What documents, data, or observations support the story? Be specific — dates, amounts, portal names.',  // TODO
          'TODO: What is missing from the record that should be there? What transparency gap exists?',  // TODO
          'TODO: What is the distinction between what is proven vs. what is suspected?',  // TODO
        ],
      },
      {
        id: 'chapter-accountability',
        number: '04',
        title: 'TODO: What accountability requires',    // TODO
        paragraphs: [
          'TODO: What corrective actions are needed? Who must act?',  // TODO
          'TODO: What is the minimum standard the public should expect?',  // TODO
          'TODO: What is the public test — how would a citizen verify that the problem is fixed?',  // TODO
        ],
      },
    ],

    // --- TABLE OF CONTENTS (5 short labels for sidebar) ---
    toc: [
      'TODO: TOC label 1',  // TODO e.g. "The background"
      'TODO: TOC label 2',  // TODO e.g. "What went wrong"
      'TODO: TOC label 3',  // TODO e.g. "The evidence"
      'TODO: TOC label 4',  // TODO e.g. "What\'s missing"
      'TODO: TOC label 5',  // TODO e.g. "What must change"
    ],

    // --- OPERATIONAL PROBLEMS (bullet list, section 2) ---
    operational: [
      'TODO: Problem 1 — short, specific phrase',  // TODO
      'TODO: Problem 2 — short, specific phrase',  // TODO
      'TODO: Problem 3 — short, specific phrase',  // TODO
      'TODO: Problem 4 — short, specific phrase',  // TODO
    ],

    // --- OBSERVATION CALLOUT (section 2) ---
    observationTitle: 'Reported observation',
    observation: 'TODO: Clarify that the operational problems above are reported concerns from the source, not independently confirmed findings.',  // TODO

    // --- EVIDENCE TABLE (section 3) ---
    evidence: [
      {
        label: 'TODO: Document/record type',  // TODO e.g. "Measurement Book"
        detail: 'TODO: What is missing or problematic about this record?',  // TODO
        status: 'TODO: Status',  // TODO e.g. "Needs verification" / "Missing" / "Incomplete"
      },
      {
        label: 'TODO: Document/record type 2',  // TODO
        detail: 'TODO: What is missing or problematic?',  // TODO
        status: 'TODO: Status',  // TODO
      },
      {
        label: 'TODO: Document/record type 3',  // TODO
        detail: 'TODO: What is missing or problematic?',  // TODO
        status: 'TODO: Status',  // TODO
      },
      {
        label: 'Public visibility',
        detail: 'TODO: Describe the public transparency gap — what can citizens not see that they should be able to?',  // TODO
        status: 'Limited',
      },
    ],

    // --- DISTINCTION DISCLAIMER (section 3) ---
    distinction: 'TODO: The brief raises concerns but does not by itself prove wrongdoing. State what would be needed to confirm the evidence.',  // TODO

    // --- ACCOUNTABILITY CHECKLIST (section 4) ---
    checklist: [
      'TODO: Action item 1 — what should be attached/disclosed/done',  // TODO
      'TODO: Action item 2',  // TODO
      'TODO: Action item 3',  // TODO
      'TODO: Action item 4',  // TODO
      'TODO: Action item 5 — missing records should trigger scrutiny before approval',  // TODO
    ],

    // --- PUBLIC TEST (section 4 closing box) ---
    publicTestTitle: 'The public test',
    publicTest: 'TODO: Frame the accountability question as something any citizen could ask.',  // TODO e.g. "Can a reader trace a payment from sanction to work completion?"
    publicTestBody: 'TODO: If the answer is no, what does that mean for accountability?',  // TODO

    // --- RIGHT SIDEBAR ---
    deskNote: 'TODO: One editorial principle guiding this piece.',  // TODO e.g. "Separate what was seen from what is suspected."
    establishedKey: 'Established in brief',
    reportedKey: 'Reported concern',
    jump: 'Jump to checklist',

    // --- TIMELINE ---
    // tone: 'past' = grey dot, 'pivot' = accent dot, 'watch' = terracotta/alert dot
    // Add as many items as needed. Minimum 3-4.

    // --- SLIDES (8 speaker-ready cards for Presentation view) ---
    // Each slide: number, kicker (ALL CAPS label), title, takeaway (bold summary), copy (speaker text)
    // accent options: 'amber' | 'blue' | 'terracotta' | 'sage' | 'ink'

    // --- DEEP DIVES (analytical long-form section) ---
    // Each entry: title + 2 analytical paragraphs.
    // Leave empty array [] if not needed.

    // Populated below after the hi version
    longform: [],
  },

  hi: {
    // --- HEADER ---
    eyebrow: 'TODO: \u091c\u093e\u0902\u091a / \u0935\u093f\u092d\u093e\u0917',  // TODO e.g. "जांच / PWD"
    location: '\u0930\u093e\u091c\u0938\u094d\u0925\u093e\u0928 \u00b7 2026',   // TODO
    title: 'TODO: \u0939\u093f\u0902\u0926\u0940 \u092e\u0947\u0902 \u0936\u0940\u0930\u094d\u0937\u0915',  // TODO
    dek: 'TODO: \u0926\u094b-\u0924\u0940\u0928 \u0935\u093e\u0915\u094d\u092f\u094b\u0902 \u092e\u0947\u0902 \u0915\u0939\u093e\u0928\u0940 \u0915\u093e \u0938\u093e\u0930 \u0932\u093f\u0916\u0947\u0902\u0964',  // TODO
    metadata: ['\u0938\u094d\u0930\u094b\u0924 \u0928\u094b\u091f', '\u092a\u0922\u093c\u0928\u0947 \u0915\u093e \u0938\u092e\u092f \u00b7 10 \u092e\u093f\u0928\u091f', '\u0930\u093f\u092a\u094b\u0930\u094d\u091f'],  // TODO

    // --- EDITOR NOTE ---
    editorTitle: '\u0938\u0902\u092a\u093e\u0926\u0915\u0940\u092f \u091f\u093f\u092a\u094d\u092a\u0923\u0940',
    editorQuote: 'TODO: \u090f\u0915 \u092a\u0902\u0915\u094d\u0924\u093f \u092e\u0947\u0902 \u0938\u0902\u092a\u093e\u0926\u0915\u0940\u092f \u0926\u0943\u0937\u094d\u091f\u093f\u0915\u094b\u0923\u0964',  // TODO
    editorBody: 'TODO: \u0924\u0925\u094d\u092f \u0914\u0930 \u0930\u093f\u092a\u094b\u0930\u094d\u091f\u0947\u0921 \u091a\u093f\u0902\u0924\u093e\u0913\u0902 \u0915\u094b \u0905\u0932\u0917 \u0930\u0916\u0928\u0947 \u0915\u0940 \u0935\u093f\u0927\u093f \u0938\u094d\u092a\u0937\u094d\u091f \u0915\u0930\u0947\u0902\u0964',  // TODO

    // --- EXECUTIVE SUMMARY ---
    summaryLabel: '\u0938\u0902\u0915\u094d\u0937\u093f\u092a\u094d\u0924 \u0938\u093e\u0930',
    summary: 'TODO: \u090f\u0915 \u0935\u093e\u0915\u094d\u092f \u092e\u0947\u0902 \u092e\u0941\u0916\u094d\u092f \u0928\u093f\u0937\u094d\u0915\u0930\u094d\u0937 \u0932\u093f\u0916\u0947\u0902\u0964',  // TODO
    establishedLabel: '\u0915\u094d\u092f\u093e \u0938\u094d\u0925\u093e\u092a\u093f\u0924 \u0939\u0948:',
    established: 'TODO: \u092a\u0941\u0937\u094d\u091f \u0924\u0925\u094d\u092f \u0905\u0902\u0915\u093f\u0924 \u0915\u0930\u0947\u0902\u0964',  // TODO
    reportedLabel: '\u0915\u094d\u092f\u093e \u0930\u093f\u092a\u094b\u0930\u094d\u091f \u0939\u0941\u0906 \u0939\u0948:',
    reported: 'TODO: \u0905\u0938\u094d\u0925\u093e\u092a\u093f\u0924 \u091a\u093f\u0902\u0924\u093e\u090f\u0902 \u0932\u093f\u0916\u0947\u0902\u0964',  // TODO

    // --- SECTIONS ---
    sections: [
      {
        id: 'chapter-background',
        number: '01',
        title: 'TODO: \u092a\u0943\u0937\u094d\u0920\u092d\u0942\u092e\u093f',  // TODO
        paragraphs: [
          'TODO: \u0936\u0941\u0930\u0941\u0906\u0924\u0940 \u0905\u0928\u0941\u091a\u094d\u091b\u0947\u0926 \u2014 \u0915\u092c \u0914\u0930 \u0915\u0948\u0938\u0947 \u0936\u0941\u0930\u0942 \u0939\u0941\u0906?',  // TODO
          'TODO: \u0926\u0942\u0938\u0930\u093e \u0905\u0928\u0941\u091a\u094d\u091b\u0947\u0926 \u2014 \u0915\u094d\u092f\u093e \u092c\u0926\u0932\u093e?',  // TODO
          'TODO: \u0924\u0940\u0938\u0930\u093e \u0905\u0928\u0941\u091a\u094d\u091b\u0947\u0926 \u2014 \u0915\u094c\u0928 \u0938\u0947 \u0935\u093f\u092d\u093e\u0917/\u0920\u0947\u0915\u0947\u0926\u093e\u0930 \u0936\u093e\u092e\u093f\u0932 \u0939\u0948\u0902?',  // TODO
        ],
      },
      {
        id: 'chapter-problem',
        number: '02',
        title: 'TODO: \u0938\u092e\u0938\u094d\u092f\u093e',  // TODO
        paragraphs: [
          'TODO: \u0938\u092e\u0938\u094d\u092f\u093e \u0915\u093e \u0935\u093f\u0935\u0930\u0923\u0964',  // TODO
          'TODO: \u092a\u0930\u093f\u0923\u093e\u092e\u0964',  // TODO
          'TODO: \u0915\u093f\u0938\u0947 \u0932\u093e\u092d \u0939\u094b\u0924\u093e \u0939\u0948?',  // TODO
        ],
      },
      {
        id: 'chapter-evidence',
        number: '03',
        title: 'TODO: \u0938\u093e\u0915\u094d\u0937\u094d\u092f',  // TODO
        paragraphs: [
          'TODO: \u0915\u094c\u0928\u0938\u0947 \u0926\u0938\u094d\u0924\u093e\u0935\u0947\u091c/\u0921\u0947\u091f\u093e \u0909\u092a\u0932\u092c\u094d\u0927 \u0939\u0948\u0902?',  // TODO
          'TODO: \u0915\u094d\u092f\u093e \u0917\u093e\u092f\u092c \u0939\u0948?',  // TODO
          'TODO: \u0938\u093f\u0926\u094d\u0927 \u0914\u0930 \u0938\u0902\u0926\u093f\u0917\u094d\u0927 \u092e\u0947\u0902 \u0905\u0902\u0924\u0930\u0964',  // TODO
        ],
      },
      {
        id: 'chapter-accountability',
        number: '04',
        title: 'TODO: \u091c\u0935\u093e\u092c\u0926\u0947\u0939\u0940',  // TODO
        paragraphs: [
          'TODO: \u0915\u094d\u092f\u093e \u0938\u0941\u0927\u093e\u0930 \u091c\u0930\u0942\u0930\u0940 \u0939\u0948?',  // TODO
          'TODO: \u0928\u094d\u092f\u0942\u0928\u0924\u092e \u092e\u093e\u0928\u0915\u0964',  // TODO
          'TODO: \u091c\u0928\u0924\u093e \u0915\u0940 \u0915\u0938\u094c\u091f\u0940\u0964',  // TODO
        ],
      },
    ],

    toc: [
      'TODO: \u0935\u093f\u0937\u092f 1',  // TODO
      'TODO: \u0935\u093f\u0937\u092f 2',  // TODO
      'TODO: \u0935\u093f\u0937\u092f 3',  // TODO
      'TODO: \u0935\u093f\u0937\u092f 4',  // TODO
      'TODO: \u0935\u093f\u0937\u092f 5',  // TODO
    ],

    operational: [
      'TODO: \u0938\u092e\u0938\u094d\u092f\u093e 1',  // TODO
      'TODO: \u0938\u092e\u0938\u094d\u092f\u093e 2',  // TODO
      'TODO: \u0938\u092e\u0938\u094d\u092f\u093e 3',  // TODO
      'TODO: \u0938\u092e\u0938\u094d\u092f\u093e 4',  // TODO
    ],

    observationTitle: '\u0930\u093f\u092a\u094b\u0930\u094d\u091f\u0947\u0921 observation',
    observation: 'TODO: \u0938\u094d\u0930\u094b\u0924 \u0915\u0940 \u0938\u0940\u092e\u093e\u090f\u0902 \u0938\u094d\u092a\u0937\u094d\u091f \u0915\u0930\u0947\u0902\u0964',  // TODO

    evidence: [
      {
        label: 'TODO: \u0926\u0938\u094d\u0924\u093e\u0935\u0947\u091c 1',  // TODO
        detail: 'TODO: \u0938\u092e\u0938\u094d\u092f\u093e \u0915\u094d\u092f\u093e \u0939\u0948?',  // TODO
        status: 'TODO: \u0938\u094d\u0925\u093f\u0924\u093f',  // TODO
      },
      {
        label: 'TODO: \u0926\u0938\u094d\u0924\u093e\u0935\u0947\u091c 2',  // TODO
        detail: 'TODO: \u0938\u092e\u0938\u094d\u092f\u093e?',  // TODO
        status: 'TODO: \u0938\u094d\u0925\u093f\u0924\u093f',  // TODO
      },
      {
        label: 'TODO: \u0926\u0938\u094d\u0924\u093e\u0935\u0947\u091c 3',  // TODO
        detail: 'TODO: \u0938\u092e\u0938\u094d\u092f\u093e?',  // TODO
        status: 'TODO: \u0938\u094d\u0925\u093f\u0924\u093f',  // TODO
      },
      {
        label: '\u0938\u093e\u0930\u094d\u0935\u091c\u0928\u093f\u0915 \u0926\u0943\u0936\u094d\u092f\u0924\u093e',
        detail: 'TODO: \u0928\u093e\u0917\u0930\u093f\u0915\u094b\u0902 \u0915\u0947 \u0932\u093f\u090f transparency \u0915\u093e \u0905\u0902\u0924\u0930 \u0915\u094d\u092f\u093e \u0939\u0948?',  // TODO
        status: '\u0938\u0940\u092e\u093f\u0924',
      },
    ],

    distinction: 'TODO: \u0938\u094d\u0930\u094b\u0924 \u091a\u093f\u0902\u0924\u093e \u0909\u0920\u093e\u0924\u093e \u0939\u0948, \u0906\u0930\u094b\u092a \u0938\u093f\u0926\u094d\u0927 \u0928\u0939\u0940\u0902 \u0915\u0930\u0924\u093e\u0964',  // TODO

    checklist: [
      'TODO: \u0915\u093e\u0930\u094d\u0930\u0935\u093e\u0908 1',  // TODO
      'TODO: \u0915\u093e\u0930\u094d\u0930\u0935\u093e\u0908 2',  // TODO
      'TODO: \u0915\u093e\u0930\u094d\u0930\u0935\u093e\u0908 3',  // TODO
      'TODO: \u0915\u093e\u0930\u094d\u0930\u0935\u093e\u0908 4',  // TODO
      'TODO: \u0915\u093e\u0930\u094d\u0930\u0935\u093e\u0908 5',  // TODO
    ],

    publicTestTitle: '\u091c\u0928\u0924\u093e \u0915\u0940 \u0915\u0938\u094c\u091f\u0940',
    publicTest: 'TODO: \u091c\u0935\u093e\u092c\u0926\u0947\u0939\u0940 \u0915\u093e \u092e\u0941\u0916\u094d\u092f \u0938\u0935\u093e\u0932 \u0939\u093f\u0902\u0926\u0940 \u092e\u0947\u0902 \u0932\u093f\u0916\u0947\u0902\u0964',  // TODO
    publicTestBody: 'TODO: \u0905\u0917\u0930 \u091c\u0935\u093e\u092c \u0928\u0939\u0940\u0902 \u0939\u0948, \u0924\u094b \u0907\u0938\u0915\u093e \u0915\u094d\u092f\u093e \u0905\u0930\u094d\u0925 \u0939\u0948?',  // TODO

    deskNote: 'TODO: \u0921\u0947\u0938\u094d\u0915 \u0928\u094b\u091f \u2014 \u090f\u0915 \u0938\u0902\u092a\u093e\u0926\u0915\u0940\u092f \u0938\u093f\u0926\u094d\u0927\u093e\u0902\u0924\u0964',  // TODO
    establishedKey: '\u0938\u094d\u0930\u094b\u0924 \u092e\u0947\u0902 \u0938\u094d\u0925\u093e\u092a\u093f\u0924',
    reportedKey: '\u0930\u093f\u092a\u094b\u0930\u094d\u091f\u0947\u0921 \u091a\u093f\u0902\u0924\u093e',
    jump: '\u091a\u0947\u0915\u0932\u093f\u0938\u094d\u091f \u092a\u0930 \u091c\u093e\u090f\u0902',

    longform: [],
  },
};

// =============================================================================
// TIMELINE — fill in key dates
// =============================================================================

export const timelines: Record<Language, TimelineItem[]> = {
  en: [
    // TODO: Add timeline entries. Minimum 3-4.
    // tone: 'past' = background/established, 'pivot' = turning point, 'watch' = ongoing concern
    {
      date: 'TODO: Date',
      label: 'TODO: Label',
      detail: 'TODO: One sentence describing what happened on this date.',
      tone: 'past',
    },
    {
      date: 'TODO: Date',
      label: 'TODO: Label',
      detail: 'TODO: One sentence describing the turning point.',
      tone: 'pivot',
    },
    {
      date: 'TODO: Date',
      label: 'TODO: Current status',
      detail: 'TODO: One sentence describing the unresolved concern.',
      tone: 'watch',
    },
  ],
  hi: [
    {
      date: 'TODO: \u0924\u093e\u0930\u0940\u0916',
      label: 'TODO: \u0932\u0947\u092c\u0932',
      detail: 'TODO: \u0907\u0938 \u0924\u093e\u0930\u0940\u0916 \u0915\u094b \u0915\u094d\u092f\u093e \u0939\u0941\u0906\u0964',
      tone: 'past',
    },
    {
      date: 'TODO: \u0924\u093e\u0930\u0940\u0916',
      label: 'TODO: \u0932\u0947\u092c\u0932',
      detail: 'TODO: \u092e\u094b\u0921\u093c \u092c\u093f\u0902\u0926\u0941\u0964',
      tone: 'pivot',
    },
    {
      date: 'TODO: \u0924\u093e\u0930\u0940\u0916',
      label: 'TODO: \u0935\u0930\u094d\u0924\u092e\u093e\u0928 \u0938\u094d\u0925\u093f\u0924\u093f',
      detail: 'TODO: \u0905\u0928\u0938\u0941\u0932\u091d\u0940 \u091a\u093f\u0902\u0924\u093e\u0964',
      tone: 'watch',
    },
  ],
};

// =============================================================================
// PRESENTATION SLIDES — 8 speaker-ready cards
// =============================================================================

export const slideDecks: Record<Language, Slide[]> = {
  en: [
    // TODO: Fill in 8 slides. Each slide = one moment in the story.
    // Suggested structure:
    //   01 — The situation / context
    //   02 — What changed / the trigger
    //   03 — The timeline
    //   04 — Operational strain / how it manifested
    //   05 — Evidence gaps / what is missing
    //   06 — Risk / accountability dimension
    //   07 — Public impact / who is affected
    //   08 — Recommendations / what must happen
    {
      number: '01',
      kicker: 'CONTEXT',                               // TODO: ALL CAPS label
      title: 'TODO: Slide 1 title',                    // TODO
      takeaway: 'TODO: Bold one-sentence summary of this slide.',  // TODO
      copy: 'TODO: 2-3 sentences of speaker text for this slide.',  // TODO
      accent: 'amber',
    },
    {
      number: '02',
      kicker: 'WHAT CHANGED',                          // TODO
      title: 'TODO: Slide 2 title',                    // TODO
      takeaway: 'TODO: Bold summary.',                 // TODO
      copy: 'TODO: Speaker text.',                     // TODO
      accent: 'blue',
    },
    {
      number: '03',
      kicker: 'THE TIMELINE',                          // TODO
      title: 'TODO: Slide 3 title',                    // TODO
      takeaway: 'TODO: Bold summary.',                 // TODO
      copy: 'TODO: Speaker text.',                     // TODO
      accent: 'terracotta',
    },
    {
      number: '04',
      kicker: 'OPERATIONAL STRAIN',                    // TODO
      title: 'TODO: Slide 4 title',                    // TODO
      takeaway: 'TODO: Bold summary.',                 // TODO
      copy: 'TODO: Speaker text.',                     // TODO
      accent: 'sage',
    },
    {
      number: '05',
      kicker: 'EVIDENCE GAPS',                         // TODO
      title: 'TODO: Slide 5 title',                    // TODO
      takeaway: 'TODO: Bold summary.',                 // TODO
      copy: 'TODO: Speaker text.',                     // TODO
      accent: 'ink',
    },
    {
      number: '06',
      kicker: 'ACCOUNTABILITY',                        // TODO
      title: 'TODO: Slide 6 title',                    // TODO
      takeaway: 'TODO: Bold summary.',                 // TODO
      copy: 'TODO: Speaker text.',                     // TODO
      accent: 'terracotta',
    },
    {
      number: '07',
      kicker: 'PUBLIC IMPACT',                         // TODO
      title: 'TODO: Slide 7 title',                    // TODO
      takeaway: 'TODO: Bold summary.',                 // TODO
      copy: 'TODO: Speaker text.',                     // TODO
      accent: 'blue',
    },
    {
      number: '08',
      kicker: 'RECOMMENDATIONS',                       // TODO
      title: 'TODO: Slide 8 title',                    // TODO
      takeaway: 'TODO: Bold summary.',                 // TODO
      copy: 'TODO: Speaker text.',                     // TODO
      accent: 'amber',
    },
  ],
  hi: [
    { number: '01', kicker: 'TODO', title: 'TODO: \u0938\u094d\u0932\u093e\u0907\u0921 1', takeaway: 'TODO', copy: 'TODO', accent: 'amber' },
    { number: '02', kicker: 'TODO', title: 'TODO: \u0938\u094d\u0932\u093e\u0907\u0921 2', takeaway: 'TODO', copy: 'TODO', accent: 'blue' },
    { number: '03', kicker: 'TODO', title: 'TODO: \u0938\u094d\u0932\u093e\u0907\u0921 3', takeaway: 'TODO', copy: 'TODO', accent: 'terracotta' },
    { number: '04', kicker: 'TODO', title: 'TODO: \u0938\u094d\u0932\u093e\u0907\u0921 4', takeaway: 'TODO', copy: 'TODO', accent: 'sage' },
    { number: '05', kicker: 'TODO', title: 'TODO: \u0938\u094d\u0932\u093e\u0907\u0921 5', takeaway: 'TODO', copy: 'TODO', accent: 'ink' },
    { number: '06', kicker: 'TODO', title: 'TODO: \u0938\u094d\u0932\u093e\u0907\u0921 6', takeaway: 'TODO', copy: 'TODO', accent: 'terracotta' },
    { number: '07', kicker: 'TODO', title: 'TODO: \u0938\u094d\u0932\u093e\u0907\u0921 7', takeaway: 'TODO', copy: 'TODO', accent: 'blue' },
    { number: '08', kicker: 'TODO', title: 'TODO: \u0938\u094d\u0932\u093e\u0907\u0921 8', takeaway: 'TODO', copy: 'TODO', accent: 'amber' },
  ],
};

// =============================================================================
// DEEP DIVES — optional long-form analytical section
// =============================================================================
// Add analytical questions that a journalist or auditor should ask about
// this specific story. Each entry = one section with a title and 2 paragraphs.
// Leave empty arrays if not needed for this story.

export const deepDives: Record<Language, DeepDive[]> = {
  en: [
    // TODO: Add deep-dive analytical entries.
    // Example structure:
    // {
    //   title: 'What a complete paper trail looks like for this type of work',
    //   paragraphs: [
    //     'A complete record for [this type of work] should include...',
    //     'A reviewer examining this story should ask...',
    //   ],
    // },
  ],
  hi: [
    // TODO: Hindi versions of the deep-dive entries above.
  ],
};
