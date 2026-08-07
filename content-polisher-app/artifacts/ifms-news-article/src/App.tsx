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
import { reports, slideDecks, timelines, type EvidenceRowData, type Language } from './content';

type View = 'report' | 'presentation';

const queryClient = new QueryClient();

const chrome = {
  en: {
    report: 'Report', presentation: 'Presentation', copy: 'Copy link', copied: 'Link copied',
    print: 'Print / export', mobilePrint: 'Print', evidenceDesk: 'The evidence desk',
    footerLine: 'Public-interest reporting begins with a record that can be followed.',
    output: 'Output', prepared: 'Prepared from the supplied source brief. Unresolved claims remain labelled.',
    presentationNarrative: 'Presentation narrative', slides: '8 slides', speakerNotes: 'Speaker notes included',
    eightMoments: 'Eight moments in the handover', deck: 'Deck · editorial use', printPresentation: 'Print presentation',
    printNote: 'Uses your browser’s print dialog. No file is downloaded automatically.', speakerReady: 'Speaker-ready copy',
    closing: 'Closing prompt', closingText: 'A portal is not transparent because it is digital. It is transparent when the record can be checked.',
  },
  hi: {
    report: 'रिपोर्ट', presentation: 'प्रेजेंटेशन', copy: 'लिंक कॉपी करें', copied: 'लिंक कॉपी हो गया',
    print: 'प्रिंट / एक्सपोर्ट', mobilePrint: 'प्रिंट', evidenceDesk: 'प्रमाण डेस्क',
    footerLine: 'जनहित की रिपोर्टिंग उस रिकॉर्ड से शुरू होती है जिसे कोई भी देख और समझ सके।',
    output: 'आउटपुट', prepared: 'उपलब्ध स्रोत-नोट से तैयार। अनसुलझे दावों को स्पष्ट रूप से label किया गया है।',
    presentationNarrative: 'प्रेजेंटेशन नैरेटिव', slides: '8 स्लाइड', speakerNotes: 'Speaker notes शामिल',
    eightMoments: 'बदलाव के आठ महत्वपूर्ण क्षण', deck: 'Deck · संपादकीय उपयोग', printPresentation: 'प्रेजेंटेशन प्रिंट करें',
    printNote: 'आपके browser का print dialog खुलेगा। कोई file अपने-आप download नहीं होगी।', speakerReady: 'Speaker-ready copy',
    closing: 'समापन विचार', closingText: 'कोई portal केवल digital होने से transparent नहीं बनता। वह तब transparent होता है जब उसका record जांचा जा सके।',
  },
} as const;

function App() {
  const [view, setView] = useState<View>('report');
  const [language, setLanguage] = useState<Language>('en');
  const [progress, setProgress] = useState(0);
  const [copied, setCopied] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const strings = reports[language];
  const labels = chrome[language];
  const currentLabel = useMemo(() => view === 'report' ? strings.metadata[2] : labels.presentation, [labels.presentation, strings.metadata, view]);

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
          <div className="fixed left-0 top-0 z-[60] h-1 bg-accent transition-[width] duration-300" style={{ width: `${progress}%` }} aria-label={`Reading progress ${progress}%`} data-testid="progress-reading" />
          <header className="no-print sticky top-0 z-40 border-b border-sidebar-border bg-sidebar text-sidebar-foreground">
            <div className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between px-5 md:px-10">
              <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="group flex items-center gap-3 text-left" data-testid="button-home">
                <span className="flex h-9 w-9 items-center justify-center border border-accent/60 text-accent"><span className="font-serif text-xl leading-none">ज</span></span>
                <span><span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-accent">Jan Samvad Data</span><span className="block font-serif text-lg leading-none text-sidebar-foreground">{labels.evidenceDesk}</span></span>
              </button>
              <div className="hidden items-center gap-5 md:flex">
                <ViewSwitcher view={view} labels={labels} onView={switchView} />
                <LanguageSwitcher language={language} onLanguage={switchLanguage} />
                <button onClick={copyLink} className="flex items-center gap-2 text-xs text-sidebar-foreground/70 transition hover:text-accent" data-testid="button-copy-link"><LinkIcon size={15} />{copied ? labels.copied : labels.copy}</button>
                <button onClick={() => window.print()} className="flex items-center gap-2 text-xs text-sidebar-foreground/70 transition hover:text-accent" data-testid="button-print"><Printer size={15} />{labels.print}</button>
              </div>
              <button onClick={() => setMenuOpen(!menuOpen)} className="rounded p-2 text-sidebar-foreground md:hidden" data-testid="button-mobile-menu" aria-label="Open menu">{menuOpen ? <X size={20} /> : <Menu size={20} />}</button>
            </div>
            {menuOpen && <div className="border-t border-sidebar-border px-5 py-4 md:hidden"><div className="flex flex-wrap gap-2">
              <button onClick={() => switchView('report')} className={`flex-1 rounded-full px-3 py-2 text-xs ${view === 'report' ? 'bg-accent text-primary' : 'bg-sidebar-accent'}`}>{labels.report}</button>
              <button onClick={() => switchView('presentation')} className={`flex-1 rounded-full px-3 py-2 text-xs ${view === 'presentation' ? 'bg-accent text-primary' : 'bg-sidebar-accent'}`}>{labels.presentation}</button>
              <button onClick={() => switchLanguage('en')} className={`rounded-full px-3 py-2 text-xs ${language === 'en' ? 'bg-sidebar-foreground text-primary' : 'bg-sidebar-accent'}`}>EN</button>
              <button onClick={() => switchLanguage('hi')} className={`rounded-full px-3 py-2 text-xs ${language === 'hi' ? 'bg-accent text-primary' : 'bg-sidebar-accent'}`}>हिन्दी</button>
              <button onClick={copyLink} className="rounded-full bg-sidebar-accent px-3 py-2 text-xs">{copied ? labels.copied : labels.copy}</button>
              <button onClick={() => window.print()} className="rounded-full bg-sidebar-accent px-3 py-2 text-xs">{labels.mobilePrint}</button>
            </div></div>}
          </header>

          {view === 'report' ? <ReportView language={language} /> : <PresentationView language={language} />}

          <footer className="no-print border-t border-border bg-sidebar px-5 py-12 text-sidebar-foreground md:px-10">
            <div className="mx-auto flex max-w-[1120px] flex-col justify-between gap-8 md:flex-row md:items-end">
              <div><div className="mb-3 flex items-center gap-2 text-accent"><span className="h-2 w-2 rounded-full bg-accent" /><span className="font-mono text-[10px] uppercase tracking-[0.2em]">Jan Samvad Data</span></div><p className="max-w-md font-serif text-2xl leading-tight">{labels.footerLine}</p></div>
              <div className="text-left md:text-right"><p className="font-mono text-[10px] uppercase tracking-[0.17em] text-sidebar-foreground/50">{labels.output}</p><p className="mt-1 text-sm">{currentLabel} · Rajasthan · 2026</p><p className="mt-5 text-xs text-sidebar-foreground/50">{labels.prepared}</p></div>
            </div>
          </footer>
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

function ViewSwitcher({ view, labels, onView }: { view: View; labels: typeof chrome.en; onView: (view: View) => void }) {
  return <div className="flex items-center gap-1 rounded-full border border-sidebar-border p-1" role="tablist" aria-label="Output view">
    <button onClick={() => onView('report')} className={`rounded-full px-4 py-2 text-xs font-semibold tracking-wide transition ${view === 'report' ? 'bg-accent text-primary' : 'text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground'}`}><FileText size={14} className="mr-2 inline" />{labels.report}</button>
    <button onClick={() => onView('presentation')} className={`rounded-full px-4 py-2 text-xs font-semibold tracking-wide transition ${view === 'presentation' ? 'bg-accent text-primary' : 'text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground'}`}><Layers3 size={14} className="mr-2 inline" />{labels.presentation}</button>
  </div>;
}

function LanguageSwitcher({ language, onLanguage }: { language: Language; onLanguage: (language: Language) => void }) {
  return <div className="flex items-center rounded-full border border-sidebar-border p-1" role="tablist" aria-label="Language">
    <button onClick={() => onLanguage('en')} className={`rounded-full px-3 py-2 text-[11px] font-semibold transition ${language === 'en' ? 'bg-sidebar-foreground text-primary' : 'text-sidebar-foreground/70 hover:text-sidebar-foreground'}`}>EN</button>
    <button onClick={() => onLanguage('hi')} className={`rounded-full px-3 py-2 text-[11px] font-semibold transition ${language === 'hi' ? 'bg-accent text-primary' : 'text-sidebar-foreground/70 hover:text-sidebar-foreground'}`}>हिन्दी</button>
  </div>;
}

function ReportView({ language }: { language: Language }) {
  const strings = reports[language];
  return <main className="page-reveal">
    <section className="border-b border-border bg-sidebar text-sidebar-foreground"><div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-16 md:grid-cols-[minmax(0,1fr)_300px] md:px-10 md:py-24">
      <div className="max-w-4xl"><div className="mb-7 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-accent"><span>{strings.eyebrow}</span><span className="h-px w-10 bg-accent/60" /><span>{strings.location}</span></div><h1 className="max-w-4xl font-serif text-5xl leading-[0.94] tracking-tight md:text-8xl">{strings.title}</h1><p className="mt-8 max-w-2xl text-lg leading-8 text-sidebar-foreground/72 md:text-xl">{strings.dek}</p><div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 border-t border-sidebar-border pt-5 font-mono text-[10px] uppercase tracking-[0.15em] text-sidebar-foreground/50">{strings.metadata.map((item) => <span key={item}>{item}</span>)}</div></div>
      <aside className="self-end border-l border-accent/50 pl-5 md:mb-2"><div className="mb-4 flex items-center gap-2 text-accent"><Sparkles size={15} /><span className="font-mono text-[10px] uppercase tracking-[0.18em]">{strings.editorTitle}</span></div><p className="font-serif text-2xl leading-tight">{strings.editorQuote}</p><p className="mt-4 text-sm leading-6 text-sidebar-foreground/60">{strings.editorBody}</p></aside>
    </div></section>

    <div className="mx-auto grid max-w-[1240px] gap-12 px-5 py-12 md:grid-cols-[180px_minmax(0,760px)_180px] md:px-8 md:py-20">
      <aside className="no-print hidden md:block"><div className="sticky top-28"><p className="mb-4 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{language === 'hi' ? 'इस रिपोर्ट में' : 'In this report'}</p><nav className="space-y-3 border-l border-border pl-4">{strings.toc.map((label, index) => <a href={`#${index < 2 ? 'chapter-record' : index === 2 ? 'chapter-strain' : index === 3 ? 'chapter-evidence' : 'chapter-accountability'}`} key={`${label}-${index}`} className="group block text-xs leading-4 text-muted-foreground transition hover:text-foreground"><span className="mr-2 font-mono text-[10px] text-accent">0{index + 1}</span>{label}</a>)}</nav><div className="mt-10 border-t border-border pt-4"><p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{language === 'hi' ? 'पढ़ने के लिए scroll करें' : 'Scroll to read'}</p><div className="mt-3 flex items-center gap-2 text-xs text-foreground"><span className="h-1.5 w-1.5 rounded-full bg-accent" />Live progress</div></div></div></aside>

      <article className="min-w-0">
        <section className="border-y-2 border-primary bg-card px-6 py-7 md:px-8" id="chapter-context"><div className="mb-5 flex items-center justify-between"><span className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">{strings.summaryLabel}</span><ClipboardCheck size={18} className="text-muted-foreground" /></div><p className="font-serif text-2xl leading-[1.18] text-foreground md:text-3xl">{strings.summary}</p><div className="mt-6 grid gap-5 border-t border-border pt-5 text-sm leading-6 text-muted-foreground md:grid-cols-2"><p><strong className="text-foreground">{strings.establishedLabel}</strong> {strings.established}</p><p><strong className="text-foreground">{strings.reportedLabel}</strong> {strings.reported}</p></div></section>
        {strings.sections.map((section, sectionIndex) => <section className="mt-20 first:mt-16" id={section.id} key={section.id}><SectionHeading number={section.number} title={section.title} />{section.paragraphs.map((paragraph) => <p className="mt-5 text-lg leading-8 text-muted-foreground" key={paragraph}>{paragraph}</p>)}{sectionIndex === 0 && <Timeline language={language} />}{sectionIndex === 1 && <><div className="my-8 grid gap-3 md:grid-cols-2">{strings.operational.map((item, index) => <div key={item} className="flex gap-4 border border-border bg-card p-5 transition hover:-translate-y-0.5 hover:border-accent"><span className="font-mono text-xs text-accent">0{index + 1}</span><p className="text-sm leading-6">{item}</p></div>)}</div><Callout title={strings.observationTitle}>{strings.observation}</Callout></>}{sectionIndex === 2 && <><div className="mt-8 border-y border-border">{strings.evidence.map((item) => <EvidenceRow key={item.label} {...item} />)}</div><div className="mt-7 flex gap-4 border-l-2 border-accent bg-accent/10 px-5 py-5"><ShieldAlert className="mt-0.5 shrink-0 text-accent" size={19} /><p className="text-sm leading-6"><strong>{language === 'hi' ? 'महत्वपूर्ण अंतर:' : 'Important distinction:'}</strong> {strings.distinction}</p></div></>}{sectionIndex === 3 && <><div className="mt-8 grid gap-3">{strings.checklist.map((item) => <div className="flex items-start gap-4 border-b border-border py-4" key={item}><span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center border border-accent text-accent"><Check size={13} /></span><span className="text-sm leading-6">{item}</span></div>)}</div><div className="mt-10 border border-primary bg-primary px-6 py-7 text-primary-foreground md:px-8"><div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-accent"><Flag size={14} />{strings.publicTestTitle}</div><p className="mt-4 font-serif text-2xl leading-tight md:text-3xl">{strings.publicTest}</p><p className="mt-4 max-w-2xl text-sm leading-6 text-primary-foreground/65">{strings.publicTestBody}</p></div></>}</section>)}
      </article>

      <aside className="no-print hidden md:block"><div className="sticky top-28 space-y-8"><div><p className="mb-3 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{language === 'hi' ? 'डेस्क नोट' : 'Desk note'}</p><p className="border-l border-accent pl-4 font-serif text-xl leading-tight">{strings.deskNote}</p></div><div className="border-t border-border pt-4"><p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Reading key</p><div className="mt-4 space-y-3 text-xs"><span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-accent" />{strings.establishedKey}</span><span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-terracotta" />{strings.reportedKey}</span></div></div><a href="#chapter-accountability" className="flex items-center gap-2 text-xs font-semibold text-accent transition hover:gap-3">{strings.jump} <ArrowUpRight size={14} /></a></div></aside>
    </div>
  </main>;
}

function SectionHeading({ number, title }: { number: string; title: string }) {
  return <div className="flex items-start gap-4 border-b border-border pb-5"><span className="font-mono text-xs text-accent">{number}</span><h2 className="font-serif text-4xl leading-none tracking-tight md:text-5xl">{title}</h2></div>;
}

function Timeline({ language }: { language: Language }) {
  return <div className="mt-10 border-l border-border pl-5 md:pl-7">{timelines[language].map((item) => <div className="relative mb-8 last:mb-0" key={item.date}><span className={`absolute -left-[25px] top-1 h-3 w-3 rounded-full border-2 border-background ${item.tone === 'watch' ? 'bg-terracotta' : item.tone === 'pivot' ? 'bg-accent' : 'bg-primary'}`} /><div className="flex flex-col gap-1 md:flex-row md:gap-8"><span className="w-24 shrink-0 font-mono text-[10px] uppercase tracking-[0.12em] text-accent">{item.date}</span><div><h3 className="font-semibold">{item.label}</h3><p className="mt-1 text-sm leading-6 text-muted-foreground">{item.detail}</p></div></div></div>)}</div>;
}

function Callout({ title, children }: { title: string; children: ReactNode }) {
  return <div className="border border-terracotta/40 bg-terracotta/10 px-5 py-4"><div className="mb-1 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-terracotta"><Clock3 size={13} />{title}</div><p className="text-sm leading-6">{children}</p></div>;
}

function EvidenceRow({ label, detail, status }: EvidenceRowData) {
  return <div className="grid gap-2 border-b border-border py-5 last:border-0 md:grid-cols-[150px_1fr_150px] md:items-start md:gap-5"><span className="font-semibold">{label}</span><span className="text-sm leading-6 text-muted-foreground">{detail}</span><span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.1em] text-terracotta"><span className="h-1.5 w-1.5 rounded-full bg-terracotta" />{status}</span></div>;
}

function PresentationView({ language }: { language: Language }) {
  const labels = chrome[language];
  const slides = slideDecks[language];
  return <main className="page-reveal"><section className="border-b border-border bg-card"><div className="mx-auto flex max-w-[1120px] flex-col justify-between gap-10 px-5 py-16 md:flex-row md:items-end md:px-8 md:py-24"><div className="max-w-3xl"><div className="mb-7 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-accent"><span>{labels.presentationNarrative}</span><span className="h-px w-10 bg-accent/60" /><span>{labels.slides}</span></div><h1 className="font-serif text-6xl leading-[0.9] tracking-tight">{language === 'hi' ? <>बिल को<br /><em className="text-accent">अपना प्रमाण</em><br />साथ रखना चाहिए।</> : <>The bill<br /><em className="text-accent">must carry</em><br />its proof.</>}</h1><p className="mt-8 max-w-xl text-lg leading-8 text-muted-foreground">{language === 'hi' ? 'राजस्थान PWD और सिंचाई विभाग में 2026 के payment-system migration पर speaker-ready narrative।' : 'A speaker-ready narrative about the 2026 payment-system migration across Rajasthan PWD and Irrigation.'}</p></div><div className="no-print flex shrink-0 flex-col items-start gap-4 md:items-end"><div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground"><BookOpen size={14} />{labels.deck}</div><button onClick={() => window.print()} className="flex items-center gap-2 border border-primary bg-primary px-5 py-3 text-xs font-semibold text-primary-foreground transition hover:bg-accent hover:text-primary"><Printer size={15} />{labels.printPresentation}</button><p className="max-w-[190px] text-right text-xs leading-5 text-muted-foreground">{labels.printNote}</p></div></div></section><section className="mx-auto max-w-[1120px] px-5 py-12 md:px-8 md:py-20"><div className="mb-10 flex items-end justify-between border-b border-border pb-5"><div><p className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">{labels.speakerNotes}</p><h2 className="mt-2 font-serif text-3xl">{labels.eightMoments}</h2></div><span className="hidden font-mono text-xs text-muted-foreground md:block">01 — 08</span></div><div className="space-y-5">{slides.map((slide) => <article className="group grid gap-6 border border-border bg-card p-6 transition hover:-translate-y-1 hover:border-accent hover:shadow-lg md:grid-cols-[72px_200px_1fr] md:gap-8 md:p-8" key={slide.number}><div className="font-mono text-3xl text-accent">{slide.number}</div><div><span className={`inline-block border px-2 py-1 font-mono text-[9px] tracking-[0.16em] ${slide.accent === 'terracotta' ? 'border-terracotta/50 text-terracotta' : slide.accent === 'sage' ? 'border-sage/50 text-sage' : 'border-accent/50 text-accent'}`}>{slide.kicker}</span><p className="mt-4 text-sm font-semibold leading-5 text-muted-foreground">{slide.takeaway}</p></div><div><h3 className="font-serif text-3xl leading-none md:text-4xl">{slide.title}</h3><p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">{slide.copy}</p><div className="mt-5 flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.12em] text-muted-foreground opacity-0 transition group-hover:opacity-100"><ChevronRight size={13} className="text-accent" />{labels.speakerReady}</div></div></article>)}</div><div className="mt-12 border-l-2 border-accent bg-accent/10 px-6 py-6"><p className="font-mono text-[10px] uppercase tracking-[0.17em] text-accent">{labels.closing}</p><p className="mt-3 font-serif text-2xl leading-tight md:text-3xl">{labels.closingText}</p></div></section></main>;
}

export default App;