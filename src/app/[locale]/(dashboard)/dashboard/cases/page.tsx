"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  Eye,
  Pencil,
  Scale,
  Filter,
  Calendar,
  Gavel,
} from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { HearingUpdateModal } from "@/components/dashboard/HearingUpdateModal";
import { CASE_CATEGORIES, CASE_STATUSES } from "@/lib/constants";
import { CASES, type CaseData } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { Link } from "@/i18n/routing";

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
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

const STATUS_COLORS: Record<string, string> = {
  filed: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  ongoing: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  won: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  lost: "bg-red-500/10 text-red-400 border-red-500/20",
  reserved: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  disposed: "bg-gray-500/10 text-gray-400 border-gray-500/20",
};

function getCategoryLabel(value: string): string {
  const found = CASE_CATEGORIES.find((c) => c.value === value);
  return found ? found.label : value;
}

function getStatusLabel(value: string): string {
  const found = CASE_STATUSES.find((s) => s.value === value);
  return found ? found.label : value;
}

export default function CasesPage() {
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [hearingModalOpen, setHearingModalOpen] = useState(false);
  const [selectedCaseName, setSelectedCaseName] = useState("");

  const filtered =
    filterStatus === "all"
      ? CASES
      : CASES.filter((c) => c.status === filterStatus);

  return (
    <div className="min-h-screen">
      <DashboardHeader title="Case Management" titleHi="वाद प्रबंधन" />

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
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="rounded-lg border border-gold/10 bg-[#1A0E0A] px-3 py-2 font-[family-name:var(--font-satoshi)] text-xs text-cream/70 outline-none transition-colors focus:border-saffron/30"
            >
              <option value="all">All Statuses</option>
              {CASE_STATUSES.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>

          {/* Add Button */}
          <Link
            href="/dashboard/cases/new"
            className="flex items-center gap-2 rounded-lg bg-saffron px-4 py-2.5 font-[family-name:var(--font-satoshi)] text-sm font-medium text-white transition-colors hover:bg-saffron-bright"
          >
            <Plus className="h-4 w-4" />
            Add New Case
          </Link>
        </motion.div>

        {/* Cases Table — Desktop */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="hidden overflow-hidden rounded-xl border border-gold/10 bg-[#1A0E0A] lg:block"
        >
          {/* Table Header */}
          <div className="grid grid-cols-[1fr_160px_150px_120px_90px_110px_110px] gap-2 border-b border-gold/10 bg-cream/[0.02] px-4 py-3">
            {["Title", "Court", "Case No.", "Category", "Status", "Next Hearing", "Actions"].map(
              (heading) => (
                <p
                  key={heading}
                  className="font-[family-name:var(--font-satoshi)] text-[11px] font-medium uppercase tracking-wide text-cream/30"
                >
                  {heading}
                </p>
              )
            )}
          </div>

          {/* Table Rows */}
          {filtered.map((caseItem) => (
            <motion.div
              key={caseItem.id}
              variants={fadeUp}
              className="group grid grid-cols-[1fr_160px_150px_120px_90px_110px_110px] items-center gap-2 border-b border-gold/5 px-4 py-3 transition-colors last:border-0 hover:bg-cream/[0.02]"
            >
              {/* Title */}
              <div className="min-w-0">
                <p className="truncate font-[family-name:var(--font-satoshi)] text-sm text-cream/80 group-hover:text-cream">
                  {caseItem.title}
                </p>
                <p className="font-[family-name:var(--font-noto-serif)] text-[11px] text-cream/30">
                  {caseItem.titleHi}
                </p>
              </div>

              {/* Court */}
              <div className="min-w-0">
                <p className="truncate font-[family-name:var(--font-satoshi)] text-xs text-cream/50">
                  {caseItem.court}
                </p>
              </div>

              {/* Case Number */}
              <p className="font-[family-name:var(--font-satoshi)] text-xs text-cream/50 font-mono">
                {caseItem.caseNumber}
              </p>

              {/* Category */}
              <span className="inline-flex w-fit items-center rounded-full border border-gold/10 bg-cream/5 px-2 py-0.5 font-[family-name:var(--font-satoshi)] text-[10px] font-medium text-cream/60">
                {getCategoryLabel(caseItem.category)}
              </span>

              {/* Status */}
              <span
                className={cn(
                  "inline-flex w-fit items-center rounded-full border px-2 py-0.5 font-[family-name:var(--font-satoshi)] text-[10px] font-medium capitalize",
                  STATUS_COLORS[caseItem.status] ?? "bg-cream/5 text-cream/50 border-cream/10"
                )}
              >
                {getStatusLabel(caseItem.status)}
              </span>

              {/* Next Hearing */}
              <div className="flex items-center gap-1">
                {caseItem.nextHearing ? (
                  <>
                    <Calendar className="h-3 w-3 text-cream/30" />
                    <p className="font-[family-name:var(--font-satoshi)] text-xs text-cream/50">
                      {new Date(caseItem.nextHearing).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                      })}
                    </p>
                  </>
                ) : (
                  <span className="font-[family-name:var(--font-satoshi)] text-xs text-cream/20">
                    —
                  </span>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-1">
                <button
                  className="flex h-7 w-7 items-center justify-center rounded-lg text-cream/30 transition-colors hover:bg-cream/5 hover:text-cream/70"
                  aria-label="View case"
                >
                  <Eye className="h-3.5 w-3.5" />
                </button>
                <button
                  className="flex h-7 w-7 items-center justify-center rounded-lg text-cream/30 transition-colors hover:bg-cream/5 hover:text-cream/70"
                  aria-label="Edit case"
                >
                  <Pencil className="h-3.5 w-3.5" />
                </button>
                {(caseItem.status === "ongoing" || caseItem.status === "filed") && (
                  <button
                    onClick={() => {
                      setSelectedCaseName(caseItem.title);
                      setHearingModalOpen(true);
                    }}
                    className="flex h-7 w-7 items-center justify-center rounded-lg text-cream/30 transition-colors hover:bg-saffron/10 hover:text-saffron"
                    aria-label="Add hearing update"
                  >
                    <Calendar className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            </motion.div>
          ))}

          {filtered.length === 0 && (
            <div className="flex items-center justify-center py-12">
              <p className="font-[family-name:var(--font-satoshi)] text-sm text-cream/30">
                No cases found for this status.
              </p>
            </div>
          )}
        </motion.div>

        {/* Cases Cards — Mobile / Tablet */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="space-y-3 lg:hidden"
        >
          {filtered.map((caseItem) => (
            <motion.div
              key={caseItem.id}
              variants={fadeUp}
              className="rounded-xl border border-gold/10 bg-[#1A0E0A] p-4"
            >
              <div className="mb-3 flex items-start justify-between">
                <div className="min-w-0 flex-1">
                  <p className="font-[family-name:var(--font-satoshi)] text-sm font-medium text-cream/80">
                    {caseItem.title}
                  </p>
                  <p className="font-[family-name:var(--font-noto-serif)] text-[11px] text-cream/30">
                    {caseItem.titleHi}
                  </p>
                </div>
                <span
                  className={cn(
                    "ml-2 shrink-0 rounded-full border px-2 py-0.5 font-[family-name:var(--font-satoshi)] text-[10px] font-medium capitalize",
                    STATUS_COLORS[caseItem.status] ?? "bg-cream/5 text-cream/50 border-cream/10"
                  )}
                >
                  {getStatusLabel(caseItem.status)}
                </span>
              </div>

              <div className="mb-3 space-y-1.5 text-xs">
                <div className="flex items-center gap-1.5 text-cream/40">
                  <Scale className="h-3 w-3 shrink-0" />
                  <span className="truncate font-[family-name:var(--font-satoshi)]">
                    {caseItem.court}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-cream/40">
                  <Gavel className="h-3 w-3 shrink-0" />
                  <span className="font-[family-name:var(--font-satoshi)] font-mono">
                    {caseItem.caseNumber}
                  </span>
                </div>
                {caseItem.nextHearing && (
                  <div className="flex items-center gap-1.5 text-cream/40">
                    <Calendar className="h-3 w-3 shrink-0" />
                    <span className="font-[family-name:var(--font-satoshi)]">
                      Next:{" "}
                      {new Date(caseItem.nextHearing).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                )}
              </div>

              <div className="mb-3 flex gap-2">
                <span className="rounded-full border border-gold/10 bg-cream/5 px-2 py-0.5 font-[family-name:var(--font-satoshi)] text-[10px] text-cream/50">
                  {getCategoryLabel(caseItem.category)}
                </span>
              </div>

              <div className="flex gap-2">
                <button className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-gold/10 bg-cream/[0.02] py-2 font-[family-name:var(--font-satoshi)] text-xs text-cream/50 transition-colors hover:border-gold/20 hover:text-cream/70">
                  <Eye className="h-3.5 w-3.5" />
                  View
                </button>
                <button className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-gold/10 bg-cream/[0.02] py-2 font-[family-name:var(--font-satoshi)] text-xs text-cream/50 transition-colors hover:border-gold/20 hover:text-cream/70">
                  <Pencil className="h-3.5 w-3.5" />
                  Edit
                </button>
                {(caseItem.status === "ongoing" || caseItem.status === "filed") && (
                  <button
                    onClick={() => {
                      setSelectedCaseName(caseItem.title);
                      setHearingModalOpen(true);
                    }}
                    className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-saffron/20 bg-saffron/5 py-2 font-[family-name:var(--font-satoshi)] text-xs text-saffron/70 transition-colors hover:border-saffron/30 hover:text-saffron"
                  >
                    <Calendar className="h-3.5 w-3.5" />
                    Hearing
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Hearing Update Modal */}
      <HearingUpdateModal
        isOpen={hearingModalOpen}
        onClose={() => setHearingModalOpen(false)}
        caseName={selectedCaseName}
      />
    </div>
  );
}
