"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { JUDGMENTS, type Judgment } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import {
  Search,
  BookOpen,
  Calendar,
  Building,
  Star,
  Download,
  ExternalLink,
} from "lucide-react";

type CategoryFilter = "all" | "temple" | "cow" | "conversion" | "religious-freedom" | "historical" | "other";

const CATEGORY_COLORS: Record<string, string> = {
  temple: "bg-saffron/10 text-saffron border-saffron/20",
  cow: "bg-emerald-50 text-emerald-700 border-emerald-200",
  conversion: "bg-purple-50 text-purple-700 border-purple-200",
  "religious-freedom": "bg-blue-50 text-blue-700 border-blue-200",
  historical: "bg-amber-50 text-amber-700 border-amber-200",
  other: "bg-gray-50 text-gray-700 border-gray-200",
};

function JudgmentCard({ judgment }: { judgment: Judgment }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="group overflow-hidden rounded-2xl border border-gold/10 bg-cream-light shadow-sm transition-shadow duration-300 hover:shadow-md"
    >
      {/* Header */}
      <div className="relative border-b border-gold/10 p-5">
        {judgment.landmark && (
          <div className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-gold-bright/15 px-2.5 py-0.5">
            <Star className="h-3 w-3 fill-gold-bright text-gold-bright" />
            <span className="font-[family-name:var(--font-satoshi)] text-[10px] font-bold uppercase tracking-wider text-gold-bright">
              Landmark
            </span>
          </div>
        )}

        <span
          className={cn(
            "inline-block rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider",
            CATEGORY_COLORS[judgment.category] ?? CATEGORY_COLORS.other
          )}
        >
          {judgment.category.replace("-", " ")}
        </span>

        <h3 className="mt-3 font-[family-name:var(--font-playfair)] text-lg font-bold text-maroon-dark">
          {judgment.caseName}
        </h3>
        <p className="mt-0.5 font-[family-name:var(--font-noto-serif)] text-sm text-charcoal-light">
          {judgment.caseNameHi}
        </p>
      </div>

      {/* Body */}
      <div className="p-5">
        <p className="line-clamp-3 font-[family-name:var(--font-satoshi)] text-sm text-charcoal-light/80">
          {judgment.summary}
        </p>

        {/* Metadata */}
        <div className="mt-4 space-y-2">
          <div className="flex items-center gap-2 font-[family-name:var(--font-satoshi)] text-xs text-charcoal-light">
            <Building className="h-3.5 w-3.5 text-saffron/70" />
            <span>{judgment.court}</span>
          </div>
          <div className="flex items-center gap-2 font-[family-name:var(--font-satoshi)] text-xs text-charcoal-light">
            <Calendar className="h-3.5 w-3.5 text-saffron/70" />
            <span>
              {new Date(judgment.date).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>
        </div>

        {/* Keywords */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {judgment.keywords.map((kw) => (
            <span
              key={kw}
              className="rounded-full bg-gold/8 px-2.5 py-0.5 font-[family-name:var(--font-satoshi)] text-[10px] text-charcoal-light"
            >
              {kw}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="mt-4 flex items-center gap-3 border-t border-gold/10 pt-4">
          {judgment.pdfUrl && (
            <a
              href={judgment.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-lg bg-saffron/10 px-3 py-1.5 font-[family-name:var(--font-satoshi)] text-xs font-medium text-saffron transition-colors hover:bg-saffron/20"
            >
              <Download className="h-3.5 w-3.5" />
              Download PDF
            </a>
          )}
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1.5 rounded-lg bg-gold/8 px-3 py-1.5 font-[family-name:var(--font-satoshi)] text-xs font-medium text-charcoal-light transition-colors hover:bg-gold/15"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            {expanded ? "Hide Summary" : "View Summary"}
          </button>
        </div>

        {/* Expanded summary */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <div className="border-t border-gold/10 pt-4">
                <p className="font-[family-name:var(--font-satoshi)] text-sm leading-relaxed text-charcoal-light/90">
                  {judgment.summary}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export function JudgmentDirectory() {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>("all");
  const [landmarkOnly, setLandmarkOnly] = useState(false);

  const filteredJudgments = useMemo(() => {
    return JUDGMENTS.filter((j) => {
      const matchesSearch =
        searchQuery === "" ||
        j.caseName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        j.caseNameHi.includes(searchQuery) ||
        j.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        j.keywords.some((k) =>
          k.toLowerCase().includes(searchQuery.toLowerCase())
        );

      const matchesCategory =
        categoryFilter === "all" || j.category === categoryFilter;
      const matchesLandmark = !landmarkOnly || j.landmark;

      return matchesSearch && matchesCategory && matchesLandmark;
    });
  }, [searchQuery, categoryFilter, landmarkOnly]);

  const categories: { value: CategoryFilter; label: string }[] = [
    { value: "all", label: "All" },
    { value: "temple", label: "Temple" },
    { value: "cow", label: "Cow Protection" },
    { value: "conversion", label: "Conversion" },
    { value: "religious-freedom", label: "Religious Freedom" },
    { value: "historical", label: "Historical" },
  ];

  return (
    <section className="section-padding bg-cream">
      <div className="container-default">
        <ScrollReveal>
          {/* Filters */}
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative max-w-md flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-charcoal-light/50" />
              <input
                type="text"
                placeholder="Search judgments, keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-gold/15 bg-cream-light py-2.5 pl-10 pr-4 font-[family-name:var(--font-satoshi)] text-sm text-charcoal placeholder:text-charcoal-light/40 focus:border-saffron/30 focus:outline-none focus:ring-2 focus:ring-saffron/10"
              />
            </div>

            <button
              onClick={() => setLandmarkOnly(!landmarkOnly)}
              className={cn(
                "flex items-center gap-1.5 rounded-full px-4 py-2 font-[family-name:var(--font-satoshi)] text-xs font-medium transition-all",
                landmarkOnly
                  ? "bg-gold-bright/20 text-gold-bright shadow-sm"
                  : "bg-gold/8 text-charcoal-light hover:bg-gold/15"
              )}
            >
              <Star
                className={cn(
                  "h-3.5 w-3.5",
                  landmarkOnly && "fill-gold-bright"
                )}
              />
              Landmark Only
            </button>
          </div>

          {/* Category pills */}
          <div className="mb-6 flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setCategoryFilter(cat.value)}
                className={cn(
                  "rounded-full px-4 py-1.5 font-[family-name:var(--font-satoshi)] text-xs font-medium transition-all",
                  categoryFilter === cat.value
                    ? "bg-saffron text-white shadow-sm"
                    : "bg-gold/8 text-charcoal-light hover:bg-gold/15"
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Count */}
        <p className="mb-4 font-[family-name:var(--font-satoshi)] text-sm text-charcoal-light">
          Showing {filteredJudgments.length} of {JUDGMENTS.length} judgments
        </p>

        {/* Grid */}
        <AnimatePresence mode="popLayout">
          <motion.div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredJudgments.map((j) => (
              <JudgmentCard key={j.id} judgment={j} />
            ))}
          </motion.div>
        </AnimatePresence>

        {filteredJudgments.length === 0 && (
          <div className="py-20 text-center">
            <BookOpen className="mx-auto h-12 w-12 text-charcoal-light/20" />
            <p className="mt-4 font-[family-name:var(--font-satoshi)] text-base text-charcoal-light">
              No judgments found matching your filters.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
