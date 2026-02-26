"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { cn } from "@/lib/utils";
import {
  Scale,
  Trophy,
  CalendarCheck,
  UserPlus,
  TrendingUp,
  TrendingDown,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  FileSpreadsheet,
  FileText,
  BarChart3,
  PieChart,
  Activity,
  Download,
  Check,
} from "lucide-react";

/* ─── Animation Presets ─── */

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.06 } } };
const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

/* ─── Time Period Options ─── */

const TIME_PERIODS = ["This Month", "This Quarter", "This Year", "Custom"] as const;
type TimePeriod = (typeof TIME_PERIODS)[number];

/* ─── Summary Cards Data ─── */

const SUMMARY_CARDS = [
  {
    id: "cases-filed",
    label: "Total Cases Filed",
    labelHi: "कुल मुकदमे दायर",
    value: 47,
    trend: "+8%",
    trendDirection: "up" as const,
    icon: Scale,
    color: "text-saffron-bright",
  },
  {
    id: "cases-won",
    label: "Cases Won",
    labelHi: "जीते गए मुकदमे",
    value: 32,
    trend: "+12%",
    trendDirection: "up" as const,
    icon: Trophy,
    color: "text-emerald-400",
  },
  {
    id: "activities",
    label: "Activities Held",
    labelHi: "आयोजित गतिविधियां",
    value: 24,
    trend: "+5%",
    trendDirection: "up" as const,
    icon: CalendarCheck,
    color: "text-blue-400",
  },
  {
    id: "members",
    label: "New Members",
    labelHi: "नए सदस्य",
    value: 18,
    trend: "-3%",
    trendDirection: "down" as const,
    icon: UserPlus,
    color: "text-gold-bright",
  },
] as const;

/* ─── Case Distribution Data ─── */

const CASE_CATEGORIES = [
  { label: "Temple Rights", labelHi: "मंदिर अधिकार", pct: 40, color: "#FF6B2B" },
  { label: "Cow Protection", labelHi: "गो संरक्षण", pct: 25, color: "#2E7D32" },
  { label: "Anti-Conversion", labelHi: "धर्मांतरण निरोध", pct: 15, color: "#1565C0" },
  { label: "Waqf Act", labelHi: "वक़्फ अधिनियम", pct: 10, color: "#C4922C" },
  { label: "Religious Freedom", labelHi: "धार्मिक स्वतंत्रता", pct: 7, color: "#6B1D1D" },
  { label: "UCC", labelHi: "समान नागरिक संहिता", pct: 3, color: "#9333EA" },
] as const;

/* ─── Monthly Activity Trend Data ─── */

const MONTHLY_DATA = [
  { month: "Jan", count: 8 },
  { month: "Feb", count: 12 },
  { month: "Mar", count: 15 },
  { month: "Apr", count: 10 },
  { month: "May", count: 18 },
  { month: "Jun", count: 22 },
  { month: "Jul", count: 14 },
  { month: "Aug", count: 20 },
  { month: "Sep", count: 25 },
  { month: "Oct", count: 16 },
  { month: "Nov", count: 28 },
  { month: "Dec", count: 24 },
] as const;

const MAX_MONTHLY = Math.max(...MONTHLY_DATA.map((d) => d.count));

/* ─── Regional Performance Data ─── */

interface RegionRow {
  rank: number;
  region: string;
  regionHi: string;
  cases: number;
  activities: number;
  members: number;
  resolutionRate: number;
  score: number;
}

const INITIAL_REGIONS: RegionRow[] = [
  { rank: 1, region: "Uttar Chetra", regionHi: "उत्तर क्षेत्र", cases: 14, activities: 8, members: 42, resolutionRate: 78, score: 92 },
  { rank: 2, region: "Paschim Chetra", regionHi: "पश्चिम क्षेत्र", cases: 11, activities: 6, members: 35, resolutionRate: 72, score: 84 },
  { rank: 3, region: "Dakshina Chetra", regionHi: "दक्षिण क्षेत्र", cases: 9, activities: 5, members: 28, resolutionRate: 65, score: 71 },
  { rank: 4, region: "Purva Chetra", regionHi: "पूर्व क्षेत्र", cases: 7, activities: 3, members: 22, resolutionRate: 60, score: 58 },
  { rank: 5, region: "Madhya Chetra", regionHi: "मध्य क्षेत्र", cases: 4, activities: 2, members: 15, resolutionRate: 55, score: 43 },
  { rank: 6, region: "Purvottar Chetra", regionHi: "पूर्वोत्तर क्षेत्र", cases: 2, activities: 1, members: 8, resolutionRate: 50, score: 29 },
];

type SortKey = "rank" | "region" | "cases" | "activities" | "members" | "resolutionRate" | "score";

/* ─── Page Component ─── */

export default function AdminReportsPage() {
  const [activePeriod, setActivePeriod] = useState<TimePeriod>("This Quarter");
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);
  const [sortKey, setSortKey] = useState<SortKey>("rank");
  const [sortAsc, setSortAsc] = useState(true);
  const [exportToast, setExportToast] = useState<string | null>(null);

  /* ─── Sorting ─── */

  const handleSort = useCallback(
    (key: SortKey) => {
      if (sortKey === key) {
        setSortAsc((prev) => !prev);
      } else {
        setSortKey(key);
        setSortAsc(key === "rank" || key === "region");
      }
    },
    [sortKey]
  );

  const sortedRegions = [...INITIAL_REGIONS].sort((a, b) => {
    const aVal = a[sortKey];
    const bVal = b[sortKey];
    if (typeof aVal === "string" && typeof bVal === "string") {
      return sortAsc ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
    }
    const numA = aVal as number;
    const numB = bVal as number;
    return sortAsc ? numA - numB : numB - numA;
  });

  const maxScore = Math.max(...INITIAL_REGIONS.map((r) => r.score));

  /* ─── Export Mock ─── */

  const handleExport = useCallback((type: "excel" | "pdf") => {
    const label = type === "excel" ? "Excel export started..." : "PDF export started...";
    setExportToast(label);
    setTimeout(() => setExportToast(null), 2500);
  }, []);

  /* ─── Sortable Header Helper ─── */

  const SortHeader = ({ label, sortKeyName }: { label: string; sortKeyName: SortKey }) => (
    <button
      onClick={() => handleSort(sortKeyName)}
      className="group inline-flex items-center gap-1 font-[family-name:var(--font-satoshi)] text-[11px] font-semibold uppercase tracking-wider text-cream/40 transition-colors hover:text-cream/70"
    >
      {label}
      {sortKey === sortKeyName ? (
        sortAsc ? (
          <ArrowUp className="h-3 w-3 text-saffron-bright" />
        ) : (
          <ArrowDown className="h-3 w-3 text-saffron-bright" />
        )
      ) : (
        <ArrowUpDown className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
      )}
    </button>
  );

  return (
    <div className="min-h-screen">
      <DashboardHeader title="Reports & Analytics" titleHi="रिपोर्ट और विश्लेषण" />

      <div className="p-4 lg:p-6">
        {/* ─── 1. Time Period Selector ─── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mb-6 flex flex-wrap gap-2"
        >
          {TIME_PERIODS.map((period) => (
            <button
              key={period}
              onClick={() => setActivePeriod(period)}
              className={cn(
                "rounded-full px-4 py-2 font-[family-name:var(--font-satoshi)] text-xs font-medium transition-all",
                activePeriod === period
                  ? "bg-saffron text-white shadow-lg shadow-saffron/20"
                  : "border border-gold/10 bg-[#1A0E0A] text-cream/50 hover:border-gold/20 hover:text-cream/70"
              )}
            >
              {period}
            </button>
          ))}
        </motion.div>

        {/* ─── 2. Summary Cards ─── */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4"
        >
          {SUMMARY_CARDS.map((card) => (
            <motion.div
              key={card.id}
              variants={fadeUp}
              className="rounded-xl border border-gold/10 bg-[#1A0E0A] p-4"
            >
              <div className="flex items-center justify-between">
                <card.icon className={cn("h-5 w-5", card.color)} />
                <span
                  className={cn(
                    "inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-[10px] font-semibold",
                    card.trendDirection === "up"
                      ? "bg-emerald-500/10 text-emerald-400"
                      : "bg-red-500/10 text-red-400"
                  )}
                >
                  {card.trendDirection === "up" ? (
                    <TrendingUp className="h-3 w-3" />
                  ) : (
                    <TrendingDown className="h-3 w-3" />
                  )}
                  {card.trend}
                </span>
              </div>
              <p className="mt-3 font-[family-name:var(--font-playfair)] text-2xl font-bold text-cream">
                {card.value}
              </p>
              <p className="mt-1 font-[family-name:var(--font-satoshi)] text-xs text-cream/40">
                {card.label}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* ─── 3. Case Distribution by Category ─── */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="rounded-xl border border-gold/10 bg-[#1A0E0A] p-5"
          >
            <div className="mb-5 flex items-center gap-2">
              <PieChart className="h-5 w-5 text-saffron-bright" />
              <h3 className="font-[family-name:var(--font-playfair)] text-base font-bold text-cream">
                Case Distribution by Category
              </h3>
            </div>

            <div className="space-y-3">
              {CASE_CATEGORIES.map((cat, idx) => (
                <motion.div
                  key={cat.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: idx * 0.08,
                    ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
                  }}
                  className="group"
                >
                  <div className="mb-1 flex items-center justify-between">
                    <span className="font-[family-name:var(--font-satoshi)] text-xs font-medium text-cream/70">
                      {cat.label}
                    </span>
                    <span className="font-[family-name:var(--font-satoshi)] text-xs font-bold text-cream/50">
                      {cat.pct}%
                    </span>
                  </div>
                  <div className="h-3 overflow-hidden rounded-full bg-cream/5">
                    <motion.div
                      className="h-full rounded-full transition-shadow group-hover:shadow-[0_0_12px_rgba(255,255,255,0.1)]"
                      style={{ backgroundColor: cat.color }}
                      initial={{ width: 0 }}
                      animate={{ width: `${cat.pct}%` }}
                      transition={{
                        duration: 0.8,
                        delay: idx * 0.08 + 0.2,
                        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
                      }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ─── 4. Monthly Activity Trend ─── */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="rounded-xl border border-gold/10 bg-[#1A0E0A] p-5"
          >
            <div className="mb-5 flex items-center gap-2">
              <Activity className="h-5 w-5 text-gold-bright" />
              <h3 className="font-[family-name:var(--font-playfair)] text-base font-bold text-cream">
                Monthly Activity Trend
              </h3>
            </div>

            <div className="flex h-52 items-end gap-2">
              {MONTHLY_DATA.map((item, idx) => {
                const heightPct = (item.count / MAX_MONTHLY) * 100;
                const isHovered = hoveredBar === idx;

                return (
                  <div
                    key={item.month}
                    className="relative flex flex-1 flex-col items-center"
                    onMouseEnter={() => setHoveredBar(idx)}
                    onMouseLeave={() => setHoveredBar(null)}
                  >
                    {/* Tooltip */}
                    <AnimatePresence>
                      {isHovered && (
                        <motion.div
                          initial={{ opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 4 }}
                          className="absolute -top-8 z-10 rounded-md bg-cream px-2 py-1 shadow-lg"
                        >
                          <span className="font-[family-name:var(--font-satoshi)] text-[10px] font-bold text-[#120A07]">
                            {item.count}
                          </span>
                          <div className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-cream" />
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Bar */}
                    <motion.div
                      className={cn(
                        "w-full cursor-pointer rounded-t-md transition-shadow",
                        isHovered && "shadow-[0_0_16px_rgba(255,153,51,0.3)]"
                      )}
                      style={{
                        background: "linear-gradient(to top, #C4922C, #FF9933)",
                      }}
                      initial={{ height: 0 }}
                      animate={{ height: `${heightPct}%` }}
                      transition={{
                        duration: 0.6,
                        delay: idx * 0.05,
                        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
                      }}
                    />

                    {/* Label */}
                    <span className="mt-2 font-[family-name:var(--font-satoshi)] text-[9px] text-cream/30">
                      {item.month}
                    </span>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* ─── 5. Regional Performance Table ─── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.5,
            ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
          }}
          className="mt-6 rounded-xl border border-gold/10 bg-[#1A0E0A] p-5"
        >
          <div className="mb-5 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-saffron-bright" />
            <h3 className="font-[family-name:var(--font-playfair)] text-base font-bold text-cream">
              Regional Performance
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px]">
              <thead>
                <tr className="border-b border-gold/10">
                  <th className="pb-3 text-left">
                    <SortHeader label="Rank" sortKeyName="rank" />
                  </th>
                  <th className="pb-3 text-left">
                    <SortHeader label="Region" sortKeyName="region" />
                  </th>
                  <th className="pb-3 text-right">
                    <SortHeader label="Cases" sortKeyName="cases" />
                  </th>
                  <th className="pb-3 text-right">
                    <SortHeader label="Activities" sortKeyName="activities" />
                  </th>
                  <th className="pb-3 text-right">
                    <SortHeader label="Members" sortKeyName="members" />
                  </th>
                  <th className="pb-3 text-right">
                    <SortHeader label="Resolution" sortKeyName="resolutionRate" />
                  </th>
                  <th className="pb-3 text-right">
                    <SortHeader label="Score" sortKeyName="score" />
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedRegions.map((row, idx) => (
                  <motion.tr
                    key={row.region}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: idx * 0.04 }}
                    className="border-b border-gold/5 transition-colors hover:bg-cream/[0.02]"
                  >
                    <td className="py-3">
                      <span
                        className={cn(
                          "inline-flex h-6 w-6 items-center justify-center rounded-full font-[family-name:var(--font-satoshi)] text-[10px] font-bold",
                          row.rank === 1 && "bg-gold-bright/20 text-gold-bright",
                          row.rank === 2 && "bg-cream/10 text-cream/60",
                          row.rank === 3 && "bg-saffron/15 text-saffron/70",
                          row.rank > 3 && "bg-cream/5 text-cream/30"
                        )}
                      >
                        {row.rank}
                      </span>
                    </td>
                    <td className="py-3">
                      <p className="font-[family-name:var(--font-satoshi)] text-sm font-medium text-cream/80">
                        {row.region}
                      </p>
                      <p className="font-[family-name:var(--font-noto-serif)] text-[10px] text-cream/30">
                        {row.regionHi}
                      </p>
                    </td>
                    <td className="py-3 text-right font-[family-name:var(--font-satoshi)] text-sm text-cream/60">
                      {row.cases}
                    </td>
                    <td className="py-3 text-right font-[family-name:var(--font-satoshi)] text-sm text-cream/60">
                      {row.activities}
                    </td>
                    <td className="py-3 text-right font-[family-name:var(--font-satoshi)] text-sm text-cream/60">
                      {row.members}
                    </td>
                    <td className="py-3 text-right font-[family-name:var(--font-satoshi)] text-sm text-cream/60">
                      {row.resolutionRate}%
                    </td>
                    <td className="py-3">
                      <div className="flex items-center justify-end gap-2">
                        <span className="font-[family-name:var(--font-satoshi)] text-sm font-semibold text-cream/70">
                          {row.score}
                        </span>
                        <div className="h-1.5 w-16 overflow-hidden rounded-full bg-cream/5">
                          <motion.div
                            className="h-full rounded-full bg-gradient-to-r from-saffron to-gold-bright"
                            initial={{ width: 0 }}
                            animate={{ width: `${(row.score / maxScore) * 100}%` }}
                            transition={{
                              duration: 0.7,
                              delay: idx * 0.06,
                              ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
                            }}
                          />
                        </div>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* ─── 6. Export Actions ─── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.4,
            duration: 0.5,
            ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
          }}
          className="mt-6 flex flex-wrap items-center gap-4 rounded-xl border border-gold/10 bg-[#1A0E0A] p-5"
        >
          <div className="mr-auto flex items-center gap-2">
            <Download className="h-5 w-5 text-cream/40" />
            <h3 className="font-[family-name:var(--font-playfair)] text-base font-bold text-cream">
              Export Reports
            </h3>
          </div>

          <button
            onClick={() => handleExport("excel")}
            className="inline-flex items-center gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/5 px-5 py-2.5 font-[family-name:var(--font-satoshi)] text-sm font-medium text-emerald-400 transition-all hover:border-emerald-500/50 hover:bg-emerald-500/10 hover:shadow-lg hover:shadow-emerald-500/5"
          >
            <FileSpreadsheet className="h-4 w-4" />
            Export to Excel
          </button>

          <button
            onClick={() => handleExport("pdf")}
            className="inline-flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/5 px-5 py-2.5 font-[family-name:var(--font-satoshi)] text-sm font-medium text-red-400 transition-all hover:border-red-500/50 hover:bg-red-500/10 hover:shadow-lg hover:shadow-red-500/5"
          >
            <FileText className="h-4 w-4" />
            Export to PDF
          </button>
        </motion.div>
      </div>

      {/* ─── Toast Notification ─── */}
      <AnimatePresence>
        {exportToast && (
          <motion.div
            initial={{ opacity: 0, y: 40, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 40, x: "-50%" }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            className="fixed bottom-6 left-1/2 z-50 flex items-center gap-2 rounded-lg border border-gold/20 bg-[#1A0E0A] px-4 py-3 shadow-2xl shadow-black/50"
          >
            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/20">
              <Check className="h-3 w-3 text-emerald-400" />
            </div>
            <span className="font-[family-name:var(--font-satoshi)] text-sm text-cream/80">
              {exportToast}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
