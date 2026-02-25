"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { cn } from "@/lib/utils";
import {
  CheckCircle,
  XCircle,
  Eye,
  Clock,
  Image,
  FileText,
  CalendarCheck,
  Filter,
} from "lucide-react";

interface ModerationItem {
  id: string;
  title: string;
  type: "activity" | "judgment" | "photo";
  submittedBy: string;
  region: string;
  date: string;
  status: "pending" | "approved" | "rejected";
}

const MOCK_QUEUE: ModerationItem[] = [
  { id: "1", title: "Legal Clinic Report — Bhopal", type: "activity", submittedBy: "Adv. Ramesh Gupta", region: "Madhya Bharat", date: "2 hours ago", status: "pending" },
  { id: "2", title: "Cow Protection Judgment PDF", type: "judgment", submittedBy: "Adv. Kavita Mishra", region: "Rajasthan", date: "5 hours ago", status: "pending" },
  { id: "3", title: "Seminar Photos — Delhi", type: "photo", submittedBy: "Delhi Khetra Office", region: "Delhi", date: "1 day ago", status: "pending" },
  { id: "4", title: "Workshop Report — Bengaluru", type: "activity", submittedBy: "Adv. Mohan Das", region: "Dakshin", date: "1 day ago", status: "approved" },
  { id: "5", title: "RTI Response Document", type: "judgment", submittedBy: "Adv. Suresh Patel", region: "Paschim", date: "2 days ago", status: "rejected" },
];

const TYPE_ICONS: Record<string, React.ElementType> = {
  activity: CalendarCheck,
  judgment: FileText,
  photo: Image,
};

const STATUS_CONFIG: Record<string, { color: string; icon: React.ElementType }> = {
  pending: { color: "bg-amber-500/10 text-amber-400", icon: Clock },
  approved: { color: "bg-emerald-500/10 text-emerald-400", icon: CheckCircle },
  rejected: { color: "bg-red-500/10 text-red-400", icon: XCircle },
};

export default function ModerationPage() {
  const [filter, setFilter] = useState<"all" | "pending" | "approved" | "rejected">("all");

  const filtered = MOCK_QUEUE.filter(
    (item) => filter === "all" || item.status === filter
  );

  const pendingCount = MOCK_QUEUE.filter((i) => i.status === "pending").length;

  return (
    <div className="min-h-screen">
      <DashboardHeader title="Content Moderation" titleHi="सामग्री मॉडरेशन" />

      <div className="p-4 lg:p-6">
        {/* Summary bar */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 flex items-center justify-between rounded-xl border border-amber-500/10 bg-amber-500/5 p-4"
        >
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-amber-400" />
            <p className="font-[family-name:var(--font-satoshi)] text-sm text-amber-300">
              <span className="font-bold">{pendingCount}</span> items awaiting review
            </p>
          </div>
        </motion.div>

        {/* Filter pills */}
        <div className="mb-6 flex gap-2">
          {(["all", "pending", "approved", "rejected"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "rounded-full px-4 py-1.5 font-[family-name:var(--font-satoshi)] text-xs font-medium capitalize transition-all",
                filter === f
                  ? "bg-saffron text-white shadow-sm"
                  : "bg-cream/5 text-cream/40 hover:bg-cream/10"
              )}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Queue */}
        <div className="space-y-2">
          {filtered.map((item) => {
            const TypeIcon = TYPE_ICONS[item.type] ?? FileText;
            const statusConf = STATUS_CONFIG[item.status];
            const StatusIcon = statusConf.icon;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-4 rounded-xl border border-gold/10 bg-[#1A0E0A] p-4 transition-all hover:border-gold/15"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-saffron/10">
                  <TypeIcon className="h-5 w-5 text-saffron/60" />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate font-[family-name:var(--font-satoshi)] text-sm font-medium text-cream/80">
                    {item.title}
                  </p>
                  <p className="font-[family-name:var(--font-satoshi)] text-[11px] text-cream/30">
                    {item.submittedBy} &middot; {item.region} &middot; {item.date}
                  </p>
                </div>

                <span
                  className={cn(
                    "hidden items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-medium capitalize sm:inline-flex",
                    statusConf.color
                  )}
                >
                  <StatusIcon className="h-3 w-3" />
                  {item.status}
                </span>

                {item.status === "pending" && (
                  <div className="flex gap-1.5">
                    <button
                      className="rounded-lg bg-emerald-500/10 p-2 text-emerald-400 transition-colors hover:bg-emerald-500/20"
                      aria-label="Approve"
                    >
                      <CheckCircle className="h-4 w-4" />
                    </button>
                    <button
                      className="rounded-lg bg-red-500/10 p-2 text-red-400 transition-colors hover:bg-red-500/20"
                      aria-label="Reject"
                    >
                      <XCircle className="h-4 w-4" />
                    </button>
                  </div>
                )}

                <button
                  className="rounded-lg p-2 text-cream/30 transition-colors hover:bg-cream/5 hover:text-cream"
                  aria-label="View details"
                >
                  <Eye className="h-4 w-4" />
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
