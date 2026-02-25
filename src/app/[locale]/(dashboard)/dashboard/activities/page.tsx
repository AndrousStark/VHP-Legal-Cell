"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  Eye,
  Pencil,
  CalendarCheck,
  MapPin,
  Users,
  Filter,
} from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { ACTIVITY_TYPES } from "@/lib/constants";
import { ACTIVITIES, type ActivityData } from "@/lib/mock-data";
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
  completed: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  upcoming: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  ongoing: "bg-amber-500/10 text-amber-400 border-amber-500/20",
};

function getTypeLabel(typeValue: string): string {
  const found = ACTIVITY_TYPES.find((t) => t.value === typeValue);
  return found ? found.label : typeValue;
}

export default function ActivitiesPage() {
  const [filterType, setFilterType] = useState<string>("all");

  const filtered =
    filterType === "all"
      ? ACTIVITIES
      : ACTIVITIES.filter((a) => a.type === filterType);

  return (
    <div className="min-h-screen">
      <DashboardHeader title="Activities" titleHi="गतिविधियां" />

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
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="rounded-lg border border-gold/10 bg-[#1A0E0A] px-3 py-2 font-[family-name:var(--font-satoshi)] text-xs text-cream/70 outline-none transition-colors focus:border-saffron/30"
            >
              <option value="all">All Types</option>
              {ACTIVITY_TYPES.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>

          {/* Add Button */}
          <Link href="/dashboard/activities/new" className="flex items-center gap-2 rounded-lg bg-saffron px-4 py-2.5 font-[family-name:var(--font-satoshi)] text-sm font-medium text-white transition-colors hover:bg-saffron-bright">
            <Plus className="h-4 w-4" />
            Add New Activity
          </Link>
        </motion.div>

        {/* Activities Table — Desktop */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="hidden overflow-hidden rounded-xl border border-gold/10 bg-[#1A0E0A] md:block"
        >
          {/* Table Header */}
          <div className="grid grid-cols-[1fr_120px_110px_140px_100px_80px_90px] gap-2 border-b border-gold/10 bg-cream/[0.02] px-4 py-3">
            {["Title", "Type", "Date", "Location", "Status", "Attendees", "Actions"].map(
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
          {filtered.map((activity) => (
            <motion.div
              key={activity.id}
              variants={fadeUp}
              className="group grid grid-cols-[1fr_120px_110px_140px_100px_80px_90px] items-center gap-2 border-b border-gold/5 px-4 py-3 transition-colors last:border-0 hover:bg-cream/[0.02]"
            >
              {/* Title */}
              <div className="min-w-0">
                <p className="truncate font-[family-name:var(--font-satoshi)] text-sm text-cream/80 group-hover:text-cream">
                  {activity.title}
                </p>
                <p className="font-[family-name:var(--font-noto-serif)] text-[11px] text-cream/30">
                  {activity.titleHi}
                </p>
              </div>

              {/* Type */}
              <p className="font-[family-name:var(--font-satoshi)] text-xs text-cream/50">
                {getTypeLabel(activity.type)}
              </p>

              {/* Date */}
              <p className="font-[family-name:var(--font-satoshi)] text-xs text-cream/50">
                {new Date(activity.date).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </p>

              {/* Location */}
              <div className="flex items-center gap-1 min-w-0">
                <MapPin className="h-3 w-3 shrink-0 text-cream/30" />
                <p className="truncate font-[family-name:var(--font-satoshi)] text-xs text-cream/50">
                  {activity.location}
                </p>
              </div>

              {/* Status */}
              <span
                className={cn(
                  "inline-flex w-fit items-center rounded-full border px-2 py-0.5 font-[family-name:var(--font-satoshi)] text-[10px] font-medium capitalize",
                  STATUS_COLORS[activity.status] ?? "bg-cream/5 text-cream/50 border-cream/10"
                )}
              >
                {activity.status}
              </span>

              {/* Attendees */}
              <div className="flex items-center gap-1">
                <Users className="h-3 w-3 text-cream/30" />
                <p className="font-[family-name:var(--font-satoshi)] text-xs text-cream/50">
                  {activity.attendees > 0 ? activity.attendees : "—"}
                </p>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-1">
                <button
                  className="flex h-7 w-7 items-center justify-center rounded-lg text-cream/30 transition-colors hover:bg-cream/5 hover:text-cream/70"
                  aria-label="View activity"
                >
                  <Eye className="h-3.5 w-3.5" />
                </button>
                <button
                  className="flex h-7 w-7 items-center justify-center rounded-lg text-cream/30 transition-colors hover:bg-cream/5 hover:text-cream/70"
                  aria-label="Edit activity"
                >
                  <Pencil className="h-3.5 w-3.5" />
                </button>
              </div>
            </motion.div>
          ))}

          {filtered.length === 0 && (
            <div className="flex items-center justify-center py-12">
              <p className="font-[family-name:var(--font-satoshi)] text-sm text-cream/30">
                No activities found for this filter.
              </p>
            </div>
          )}
        </motion.div>

        {/* Activities Cards — Mobile */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="space-y-3 md:hidden"
        >
          {filtered.map((activity) => (
            <motion.div
              key={activity.id}
              variants={fadeUp}
              className="rounded-xl border border-gold/10 bg-[#1A0E0A] p-4"
            >
              <div className="mb-3 flex items-start justify-between">
                <div className="min-w-0 flex-1">
                  <p className="font-[family-name:var(--font-satoshi)] text-sm font-medium text-cream/80">
                    {activity.title}
                  </p>
                  <p className="font-[family-name:var(--font-noto-serif)] text-[11px] text-cream/30">
                    {activity.titleHi}
                  </p>
                </div>
                <span
                  className={cn(
                    "ml-2 shrink-0 rounded-full border px-2 py-0.5 font-[family-name:var(--font-satoshi)] text-[10px] font-medium capitalize",
                    STATUS_COLORS[activity.status] ?? "bg-cream/5 text-cream/50 border-cream/10"
                  )}
                >
                  {activity.status}
                </span>
              </div>

              <div className="mb-3 grid grid-cols-2 gap-2 text-xs">
                <div className="flex items-center gap-1.5 text-cream/40">
                  <CalendarCheck className="h-3 w-3" />
                  <span className="font-[family-name:var(--font-satoshi)]">
                    {new Date(activity.date).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-cream/40">
                  <MapPin className="h-3 w-3" />
                  <span className="truncate font-[family-name:var(--font-satoshi)]">
                    {activity.location.split(",")[0]}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-cream/40">
                  <Users className="h-3 w-3" />
                  <span className="font-[family-name:var(--font-satoshi)]">
                    {activity.attendees > 0 ? `${activity.attendees} attendees` : "TBD"}
                  </span>
                </div>
                <div className="text-cream/40">
                  <span className="font-[family-name:var(--font-satoshi)]">
                    {getTypeLabel(activity.type)}
                  </span>
                </div>
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
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
