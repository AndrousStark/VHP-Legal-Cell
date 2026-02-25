"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { cn } from "@/lib/utils";
import {
  Search,
  ScrollText,
  User,
  Clock,
  FileText,
  Edit3,
  Trash2,
  Plus,
  LogIn,
  Eye,
} from "lucide-react";

interface AuditEntry {
  id: string;
  userId: string;
  userName: string;
  action: "create" | "update" | "delete" | "login" | "view";
  collection: string;
  documentTitle: string;
  timestamp: string;
  ipAddress: string;
}

const MOCK_AUDIT: AuditEntry[] = [
  { id: "1", userId: "usr_1", userName: "Dr. Abhishek Atrey", action: "update", collection: "cases", documentTitle: "Gyanvapi Survey Case", timestamp: "2026-02-25 14:30", ipAddress: "103.xx.xx.xx" },
  { id: "2", userId: "usr_2", userName: "Adv. Vikram Singh", action: "create", collection: "activities", documentTitle: "Legal Clinic — Lucknow", timestamp: "2026-02-25 12:15", ipAddress: "122.xx.xx.xx" },
  { id: "3", userId: "usr_1", userName: "Dr. Abhishek Atrey", action: "login", collection: "auth", documentTitle: "Session created", timestamp: "2026-02-25 10:00", ipAddress: "103.xx.xx.xx" },
  { id: "4", userId: "usr_3", userName: "Adv. Kavita Mishra", action: "create", collection: "judgments", documentTitle: "Cow Protection Judgment", timestamp: "2026-02-24 16:45", ipAddress: "106.xx.xx.xx" },
  { id: "5", userId: "usr_2", userName: "Adv. Vikram Singh", action: "update", collection: "team", documentTitle: "Updated member contact", timestamp: "2026-02-24 11:30", ipAddress: "122.xx.xx.xx" },
  { id: "6", userId: "usr_1", userName: "Dr. Abhishek Atrey", action: "delete", collection: "activities", documentTitle: "Cancelled Workshop", timestamp: "2026-02-23 09:00", ipAddress: "103.xx.xx.xx" },
  { id: "7", userId: "usr_3", userName: "Adv. Kavita Mishra", action: "view", collection: "cases", documentTitle: "Anti-Conversion Law Challenge", timestamp: "2026-02-22 15:20", ipAddress: "106.xx.xx.xx" },
];

const ACTION_CONFIG: Record<string, { icon: React.ElementType; color: string; label: string }> = {
  create: { icon: Plus, color: "text-emerald-400 bg-emerald-500/10", label: "Created" },
  update: { icon: Edit3, color: "text-blue-400 bg-blue-500/10", label: "Updated" },
  delete: { icon: Trash2, color: "text-red-400 bg-red-500/10", label: "Deleted" },
  login: { icon: LogIn, color: "text-saffron bg-saffron/10", label: "Logged in" },
  view: { icon: Eye, color: "text-cream/50 bg-cream/5", label: "Viewed" },
};

export default function AuditPage() {
  const [search, setSearch] = useState("");

  const filtered = MOCK_AUDIT.filter(
    (entry) =>
      search === "" ||
      entry.userName.toLowerCase().includes(search.toLowerCase()) ||
      entry.documentTitle.toLowerCase().includes(search.toLowerCase()) ||
      entry.collection.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen">
      <DashboardHeader title="Audit Log" titleHi="ऑडिट लॉग" />

      <div className="p-4 lg:p-6">
        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-cream/30" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by user, document, collection..."
              className="w-full rounded-lg border border-gold/10 bg-[#1A0E0A] py-2.5 pl-10 pr-4 font-[family-name:var(--font-satoshi)] text-sm text-cream placeholder:text-cream/30 focus:border-saffron/30 focus:outline-none focus:ring-1 focus:ring-saffron/20"
            />
          </div>
        </motion.div>

        {/* Timeline */}
        <div className="relative space-y-3">
          {/* Vertical line */}
          <div className="absolute left-5 top-0 h-full w-px bg-gold/10" />

          {filtered.map((entry) => {
            const actionConf = ACTION_CONFIG[entry.action];
            const ActionIcon = actionConf.icon;

            return (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                className="relative flex gap-4 pl-12"
              >
                {/* Timeline dot */}
                <div
                  className={cn(
                    "absolute left-2.5 top-3 flex h-5 w-5 items-center justify-center rounded-full",
                    actionConf.color
                  )}
                >
                  <ActionIcon className="h-3 w-3" />
                </div>

                {/* Content */}
                <div className="flex-1 rounded-xl border border-gold/10 bg-[#1A0E0A] p-4 transition-all hover:border-gold/15">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-[family-name:var(--font-satoshi)] text-sm text-cream/80">
                        <span className="font-medium">{entry.userName}</span>{" "}
                        <span className="text-cream/40">{actionConf.label.toLowerCase()}</span>{" "}
                        <span className="font-medium text-saffron/70">
                          {entry.documentTitle}
                        </span>
                      </p>
                      <div className="mt-1 flex items-center gap-3 font-[family-name:var(--font-satoshi)] text-[11px] text-cream/30">
                        <span className="flex items-center gap-1">
                          <FileText className="h-3 w-3" />
                          {entry.collection}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {entry.timestamp}
                        </span>
                        <span className="hidden sm:inline">{entry.ipAddress}</span>
                      </div>
                    </div>

                    <span
                      className={cn(
                        "shrink-0 rounded-full px-2 py-0.5 text-[9px] font-medium capitalize",
                        actionConf.color
                      )}
                    >
                      {entry.action}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
