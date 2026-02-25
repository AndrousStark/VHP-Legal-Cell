"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@/i18n/routing";
import {
  KHETRAS,
  MOCK_REGION_STATS,
  type KhetraConfig,
} from "@/lib/map-config";
import { TEAM_MEMBERS, CASES } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import {
  Scale,
  Users,
  MapPin,
  Activity,
  ChevronRight,
  X,
  BarChart3,
  UserCheck,
  Briefcase,
  TrendingUp,
} from "lucide-react";

type SidebarTab = "overview" | "team" | "cases" | "stats";

interface MapSidebarProps {
  selectedKhetra: string | null;
  onKhetraSelect: (khetraId: string | null) => void;
  className?: string;
}

function TabButton({
  active,
  label,
  icon: Icon,
  onClick,
}: {
  active: boolean;
  label: string;
  icon: React.ElementType;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-[family-name:var(--font-satoshi)] text-xs font-medium transition-all",
        active
          ? "bg-saffron text-white shadow-sm"
          : "text-charcoal-light hover:bg-gold/10"
      )}
    >
      <Icon className="h-3.5 w-3.5" />
      {label}
    </button>
  );
}

export function MapSidebar({
  selectedKhetra,
  onKhetraSelect,
  className,
}: MapSidebarProps) {
  const [activeTab, setActiveTab] = useState<SidebarTab>("overview");

  const khetra = selectedKhetra
    ? KHETRAS.find((k) => k.id === selectedKhetra)
    : null;

  const stats = selectedKhetra
    ? MOCK_REGION_STATS[selectedKhetra]
    : null;

  const khetraMembers = selectedKhetra
    ? TEAM_MEMBERS.filter((m) => m.khetraId === selectedKhetra)
    : [];

  const khetraCases = selectedKhetra
    ? CASES.filter((c) => c.khetraId === selectedKhetra)
    : [];

  const tabs: { value: SidebarTab; label: string; icon: React.ElementType }[] =
    [
      { value: "overview", label: "Overview", icon: BarChart3 },
      { value: "team", label: "Team", icon: UserCheck },
      { value: "cases", label: "Cases", icon: Briefcase },
      { value: "stats", label: "Stats", icon: TrendingUp },
    ];

  return (
    <div
      className={cn(
        "flex flex-col rounded-2xl border border-gold/15 bg-cream-light shadow-sm",
        className
      )}
    >
      {/* Header */}
      <div className="border-b border-gold/10 p-4">
        <AnimatePresence mode="wait">
          {khetra ? (
            <motion.div
              key={khetra.id}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="flex items-start justify-between"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: khetra.color }}
                  />
                  <h3 className="font-[family-name:var(--font-playfair)] text-lg font-bold text-maroon-dark">
                    {khetra.nameEn}
                  </h3>
                </div>
                <p className="mt-0.5 font-[family-name:var(--font-noto-serif)] text-sm text-charcoal-light">
                  {khetra.nameHi}
                </p>
                <p className="mt-1 font-[family-name:var(--font-satoshi)] text-xs text-charcoal-light/70">
                  {khetra.states.join(", ")}
                </p>
              </div>
              <button
                onClick={() => onKhetraSelect(null)}
                aria-label="Clear khetra selection"
                className="rounded-lg p-1.5 text-charcoal-light/40 transition-colors hover:bg-gold/10 hover:text-charcoal"
              >
                <X className="h-4 w-4" />
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="all"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
            >
              <h3 className="font-[family-name:var(--font-playfair)] text-lg font-bold text-maroon-dark">
                All India Overview
              </h3>
              <p className="mt-0.5 font-[family-name:var(--font-satoshi)] text-xs text-charcoal-light">
                Click a state on the map to explore its Khetra
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-gold/10 p-2">
        {tabs.map((tab) => (
          <TabButton
            key={tab.value}
            active={activeTab === tab.value}
            label={tab.label}
            icon={tab.icon}
            onClick={() => setActiveTab(tab.value)}
          />
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        <AnimatePresence mode="wait">
          {activeTab === "overview" && (
            <motion.div
              key="overview"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-3"
            >
              {selectedKhetra && stats ? (
                <>
                  <div className="grid grid-cols-2 gap-3">
                    <StatMini
                      icon={Scale}
                      value={stats.cases}
                      label="Active Cases"
                    />
                    <StatMini
                      icon={Users}
                      value={stats.members}
                      label="Members"
                    />
                    <StatMini
                      icon={Activity}
                      value={stats.activities}
                      label="Activities"
                    />
                    <StatMini
                      icon={TrendingUp}
                      value={stats.resolutionRate}
                      label="Resolution %"
                      suffix="%"
                    />
                  </div>
                </>
              ) : (
                <KhetraList onSelect={onKhetraSelect} />
              )}
            </motion.div>
          )}

          {activeTab === "team" && (
            <motion.div
              key="team"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-2"
            >
              {khetraMembers.length > 0 ? (
                khetraMembers.map((member) => (
                  <Link
                    key={member.id}
                    href={`/pillars/${member.slug}`}
                    className="group flex items-center gap-3 rounded-xl border border-gold/5 p-3 transition-all hover:border-gold/15 hover:shadow-sm"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-gold/20 bg-cream">
                      <span className="font-[family-name:var(--font-playfair)] text-xs font-bold text-maroon/50">
                        {member.name
                          .split(" ")
                          .map((w) => w[0])
                          .join("")
                          .slice(0, 2)}
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-[family-name:var(--font-playfair)] text-sm font-semibold text-maroon-dark group-hover:text-saffron">
                        {member.name}
                      </p>
                      <p className="truncate font-[family-name:var(--font-satoshi)] text-xs text-charcoal-light">
                        {member.designation}
                      </p>
                    </div>
                    <ChevronRight className="h-4 w-4 shrink-0 text-charcoal-light/30 transition-colors group-hover:text-saffron" />
                  </Link>
                ))
              ) : (
                <EmptyState text="No team members found for this region" />
              )}
            </motion.div>
          )}

          {activeTab === "cases" && (
            <motion.div
              key="cases"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-2"
            >
              {khetraCases.length > 0 ? (
                khetraCases.map((c) => (
                  <Link
                    key={c.id}
                    href={`/cases/${c.slug}`}
                    className="group block rounded-xl border border-gold/5 p-3 transition-all hover:border-gold/15 hover:shadow-sm"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-[family-name:var(--font-playfair)] text-sm font-semibold text-maroon-dark group-hover:text-saffron">
                        {c.title}
                      </p>
                      <span
                        className={cn(
                          "shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase",
                          c.status === "won" &&
                            "bg-emerald-100 text-emerald-700",
                          c.status === "ongoing" &&
                            "bg-amber-100 text-amber-700",
                          c.status === "filed" && "bg-blue-100 text-blue-700",
                          c.status === "lost" && "bg-red-100 text-red-700"
                        )}
                      >
                        {c.status}
                      </span>
                    </div>
                    <p className="mt-1 font-[family-name:var(--font-satoshi)] text-xs text-charcoal-light">
                      {c.court}
                    </p>
                    <p className="mt-0.5 font-[family-name:var(--font-satoshi)] text-[11px] text-charcoal-light/60">
                      {c.caseNumber}
                    </p>
                  </Link>
                ))
              ) : (
                <EmptyState text="No cases found for this region" />
              )}
            </motion.div>
          )}

          {activeTab === "stats" && (
            <motion.div
              key="stats"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              {selectedKhetra && stats ? (
                <>
                  <div className="rounded-xl border border-gold/10 bg-cream p-4">
                    <p className="font-[family-name:var(--font-satoshi)] text-xs font-semibold uppercase tracking-wider text-charcoal-light/60">
                      Resolution Rate
                    </p>
                    <div className="mt-2 flex items-end gap-2">
                      <span className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-saffron">
                        {stats.resolutionRate}%
                      </span>
                    </div>
                    <div className="mt-2 h-2 overflow-hidden rounded-full bg-gold/10">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-saffron to-gold-bright"
                        initial={{ width: 0 }}
                        animate={{ width: `${stats.resolutionRate}%` }}
                        transition={{ duration: 1, delay: 0.2 }}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <StatBar
                      label="Cases"
                      value={stats.cases}
                      max={100}
                      color="bg-saffron"
                    />
                    <StatBar
                      label="Members"
                      value={stats.members}
                      max={150}
                      color="bg-maroon"
                    />
                    <StatBar
                      label="Activities"
                      value={stats.activities}
                      max={15}
                      color="bg-gold-bright"
                    />
                  </div>
                </>
              ) : (
                <EmptyState text="Select a Khetra to view detailed stats" />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ─── Sub‑components ─── */

function StatMini({
  icon: Icon,
  value,
  label,
  suffix = "",
}: {
  icon: React.ElementType;
  value: number;
  label: string;
  suffix?: string;
}) {
  return (
    <div className="rounded-xl border border-gold/10 bg-cream p-3">
      <Icon className="mb-1 h-4 w-4 text-saffron" />
      <p className="font-[family-name:var(--font-playfair)] text-xl font-bold text-maroon-dark">
        {value}
        {suffix}
      </p>
      <p className="font-[family-name:var(--font-satoshi)] text-[11px] text-charcoal-light">
        {label}
      </p>
    </div>
  );
}

function StatBar({
  label,
  value,
  max,
  color,
}: {
  label: string;
  value: number;
  max: number;
  color: string;
}) {
  const pct = Math.min((value / max) * 100, 100);
  return (
    <div>
      <div className="flex justify-between font-[family-name:var(--font-satoshi)] text-xs">
        <span className="text-charcoal-light">{label}</span>
        <span className="font-semibold text-maroon-dark">{value}</span>
      </div>
      <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-gold/10">
        <motion.div
          className={cn("h-full rounded-full", color)}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.8, delay: 0.1 }}
        />
      </div>
    </div>
  );
}

function KhetraList({
  onSelect,
}: {
  onSelect: (khetraId: string) => void;
}) {
  return (
    <div className="space-y-1.5">
      <p className="mb-2 font-[family-name:var(--font-satoshi)] text-xs font-semibold uppercase tracking-wider text-charcoal-light/60">
        12 Khetras
      </p>
      {KHETRAS.map((k) => {
        const s = MOCK_REGION_STATS[k.id];
        return (
          <button
            key={k.id}
            onClick={() => onSelect(k.id)}
            className="group flex w-full items-center gap-3 rounded-xl border border-gold/5 p-3 text-left transition-all hover:border-gold/15 hover:shadow-sm"
          >
            <span
              className="h-3 w-3 shrink-0 rounded-full"
              style={{ backgroundColor: k.color }}
            />
            <div className="min-w-0 flex-1">
              <p className="truncate font-[family-name:var(--font-satoshi)] text-sm font-medium text-maroon-dark group-hover:text-saffron">
                {k.nameEn}
              </p>
              <p className="font-[family-name:var(--font-satoshi)] text-[11px] text-charcoal-light">
                {s?.cases ?? 0} cases &middot; {s?.members ?? 0} members
              </p>
            </div>
            <ChevronRight className="h-4 w-4 shrink-0 text-charcoal-light/30 transition-colors group-hover:text-saffron" />
          </button>
        );
      })}
    </div>
  );
}

function EmptyState({ text }: { text: string }) {
  return (
    <div className="py-8 text-center">
      <MapPin className="mx-auto h-8 w-8 text-charcoal-light/20" />
      <p className="mt-2 font-[family-name:var(--font-satoshi)] text-sm text-charcoal-light">
        {text}
      </p>
    </div>
  );
}
