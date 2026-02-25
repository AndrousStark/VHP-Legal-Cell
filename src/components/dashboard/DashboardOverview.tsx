"use client";

import { motion } from "framer-motion";
import { useAuth } from "@/lib/auth-context";
import { ROLE_LABELS, type RoleName } from "@/lib/constants";
import { Link } from "@/i18n/routing";
import { DashboardHeader } from "./DashboardHeader";
import {
  CalendarCheck,
  Scale,
  CheckCircle,
  Bell,
  TrendingUp,
  Users,
  FileText,
  Clock,
  ArrowUpRight,
  Briefcase,
} from "lucide-react";

interface StatCardData {
  label: string;
  value: string;
  change?: string;
  trend?: "up" | "down" | "neutral";
  icon: React.ElementType;
  color: string;
}

const STAT_CARDS: StatCardData[] = [
  { label: "Activities This Month", value: "12", change: "+3", trend: "up", icon: CalendarCheck, color: "text-saffron-bright" },
  { label: "Cases Updated", value: "8", change: "+2", trend: "up", icon: Scale, color: "text-gold-bright" },
  { label: "Pending Tasks", value: "5", icon: Clock, color: "text-amber-400" },
  { label: "New Announcements", value: "3", icon: Bell, color: "text-blue-400" },
];

interface RecentItem {
  id: number;
  title: string;
  type: "activity" | "case" | "judgment";
  date: string;
  status: string;
}

const RECENT_ITEMS: RecentItem[] = [
  { id: 1, title: "National Seminar at Vigyan Bhawan", type: "activity", date: "2 days ago", status: "Completed" },
  { id: 2, title: "Gyanvapi Survey Case — Hearing Update", type: "case", date: "3 days ago", status: "Updated" },
  { id: 3, title: "Free Legal Clinic — Varanasi", type: "activity", date: "5 days ago", status: "Completed" },
  { id: 4, title: "Cow Protection PIL — Rajasthan", type: "case", date: "1 week ago", status: "Won" },
  { id: 5, title: "Anti-Conversion Law Challenge", type: "case", date: "1 week ago", status: "Ongoing" },
];

const TYPE_ICONS: Record<string, React.ElementType> = {
  activity: CalendarCheck,
  case: Briefcase,
  judgment: FileText,
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

export function DashboardOverview() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen">
      <DashboardHeader title="Dashboard" titleHi="डैशबोर्ड" />

      <div className="p-4 lg:p-6">
        {/* Welcome Banner */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 overflow-hidden rounded-2xl border border-gold/15 bg-gradient-to-br from-maroon-dark to-maroon p-6"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="font-[family-name:var(--font-satoshi)] text-sm text-cream/50">
                Welcome back,
              </p>
              <h2 className="mt-1 font-[family-name:var(--font-playfair)] text-2xl font-bold text-cream">
                {user?.name ?? "Convenor"}
              </h2>
              <p className="mt-1 font-[family-name:var(--font-satoshi)] text-xs text-saffron/70">
                {user ? ROLE_LABELS[user.role as RoleName]?.en : ""}{" "}
                {user?.khetraId ? `— ${user.khetraId.replace("-", " ")}` : ""}
              </p>
            </div>
            <div className="hidden rounded-xl border border-gold/10 bg-cream/5 px-4 py-2 sm:block">
              <p className="font-[family-name:var(--font-satoshi)] text-[10px] text-cream/40">
                Today
              </p>
              <p className="font-[family-name:var(--font-satoshi)] text-sm font-medium text-cream/80">
                {new Date().toLocaleDateString("en-IN", {
                  weekday: "short",
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Stat Cards */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {STAT_CARDS.map((card) => (
            <motion.div
              key={card.label}
              variants={fadeUp}
              className="group rounded-xl border border-gold/10 bg-[#1A0E0A] p-4 transition-all hover:border-gold/20 hover:shadow-lg hover:shadow-saffron/5"
            >
              <div className="flex items-start justify-between">
                <card.icon className={`h-5 w-5 ${card.color}`} />
                {card.change && (
                  <span className="flex items-center gap-0.5 rounded-full bg-emerald-500/10 px-2 py-0.5 font-[family-name:var(--font-satoshi)] text-[10px] font-medium text-emerald-400">
                    <TrendingUp className="h-2.5 w-2.5" />
                    {card.change}
                  </span>
                )}
              </div>
              <p className="mt-3 font-[family-name:var(--font-playfair)] text-3xl font-bold text-cream">
                {card.value}
              </p>
              <p className="mt-1 font-[family-name:var(--font-satoshi)] text-xs text-cream/40">
                {card.label}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Content Grid */}
        <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="rounded-xl border border-gold/10 bg-[#1A0E0A] p-5"
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-[family-name:var(--font-playfair)] text-base font-bold text-cream">
                Recent Activity
              </h3>
              <Link href="/dashboard/activities" className="font-[family-name:var(--font-satoshi)] text-xs text-saffron hover:text-saffron-bright">
                View all
              </Link>
            </div>

            <div className="space-y-2">
              {RECENT_ITEMS.map((item) => {
                const TypeIcon = TYPE_ICONS[item.type] ?? FileText;
                return (
                  <div
                    key={item.id}
                    className="group flex items-center gap-3 rounded-lg border border-gold/5 p-3 transition-all hover:border-gold/15 hover:bg-cream/[0.02]"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-saffron/10">
                      <TypeIcon className="h-4 w-4 text-saffron/70" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-[family-name:var(--font-satoshi)] text-sm text-cream/80 group-hover:text-cream">
                        {item.title}
                      </p>
                      <p className="font-[family-name:var(--font-satoshi)] text-[11px] text-cream/30">
                        {item.date}
                      </p>
                    </div>
                    <span className="shrink-0 rounded-full bg-cream/5 px-2 py-0.5 font-[family-name:var(--font-satoshi)] text-[10px] font-medium text-cream/50">
                      {item.status}
                    </span>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Quick Actions + Announcements */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="rounded-xl border border-gold/10 bg-[#1A0E0A] p-5"
            >
              <h3 className="mb-4 font-[family-name:var(--font-playfair)] text-base font-bold text-cream">
                Quick Actions
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: "Add Activity", icon: CalendarCheck, href: "/dashboard/activities/new" as const },
                  { label: "New Case", icon: Scale, href: "/dashboard/cases/new" as const },
                  { label: "Upload Judgment", icon: FileText, href: "/dashboard/judgments/upload" as const },
                  { label: "Team", icon: Users, href: "/dashboard/team" as const },
                ].map((action) => (
                  <Link
                    key={action.label}
                    href={action.href}
                    className="group flex flex-col items-center gap-2 rounded-lg border border-gold/5 bg-cream/[0.02] p-3 transition-all hover:border-saffron/20 hover:bg-saffron/5"
                  >
                    <action.icon className="h-5 w-5 text-cream/40 group-hover:text-saffron" />
                    <span className="font-[family-name:var(--font-satoshi)] text-[11px] text-cream/50 group-hover:text-cream/70">
                      {action.label}
                    </span>
                  </Link>
                ))}
              </div>
            </motion.div>

            {/* Announcements */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="rounded-xl border border-gold/10 bg-[#1A0E0A] p-5"
            >
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-[family-name:var(--font-playfair)] text-base font-bold text-cream">
                  Announcements
                </h3>
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-saffron text-[10px] font-bold text-white">
                  3
                </span>
              </div>
              <div className="space-y-3">
                {[
                  {
                    title: "Quarterly report submission deadline",
                    date: "Mar 15, 2026",
                    urgent: true,
                  },
                  {
                    title: "National convention dates announced",
                    date: "Apr 5-7, 2026",
                    urgent: false,
                  },
                  {
                    title: "New legal aid guidelines released",
                    date: "Feb 28, 2026",
                    urgent: false,
                  },
                ].map((announcement, i) => (
                  <div
                    key={i}
                    className="rounded-lg border border-gold/5 p-3"
                  >
                    <div className="flex items-start gap-2">
                      {announcement.urgent && (
                        <span className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-saffron-bright" />
                      )}
                      <div>
                        <p className="font-[family-name:var(--font-satoshi)] text-xs text-cream/70">
                          {announcement.title}
                        </p>
                        <p className="mt-0.5 font-[family-name:var(--font-satoshi)] text-[10px] text-cream/30">
                          {announcement.date}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
