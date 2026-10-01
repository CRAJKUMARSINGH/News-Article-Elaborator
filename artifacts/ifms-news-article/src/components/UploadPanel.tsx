import { useCallback, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  UploadCloud,
  FileText,
  FileImage,
  FileArchive,
  File,
  CheckCircle2,
  AlertCircle,
  Loader2,
  PlusCircle,
  Link2,
  BookOpen,
  ChevronDown,
  ChevronUp,
  FolderOpen,
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface UploadedFile {
  id: string;
  file: File;
  status: "pending" | "uploading" | "done" | "error";
  error?: string;
}

/** A reference to a previous article that this new piece is a sequel to. */
export interface PreviousArticleRef {
  type: "url" | "known";
  /** URL entered by the user, or the canonical URL of a known article */
  url: string;
  /** Human-readable title shown in the UI */
  title: string;
}

interface UploadPanelProps {
  open: boolean;
  onClose: () => void;
  /**
   * Called when the user clicks Submit.
   * Receives validated files and an optional previous-article reference.
   */
  onSubmit?: (
    files: File[],
    previousArticle: PreviousArticleRef | null
  ) => Promise<void>;
  /**
   * Feed real past articles here; falls back to the built-in demo list.
   * Shape: { url, title, date }
   */
  knownArticles?: { url: string; title: string; date: string }[];
}

// ─── Constants ───────────────────────────────────────────────────────────────

const ACCEPTED_EXTENSIONS = new Set([
  ".txt", ".md",
  ".jpg", ".jpeg", ".png", ".gif", ".webp",
  ".pdf",
  ".zip", ".rar",
]);

const MAX_FILE_SIZE_MB = 50;
const MAX_FILE_SIZE = MAX_FILE_SIZE_MB * 1024 * 1024;

const INPUT_ACCEPT = [
  ".txt", ".md",
  ".jpg", ".jpeg", ".png", ".gif", ".webp",
  ".pdf",
  ".zip", ".rar",
].join(",");

const FOLDER_INPUT_ACCEPT = [
  ".txt", ".md",
  ".jpg", ".jpeg", ".png", ".gif", ".webp",
  ".pdf",
  ".zip", ".rar",
].join(",");

/** Demo articles shown when no real list is provided */
const DEMO_ARTICLES: { url: string; title: string; date: string }[] = [
  {
    url: "#ifms-part1",
    title: "राजस्थान का डिजिटल भुगतान संकट — Part 1",
    date: "2 Aug 2026",
  },
  {
    url: "#pwd-emb-2026",
    title: "PWD eMB Corruption Investigation",
    date: "15 Jul 2026",
  },
  {
    url: "#wam-portal-2025",
    title: "WAM Portal Shutdown — Ground Report",
    date: "10 Jul 2026",
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function uid() {
  return Math.random().toString(36).slice(2, 10);
}

function ext(name: string) {
  return name.slice(name.lastIndexOf(".")).toLowerCase();
}

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function validate(file: File): string | null {
  if (!ACCEPTED_EXTENSIONS.has(ext(file.name)))
    return `Unsupported file type "${ext(file.name)}"`;
  if (file.size > MAX_FILE_SIZE)
    return `File exceeds ${MAX_FILE_SIZE_MB} MB limit`;
  return null;
}

function isValidUrl(value: string) {
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
}

function FileTypeIcon({ name, className }: { name: string; className?: string }) {
  const e = ext(name);
  if ([".jpg", ".jpeg", ".png", ".gif", ".webp"].includes(e))
    return <FileImage size={20} className={className} />;
  if ([".zip", ".rar"].includes(e))
    return <FileArchive size={20} className={className} />;
  if ([".pdf", ".txt", ".md"].includes(e))
    return <FileText size={20} className={className} />;
  return <File size={20} className={className} />;
}

// ─── File Row ─────────────────────────────────────────────────────────────────

function FileRow({
  item,
  onRemove,
}: {
  item: UploadedFile;
  onRemove: (id: string) => void;
}) {
  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.2 }}
      className="flex items-center gap-3 px-4 py-3 rounded-sm border border-border bg-white hover:bg-secondary/30 transition-colors group"
    >
      <FileTypeIcon
        name={item.file.name}
        className={item.status === "error" ? "text-destructive shrink-0" : "text-accent shrink-0"}
      />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-sans font-medium text-foreground truncate">
          {item.file.name}
        </p>
        <p className="text-xs text-muted-foreground font-sans">
          {formatSize(item.file.size)}
          {item.error && <span className="ml-2 text-destructive">{item.error}</span>}
        </p>
      </div>
      <span className="shrink-0">
        {item.status === "uploading" && (
          <Loader2 size={16} className="text-accent animate-spin" aria-label="Uploading" />
        )}
        {item.status === "done" && (
          <CheckCircle2 size={16} className="text-accent" aria-label="Done" />
        )}
        {item.status === "error" && (
          <AlertCircle size={16} className="text-destructive" aria-label="Error" />
        )}
      </span>
      {item.status !== "uploading" && (
        <button
          type="button"
          aria-label={`Remove ${item.file.name}`}
          onClick={() => onRemove(item.id)}
          className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
        >
          <X size={14} />
        </button>
      )}
    </motion.li>
  );
}

// ─── Previous Article Picker ──────────────────────────────────────────────────

type PrevTab = "none" | "url" | "pick";

function PreviousArticleSection({
  knownArticles,
  value,
  onChange,
  disabled,
}: {
  knownArticles: { url: string; title: string; date: string }[];
  value: PreviousArticleRef | null;
  onChange: (ref: PreviousArticleRef | null) => void;
  disabled: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<PrevTab>("none");
  const [urlInput, setUrlInput] = useState("");
  const urlError = urlInput && !isValidUrl(urlInput);

  const selectTab = (t: PrevTab) => {
    setTab(t);
    if (t === "none") onChange(null);
    if (t === "url") onChange(null); // clear until user types valid URL
  };

  const handleUrlChange = (v: string) => {
    setUrlInput(v);
    if (isValidUrl(v)) {
      onChange({ type: "url", url: v, title: v });
    } else {
      onChange(null);
    }
  };

  const handlePickArticle = (a: { url: string; title: string; date: string }) => {
    onChange({ type: "known", url: a.url, title: a.title });
  };

  return (
    <div className="border border-border rounded-sm overflow-hidden">
      {/* Accordion toggle */}
      <button
        type="button"
        aria-expanded={open}
        aria-controls="prev-article-body"
        onClick={() => setOpen((o) => !o)}
        disabled={disabled}
        className="w-full flex items-center justify-between px-4 py-3 bg-secondary/40 hover:bg-secondary/70 transition-colors text-left disabled:opacity-50"
      >
        <span className="flex items-center gap-2 font-sans font-semibold text-sm text-foreground">
          <BookOpen size={15} className="text-accent" aria-hidden="true" />
          Sequel to a previous article
          {value && (
            <span className="ml-2 px-2 py-0.5 rounded-full bg-accent text-white text-[10px] font-bold uppercase tracking-wide">
              linked
            </span>
          )}
        </span>
        {open ? (
          <ChevronUp size={15} className="text-muted-foreground shrink-0" aria-hidden="true" />
        ) : (
          <ChevronDown size={15} className="text-muted-foreground shrink-0" aria-hidden="true" />
        )}
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id="prev-article-body"
            key="prev-body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 pt-3 space-y-3 bg-white">
              <p className="text-xs font-sans text-muted-foreground">
                Linking a previous article lets the AI understand the narrative
                context and continue the investigation.
              </p>

              {/* Tab strip */}
              <div
                role="tablist"
                aria-label="Previous article method"
                className="flex gap-1 p-1 bg-secondary rounded-sm"
              >
                {(
                  [
                    { id: "none", label: "None" },
                    { id: "url",  label: "Paste URL" },
                    { id: "pick", label: "Pick from list" },
                  ] as { id: PrevTab; label: string }[]
                ).map((t) => (
                  <button
                    key={t.id}
                    role="tab"
                    type="button"
                    aria-selected={tab === t.id}
                    onClick={() => selectTab(t.id)}
                    disabled={disabled}
                    className={`flex-1 py-1.5 text-xs font-sans font-semibold rounded-sm transition-colors disabled:opacity-40 ${
                      tab === t.id
                        ? "bg-white text-primary shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              {/* Tab: paste URL */}
              {tab === "url" && (
                <div className="space-y-1">
                  <label
                    htmlFor="prev-article-url"
                    className="text-xs font-sans font-medium text-foreground"
                  >
                    Article URL
                  </label>
                  <div className="relative">
                    <Link2
                      size={14}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                      aria-hidden="true"
                    />
                    <input
                      id="prev-article-url"
                      type="url"
                      value={urlInput}
                      onChange={(e) => handleUrlChange(e.target.value)}
                      disabled={disabled}
                      placeholder="https://example.com/previous-article"
                      className={`w-full pl-8 pr-3 py-2 text-sm font-sans border rounded-sm bg-background focus:outline-none focus:ring-2 focus:ring-accent/50 disabled:opacity-40 ${
                        urlError ? "border-destructive" : "border-border"
                      }`}
                    />
                  </div>
                  {urlError && (
                    <p className="text-xs text-destructive font-sans flex items-center gap-1">
                      <AlertCircle size={11} aria-hidden="true" />
                      Enter a valid URL (include https://)
                    </p>
                  )}
                  {value?.type === "url" && (
                    <p className="text-xs text-accent font-sans flex items-center gap-1">
                      <CheckCircle2 size={11} aria-hidden="true" />
                      URL linked successfully
                    </p>
                  )}
                </div>
              )}

              {/* Tab: pick from list */}
              {tab === "pick" && (
                <ul className="space-y-1.5" role="listbox" aria-label="Past articles">
                  {knownArticles.map((a) => {
                    const selected = value?.url === a.url;
                    return (
                      <li key={a.url} role="option" aria-selected={selected}>
                        <button
                          type="button"
                          onClick={() => handlePickArticle(a)}
                          disabled={disabled}
                          className={`w-full text-left px-3 py-2.5 rounded-sm border transition-colors disabled:opacity-40 ${
                            selected
                              ? "border-accent bg-accent/5 ring-1 ring-accent/40"
                              : "border-border hover:border-accent/50 hover:bg-secondary/40"
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <span className="text-sm font-sans font-medium text-foreground leading-snug">
                              {a.title}
                            </span>
                            {selected && (
                              <CheckCircle2
                                size={14}
                                className="text-accent shrink-0 mt-0.5"
                                aria-hidden="true"
                              />
                            )}
                          </div>
                          <span className="text-[11px] font-sans text-muted-foreground">
                            {a.date}
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}

              {/* Active selection summary (shown when a ref is set) */}
              {value && (
                <div className="flex items-start gap-2 p-2.5 rounded-sm bg-accent/5 border border-accent/20">
                  <BookOpen size={13} className="text-accent shrink-0 mt-0.5" aria-hidden="true" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-sans font-semibold text-accent">
                      Sequel context linked
                    </p>
                    <p className="text-[11px] font-sans text-muted-foreground truncate">
                      {value.title}
                    </p>
                  </div>
                  <button
                    type="button"
                    aria-label="Remove previous article link"
                    onClick={() => {
                      onChange(null);
                      setUrlInput("");
                      setTab("none");
                    }}
                    disabled={disabled}
                    className="shrink-0 text-muted-foreground hover:text-destructive transition-colors disabled:opacity-40"
                  >
                    <X size={13} />
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Upload Panel ─────────────────────────────────────────────────────────────

export default function UploadPanel({
  open,
  onClose,
  onSubmit,
  knownArticles = DEMO_ARTICLES,
}: UploadPanelProps) {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [dragging, setDragging] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [previousArticle, setPreviousArticle] = useState<PreviousArticleRef | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const folderInputRef = useRef<HTMLInputElement>(null);

  // ── File ingestion ──────────────────────────────────────────────────────

  const addFiles = useCallback((incoming: FileList | File[]) => {
    const arr = Array.from(incoming);
    const next: UploadedFile[] = arr.map((file) => {
      const error = validate(file) ?? undefined;
      return { id: uid(), file, status: error ? "error" : "pending", error };
    });
    setFiles((prev) => {
      const existing = new Set(prev.map((f) => `${f.file.name}__${f.file.size}`));
      const deduped = next.filter(
        (f) => !existing.has(`${f.file.name}__${f.file.size}`)
      );
      return [...prev, ...deduped];
    });
  }, []);

  const removeFile = useCallback((id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  }, []);

  // ── Drag handlers ───────────────────────────────────────────────────────

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(true);
  };
  const onDragLeave = (e: React.DragEvent) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node)) setDragging(false);
  };
  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    if (e.dataTransfer.files.length) addFiles(e.dataTransfer.files);
  };

  // ── Submit ──────────────────────────────────────────────────────────────

  const validFiles = files.filter((f) => f.status !== "error");
  const hasError   = files.some((f) => f.status === "error");

  const handleSubmit = async () => {
    if (!validFiles.length || submitting) return;
    setSubmitting(true);

    setFiles((prev) =>
      prev.map((f) => (f.status === "pending" ? { ...f, status: "uploading" } : f))
    );

    try {
      if (onSubmit) {
        await onSubmit(validFiles.map((f) => f.file), previousArticle);
      } else {
        await new Promise((r) => setTimeout(r, 1200));
      }
      setFiles((prev) =>
        prev.map((f) => (f.status === "uploading" ? { ...f, status: "done" } : f))
      );
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Upload failed";
      setFiles((prev) =>
        prev.map((f) =>
          f.status === "uploading" ? { ...f, status: "error", error: msg } : f
        )
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    if (submitting) return;
    setFiles([]);
    setDragging(false);
    setPreviousArticle(null);
    onClose();
  };

  // ── Render ──────────────────────────────────────────────────────────────

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/40 z-50 backdrop-blur-sm"
            aria-hidden="true"
            onClick={handleClose}
          />

          {/* Slide-over panel */}
          <motion.aside
            key="panel"
            role="dialog"
            aria-modal="true"
            aria-label="Upload files for new article"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 32 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-background border-l border-border shadow-2xl z-50 flex flex-col"
          >
            {/* ── Panel header ── */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-border bg-primary text-primary-foreground shrink-0">
              <div>
                <h2 className="font-display font-bold text-xl tracking-tight">
                  New Article
                </h2>
                <p className="text-xs font-sans text-primary-foreground/70 mt-0.5">
                  Upload source material — text, images, PDFs, archives
                </p>
              </div>
              <button
                type="button"
                aria-label="Close upload panel"
                onClick={handleClose}
                disabled={submitting}
                className="w-9 h-9 rounded-full flex items-center justify-center text-primary-foreground/70 hover:text-white hover:bg-white/10 transition-colors disabled:opacity-40"
              >
                <X size={20} />
              </button>
            </div>

            {/* ── Scrollable body ── */}
            <div className="flex-1 overflow-y-auto min-h-0">

              {/* Drop zone */}
              <div className="px-6 pt-6">
                <div
                  role="region"
                  aria-label="File drop zone"
                  onDragOver={onDragOver}
                  onDragLeave={onDragLeave}
                  onDrop={onDrop}
                  onClick={() => inputRef.current?.click()}
                  className={`relative flex flex-col items-center justify-center gap-3 rounded-sm border-2 border-dashed px-6 py-10 cursor-pointer transition-colors select-none ${
                    dragging
                      ? "border-accent bg-accent/5"
                      : "border-border hover:border-accent/60 hover:bg-secondary/40"
                  }`}
                >
                  <UploadCloud
                    size={40}
                    className={`transition-colors ${dragging ? "text-accent" : "text-muted-foreground"}`}
                    aria-hidden="true"
                  />
                  <div className="text-center">
                    <p className="font-sans font-semibold text-foreground text-sm">
                      {dragging ? "Drop files here" : "Drag & drop files here"}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      or{" "}
                      <span className="text-accent font-medium underline underline-offset-2">
                        browse
                      </span>{" "}
                      to choose files
                    </p>
                  </div>
                  <div className="flex flex-wrap justify-center gap-1.5 mt-1">
                    {[".txt", ".md", ".jpg/.png", ".gif/.webp", ".pdf", ".zip", ".rar"].map(
                      (label) => (
                        <span
                          key={label}
                          className="font-sans text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full bg-secondary text-muted-foreground border border-border"
                        >
                          {label}
                        </span>
                      )
                    )}
                  </div>
                  <p className="text-[11px] text-muted-foreground/70 font-sans mt-1">
                    Max {MAX_FILE_SIZE_MB} MB per file
                  </p>

                  <input
                    ref={inputRef}
                    type="file"
                    multiple
                    accept={INPUT_ACCEPT}
                    className="sr-only"
                    aria-hidden="true"
                    tabIndex={-1}
                    onChange={(e) => {
                      if (e.target.files?.length) {
                        addFiles(e.target.files);
                        e.target.value = "";
                      }
                    }}
                  />
                  <input
                    ref={folderInputRef}
                    type="file"
                    multiple
                    // @ts-ignore - webkitdirectory is not in standard types but works in browsers
                    webkitdirectory=""
                    directory=""
                    className="sr-only"
                    aria-hidden="true"
                    tabIndex={-1}
                    onChange={(e) => {
                      if (e.target.files?.length) {
                        addFiles(e.target.files);
                        e.target.value = "";
                      }
                    }}
                  />
                </div>
              </div>

              {/* File list */}
              <div className="px-6 py-4">
                {files.length === 0 ? (
                  <p className="text-sm text-muted-foreground font-sans text-center py-4">
                    No files added yet.
                  </p>
                ) : (
                  <>
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-xs font-sans font-semibold text-muted-foreground uppercase tracking-wider">
                        {files.length} file{files.length !== 1 ? "s" : ""} queued
                      </p>
                      {files.length > 1 && (
                        <button
                          type="button"
                          onClick={() => setFiles([])}
                          disabled={submitting}
                          className="text-xs font-sans text-muted-foreground hover:text-destructive transition-colors disabled:opacity-40"
                        >
                          Clear all
                        </button>
                      )}
                    </div>
                    <ul className="space-y-2">
                      <AnimatePresence initial={false}>
                        {files.map((item) => (
                          <FileRow key={item.id} item={item} onRemove={removeFile} />
                        ))}
                      </AnimatePresence>
                    </ul>
                  </>
                )}
              </div>

              {/* ── Sequel section ── */}
              <div className="px-6 pb-6">
                <PreviousArticleSection
                  knownArticles={knownArticles}
                  value={previousArticle}
                  onChange={setPreviousArticle}
                  disabled={submitting}
                />
              </div>
            </div>

            {/* ── Footer actions ── */}
            <div className="px-6 py-5 border-t border-border bg-secondary/30 shrink-0 space-y-3">
              {hasError && (
                <p className="text-xs font-sans text-destructive flex items-center gap-1.5">
                  <AlertCircle size={13} aria-hidden="true" />
                  Invalid files are shown above and will be skipped on submit.
                </p>
              )}

              {previousArticle && (
                <p className="text-xs font-sans text-accent flex items-center gap-1.5">
                  <BookOpen size={13} aria-hidden="true" />
                  Sequel context: <span className="font-medium truncate max-w-[200px]">{previousArticle.title}</span>
                </p>
              )}

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => inputRef.current?.click()}
                  disabled={submitting}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-sm border border-border bg-white text-sm font-sans font-medium text-foreground hover:bg-secondary transition-colors disabled:opacity-40"
                >
                  <PlusCircle size={15} aria-hidden="true" />
                  Add files
                </button>
                <button
                  type="button"
                  onClick={() => folderInputRef.current?.click()}
                  disabled={submitting}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-sm border border-border bg-white text-sm font-sans font-medium text-foreground hover:bg-secondary transition-colors disabled:opacity-40"
                >
                  <FolderOpen size={15} aria-hidden="true" />
                  Add folder
                </button>

                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={validFiles.length === 0 || submitting}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-sm bg-primary text-primary-foreground text-sm font-sans font-semibold hover:bg-primary/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {submitting ? (
                    <>
                      <Loader2 size={15} className="animate-spin" aria-hidden="true" />
                      Uploading…
                    </>
                  ) : (
                    <>
                      <UploadCloud size={15} aria-hidden="true" />
                      Submit {validFiles.length > 0 ? `(${validFiles.length})` : ""}
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
