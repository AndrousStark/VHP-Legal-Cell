"use client";

import { motion } from "framer-motion";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { CHETRAS, MOCK_REGION_STATS } from "@/lib/map-config";
import { cn } from "@/lib/utils";
import {
  Scale,
  Users,
  CalendarCheck,
  TrendingUp,
  TrendingDown,
  Minus,
  BarChart3,
  Award,
  AlertTriangle,
  ArrowUpRight,
} from "lucide-react";

/* ─── Mock Analytics Data ─── */

interface RegionRanking {
  chetraId: string;
  name: string;
  score: number;
  cases: number;
  members: number;
  activities: number;
  resolutionRate: number;
  trend: "improving" | "declining" | "stable";
  cagr: number;
}

function calculateScore(stats: { cases: number; members: number; activities: number; resolutionRate: number }): number {
  return Math.round(
    (stats.cases * 0.3 + stats.members * 0.2 + stats.activities * 3 + stats.resolutionRate * 0.3)
  );
}

const REGION_RANKINGS: RegionRanking[] = CHETRAS.map((k) => {
  const stats = MOCK_REGION_STATS[k.id] ?? { cases: 0, members: 0, activities: 0, resolutionRate: 0 };
  const score = calculateScore(stats);
  const trend: "improving" | "declining" | "stable" = score > 50 ? "improving" : score > 30 ? "stable" : "declining";
  // Deterministic mock CAGR based on score (avoid Math.random for SSR hydration)
  const cagr = Math.round(((score * 7 + 13) % 30 - 5) * 10) / 10;

  return {
    chetraId: k.id,
    name: k.nameEn,
    score,
    ...stats,
    trend,
    cagr,
  };
}).sort((a, b) => b.score - a.score);

const NATIONAL_STATS = {
  totalCases: Object.values(MOCK_REGION_STATS).reduce((sum, s) => sum + s.cases, 0),
  totalMembers: Object.values(MOCK_REGION_STATS).reduce((sum, s) => sum + s.members, 0),
  totalActivities: Object.values(MOCK_REGION_STATS).reduce((sum, s) => sum + s.activities, 0),
  avgResolution: Math.round(
    Object.values(MOCK_REGION_STATS).reduce((sum, s) => sum + s.resolutionRate, 0) /
      Object.values(MOCK_REGION_STATS).length
  ),
};

/* ─── Anomaly Detection (Z-score) ─── */

function detectAnomalies(rankings: RegionRanking[]): string[] {
  const scores = rankings.map((r) => r.score);
  const mean = scores.reduce((a, b) => a + b, 0) / scores.length;
  const stdDev = Math.sqrt(scores.reduce((sum, s) => sum + (s - mean) ** 2, 0) / scores.length);

  return rankings
    .filter((r) => Math.abs((r.score - mean) / (stdDev || 1)) > 1.5)
    .map((r) => {
      const z = (r.score - mean) / (stdDev || 1);
      return z > 0
        ? `${r.name} is performing significantly above average (score: ${r.score})`
        : `${r.name} needs attention — score ${r.score} is below average`;
    });
}

const ANOMALIES = detectAnomalies(REGION_RANKINGS);

const TREND_CONFIG = {
  improving: { icon: TrendingUp, color: "text-emerald-400", bg: "bg-emerald-500/10" },
  declining: { icon: TrendingDown, color: "text-red-400", bg: "bg-red-500/10" },
  stable: { icon: Minus, color: "text-amber-400", bg: "bg-amber-500/10" },
};

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.06 } } };
const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen">
      <DashboardHeader title="Analytics Dashboard" titleHi="विश्लेषण डैशबोर्ड" />

      <div className="p-4 lg:p-6">
        {/* National Overview Cards */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4"
        >
          {[
            { label: "Total Cases", value: NATIONAL_STATS.totalCases, icon: Scale, color: "text-saffron-bright" },
            { label: "Total Members", value: NATIONAL_STATS.totalMembers, icon: Users, color: "text-gold-bright" },
            { label: "Total Activities", value: NATIONAL_STATS.totalActivities, icon: CalendarCheck, color: "text-blue-400" },
            { label: "Avg Resolution", value: `${NATIONAL_STATS.avgResolution}%`, icon: TrendingUp, color: "text-emerald-400" },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              variants={fadeUp}
              className="rounded-xl border border-gold/10 bg-[#1A0E0A] p-4"
            >
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
              <p className="mt-3 font-[family-name:var(--font-playfair)] text-2xl font-bold text-cream">
                {stat.value}
              </p>
              <p className="mt-1 font-[family-name:var(--font-satoshi)] text-xs text-cream/40">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
          {/* Performance Rankings */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="rounded-xl border border-gold/10 bg-[#1A0E0A] p-5"
          >
            <div className="mb-4 flex items-center gap-2">
              <Award className="h-5 w-5 text-gold-bright" />
              <h3 className="font-[family-name:var(--font-playfair)] text-base font-bold text-cream">
                Regional Performance Rankings
              </h3>
            </div>

            <div className="space-y-2">
              {REGION_RANKINGS.map((region, index) => {
                const TrendIcon = TREND_CONFIG[region.trend].icon;
                const maxScore = REGION_RANKINGS[0]?.score ?? 100;

                return (
                  <div
                    key={region.chetraId}
                    className="group flex items-center gap-3 rounded-lg border border-gold/5 p-3 transition-all hover:border-gold/15 hover:bg-cream/[0.02]"
                  >
                    {/* Rank */}
                    <span
                      className={cn(
                        "flex h-7 w-7 shrink-0 items-center justify-center rounded-full font-[family-name:var(--font-satoshi)] text-xs font-bold",
                        index === 0 && "bg-gold-bright/20 text-gold-bright",
                        index === 1 && "bg-cream/10 text-cream/60",
                        index === 2 && "bg-saffron/15 text-saffron/70",
                        index > 2 && "bg-cream/5 text-cream/30"
                      )}
                    >
                      {index + 1}
                    </span>

                    {/* Info */}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <p className="truncate font-[family-name:var(--font-satoshi)] text-sm font-medium text-cream/80">
                          {region.name}
                        </p>
                        <span
                          className={cn(
                            "flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[9px] font-medium",
                            TREND_CONFIG[region.trend].bg,
                            TREND_CONFIG[region.trend].color
                          )}
                        >
                          <TrendIcon className="h-2.5 w-2.5" />
                          {region.cagr > 0 ? "+" : ""}
                          {region.cagr}%
                        </span>
                      </div>

                      {/* Score bar */}
                      <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-cream/5">
                        <motion.div
                          className="h-full rounded-full bg-gradient-to-r from-saffron to-gold-bright"
                          initial={{ width: 0 }}
                          animate={{
                            width: `${(region.score / maxScore) * 100}%`,
                          }}
                          transition={{ duration: 0.8, delay: index * 0.05 }}
                        />
                      </div>
                    </div>

                    {/* Score */}
                    <div className="text-right">
                      <span className="font-[family-name:var(--font-playfair)] text-lg font-bold text-cream/70">
                        {region.score}
                      </span>
                      <p className="font-[family-name:var(--font-satoshi)] text-[10px] text-cream/30">
                        score
                      </p>
                    </div>

                    {/* Mini stats (hidden on mobile) */}
                    <div className="hidden gap-4 text-right lg:flex">
                      <div>
                        <p className="font-[family-name:var(--font-satoshi)] text-xs font-medium text-cream/50">
                          {region.cases}
                        </p>
                        <p className="font-[family-name:var(--font-satoshi)] text-[9px] text-cream/20">
                          cases
                        </p>
                      </div>
                      <div>
                        <p className="font-[family-name:var(--font-satoshi)] text-xs font-medium text-cream/50">
                          {region.members}
                        </p>
                        <p className="font-[family-name:var(--font-satoshi)] text-[9px] text-cream/20">
                          members
                        </p>
                      </div>
                      <div>
                        <p className="font-[family-name:var(--font-satoshi)] text-xs font-medium text-cream/50">
                          {region.resolutionRate}%
                        </p>
                        <p className="font-[family-name:var(--font-satoshi)] text-[9px] text-cream/20">
                          resolved
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Right Column: Anomalies + Summary */}
          <div className="space-y-6">
            {/* Anomaly Alerts */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="rounded-xl border border-gold/10 bg-[#1A0E0A] p-5"
            >
              <div className="mb-4 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-400" />
                <h3 className="font-[family-name:var(--font-playfair)] text-base font-bold text-cream">
                  Anomaly Alerts
                </h3>
              </div>

              {ANOMALIES.length > 0 ? (
                <div className="space-y-2">
                  {ANOMALIES.map((alert, i) => (
                    <div
                      key={i}
                      className="rounded-lg border border-amber-500/10 bg-amber-500/5 p-3"
                    >
                      <p className="font-[family-name:var(--font-satoshi)] text-xs text-amber-300/80">
                        {alert}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="font-[family-name:var(--font-satoshi)] text-xs text-cream/30">
                  No anomalies detected.
                </p>
              )}
            </motion.div>

            {/* Executive Summary */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="rounded-xl border border-gold/10 bg-[#1A0E0A] p-5"
            >
              <div className="mb-4 flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-saffron-bright" />
                <h3 className="font-[family-name:var(--font-playfair)] text-base font-bold text-cream">
                  Executive Summary
                </h3>
              </div>

              <div className="space-y-3 font-[family-name:var(--font-satoshi)] text-xs leading-relaxed text-cream/60">
                <p>
                  VHP Legal Cell is actively managing{" "}
                  <span className="font-semibold text-saffron-bright">
                    {NATIONAL_STATS.totalCases} cases
                  </span>{" "}
                  across 12 Chetras with{" "}
                  <span className="font-semibold text-gold-bright">
                    {NATIONAL_STATS.totalMembers}+ members
                  </span>
                  .
                </p>
                <p>
                  The top-performing region is{" "}
                  <span className="font-semibold text-cream/80">
                    {REGION_RANKINGS[0]?.name}
                  </span>{" "}
                  with a composite score of {REGION_RANKINGS[0]?.score}. The national
                  average resolution rate stands at{" "}
                  <span className="font-semibold text-emerald-400">
                    {NATIONAL_STATS.avgResolution}%
                  </span>
                  .
                </p>
                <p>
                  Regions below average need focused resource allocation, particularly
                  in member recruitment and activity organization.
                </p>
              </div>

              <div className="mt-4 rounded-lg border border-gold/5 bg-cream/[0.02] p-3">
                <p className="font-[family-name:var(--font-satoshi)] text-[10px] font-semibold uppercase tracking-wider text-cream/30">
                  Recommendation
                </p>
                <p className="mt-1 font-[family-name:var(--font-satoshi)] text-xs text-cream/50">
                  Prioritize member expansion in Purvottar and Purva Chetras. Schedule Shiksha
                  Vargs in under-performing regions to boost capability.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
