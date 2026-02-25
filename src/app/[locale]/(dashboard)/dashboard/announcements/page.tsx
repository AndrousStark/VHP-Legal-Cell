"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  Bell,
  Circle,
  CheckCircle2,
  Clock,
  ChevronRight,
  Megaphone,
} from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { useAuth } from "@/lib/auth-context";
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

interface Announcement {
  id: number;
  title: string;
  titleHi: string;
  body: string;
  date: string;
  author: string;
  priority: "high" | "normal" | "low";
  read: boolean;
}

const MOCK_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 1,
    title: "Quarterly Report Submission Deadline — March 15",
    titleHi: "त्रैमासिक रिपोर्ट जमा करने की अंतिम तिथि — 15 मार्च",
    body: "All Khetra and Prant Convenors are required to submit their quarterly activity and case reports by March 15, 2026. Reports should include case updates, activity summaries, and financial statements. Please use the standard template available in the Resources section.",
    date: "2026-02-24",
    author: "National Office",
    priority: "high",
    read: false,
  },
  {
    id: 2,
    title: "National Convention Dates Announced — April 5-7, 2026",
    titleHi: "राष्ट्रीय सम्मेलन की तिथियां घोषित — 5-7 अप्रैल 2026",
    body: "The annual VHP Legal Cell National Convention will be held at India International Centre, New Delhi from April 5-7, 2026. All National and Khetra level members must attend. Registration is now open through the dashboard.",
    date: "2026-02-20",
    author: "Dr. Abhishek Atrey",
    priority: "normal",
    read: false,
  },
  {
    id: 3,
    title: "New Legal Aid Guidelines Released",
    titleHi: "नई कानूनी सहायता दिशानिर्देश जारी",
    body: "Updated guidelines for providing free legal aid at VHP Legal Clinics have been released. Key changes include expanded eligibility criteria, standardized documentation procedures, and a new case tracking format. Please review and implement by March 1.",
    date: "2026-02-18",
    author: "National Office",
    priority: "normal",
    read: true,
  },
  {
    id: 4,
    title: "System Maintenance — Feb 28, 2026",
    titleHi: "सिस्टम रखरखाव — 28 फरवरी 2026",
    body: "The dashboard will undergo scheduled maintenance on February 28 from 2:00 AM to 6:00 AM IST. During this time, case tracking and activity reporting features may be temporarily unavailable. Please plan your submissions accordingly.",
    date: "2026-02-15",
    author: "Technical Team",
    priority: "low",
    read: true,
  },
];

const PRIORITY_STYLES: Record<string, string> = {
  high: "border-l-saffron-bright",
  normal: "border-l-blue-400",
  low: "border-l-cream/20",
};

export default function AnnouncementsPage() {
  const { user } = useAuth();
  const [announcements, setAnnouncements] = useState(MOCK_ANNOUNCEMENTS);

  const unreadCount = announcements.filter((a) => !a.read).length;

  const toggleRead = (id: number) => {
    setAnnouncements((prev) =>
      prev.map((a) => (a.id === id ? { ...a, read: !a.read } : a))
    );
  };

  return (
    <div className="min-h-screen">
      <DashboardHeader title="Announcements" titleHi="घोषणाएं" />

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
          {/* Unread count */}
          <div className="flex items-center gap-2">
            <Bell className="h-4 w-4 text-cream/40" />
            <p className="font-[family-name:var(--font-satoshi)] text-sm text-cream/50">
              {unreadCount > 0 ? (
                <>
                  <span className="font-medium text-saffron">{unreadCount}</span>{" "}
                  unread announcement{unreadCount !== 1 ? "s" : ""}
                </>
              ) : (
                "All caught up"
              )}
            </p>
          </div>

          {/* New Announcement Button */}
          <button className="flex items-center gap-2 rounded-lg bg-saffron px-4 py-2.5 font-[family-name:var(--font-satoshi)] text-sm font-medium text-white transition-colors hover:bg-saffron-bright">
            <Plus className="h-4 w-4" />
            New Announcement
          </button>
        </motion.div>

        {/* Announcements List */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="space-y-3"
        >
          {announcements.map((announcement) => (
            <motion.div
              key={announcement.id}
              variants={fadeUp}
              className={cn(
                "group rounded-xl border border-gold/10 border-l-[3px] bg-[#1A0E0A] p-5 transition-all hover:border-gold/20 hover:shadow-lg hover:shadow-saffron/5",
                PRIORITY_STYLES[announcement.priority],
                !announcement.read && "bg-[#1A0E0A]/80"
              )}
            >
              <div className="flex items-start gap-3">
                {/* Read indicator */}
                <button
                  onClick={() => toggleRead(announcement.id)}
                  className="mt-0.5 shrink-0"
                  aria-label={announcement.read ? "Mark as unread" : "Mark as read"}
                >
                  {announcement.read ? (
                    <CheckCircle2 className="h-4 w-4 text-cream/20 transition-colors hover:text-cream/40" />
                  ) : (
                    <Circle className="h-4 w-4 fill-saffron text-saffron transition-colors hover:fill-saffron-bright hover:text-saffron-bright" />
                  )}
                </button>

                {/* Content */}
                <div className="min-w-0 flex-1">
                  {/* Title */}
                  <h3
                    className={cn(
                      "mb-1 font-[family-name:var(--font-satoshi)] text-sm text-cream/90",
                      !announcement.read && "font-medium text-cream"
                    )}
                  >
                    {announcement.title}
                  </h3>
                  <p className="mb-2 font-[family-name:var(--font-noto-serif)] text-[11px] text-cream/30">
                    {announcement.titleHi}
                  </p>

                  {/* Body */}
                  <p className="mb-3 font-[family-name:var(--font-satoshi)] text-xs leading-relaxed text-cream/40">
                    {announcement.body}
                  </p>

                  {/* Meta */}
                  <div className="flex flex-wrap items-center gap-3 text-cream/30">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span className="font-[family-name:var(--font-satoshi)] text-[11px]">
                        {new Date(announcement.date).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Megaphone className="h-3 w-3" />
                      <span className="font-[family-name:var(--font-satoshi)] text-[11px]">
                        {announcement.author}
                      </span>
                    </div>
                    {announcement.priority === "high" && (
                      <span className="rounded-full bg-saffron/10 border border-saffron/20 px-2 py-0.5 font-[family-name:var(--font-satoshi)] text-[9px] font-medium text-saffron">
                        High Priority
                      </span>
                    )}
                  </div>
                </div>

                {/* Chevron */}
                <ChevronRight className="mt-1 h-4 w-4 shrink-0 text-cream/10 transition-colors group-hover:text-cream/30" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {announcements.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-16"
          >
            <Bell className="mb-3 h-10 w-10 text-cream/15" />
            <p className="font-[family-name:var(--font-satoshi)] text-sm text-cream/30">
              No announcements yet.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
