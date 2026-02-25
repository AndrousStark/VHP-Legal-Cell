"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Upload,
  Eye,
  Download,
  BookOpen,
  Calendar,
  Scale,
  Star,
  Filter,
  FileText,
} from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { useAuth } from "@/lib/auth-context";
import { CASE_CATEGORIES } from "@/lib/constants";
import { JUDGMENTS, type Judgment } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { Link } from "@/i18n/routing";

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

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

const CATEGORY_COLORS: Record<string, string> = {
  temple: "bg-saffron/10 text-saffron border-saffron/20",
  cow: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  conversion: "bg-red-500/10 text-red-400 border-red-500/20",
  "religious-freedom": "bg-blue-500/10 text-blue-400 border-blue-500/20",
  historical: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  waqf: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  ucc: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
  other: "bg-cream/5 text-cream/50 border-cream/10",
};

function getCategoryLabel(value: string): string {
  const found = CASE_CATEGORIES.find((c) => c.value === value);
  return found ? found.label : value.charAt(0).toUpperCase() + value.slice(1);
}

export default function JudgmentsPage() {
  const { user } = useAuth();
  const [filterCategory, setFilterCategory] = useState<string>("all");

  const filtered =
    filterCategory === "all"
      ? JUDGMENTS
      : JUDGMENTS.filter((j) => j.category === filterCategory);

  return (
    <div className="min-h-screen">
      <DashboardHeader title="Judgments" titleHi="निर्णय" />

      <div className="p-4 lg:p-6">
        {/* Toolbar */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
          }}
          className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
        >
          {/* Filter */}
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-cream/40" />
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="rounded-lg border border-gold/10 bg-[#1A0E0A] px-3 py-2 font-[family-name:var(--font-satoshi)] text-xs text-cream/70 outline-none transition-colors focus:border-saffron/30"
            >
              <option value="all">All Categories</option>
              {CASE_CATEGORIES.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
              <option value="historical">Historical</option>
            </select>
          </div>

          {/* Upload Button */}
          <Link href="/dashboard/judgments/upload">
            <button className="flex items-center gap-2 rounded-lg bg-saffron px-4 py-2.5 font-[family-name:var(--font-satoshi)] text-sm font-medium text-white transition-colors hover:bg-saffron-bright">
              <Upload className="h-4 w-4" />
              Upload Judgment
            </button>
          </Link>
        </motion.div>

        {/* Judgment List */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="space-y-3"
        >
          {filtered.map((judgment) => (
            <motion.div
              key={judgment.id}
              variants={fadeUp}
              className="group rounded-xl border border-gold/10 bg-[#1A0E0A] p-5 transition-all hover:border-gold/20 hover:shadow-lg hover:shadow-saffron/5"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                {/* Left: Info */}
                <div className="min-w-0 flex-1">
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    {/* Landmark Badge */}
                    {judgment.landmark && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 font-[family-name:var(--font-satoshi)] text-[10px] font-semibold text-amber-400">
                        <Star className="h-2.5 w-2.5" />
                        Landmark
                      </span>
                    )}
                    {/* Category Badge */}
                    <span
                      className={cn(
                        "inline-flex items-center rounded-full border px-2 py-0.5 font-[family-name:var(--font-satoshi)] text-[10px] font-medium",
                        CATEGORY_COLORS[judgment.category] ?? CATEGORY_COLORS.other
                      )}
                    >
                      {getCategoryLabel(judgment.category)}
                    </span>
                  </div>

                  {/* Case Name */}
                  <h3 className="mb-1 font-[family-name:var(--font-satoshi)] text-sm font-medium text-cream/90 group-hover:text-cream">
                    {judgment.caseName}
                  </h3>
                  <p className="mb-2 font-[family-name:var(--font-noto-serif)] text-[11px] text-cream/30">
                    {judgment.caseNameHi}
                  </p>

                  {/* Court + Date */}
                  <div className="mb-3 flex flex-wrap items-center gap-3 text-xs text-cream/40">
                    <div className="flex items-center gap-1">
                      <Scale className="h-3 w-3" />
                      <span className="font-[family-name:var(--font-satoshi)]">
                        {judgment.court}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span className="font-[family-name:var(--font-satoshi)]">
                        {new Date(judgment.date).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                  </div>

                  {/* Summary */}
                  <p className="font-[family-name:var(--font-satoshi)] text-xs leading-relaxed text-cream/40">
                    {judgment.summary}
                  </p>

                  {/* Keywords */}
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {judgment.keywords.map((keyword) => (
                      <span
                        key={keyword}
                        className="rounded-full bg-cream/5 px-2 py-0.5 font-[family-name:var(--font-satoshi)] text-[9px] text-cream/30"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right: Actions */}
                <div className="flex shrink-0 gap-2 sm:flex-col">
                  <button className="flex items-center gap-1.5 rounded-lg border border-gold/10 bg-cream/[0.02] px-3 py-2 font-[family-name:var(--font-satoshi)] text-xs text-cream/50 transition-colors hover:border-gold/20 hover:text-cream/70">
                    <Eye className="h-3.5 w-3.5" />
                    View
                  </button>
                  {judgment.pdfUrl && (
                    <button className="flex items-center gap-1.5 rounded-lg border border-gold/10 bg-cream/[0.02] px-3 py-2 font-[family-name:var(--font-satoshi)] text-xs text-cream/50 transition-colors hover:border-gold/20 hover:text-cream/70">
                      <Download className="h-3.5 w-3.5" />
                      PDF
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-16"
          >
            <FileText className="mb-3 h-10 w-10 text-cream/15" />
            <p className="font-[family-name:var(--font-satoshi)] text-sm text-cream/30">
              No judgments found for this category.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
