import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { TooltipProvider } from '@/components/ui/tooltip';
import {
  ArrowUpRight,
  BookOpen,
  Check,
  ChevronRight,
  ClipboardCheck,
  Clock3,
  FileText,
  Flag,
  Layers3,
  Link as LinkIcon,
  Menu,
  Printer,
  ShieldAlert,
  Sparkles,
  X,
} from 'lucide-react';
import {
  stories,
  timelines,
  slideDecks,
  deepDives,
  type EvidenceRowData,
  type Language,
  type DeepDive,
} from './content';

type View = 'report' | 'presentation';

const queryClient = new QueryClient();

// ---------------------------------------------------------------------------
// Chrome strings — UI labels not part of the story content
// ---------------------------------------------------------------------------
const chrome = {
  en: {
    report: 'Report',
    presentation: 'Presentation',
    copy: 'Copy link',
    copied: 'Link copied',
    print: 'Print / export',
    mobilePrint: 'Print',
    evidenceDesk: 'The evidence desk',
    footerLine: 'Public-interest reporting begins with a record that can be followed.',
    output: 'Output',
    prepared: 'Prepared from supplied source brief. Unresolved claims remain labelled.',
    presentationNarrative: 'Presentation narrative',
    slides: '8 slides',
    speakerNotes: 'Speaker notes included',
    eightMoments: 'Eight moments in the story',
    deck: 'Deck \u00b7 editorial use',
    printPresentation: 'Print presentation',
    printNote: 'Uses your browser\'s print dialog. No file is downloaded automatically.',
    speakerReady: 'Speaker-ready copy',
    closing: 'Closing prompt',
    closingText: 'Accountability is not achieved by publishing data. It is achieved when the record can be independently checked.',
  },
  hi: {
    report: '\u0930\u093f\u092a\u094b\u0930\u094d\u091f',
    presentation: '\u092a\u094d\u0930\u0947\u091c\u0947\u0902\u091f\u0947\u0936\u0928',
    copy: '\u0932\u093f\u0902\u0915 \u0915\u0949\u092a\u0940 \u0915\u0930\u0947\u0902',
    copied: '\u0932\u093f\u0902\u0915 \u0915\u0949\u092a\u0940 \u0939\u094b \u0917\u092f\u093e',
    print: '\u092a\u094d\u0930\u093f\u0902\u091f / \u090f\u0915\u094d\u0938\u092a\u094b\u0930\u094d\u091f',
    mobilePrint: '\u092a\u094d\u0930\u093f\u0902\u091f',
    evidenceDesk: '\u092a\u094d\u0930\u092e\u093e\u0923 \u0921\u0947\u0938\u094d\u0915',
    footerLine: '\u091c\u0928\u0939\u093f\u0924 \u0915\u0940 \u0930\u093f\u092a\u094b\u0930\u094d\u091f\u093f\u0902\u0917 \u0909\u0938 \u0930\u093f\u0915\u0949\u0930\u094d\u0921 \u0938\u0947 \u0936\u0941\u0930\u0942 \u0939\u094b\u0924\u0940 \u0939\u0948 \u091c\u093f\u0938\u0947 \u0915\u094b\u0908 \u092d\u0940 \u0926\u0947\u0916 \u0914\u0930 \u0938\u092e\u091d \u0938\u0915\u0947\u0964',
    output: '\u0906\u0909\u091f\u092a\u0941\u091f',
    prepared: '\u0909\u092a\u0932\u092c\u094d\u0927 \u0938\u094d\u0930\u094b\u0924-\u0928\u094b\u091f \u0938\u0947 \u0924\u0948\u092f\u093e\u0930\u0964 \u0905\u0928\u0938\u0941\u0932\u091d\u0947 \u0926\u093e\u0935\u094b\u0902 \u0915\u094b \u0938\u094d\u092a\u0937\u094d\u091f \u0930\u0942\u092a \u0938\u0947 label \u0915\u093f\u092f\u093e \u0917\u092f\u093e \u0939\u0948\u0964',
    presentationNarrative: '\u092a\u094d\u0930\u0947\u091c\u0947\u0902\u091f\u0947\u0936\u0928 \u0928\u0948\u0930\u0947\u091f\u093f\u0935',
    slides: '8 \u0938\u094d\u0932\u093e\u0907\u0921',
    speakerNotes: 'Speaker notes \u0936\u093e\u092e\u093f\u0932',
    eightMoments: '\u0915\u0939\u093e\u0928\u0940 \u0915\u0947 \u0906\u0920 \u092e\u0939\u0924\u094d\u0935\u092a\u0942\u0930\u094d\u0923 \u0915\u094d\u0937\u0923',
    deck: 'Deck \u00b7 \u0938\u0902\u092a\u093e\u0926\u0915\u0940\u092f \u0909\u092a\u092f\u094b\u0917',
    printPresentation: '\u092a\u094d\u0930\u0947\u091c\u0947\u0902\u091f\u0947\u0936\u0928 \u092a\u094d\u0930\u093f\u0902\u091f \u0915\u0930\u0947\u0902',
    printNote: '\u0906\u092a\u0915\u0947 browser \u0915\u093e print dialog \u0916\u0941\u0932\u0947\u0917\u093e\u0964 \u0915\u094b\u0908 file \u0905\u092a\u0928\u0947-\u0906\u092a download \u0928\u0939\u0940\u0902 \u0939\u094b\u0917\u0940\u0964',
    speakerReady: 'Speaker-ready copy',
    closing: '\u0938\u092e\u093e\u092a\u0928 \u0935\u093f\u091a\u093e\u0930',
    closingText: '\u091c\u0935\u093e\u092c\u0926\u0947\u0939\u0940 \u0921\u0947\u091f\u093e \u092a\u094d\u0930\u0915\u093e\u0936\u093f\u0924 \u0915\u0930\u0928\u0947 \u0938\u0947 \u0928\u0939\u0940\u0902 \u0906\u0924\u0940\u0964 \u0935\u0939 \u0924\u092c \u0906\u0924\u0940 \u0939\u0948 \u091c\u092c record \u0915\u094b \u0938\u094d\u0935\u0924\u0902\u0924\u094d\u0930 \u0930\u0942\u092a \u0938\u0947 \u091c\u093e\u0902\u091a\u093e \u091c\u093e \u0938\u0915\u0947\u0964',
  },
} as const;

// ---------------------------------------------------------------------------
// App
// ---------------------------------------------------------------------------
function App() {
  const [view, setView] = useState<View>('report');
  const [language, setLanguage] = useState<Language>('en');
  const [progress, setProgress] = useState(0);
  const [copied, setCopied] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const strings = stories[language];
  const labels = chrome[language];
  const currentLabel = useMemo(
    () => (view === 'report' ? strings.metadata[2] : labels.presentation),
    [labels.presentation, strings.metadata, view],
  );

  useEffect(() => {
    const updateProgress = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(100, Math.round((window.scrollY / max) * 100)) : 0);
    };
    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
    return () => window.removeEventListener('scroll', updateProgress);
  }, [view, language]);

  const switchView = (next: View) => {
    setView(next);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const switchLanguage = (next: Language) => {
    setLanguage(next);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="editorial-noise min-h-[100dvh] bg-background text-foreground">
          {/* Reading progress bar */}
          <div
            className="fixed left-0 top-0 z-[60] h-1 bg-accent transition-[width] duration-300"
            style={{ width: `${progress}%` }}
            aria-label={`Reading progress ${progress}%`}
            data-testid="progress-reading"
          />

          {/* Sticky header */}
          <header className="no-print sticky top-0 z-40 border-b border-sidebar-border bg-sidebar text-sidebar-foreground">
            <div className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between px-5 md:px-10">
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="group flex items-center gap-3 text-left"
                data-testid="button-home"
              >
                <span className="flex h-9 w-9 items-center justify-center border border-accent/60 text-accent">
                  <span className="font-serif text-xl leading-none">\u091c</span>
                </span>
                <span>
                  <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
                    Jan Samvad Data
                  </span>
                  <span className="block font-serif text-lg leading-none text-sidebar-foreground">
                    {labels.evidenceDesk}
                  </span>
                </span>
              </button>

              <div className="hidden items-center gap-5 md:flex">
                <ViewSwitcher view={view} labels={labels} onView={switchView} />
                <LanguageSwitcher language={language} onLanguage={switchLanguage} />
                <button
                  onClick={copyLink}
                  className="flex items-center gap-2 text-xs text-sidebar-foreground/70 transition hover:text-accent"
                  data-testid="button-copy-link"
                >
                  <LinkIcon size={15} />
                  {copied ? labels.copied : labels.copy}
                </button>
                <button
                  onClick={() => window.print()}
                  className="flex items-center gap-2 text-xs text-sidebar-foreground/70 transition hover:text-accent"
                  data-testid="button-print"
                >
                  <Printer size={15} />
                  {labels.print}
                </button>
              </div>

              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="rounded p-2 text-sidebar-foreground md:hidden"
                data-testid="button-mobile-menu"
                aria-label="Open menu"
              >
                {menuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>

            {/* Mobile dropdown */}
            {menuOpen && (
              <div className="border-t border-sidebar-border px-5 py-4 md:hidden">
                <div className="flex flex-wrap gap-2">
                  <button onClick={() => switchView('report')} className={`flex-1 rounded-full px-3 py-2 text-xs ${view === 'report' ? 'bg-accent text-primary' : 'bg-sidebar-accent'}`}>{labels.report}</button>
                  <button onClick={() => switchView('presentation')} className={`flex-1 rounded-full px-3 py-2 text-xs ${view === 'presentation' ? 'bg-accent text-primary' : 'bg-sidebar-accent'}`}>{labels.presentation}</button>
                  <button onClick={() => switchLanguage('en')} className={`rounded-full px-3 py-2 text-xs ${language === 'en' ? 'bg-sidebar-foreground text-primary' : 'bg-sidebar-accent'}`}>EN</button>
                  <button onClick={() => switchLanguage('hi')} className={`rounded-full px-3 py-2 text-xs ${language === 'hi' ? 'bg-accent text-primary' : 'bg-sidebar-accent'}`}>\u0939\u093f\u0928\u094d\u0926\u0940</button>
                  <button onClick={copyLink} className="rounded-full bg-sidebar-accent px-3 py-2 text-xs">{copied ? labels.copied : labels.copy}</button>
                  <button onClick={() => window.print()} className="rounded-full bg-sidebar-accent px-3 py-2 text-xs">{labels.mobilePrint}</button>
                </div>
              </div>
            )}
          </header>

          {view === 'report' ? <ReportView language={language} /> : <PresentationView language={language} />}

          {/* Footer */}
          <footer className="no-print border-t border-border bg-sidebar px-5 py-12 text-sidebar-foreground md:px-10">
            <div className="mx-auto flex max-w-[1120px] flex-col justify-between gap-8 md:flex-row md:items-end">
              <div>
                <div className="mb-3 flex items-center gap-2 text-accent">
                  <span className="h-2 w-2 rounded-full bg-accent" />
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em]">Jan Samvad Data</span>
                </div>
                <p className="max-w-md font-serif text-2xl leading-tight">{labels.footerLine}</p>
              </div>
              <div className="text-left md:text-right">
                <p className="font-mono text-[10px] uppercase tracking-[0.17em] text-sidebar-foreground/50">{labels.output}</p>
                <p className="mt-1 text-sm">{currentLabel} \u00b7 Rajasthan \u00b7 2026</p>
                <p className="mt-5 text-xs text-sidebar-foreground/50">{labels.prepared}</p>
              </div>
            </div>
          </footer>
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

// ---------------------------------------------------------------------------
// View & Language switchers
// ---------------------------------------------------------------------------
function ViewSwitcher({ view, labels, onView }: { view: View; labels: { report: string; presentation: string }; onView: (v: View) => void }) {
  return (
    <div className="flex items-center gap-1 rounded-full border border-sidebar-border p-1" role="tablist" aria-label="Output view">
      <button onClick={() => onView('report')} className={`rounded-full px-4 py-2 text-xs font-semibold tracking-wide transition ${view === 'report' ? 'bg-accent text-primary' : 'text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground'}`}>
        <FileText size={14} className="mr-2 inline" />{labels.report}
      </button>
      <button onClick={() => onView('presentation')} className={`rounded-full px-4 py-2 text-xs font-semibold tracking-wide transition ${view === 'presentation' ? 'bg-accent text-primary' : 'text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground'}`}>
        <Layers3 size={14} className="mr-2 inline" />{labels.presentation}
      </button>
    </div>
  );
}

function LanguageSwitcher({ language, onLanguage }: { language: Language; onLanguage: (l: Language) => void }) {
  return (
    <div className="flex items-center rounded-full border border-sidebar-border p-1" role="tablist" aria-label="Language">
      <button onClick={() => onLanguage('en')} className={`rounded-full px-3 py-2 text-[11px] font-semibold transition ${language === 'en' ? 'bg-sidebar-foreground text-primary' : 'text-sidebar-foreground/70 hover:text-sidebar-foreground'}`}>EN</button>
      <button onClick={() => onLanguage('hi')} className={`rounded-full px-3 py-2 text-[11px] font-semibold transition ${language === 'hi' ? 'bg-accent text-primary' : 'text-sidebar-foreground/70 hover:text-sidebar-foreground'}`}>\u0939\u093f\u0928\u094d\u0926\u0940</button>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Report View
// ---------------------------------------------------------------------------
function ReportView({ language }: { language: Language }) {
  const strings = stories[language];
  const hasDeepdives = deepDives[language].length > 0;

  return (
    <main className="page-reveal">
      {/* Hero / masthead */}
      <section className="border-b border-border bg-sidebar text-sidebar-foreground">
        <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-16 md:grid-cols-[minmax(0,1fr)_300px] md:px-10 md:py-24">
          <div className="max-w-4xl">
            <div className="mb-7 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
              <span>{strings.eyebrow}</span>
              <span className="h-px w-10 bg-accent/60" />
              <span>{strings.location}</span>
            </div>
            <h1 className="max-w-4xl font-serif text-[2.75rem] leading-[0.98] tracking-tight sm:text-5xl md:text-7xl">
              {strings.title}
            </h1>
            <p className="mt-8 max-w-2xl text-base leading-7 text-sidebar-foreground/72 md:text-lg md:leading-8">
              {strings.dek}
            </p>
            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 border-t border-sidebar-border pt-5 font-mono text-[10px] uppercase tracking-[0.15em] text-sidebar-foreground/50">
              {strings.metadata.map((item) => <span key={item}>{item}</span>)}
            </div>
          </div>
          <aside className="self-end border-l border-accent/50 pl-5 md:mb-2">
            <div className="mb-4 flex items-center gap-2 text-accent">
              <Sparkles size={15} />
              <span className="font-mono text-[10px] uppercase tracking-[0.18em]">{strings.editorTitle}</span>
            </div>
            <p className="font-serif text-2xl leading-tight">{strings.editorQuote}</p>
            <p className="mt-4 text-sm leading-6 text-sidebar-foreground/60">{strings.editorBody}</p>
          </aside>
        </div>
      </section>

      {/* Three-column layout */}
      <div className="mx-auto grid max-w-[1240px] gap-12 px-5 py-12 md:grid-cols-[180px_minmax(0,760px)_180px] md:px-8 md:py-20">
        {/* Left sidebar — TOC */}
        <aside className="no-print hidden md:block">
          <div className="sticky top-28">
            <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              {language === 'hi' ? '\u0907\u0938 \u0930\u093f\u092a\u094b\u0930\u094d\u091f \u092e\u0947\u0902' : 'In this report'}
            </p>
            <nav className="space-y-3 border-l border-border pl-4">
              {strings.toc.map((label, index) => (
                <a
                  href={`#${['chapter-background', 'chapter-problem', 'chapter-evidence', 'chapter-accountability', 'deep-reading'][index] ?? 'chapter-background'}`}
                  key={`${label}-${index}`}
                  className="group block text-xs leading-4 text-muted-foreground transition hover:text-foreground"
                >
                  <span className="mr-2 font-mono text-[10px] text-accent">0{index + 1}</span>
                  {label}
                </a>
              ))}
            </nav>
            <div className="mt-10 border-t border-border pt-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                {language === 'hi' ? '\u092a\u0922\u093c\u0928\u0947 \u0915\u0947 \u0932\u093f\u090f scroll \u0915\u0930\u0947\u0902' : 'Scroll to read'}
              </p>
              <div className="mt-3 flex items-center gap-2 text-xs text-foreground">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                Live progress
              </div>
            </div>
          </div>
        </aside>

        {/* Center — article body */}
        <article className="min-w-0">
          {/* Executive summary box */}
          <section className="border-y-2 border-primary bg-card px-6 py-7 md:px-8" id="chapter-context">
            <div className="mb-5 flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">{strings.summaryLabel}</span>
              <ClipboardCheck size={18} className="text-muted-foreground" />
            </div>
            <p className="font-serif text-2xl leading-[1.18] text-foreground md:text-[1.75rem]">{strings.summary}</p>
            <div className="mt-6 grid gap-5 border-t border-border pt-5 text-sm leading-6 text-muted-foreground md:grid-cols-2">
              <p><strong className="text-foreground">{strings.establishedLabel}</strong> {strings.established}</p>
              <p><strong className="text-foreground">{strings.reportedLabel}</strong> {strings.reported}</p>
            </div>
          </section>

          {/* Report sections */}
          {strings.sections.map((section, sectionIndex) => (
            <section className="mt-20 first:mt-16" id={section.id} key={section.id}>
              <SectionHeading number={section.number} title={section.title} />
              {section.paragraphs.map((paragraph) => (
                <p className="mt-5 text-base leading-8 text-muted-foreground md:text-lg" key={paragraph}>
                  {paragraph}
                </p>
              ))}

              {/* After section 01: timeline */}
              {sectionIndex === 0 && <Timeline language={language} />}

              {/* After section 02: operational bullets + callout */}
              {sectionIndex === 1 && (
                <>
                  <div className="my-8 grid gap-3 md:grid-cols-2">
                    {strings.operational.map((item, index) => (
                      <div key={item} className="flex gap-4 border border-border bg-card p-5 transition hover:-translate-y-0.5 hover:border-accent">
                        <span className="font-mono text-xs text-accent">0{index + 1}</span>
                        <p className="text-sm leading-6">{item}</p>
                      </div>
                    ))}
                  </div>
                  <Callout title={strings.observationTitle}>{strings.observation}</Callout>
                </>
              )}

              {/* After section 03: evidence table + distinction */}
              {sectionIndex === 2 && (
                <>
                  <div className="mt-8 border-y border-border">
                    {strings.evidence.map((item) => <EvidenceRow key={item.label} {...item} />)}
                  </div>
                  <div className="mt-7 flex gap-4 border-l-2 border-accent bg-accent/10 px-5 py-5">
                    <ShieldAlert className="mt-0.5 shrink-0 text-accent" size={19} />
                    <p className="text-sm leading-6">
                      <strong>{language === 'hi' ? '\u092e\u0939\u0924\u094d\u0935\u092a\u0942\u0930\u094d\u0923 \u0905\u0902\u0924\u0930:' : 'Important distinction:'}</strong> {strings.distinction}
                    </p>
                  </div>
                </>
              )}

              {/* After section 04: checklist + public test */}
              {sectionIndex === 3 && (
                <>
                  <div className="mt-8 grid gap-3">
                    {strings.checklist.map((item) => (
                      <div className="flex items-start gap-4 border-b border-border py-4" key={item}>
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center border border-accent text-accent">
                          <Check size={13} />
                        </span>
                        <span className="text-sm leading-6">{item}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-10 border border-primary bg-primary px-6 py-7 text-primary-foreground md:px-8">
                    <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
                      <Flag size={14} />
                      {strings.publicTestTitle}
                    </div>
                    <p className="mt-4 font-serif text-2xl leading-tight md:text-[1.75rem]">{strings.publicTest}</p>
                    <p className="mt-4 max-w-2xl text-sm leading-6 text-primary-foreground/65">{strings.publicTestBody}</p>
                  </div>
                </>
              )}
            </section>
          ))}

          {/* Deep dives section (only if content exists) */}
          {hasDeepdives && <DeepReading language={language} items={deepDives[language]} />}
        </article>

        {/* Right sidebar — desk note + reading key */}
        <aside className="no-print hidden md:block">
          <div className="sticky top-28 space-y-8">
            <div>
              <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                {language === 'hi' ? '\u0921\u0947\u0938\u094d\u0915 \u0928\u094b\u091f' : 'Desk note'}
              </p>
              <p className="border-l border-accent pl-4 font-serif text-xl leading-tight">{strings.deskNote}</p>
            </div>
            <div className="border-t border-border pt-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Reading key</p>
              <div className="mt-4 space-y-3 text-xs">
                <span className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-accent" />
                  {strings.establishedKey}
                </span>
                <span className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-terracotta" />
                  {strings.reportedKey}
                </span>
              </div>
            </div>
            <a href="#chapter-accountability" className="flex items-center gap-2 text-xs font-semibold text-accent transition hover:gap-3">
              {strings.jump} <ArrowUpRight size={14} />
            </a>
          </div>
        </aside>
      </div>
    </main>
  );
}

// ---------------------------------------------------------------------------
// Presentation View
// ---------------------------------------------------------------------------
function PresentationView({ language }: { language: Language }) {
  const labels = chrome[language];
  const slides = slideDecks[language];

  return (
    <main className="page-reveal">
      <section className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-[1120px] flex-col justify-between gap-10 px-5 py-16 md:flex-row md:items-end md:px-8 md:py-24">
          <div className="max-w-3xl">
            <div className="mb-7 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
              <span>{labels.presentationNarrative}</span>
              <span className="h-px w-10 bg-accent/60" />
              <span>{labels.slides}</span>
            </div>
            <h1 className="font-serif text-[2.75rem] leading-[0.96] tracking-tight sm:text-5xl md:text-7xl">
              {language === 'hi'
                ? <>{stories.hi.title}</>
                : <>{stories.en.title}</>}
            </h1>
            <p className="mt-8 max-w-xl text-base leading-7 text-muted-foreground md:text-lg md:leading-8">
              {stories[language].dek}
            </p>
          </div>
          <div className="no-print flex shrink-0 flex-col items-start gap-4 md:items-end">
            <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
              <BookOpen size={14} />{labels.deck}
            </div>
            <button
              onClick={() => window.print()}
              className="flex items-center gap-2 border border-primary bg-primary px-5 py-3 text-xs font-semibold text-primary-foreground transition hover:bg-accent hover:text-primary"
            >
              <Printer size={15} />{labels.printPresentation}
            </button>
            <p className="max-w-[190px] text-right text-xs leading-5 text-muted-foreground">{labels.printNote}</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1120px] px-5 py-12 md:px-8 md:py-20">
        <div className="mb-10 flex items-end justify-between border-b border-border pb-5">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">{labels.speakerNotes}</p>
            <h2 className="mt-2 font-serif text-2xl md:text-3xl">{labels.eightMoments}</h2>
          </div>
          <span className="hidden font-mono text-xs text-muted-foreground md:block">01 \u2014 08</span>
        </div>

        <div className="space-y-5">
          {slides.map((slide) => (
            <article
              key={slide.number}
              className="group grid gap-6 border border-border bg-card p-6 transition hover:-translate-y-1 hover:border-accent hover:shadow-lg md:grid-cols-[72px_200px_1fr] md:gap-8 md:p-8"
            >
              <div className="font-mono text-3xl text-accent">{slide.number}</div>
              <div>
                <span className={`inline-block border px-2 py-1 font-mono text-[9px] tracking-[0.16em] ${slide.accent === 'terracotta' ? 'border-terracotta/50 text-terracotta' : slide.accent === 'sage' ? 'border-sage/50 text-sage' : 'border-accent/50 text-accent'}`}>
                  {slide.kicker}
                </span>
                <p className="mt-4 text-sm font-semibold leading-5 text-muted-foreground">{slide.takeaway}</p>
              </div>
              <div>
                <h3 className="font-serif text-2xl leading-[1.05] md:text-3xl">{slide.title}</h3>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">{slide.copy}</p>
                <div className="mt-5 flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.12em] text-muted-foreground opacity-0 transition group-hover:opacity-100">
                  <ChevronRight size={13} className="text-accent" />{labels.speakerReady}
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 border-l-2 border-accent bg-accent/10 px-6 py-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.17em] text-accent">{labels.closing}</p>
          <p className="mt-3 font-serif text-2xl leading-tight md:text-[1.75rem]">{labels.closingText}</p>
        </div>
      </section>
    </main>
  );
}

// ---------------------------------------------------------------------------
// Shared components
// ---------------------------------------------------------------------------
function SectionHeading({ number, title }: { number: string; title: string }) {
  return (
    <div className="flex items-start gap-4 border-b border-border pb-5">
      <span className="font-mono text-xs text-accent">{number}</span>
      <h2 className="font-serif text-3xl leading-[1.02] tracking-tight md:text-4xl">{title}</h2>
    </div>
  );
}

function Timeline({ language }: { language: Language }) {
  return (
    <div className="mt-10 border-l border-border pl-5 md:pl-7">
      {timelines[language].map((item) => (
        <div className="relative mb-8 last:mb-0" key={item.date}>
          <span className={`absolute -left-[25px] top-1 h-3 w-3 rounded-full border-2 border-background ${item.tone === 'watch' ? 'bg-terracotta' : item.tone === 'pivot' ? 'bg-accent' : 'bg-primary'}`} />
          <div className="flex flex-col gap-1 md:flex-row md:gap-8">
            <span className="w-24 shrink-0 font-mono text-[10px] uppercase tracking-[0.12em] text-accent">{item.date}</span>
            <div>
              <h3 className="font-semibold">{item.label}</h3>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">{item.detail}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function Callout({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="border border-terracotta/40 bg-terracotta/10 px-5 py-4">
      <div className="mb-1 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-terracotta">
        <Clock3 size={13} />{title}
      </div>
      <p className="text-sm leading-6">{children}</p>
    </div>
  );
}

function EvidenceRow({ label, detail, status }: EvidenceRowData) {
  return (
    <div className="grid gap-2 border-b border-border py-5 last:border-0 md:grid-cols-[150px_1fr_150px] md:items-start md:gap-5">
      <span className="font-semibold">{label}</span>
      <span className="text-sm leading-6 text-muted-foreground">{detail}</span>
      <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.1em] text-terracotta">
        <span className="h-1.5 w-1.5 rounded-full bg-terracotta" />{status}
      </span>
    </div>
  );
}

function DeepReading({ language, items }: { language: Language; items: DeepDive[] }) {
  return (
    <section className="mt-24 border-t-2 border-primary pt-8" id="deep-reading">
      <div className="mb-10 flex items-end justify-between gap-6 border-b border-border pb-5">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
            {language === 'hi' ? '\u0917\u0939\u0928 \u092a\u0920\u0928' : 'Deep reading'}
          </p>
          <h2 className="mt-2 max-w-2xl font-serif text-3xl leading-tight md:text-4xl">
            {language === 'hi'
              ? '\u0930\u093f\u0915\u0949\u0930\u094d\u0921 \u0915\u094b \u092a\u0922\u093c\u0928\u0947, \u091c\u093e\u0902\u091a\u0928\u0947 \u0914\u0930 \u0938\u0941\u0927\u093e\u0930\u0928\u0947 \u0915\u0947 \u0938\u0935\u093e\u0932'
              : 'Questions for reading, testing and repairing the record'}
          </h2>
        </div>
        <span className="hidden font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground md:block">
          {language === 'hi' ? '\u0932\u0902\u092c\u093e \u0935\u093f\u0936\u094d\u0932\u0947\u0937\u0923' : 'Long-form analysis'}
        </span>
      </div>
      <div className="space-y-14">
        {items.map((item, index) => (
          <article className="border-b border-border pb-12 last:border-0" key={item.title}>
            <div className="flex items-start gap-4">
              <span className="font-mono text-xs text-accent">{String(index + 1).padStart(2, '0')}</span>
              <h3 className="font-serif text-2xl leading-tight md:text-3xl">{item.title}</h3>
            </div>
            {item.paragraphs.map((paragraph) => (
              <p className="mt-5 text-base leading-8 text-muted-foreground md:text-lg" key={paragraph}>
                {paragraph}
              </p>
            ))}
          </article>
        ))}
      </div>
    </section>
  );
}

export default App;
