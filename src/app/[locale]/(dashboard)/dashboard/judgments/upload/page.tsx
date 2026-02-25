"use client";

import { useState, useCallback, type KeyboardEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileUp,
  X,
  Star,
  Calendar,
  Scale,
  Download,
  CheckCircle,
  ArrowLeft,
  FileText,
} from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { useAuth } from "@/lib/auth-context";
import { CASE_CATEGORIES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Link, useRouter } from "@/i18n/routing";

/* ─── Animations ─── */

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
};

const CATEGORY_COLORS: Record<string, string> = {
  temple: "bg-saffron/10 text-saffron border-saffron/20",
  cow: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  conversion: "bg-red-500/10 text-red-400 border-red-500/20",
  "religious-freedom": "bg-blue-500/10 text-blue-400 border-blue-500/20",
  waqf: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  ucc: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
  other: "bg-cream/5 text-cream/50 border-cream/10",
};

/* ─── Types ─── */

interface MockFile {
  name: string;
  size: string;
}

interface FormState {
  caseName: string;
  caseNameHi: string;
  court: string;
  judgmentDate: string;
  category: string;
  landmark: boolean;
  keywords: readonly string[];
  summary: string;
  file: MockFile | null;
}

const INITIAL_FORM: FormState = {
  caseName: "",
  caseNameHi: "",
  court: "",
  judgmentDate: "",
  category: "",
  landmark: false,
  keywords: [],
  summary: "",
  file: null,
};

/* ─── Helpers ─── */

function getCategoryLabel(value: string): string {
  const found = CASE_CATEGORIES.find((c) => c.value === value);
  return found ? found.label : "";
}

function getCategoryLabelHi(value: string): string {
  const found = CASE_CATEGORIES.find((c) => c.value === value);
  return found ? found.labelHi : "";
}

/* ─── Component ─── */

export default function UploadJudgmentPage() {
  const { user } = useAuth();
  const router = useRouter();

  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [keywordInput, setKeywordInput] = useState("");
  const [submitted, setSubmitted] = useState(false);

  /* ─── Form Updaters (immutable) ─── */

  const updateField = useCallback(
    <K extends keyof FormState>(field: K, value: FormState[K]) => {
      setForm((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  const addKeyword = useCallback(() => {
    const trimmed = keywordInput.trim();
    if (!trimmed) return;
    if (form.keywords.includes(trimmed)) {
      setKeywordInput("");
      return;
    }
    setForm((prev) => ({
      ...prev,
      keywords: [...prev.keywords, trimmed],
    }));
    setKeywordInput("");
  }, [keywordInput, form.keywords]);

  const removeKeyword = useCallback((keyword: string) => {
    setForm((prev) => ({
      ...prev,
      keywords: prev.keywords.filter((k) => k !== keyword),
    }));
  }, []);

  const handleKeywordKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        e.preventDefault();
        addKeyword();
      }
    },
    [addKeyword]
  );

  const handleMockUpload = useCallback(() => {
    updateField("file", { name: "Judgment_Document.pdf", size: "2.4 MB" });
  }, [updateField]);

  const handleRemoveFile = useCallback(() => {
    updateField("file", null);
  }, [updateField]);

  const handleSubmit = useCallback(() => {
    setSubmitted(true);
    setTimeout(() => {
      router.push("/dashboard/judgments");
    }, 3000);
  }, [router]);

  /* ─── Shared label classes ─── */
  const labelClass =
    "mb-1.5 block font-[family-name:var(--font-satoshi)] text-xs font-medium text-cream/60";
  const inputClass =
    "w-full rounded-lg border border-gold/10 bg-[#120A07] px-3 py-2.5 font-[family-name:var(--font-satoshi)] text-sm text-cream/90 outline-none transition-colors placeholder:text-cream/20 focus:border-saffron/30 focus:ring-1 focus:ring-saffron/20";

  /* ─── Success State ─── */
  if (submitted) {
    return (
      <div className="min-h-screen">
        <DashboardHeader title="Upload Judgment" titleHi="निर्णय अपलोड" />
        <div className="flex min-h-[60vh] items-center justify-center p-4">
          <motion.div
            variants={scaleIn}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center gap-4 text-center"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10">
              <CheckCircle className="h-8 w-8 text-emerald-400" />
            </div>
            <h2 className="font-[family-name:var(--font-playfair)] text-xl font-bold text-cream">
              Judgment uploaded successfully
            </h2>
            <p className="font-[family-name:var(--font-noto-serif)] text-sm text-cream/40">
              निर्णय सफलतापूर्वक अपलोड हो गया
            </p>
            <p className="font-[family-name:var(--font-satoshi)] text-xs text-cream/30">
              Redirecting to Judgments in a few seconds...
            </p>
          </motion.div>
        </div>
      </div>
    );
  }

  /* ─── Main Form ─── */
  return (
    <div className="min-h-screen">
      <DashboardHeader title="Upload Judgment" titleHi="निर्णय अपलोड" />

      <div className="p-4 lg:p-6">
        {/* Back Link */}
        <motion.div
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 0.4,
            ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
          }}
          className="mb-6"
        >
          <Link
            href="/dashboard/judgments"
            className="inline-flex items-center gap-1.5 font-[family-name:var(--font-satoshi)] text-xs text-cream/40 transition-colors hover:text-cream/70"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Judgments
          </Link>
        </motion.div>

        {/* Two-column layout */}
        <div className="grid gap-6 lg:grid-cols-5">
          {/* LEFT COLUMN — Form */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="lg:col-span-3"
          >
            <div className="rounded-xl border border-gold/10 bg-[#1A0E0A] p-5 lg:p-6">
              <h2 className="mb-6 font-[family-name:var(--font-playfair)] text-base font-bold text-cream">
                Judgment Details
              </h2>

              <div className="space-y-5">
                {/* Case Name (en) */}
                <div>
                  <label className={labelClass}>Case Name (English)</label>
                  <input
                    type="text"
                    value={form.caseName}
                    onChange={(e) => updateField("caseName", e.target.value)}
                    placeholder="e.g. Ram Janmabhoomi v. Sunni Waqf Board"
                    className={inputClass}
                  />
                </div>

                {/* Case Name (hi) */}
                <div>
                  <label className={labelClass}>Case Name (Hindi)</label>
                  <input
                    type="text"
                    value={form.caseNameHi}
                    onChange={(e) => updateField("caseNameHi", e.target.value)}
                    placeholder="उदा. राम जन्मभूमि बनाम सुन्नी वक़्फ बोर्ड"
                    className={cn(inputClass, "font-[family-name:var(--font-noto-serif)]")}
                  />
                </div>

                {/* Court */}
                <div>
                  <label className={labelClass}>Court</label>
                  <input
                    type="text"
                    value={form.court}
                    onChange={(e) => updateField("court", e.target.value)}
                    placeholder="e.g. Supreme Court of India"
                    className={inputClass}
                  />
                </div>

                {/* Judgment Date */}
                <div>
                  <label className={labelClass}>Judgment Date</label>
                  <input
                    type="date"
                    value={form.judgmentDate}
                    onChange={(e) => updateField("judgmentDate", e.target.value)}
                    className={cn(inputClass, "appearance-none")}
                  />
                </div>

                {/* Category */}
                <div>
                  <label className={labelClass}>Category</label>
                  <select
                    value={form.category}
                    onChange={(e) => updateField("category", e.target.value)}
                    className={cn(inputClass, "appearance-none")}
                  >
                    <option value="">Select category...</option>
                    {CASE_CATEGORIES.map((c) => (
                      <option key={c.value} value={c.value}>
                        {c.label} — {c.labelHi}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Landmark Toggle */}
                <div className="flex items-center justify-between rounded-lg border border-gold/10 bg-[#120A07] px-4 py-3">
                  <div>
                    <p className="font-[family-name:var(--font-satoshi)] text-sm font-medium text-cream/80">
                      Mark as Landmark
                    </p>
                    <p className="font-[family-name:var(--font-satoshi)] text-[11px] text-cream/30">
                      Landmark judgments are highlighted in the library
                    </p>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={form.landmark}
                    onClick={() => updateField("landmark", !form.landmark)}
                    className={cn(
                      "relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors",
                      form.landmark ? "bg-saffron" : "bg-cream/10"
                    )}
                  >
                    <span
                      className={cn(
                        "pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow-lg transition-transform",
                        form.landmark ? "translate-x-5" : "translate-x-0"
                      )}
                    />
                  </button>
                </div>

                {/* Keywords */}
                <div>
                  <label className={labelClass}>Keywords</label>
                  <div className="rounded-lg border border-gold/10 bg-[#120A07] p-2.5">
                    {/* Keyword pills */}
                    {form.keywords.length > 0 && (
                      <div className="mb-2 flex flex-wrap gap-1.5">
                        {form.keywords.map((kw) => (
                          <span
                            key={kw}
                            className="inline-flex items-center gap-1 rounded-full bg-saffron/10 px-2.5 py-1 font-[family-name:var(--font-satoshi)] text-[11px] text-saffron"
                          >
                            {kw}
                            <button
                              type="button"
                              onClick={() => removeKeyword(kw)}
                              className="ml-0.5 rounded-full p-0.5 transition-colors hover:bg-saffron/20"
                            >
                              <X className="h-2.5 w-2.5" />
                            </button>
                          </span>
                        ))}
                      </div>
                    )}
                    <input
                      type="text"
                      value={keywordInput}
                      onChange={(e) => setKeywordInput(e.target.value)}
                      onKeyDown={handleKeywordKeyDown}
                      placeholder="Type a keyword and press Enter"
                      className="w-full bg-transparent font-[family-name:var(--font-satoshi)] text-sm text-cream/90 outline-none placeholder:text-cream/20"
                    />
                  </div>
                </div>

                {/* Summary */}
                <div>
                  <label className={labelClass}>Summary</label>
                  <textarea
                    rows={4}
                    value={form.summary}
                    onChange={(e) => updateField("summary", e.target.value)}
                    placeholder="Brief summary of the judgment..."
                    className={cn(inputClass, "resize-none")}
                  />
                </div>

                {/* PDF Upload Zone */}
                <div>
                  <label className={labelClass}>PDF Document</label>
                  <AnimatePresence mode="wait">
                    {!form.file ? (
                      <motion.button
                        key="dropzone"
                        type="button"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleMockUpload}
                        className="flex w-full flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-gold/10 bg-[#120A07] py-10 transition-colors hover:border-saffron/20 hover:bg-saffron/[0.02]"
                      >
                        <FileUp className="h-8 w-8 text-cream/20" />
                        <div className="text-center">
                          <p className="font-[family-name:var(--font-satoshi)] text-sm text-cream/50">
                            Drag &amp; drop PDF here or click to browse
                          </p>
                          <p className="mt-1 font-[family-name:var(--font-satoshi)] text-[11px] text-cream/20">
                            PDF up to 25 MB
                          </p>
                        </div>
                      </motion.button>
                    ) : (
                      <motion.div
                        key="file-card"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{
                          duration: 0.3,
                          ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
                        }}
                        className="flex items-center gap-3 rounded-xl border border-gold/10 bg-[#120A07] p-4"
                      >
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-saffron/10">
                          <FileText className="h-5 w-5 text-saffron" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate font-[family-name:var(--font-satoshi)] text-sm font-medium text-cream/80">
                            {form.file.name}
                          </p>
                          <p className="font-[family-name:var(--font-satoshi)] text-[11px] text-cream/30">
                            {form.file.size}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={handleRemoveFile}
                          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-cream/30 transition-colors hover:bg-red-500/10 hover:text-red-400"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="mt-8 flex items-center justify-end gap-3">
                <Link
                  href="/dashboard/judgments"
                  className="rounded-lg border border-gold/10 bg-transparent px-5 py-2.5 font-[family-name:var(--font-satoshi)] text-sm font-medium text-cream/50 transition-colors hover:border-gold/20 hover:text-cream/70"
                >
                  Cancel
                </Link>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="rounded-lg bg-saffron px-5 py-2.5 font-[family-name:var(--font-satoshi)] text-sm font-medium text-white transition-colors hover:bg-saffron-bright"
                >
                  Upload Judgment
                </button>
              </div>
            </div>
          </motion.div>

          {/* RIGHT COLUMN — Live Preview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.15,
              ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
            }}
            className="lg:col-span-2"
          >
            <div className="sticky top-4 rounded-xl border border-gold/10 bg-[#1A0E0A] p-5 lg:p-6">
              <h3 className="mb-4 font-[family-name:var(--font-playfair)] text-sm font-bold text-cream/50">
                Live Preview
              </h3>

              <div className="rounded-xl border border-gold/10 bg-[#120A07] p-4">
                {/* Badges */}
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  {form.landmark && (
                    <span className="inline-flex items-center gap-1 rounded-full border border-amber-500/20 bg-amber-500/10 px-2 py-0.5 font-[family-name:var(--font-satoshi)] text-[10px] font-semibold text-amber-400">
                      <Star className="h-2.5 w-2.5" />
                      Landmark
                    </span>
                  )}
                  {form.category && (
                    <span
                      className={cn(
                        "inline-flex items-center rounded-full border px-2 py-0.5 font-[family-name:var(--font-satoshi)] text-[10px] font-medium",
                        CATEGORY_COLORS[form.category] ?? CATEGORY_COLORS.other
                      )}
                    >
                      {getCategoryLabel(form.category)}
                    </span>
                  )}
                </div>

                {/* Case Name */}
                <h4 className="mb-1 font-[family-name:var(--font-satoshi)] text-sm font-medium text-cream/90">
                  {form.caseName || "Case Name"}
                </h4>
                <p className="mb-3 font-[family-name:var(--font-noto-serif)] text-[11px] text-cream/30">
                  {form.caseNameHi || "वाद का नाम"}
                </p>

                {/* Court + Date */}
                <div className="mb-3 flex flex-wrap items-center gap-3 text-xs text-cream/40">
                  {form.court && (
                    <div className="flex items-center gap-1">
                      <Scale className="h-3 w-3" />
                      <span className="font-[family-name:var(--font-satoshi)]">
                        {form.court}
                      </span>
                    </div>
                  )}
                  {form.judgmentDate && (
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span className="font-[family-name:var(--font-satoshi)]">
                        {new Date(form.judgmentDate).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                  )}
                </div>

                {/* Summary */}
                {form.summary && (
                  <p className="mb-3 font-[family-name:var(--font-satoshi)] text-xs leading-relaxed text-cream/40">
                    {form.summary}
                  </p>
                )}

                {/* Keywords */}
                {form.keywords.length > 0 && (
                  <div className="mb-4 flex flex-wrap gap-1.5">
                    {form.keywords.map((kw) => (
                      <span
                        key={kw}
                        className="rounded-full bg-cream/5 px-2 py-0.5 font-[family-name:var(--font-satoshi)] text-[9px] text-cream/30"
                      >
                        {kw}
                      </span>
                    ))}
                  </div>
                )}

                {/* PDF Download (mock) */}
                <button
                  type="button"
                  disabled
                  className="flex w-full items-center justify-center gap-2 rounded-lg border border-gold/10 bg-cream/[0.02] px-3 py-2.5 font-[family-name:var(--font-satoshi)] text-xs text-cream/30 opacity-50"
                >
                  <Download className="h-3.5 w-3.5" />
                  Download PDF
                </button>
              </div>

              {/* Preview footer note */}
              <p className="mt-3 text-center font-[family-name:var(--font-satoshi)] text-[10px] text-cream/20">
                This is how the judgment will appear in the library
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
