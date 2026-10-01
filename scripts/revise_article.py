#!/usr/bin/env python3
"""
revise_article.py
─────────────────────────────────────────────────────────────────
Jan Sanvaddata — Dynamic Input→Output Revision Engine
Usage:
  python scripts/revise_article.py --article sh32
  python scripts/revise_article.py --article rpcb
  python scripts/revise_article.py --article monaddongar
  python scripts/revise_article.py --all        (revise all articles that have inputFile)
  python scripts/revise_article.py --detect     (auto-detect changed INPUT files and ask)

What it does:
  1. Reads article-manifest.json to find which INPUT file drives which output HTML
  2. Reads the INPUT .txt source
  3. Parses it into sections (facts, chapters, demands, quotes)
  4. Regenerates the OUTPUT HTML preserving all Week-1 design uplift:
       - shared CSS link (jan-sanvaddata-base.css)
       - hero band, sticky masthead
       - drop caps, TOC anchor links
       - themed facts-box, pull-quote glyphs
       - mobile breakpoints
  5. Writes timestamp + input hash into the HTML source comment
  6. Prints a git commit command ready to run
─────────────────────────────────────────────────────────────────
"""

import argparse
import hashlib
import json
import os
import re
import sys
import textwrap
from datetime import datetime
from pathlib import Path

# ── Paths ──────────────────────────────────────────────────────
ROOT = Path(__file__).parent.parent
MANIFEST = ROOT / "article-manifest.json"

# ── Accent colour map ──────────────────────────────────────────
ACCENT_MAP = {
    "teal":    {"css": "var(--teal)",    "hex": "#0D9488"},
    "crimson": {"css": "var(--crimson)", "hex": "#9B1C1C"},
    "forest":  {"css": "var(--forest)",  "hex": "#166534"},
    "amber":   {"css": "var(--amber)",   "hex": "#B45309"},
}

FACTS_BOX_CLASS = {
    "teal":    "facts-box",
    "crimson": "facts-box facts-box--crimson",
    "forest":  "facts-box facts-box--forest",
    "amber":   "facts-box",
}


# ══════════════════════════════════════════════════════════════
#  INPUT PARSER
# ══════════════════════════════════════════════════════════════

def parse_input(raw: str) -> dict:
    """
    Lightly parse a raw INPUT .txt into structured sections.
    The txt files are semi-structured Hindi/English notes — we extract:
      - key facts (lines with numbers, ₹, km, years)
      - demand lines (lines starting with caps or bullet markers)
      - pull-quote candidates (lines in quotes or starting with ")
      - body paragraphs (everything else, grouped)
    Returns a dict consumed by the HTML generator.
    """
    lines = [l.strip() for l in raw.splitlines() if l.strip()]

    facts = []
    demands = []
    quotes = []
    body_lines = []

    # Patterns
    fact_pat  = re.compile(r'(\d[\d,.]*\s*(km|KM|किमी|वर्ष|crore|करोड़|लाख|%|bigha|बीघा|meter|मीटर|\d))', re.IGNORECASE)
    quote_pat = re.compile(r'^["\u201c\u201d]')
    demand_pat= re.compile(r'^[A-Z\u0900-\u097F]{2}|^[-•►▶→]|^\d+\.')

    for line in lines:
        if line.startswith('#') or line.startswith('//'):
            continue  # skip comment lines
        if quote_pat.match(line):
            quotes.append(line.strip('""\u201c\u201d').strip())
        elif demand_pat.match(line) and len(line) > 20:
            demands.append(line.lstrip('-•►▶→0123456789. ').strip())
        elif fact_pat.search(line) and len(line) < 120:
            facts.append(line)
        else:
            body_lines.append(line)

    # Group body lines into paragraphs (blank-line separated in source)
    paragraphs = []
    current = []
    for bl in body_lines:
        if bl == '':
            if current:
                paragraphs.append(' '.join(current))
                current = []
        else:
            current.append(bl)
    if current:
        paragraphs.append(' '.join(current))

    # If parser found no demands, treat last 3–5 ALL-CAPS lines as demands
    if not demands:
        caps_lines = [l for l in lines if l.isupper() and len(l) > 10]
        demands = caps_lines

    return {
        "facts": facts[:9],          # cap at 9 for the 3-col grid
        "demands": demands[:6],
        "quotes": quotes[:3],
        "paragraphs": paragraphs,
        "raw_lines": lines,
    }


# ══════════════════════════════════════════════════════════════
#  HTML GENERATOR
# ══════════════════════════════════════════════════════════════

def _esc(text: str) -> str:
    """Minimal HTML escape."""
    return text.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")


def build_facts_items(facts: list) -> str:
    if not facts:
        return "<div><div class='fact-num'>—</div><div class='fact-label'>देखें रिपोर्ट</div></div>"
    items = []
    for f in facts:
        # Try to split a number from its label
        m = re.match(r'^([\d,. ₹~][\d,. ₹~KMkm%]*\s*(?:km|KM|किमी|वर्ष|करोड़|लाख|बीघा|मीटर|crore)?)\s*[—\-–]?\s*(.*)$', f)
        if m:
            num, label = m.group(1).strip(), m.group(2).strip()
        else:
            num, label = "—", f
        items.append(f"    <div>\n      <div class='fact-num'>{_esc(num)}</div>\n      <div class='fact-label'>{_esc(label)}</div>\n    </div>")
    return "\n".join(items)


def build_toc(chapters: list) -> str:
    rows = []
    for i, ch in enumerate(chapters, 1):
        cid = f"ch{i}"
        rows.append(f"      <a class='toc-item' href='#{cid}'><span class='toc-num'>{i:02d}</span>{_esc(ch)}</a>")
    return "\n".join(rows)


def build_chapter_bodies(paragraphs: list, quotes: list, demands: list) -> str:
    """
    Distribute paragraphs into chapters, interleaving pull-quotes.
    If source has few paragraphs, group them all into one chapter.
    """
    if not paragraphs:
        paragraphs = ["(सामग्री INPUT फ़ाइल से लोड होगी — कृपया INPUT फ़ाइल अद्यतन करें।)"]

    # Aim for ~3–4 paragraphs per chapter
    chapter_size = max(2, len(paragraphs) // max(1, (len(paragraphs) // 4 or 1)))
    chunks = [paragraphs[i:i+chapter_size] for i in range(0, len(paragraphs), chapter_size)]

    chapter_titles = [
        "परिचय एवं पृष्ठभूमि",
        "मुख्य समस्याएं एवं तथ्य",
        "जवाबदेही और विफलता",
        "जनता की पीड़ा",
        "क्या होना चाहिए — सुधार",
        "निष्कर्ष",
    ]

    html_parts = []
    qi = 0  # quote index

    for idx, chunk in enumerate(chunks):
        cid = f"ch{idx+1}"
        title = chapter_titles[idx] if idx < len(chapter_titles) else f"अध्याय {idx+1}"
        marker = f"Chapter {idx+1:02d}"

        html_parts.append(f"""
  <div class="chapter" id="{cid}">
    <div class="chapter-marker">{marker}</div>
    <h2 class="chapter-title">{_esc(title)}</h2>
  </div>""")

        for pi, para in enumerate(chunk):
            drop = ' class="drop-cap"' if idx == 0 and pi == 0 else ''
            html_parts.append(f"\n  <p{drop}>{_esc(para)}</p>")

        # Insert a pull-quote after every other chapter if available
        if qi < len(quotes) and idx % 2 == 1:
            html_parts.append(f"""
  <div class="pull-quote">
    <blockquote>"{_esc(quotes[qi])}"</blockquote>
  </div>""")
            qi += 1

    # Demands box
    if demands:
        items_html = "\n".join(
            f"      <li><strong>{_esc(d[:60])}:</strong> {_esc(d[60:]) if len(d) > 60 else ''}</li>"
            for d in demands
        )
        html_parts.append(f"""
  <div class="demand-box">
    <h3>🔴 तत्काल अपेक्षित कार्रवाई</h3>
    <ul>
{items_html}
    </ul>
  </div>""")

    # Closing pull-quote
    if quotes:
        last_q = quotes[-1]
        html_parts.append(f"""
  <div class="pull-quote pull-quote--navy">
    <blockquote>"{_esc(last_q)}"</blockquote>
  </div>""")

    return "\n".join(html_parts)


def generate_html(article: dict, parsed: dict, input_hash: str, input_path: str) -> str:
    """Assemble the full uplifted HTML from manifest metadata + parsed input."""

    accent     = article.get("accentColor", "teal")
    title_hi   = article.get("title_hi", "शीर्षक")
    title_en   = article.get("title_en", "Title")
    badge      = article.get("sectionBadge", "")
    hero_ghost = article.get("heroGhost", "")
    hero_bg    = article.get("heroBg", "linear-gradient(135deg,#1E3A5F,#0D9488)")
    bureau     = article.get("bureau", "संवाददाता")
    date       = article.get("date", datetime.now().strftime("%-d %B %Y"))
    read_time  = article.get("readTime", "5 min read")
    category   = article.get("category", "Investigative Report")
    rep_type   = article.get("reportType", "Special Report")
    art_id     = article.get("id", "article")

    facts_items = build_facts_items(parsed["facts"])
    fb_class    = FACTS_BOX_CLASS.get(accent, "facts-box")

    chapters_for_toc = ["परिचय एवं पृष्ठभूमि", "मुख्य समस्याएं एवं तथ्य",
                         "जवाबदेही और विफलता", "जनता की पीड़ा",
                         "क्या होना चाहिए — सुधार", "निष्कर्ष"][:max(2, len(parsed["paragraphs"]) // 3 + 1)]
    toc_html    = build_toc(chapters_for_toc)
    body_html   = build_chapter_bodies(parsed["paragraphs"], parsed["quotes"], parsed["demands"])

    ts = datetime.now().strftime("%Y-%m-%d %H:%M")

    # Accent override CSS
    if accent == "crimson":
        accent_css = """
  :root { --accent: var(--crimson); }
  .pull-quote { border-left-color: var(--crimson); background: #FEF2F2; }
  .pull-quote::before { color: var(--crimson); }"""
    elif accent == "forest":
        accent_css = """
  :root { --accent: var(--forest); --light-green: #F0FDF4; }"""
    else:
        accent_css = """
  :root { --accent: var(--teal); }"""

    html = f"""<!DOCTYPE html>
<html lang="hi">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<meta name="description" content="{_esc(title_en)}"/>
<!-- SOURCE_METADATA
  article_id   : {art_id}
  input_file   : {input_path}
  input_hash   : {input_hash}
  last_revised : {ts}
  generator    : scripts/revise_article.py
-->
<title>{_esc(title_hi)} | जन संवाददाता</title>
<link rel="preconnect" href="https://fonts.googleapis.com"/>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,800;1,700&family=Noto+Serif+Devanagari:wght@400;600;700&family=Lora:ital,wght@0,400;0,600;1,400&family=Noto+Sans:wght@400;500;600;700&display=swap" rel="stylesheet"/>
<link rel="stylesheet" href="../jan-sanvaddata-base.css"/>
<style>{accent_css}

  .hero-band {{
    background: {hero_bg};
    color: #fff;
    padding: 3.2rem 2rem 2.2rem;
    text-align: center;
    position: relative;
    overflow: hidden;
  }}
  .hero-band::before {{
    content: "{_esc(hero_ghost)}";
    font-family: var(--font-display);
    font-size: 11rem;
    font-weight: 800;
    color: rgba(255,255,255,0.04);
    position: absolute;
    top: 50%; left: 50%;
    transform: translate(-50%,-50%);
    pointer-events: none;
    line-height: 1;
    letter-spacing: -0.04em;
  }}
  .hero-kicker {{
    font-family: var(--font-ui);
    font-size: 0.55rem;
    font-weight: 700;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.65);
    margin-bottom: 1rem;
    position: relative;
  }}
  .hero-title {{
    font-family: 'Noto Serif Devanagari', var(--font-display);
    font-size: clamp(1.8rem, 5.5vw, 3rem);
    font-weight: 700;
    line-height: 1.18;
    color: #fff;
    margin-bottom: 0.6rem;
    position: relative;
  }}
  .hero-subtitle {{
    font-family: var(--font-display);
    font-size: clamp(0.95rem, 2.5vw, 1.25rem);
    font-style: italic;
    color: rgba(255,255,255,0.7);
    position: relative;
  }}
  .revision-badge {{
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    font-family: var(--font-ui);
    font-size: 0.45rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    background: var(--light-tan);
    border: 1px solid var(--tan);
    border-left: 3px solid var(--accent);
    padding: 3px 10px;
    border-radius: 2px;
    color: var(--muted);
    margin-bottom: 1rem;
  }}
  @media (max-width: 540px) {{
    .hero-band::before {{ font-size: 5rem; }}
  }}
</style>
</head>
<body>

<!-- STICKY MASTHEAD -->
<div class="masthead">
  <div>
    <div class="pub-tag">Independent Investigative Journalism · Rajasthan</div>
    <div class="pub-name">जन संवाददाता</div>
  </div>
  <div class="masthead-meta">
    <strong>{category}</strong>
    {date} &nbsp;·&nbsp; {rep_type}
  </div>
</div>

<!-- HERO BAND -->
<div class="hero-band">
  <div class="hero-kicker">{_esc(badge)}</div>
  <h1 class="hero-title">{_esc(title_hi)}</h1>
  <p class="hero-subtitle">{_esc(title_en)}</p>
</div>

<div class="article-wrap">

  <div class="section-badge">{badge}</div>

  <!-- REVISION BADGE -->
  <div class="revision-badge">
    🔄 संशोधित — Revised: {ts} &nbsp;·&nbsp; Source: {os.path.basename(input_path)}
  </div>

  <hr class="rule"/>

  <div class="byline">
    <strong>संवाददाता | Special Correspondent</strong>
    <span>{bureau}</span>
    <span>·</span>
    <span>{date}</span>
    <span>·</span>
    <span>⏱ {read_time}</span>
  </div>

  <!-- TABLE OF CONTENTS -->
  <div class="toc">
    <div class="toc-title">📖 विषय-सूची — Contents</div>
    <div class="toc-grid">
{toc_html}
    </div>
  </div>

  <!-- KEY FACTS BOX -->
  <div class="{fb_class}">
    <div class="facts-box-title">⚡ मुख्य तथ्य — Key Facts at a Glance</div>
{facts_items}
  </div>

{body_html}

</div><!-- /article-wrap -->

<div class="footer-bar">
  <strong>जन संवाददाता</strong> &nbsp;·&nbsp; Independent Investigative Journalism, Rajasthan &nbsp;·&nbsp; © {datetime.now().year} &nbsp;·&nbsp;
  {bureau} &nbsp;·&nbsp; {date}
</div>

</body>
</html>
"""
    return html


# ══════════════════════════════════════════════════════════════
#  REVISION LOGIC
# ══════════════════════════════════════════════════════════════

def load_manifest() -> list:
    with open(MANIFEST, encoding="utf-8") as f:
        data = json.load(f)
    return data["articles"]


def file_hash(path: Path) -> str:
    return hashlib.md5(path.read_bytes()).hexdigest()[:12]


def revise_one(article: dict, force: bool = False) -> bool:
    """Revise a single article. Returns True if HTML was written."""
    art_id     = article["id"]
    input_rel  = article.get("inputFile")
    output_rel = article["outputFile"]

    if not input_rel:
        print(f"  ⚠  [{art_id}] No inputFile defined — skipping (manual article).")
        return False

    input_path  = ROOT / input_rel
    output_path = ROOT / output_rel

    if not input_path.exists():
        print(f"  ✗  [{art_id}] INPUT file not found: {input_path}")
        return False

    # Check if input changed vs what is recorded in the existing HTML
    current_hash = file_hash(input_path)
    recorded_hash = None

    if output_path.exists():
        content = output_path.read_text(encoding="utf-8")
        m = re.search(r'input_hash\s*:\s*([a-f0-9]+)', content)
        if m:
            recorded_hash = m.group(1)

    if not force and recorded_hash == current_hash:
        print(f"  ✓  [{art_id}] No changes in INPUT since last revision — skipping. (Use --force to override)")
        return False

    print(f"  →  [{art_id}] Revising from: {input_rel}")

    raw      = input_path.read_text(encoding="utf-8")
    parsed   = parse_input(raw)
    html     = generate_html(article, parsed, current_hash, input_rel)

    output_path.parent.mkdir(parents=True, exist_ok=True)
    output_path.write_text(html, encoding="utf-8")

    # Update lastRevised in manifest (in-memory only, user can save)
    article["lastRevised"] = datetime.now().strftime("%Y-%m-%d %H:%M")

    print(f"  ✅  [{art_id}] Written → {output_rel}")
    return True


def detect_changed(articles: list) -> list:
    """Return list of article IDs whose INPUT hash differs from what is in the HTML."""
    changed = []
    for a in articles:
        if not a.get("inputFile"):
            continue
        ip = ROOT / a["inputFile"]
        op = ROOT / a["outputFile"]
        if not ip.exists():
            continue
        cur_hash = file_hash(ip)
        rec_hash = None
        if op.exists():
            m = re.search(r'input_hash\s*:\s*([a-f0-9]+)', op.read_text(encoding="utf-8"))
            if m:
                rec_hash = m.group(1)
        if cur_hash != rec_hash:
            changed.append(a["id"])
    return changed


def save_manifest(articles: list):
    """Write lastRevised timestamps back to manifest."""
    with open(MANIFEST, encoding="utf-8") as f:
        data = json.load(f)
    # Update lastRevised for each article
    id_map = {a["id"]: a for a in articles}
    for ma in data["articles"]:
        if ma["id"] in id_map:
            ma["lastRevised"] = id_map[ma["id"]].get("lastRevised")
    with open(MANIFEST, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)


# ══════════════════════════════════════════════════════════════
#  CLI
# ══════════════════════════════════════════════════════════════

def main():
    parser = argparse.ArgumentParser(
        description="Jan Sanvaddata — Revise news article HTML from INPUT source file",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog=textwrap.dedent("""
        Examples:
          python scripts/revise_article.py --article sh32
          python scripts/revise_article.py --article rpcb --force
          python scripts/revise_article.py --all
          python scripts/revise_article.py --detect
        """)
    )
    parser.add_argument("--article", metavar="ID",
                        help="Article ID from manifest (sh32 | rpcb | monaddongar | ifms)")
    parser.add_argument("--all",    action="store_true",
                        help="Revise all articles that have an inputFile")
    parser.add_argument("--detect", action="store_true",
                        help="Detect which INPUT files changed and list them")
    parser.add_argument("--force",  action="store_true",
                        help="Force regeneration even if INPUT hash unchanged")
    args = parser.parse_args()

    if not MANIFEST.exists():
        print("✗  article-manifest.json not found. Run from repo root.")
        sys.exit(1)

    articles = load_manifest()
    id_map   = {a["id"]: a for a in articles}

    print("\n━━━ Jan Sanvaddata Revision Engine ━━━━━━━━━━━━━━━━━━━━━━━\n")

    revised_any = False

    if args.detect:
        changed = detect_changed(articles)
        if changed:
            print(f"  📝  Changed INPUT files detected for: {', '.join(changed)}")
            print("  Run:  python scripts/revise_article.py --all  (or --article <id>)")
        else:
            print("  ✓  No INPUT changes detected.")
        print()
        return

    if args.all:
        for a in articles:
            if revise_one(a, force=args.force):
                revised_any = True
    elif args.article:
        if args.article not in id_map:
            print(f"  ✗  Unknown article id '{args.article}'. Available: {list(id_map.keys())}")
            sys.exit(1)
        if revise_one(id_map[args.article], force=args.force):
            revised_any = True
    else:
        parser.print_help()
        sys.exit(0)

    if revised_any:
        save_manifest(articles)
        print()
        print("  ─────────────────────────────────────────────────────────")
        print("  Git commands to push the revision:\n")
        print("    git add outputs/ article-manifest.json")
        print('    git commit -m "Revise articles from updated INPUT sources"')
        print("    git push origin main")
        print("  ─────────────────────────────────────────────────────────")

    print()


if __name__ == "__main__":
    main()
