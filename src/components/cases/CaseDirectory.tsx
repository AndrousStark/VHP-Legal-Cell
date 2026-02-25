"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@/i18n/routing";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { CASES, type CaseData } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import {
  Search,
  LayoutGrid,
  List,
  Scale,
  Calendar,
  MapPin,
  Building,
  ChevronRight,
} from "lucide-react";

type ViewMode = "grid" | "list";
type StatusFilter = "all" | "filed" | "ongoing" | "won" | "lost" | "reserved" | "disposed";
type CategoryFilter = "all" | "temple" | "cow" | "conversion" | "religious-freedom" | "waqf" | "ucc" | "other";
type CourtFilter = "all" | "supreme" | "high" | "district" | "tribunal";

const STATUS_COLORS: Record<string, string> = {
  filed: "bg-blue-100 text-blue-700 border-blue-200",
  ongoing: "bg-amber-100 text-amber-700 border-amber-200",
  won: "bg-emerald-100 text-emerald-700 border-emerald-200",
  lost: "bg-red-100 text-red-700 border-red-200",
  reserved: "bg-purple-100 text-purple-700 border-purple-200",
  disposed: "bg-gray-100 text-gray-700 border-gray-200",
};

const CATEGORY_ICONS: Record<string, string> = {
  temple: "🛕",
  cow: "🐄",
  conversion: "⚖️",
  "religious-freedom": "🕉️",
  waqf: "📜",
  ucc: "📋",
  other: "📁",
};

function CaseCard({ caseData }: { caseData: CaseData }) {
  return (
    <Link href={`/cases/${caseData.slug}`} className="group block">
      <motion.div
        layout
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        whileHover={{ y: -4 }}
        className="overflow-hidden rounded-2xl border border-gold/10 bg-cream-light shadow-sm transition-shadow duration-300 hover:shadow-md"
      >
        {/* Category banner */}
        <div className="relative flex items-center gap-2 bg-gradient-to-r from-maroon-dark to-maroon px-4 py-3">
          <span className="text-lg">{CATEGORY_ICONS[caseData.category] ?? "📁"}</span>
          <span className="font-[family-name:var(--font-satoshi)] text-xs font-bold uppercase tracking-wider text-gold-bright">
            {caseData.category.replace("-", " ")}
          </span>
          <span
            className={cn(
              "ml-auto rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase",
              STATUS_COLORS[caseData.status] ?? STATUS_COLORS.disposed
            )}
          >
            {caseData.status}
          </span>
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="font-[family-name:var(--font-playfair)] text-base font-bold text-maroon-dark group-hover:text-saffron">
            {caseData.title}
          </h3>
          <p className="mt-0.5 font-[family-name:var(--font-noto-serif)] text-xs text-charcoal-light">
            {caseData.titleHi}
          </p>

          <p className="mt-2 line-clamp-2 font-[family-name:var(--font-satoshi)] text-xs text-charcoal-light/80">
            {caseData.summary}
          </p>

          {/* Metadata */}
          <div className="mt-3 space-y-1.5">
            <div className="flex items-center gap-1.5 font-[family-name:var(--font-satoshi)] text-xs text-charcoal-light">
              <Building className="h-3 w-3 text-saffron/70" />
              <span className="truncate">{caseData.court}</span>
            </div>
            <div className="flex items-center gap-1.5 font-[family-name:var(--font-satoshi)] text-xs text-charcoal-light">
              <Scale className="h-3 w-3 text-saffron/70" />
              <span>{caseData.caseNumber}</span>
            </div>
            <div className="flex items-center gap-1.5 font-[family-name:var(--font-satoshi)] text-xs text-charcoal-light">
              <MapPin className="h-3 w-3 text-saffron/70" />
              <span>{caseData.state}</span>
            </div>
            {caseData.nextHearing && (
              <div className="flex items-center gap-1.5 font-[family-name:var(--font-satoshi)] text-xs text-saffron font-medium">
                <Calendar className="h-3 w-3" />
                <span>Next: {new Date(caseData.nextHearing).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
              </div>
            )}
          </div>

          {/* Lawyer */}
          <div className="mt-3 border-t border-gold/10 pt-3">
            <p className="font-[family-name:var(--font-satoshi)] text-[11px] text-charcoal-light/60">
              Lead Counsel
            </p>
            <p className="font-[family-name:var(--font-satoshi)] text-xs font-semibold text-maroon-dark">
              {caseData.lawyer}
            </p>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

function CaseListRow({ caseData }: { caseData: CaseData }) {
  return (
    <Link href={`/cases/${caseData.slug}`} className="group block">
      <motion.div
        layout
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="flex items-center gap-4 rounded-xl border border-gold/5 bg-cream-light p-4 transition-all duration-200 hover:border-gold/15 hover:shadow-sm"
      >
        {/* Category icon */}
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-maroon-dark/5 text-lg">
          {CATEGORY_ICONS[caseData.category] ?? "📁"}
        </div>

        {/* Info */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="truncate font-[family-name:var(--font-playfair)] text-sm font-bold text-maroon-dark group-hover:text-saffron">
              {caseData.title}
            </h3>
            <span
              className={cn(
                "shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase",
                STATUS_COLORS[caseData.status] ?? STATUS_COLORS.disposed
              )}
            >
              {caseData.status}
            </span>
          </div>
          <div className="mt-0.5 flex items-center gap-3 font-[family-name:var(--font-satoshi)] text-xs text-charcoal-light">
            <span>{caseData.court}</span>
            <span className="text-charcoal-light/30">&middot;</span>
            <span>{caseData.caseNumber}</span>
          </div>
        </div>

        {/* Next hearing */}
        <div className="hidden text-right sm:block">
          {caseData.nextHearing ? (
            <p className="font-[family-name:var(--font-satoshi)] text-xs font-medium text-saffron">
              {new Date(caseData.nextHearing).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
              })}
            </p>
          ) : (
            <p className="font-[family-name:var(--font-satoshi)] text-xs text-charcoal-light/40">
              —
            </p>
          )}
        </div>

        <ChevronRight className="h-4 w-4 shrink-0 text-charcoal-light/30 transition-all group-hover:text-saffron group-hover:translate-x-1" />
      </motion.div>
    </Link>
  );
}

export function CaseDirectory() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>("all");
  const [courtFilter, setCourtFilter] = useState<CourtFilter>("all");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");

  const filteredCases = useMemo(() => {
    return CASES.filter((c) => {
      const matchesSearch =
        searchQuery === "" ||
        c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.titleHi.includes(searchQuery) ||
        c.caseNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.lawyer.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = statusFilter === "all" || c.status === statusFilter;
      const matchesCategory = categoryFilter === "all" || c.category === categoryFilter;
      const matchesCourt = courtFilter === "all" || c.courtType === courtFilter;

      return matchesSearch && matchesStatus && matchesCategory && matchesCourt;
    });
  }, [searchQuery, statusFilter, categoryFilter, courtFilter]);

  const statuses: { value: StatusFilter; label: string }[] = [
    { value: "all", label: "All" },
    { value: "filed", label: "Filed" },
    { value: "ongoing", label: "Ongoing" },
    { value: "won", label: "Won" },
    { value: "lost", label: "Lost" },
  ];

  const categories: { value: CategoryFilter; label: string }[] = [
    { value: "all", label: "All Categories" },
    { value: "temple", label: "Temple" },
    { value: "cow", label: "Cow Protection" },
    { value: "conversion", label: "Anti-Conversion" },
    { value: "religious-freedom", label: "Religious Freedom" },
    { value: "waqf", label: "Waqf" },
  ];

  return (
    <section className="section-padding bg-cream">
      <div className="container-default">
        {/* Filters */}
        <ScrollReveal>
          <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            {/* Search */}
            <div className="relative max-w-md flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-charcoal-light/50" />
              <input
                type="text"
                placeholder="Search cases, case numbers, lawyers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-gold/15 bg-cream-light py-2.5 pl-10 pr-4 font-[family-name:var(--font-satoshi)] text-sm text-charcoal placeholder:text-charcoal-light/40 focus:border-saffron/30 focus:outline-none focus:ring-2 focus:ring-saffron/10"
              />
            </div>

            {/* View toggle + filter dropdown */}
            <div className="flex items-center gap-3">
              {/* Category dropdown */}
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value as CategoryFilter)}
                className="rounded-xl border border-gold/15 bg-cream-light px-3 py-2 font-[family-name:var(--font-satoshi)] text-xs text-charcoal focus:border-saffron/30 focus:outline-none"
              >
                {categories.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>

              {/* Court type dropdown */}
              <select
                value={courtFilter}
                onChange={(e) => setCourtFilter(e.target.value as CourtFilter)}
                className="rounded-xl border border-gold/15 bg-cream-light px-3 py-2 font-[family-name:var(--font-satoshi)] text-xs text-charcoal focus:border-saffron/30 focus:outline-none"
              >
                <option value="all">All Courts</option>
                <option value="supreme">Supreme Court</option>
                <option value="high">High Court</option>
                <option value="district">District Court</option>
                <option value="tribunal">Tribunal</option>
              </select>

              <div className="mx-1 h-6 w-px bg-gold/15" />

              <button
                onClick={() => setViewMode("grid")}
                aria-label="Grid view"
                aria-pressed={viewMode === "grid"}
                className={cn(
                  "rounded-lg p-2 transition-colors",
                  viewMode === "grid"
                    ? "bg-saffron/10 text-saffron"
                    : "text-charcoal-light/40 hover:text-charcoal-light"
                )}
              >
                <LayoutGrid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                aria-label="List view"
                aria-pressed={viewMode === "list"}
                className={cn(
                  "rounded-lg p-2 transition-colors",
                  viewMode === "list"
                    ? "bg-saffron/10 text-saffron"
                    : "text-charcoal-light/40 hover:text-charcoal-light"
                )}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Status pills */}
          <div className="mb-6 flex flex-wrap gap-2">
            {statuses.map((status) => (
              <button
                key={status.value}
                onClick={() => setStatusFilter(status.value)}
                className={cn(
                  "rounded-full px-4 py-1.5 font-[family-name:var(--font-satoshi)] text-xs font-medium transition-all",
                  statusFilter === status.value
                    ? "bg-saffron text-white shadow-sm"
                    : "bg-gold/8 text-charcoal-light hover:bg-gold/15"
                )}
              >
                {status.label}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Count */}
        <p className="mb-4 font-[family-name:var(--font-satoshi)] text-sm text-charcoal-light">
          Showing {filteredCases.length} of {CASES.length} cases
        </p>

        {/* Case Grid/List */}
        <AnimatePresence mode="popLayout">
          {viewMode === "grid" ? (
            <motion.div
              key="grid"
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {filteredCases.map((c) => (
                <CaseCard key={c.id} caseData={c} />
              ))}
            </motion.div>
          ) : (
            <motion.div key="list" className="flex flex-col gap-2">
              {filteredCases.map((c) => (
                <CaseListRow key={c.id} caseData={c} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {filteredCases.length === 0 && (
          <div className="py-20 text-center">
            <Scale className="mx-auto h-12 w-12 text-charcoal-light/20" />
            <p className="mt-4 font-[family-name:var(--font-satoshi)] text-base text-charcoal-light">
              No cases found matching your filters.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
