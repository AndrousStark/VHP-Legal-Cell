"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Filter,
  Briefcase,
  Clock,
  ChevronRight,
} from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { useAuth } from "@/lib/auth-context";
import { TEAM_MEMBERS, type TeamMember } from "@/lib/mock-data";
import { cn, getInitials } from "@/lib/utils";
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

const LEVEL_COLORS: Record<string, string> = {
  national: "bg-saffron/10 text-saffron border-saffron/20",
  chetra: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  prant: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  court: "bg-purple-500/10 text-purple-400 border-purple-500/20",
};

const LEVEL_LABELS: Record<string, string> = {
  national: "National",
  chetra: "Chetra",
  prant: "Prant",
  court: "Court",
};

const AVATAR_GRADIENTS = [
  "from-saffron/30 to-maroon/30",
  "from-blue-500/30 to-indigo-500/30",
  "from-emerald-500/30 to-teal-500/30",
  "from-purple-500/30 to-pink-500/30",
  "from-amber-500/30 to-orange-500/30",
  "from-rose-500/30 to-red-500/30",
  "from-cyan-500/30 to-blue-500/30",
  "from-violet-500/30 to-purple-500/30",
];

export default function TeamPage() {
  const { user } = useAuth();
  const [filterLevel, setFilterLevel] = useState<string>("all");

  const filtered =
    filterLevel === "all"
      ? TEAM_MEMBERS
      : TEAM_MEMBERS.filter((m) => m.level === filterLevel);

  return (
    <div className="min-h-screen">
      <DashboardHeader title="Team Management" titleHi="टीम प्रबंधन" />

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
              value={filterLevel}
              onChange={(e) => setFilterLevel(e.target.value)}
              className="rounded-lg border border-gold/10 bg-[#1A0E0A] px-3 py-2 font-[family-name:var(--font-satoshi)] text-xs text-cream/70 outline-none transition-colors focus:border-saffron/30"
            >
              <option value="all">All Levels</option>
              <option value="national">National</option>
              <option value="chetra">Chetra</option>
              <option value="prant">Prant</option>
              <option value="court">Court</option>
            </select>
          </div>

          {/* Count */}
          <p className="font-[family-name:var(--font-satoshi)] text-sm text-cream/40">
            {filtered.length} member{filtered.length !== 1 ? "s" : ""}
          </p>
        </motion.div>

        {/* Team Grid */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {filtered.map((member, index) => (
            <motion.div
              key={member.id}
              variants={fadeUp}
              className="group relative overflow-hidden rounded-xl border border-gold/10 bg-[#1A0E0A] p-5 transition-all hover:border-gold/20 hover:shadow-lg hover:shadow-saffron/5"
            >
              {/* Avatar + Name */}
              <div className="mb-4 flex items-center gap-3">
                <div
                  className={cn(
                    "flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br",
                    AVATAR_GRADIENTS[index % AVATAR_GRADIENTS.length]
                  )}
                >
                  <span className="font-[family-name:var(--font-playfair)] text-sm font-bold text-cream">
                    {getInitials(member.name)}
                  </span>
                </div>
                <div className="min-w-0">
                  <p className="truncate font-[family-name:var(--font-satoshi)] text-sm font-medium text-cream/90 group-hover:text-cream">
                    {member.name}
                  </p>
                  <p className="truncate font-[family-name:var(--font-noto-serif)] text-[11px] text-cream/30">
                    {member.nameHi}
                  </p>
                </div>
              </div>

              {/* Designation */}
              <p className="mb-3 font-[family-name:var(--font-satoshi)] text-xs text-cream/50">
                {member.designation}
              </p>

              {/* Level Badge */}
              <div className="mb-4">
                <span
                  className={cn(
                    "inline-flex items-center rounded-full border px-2.5 py-0.5 font-[family-name:var(--font-satoshi)] text-[10px] font-medium capitalize",
                    LEVEL_COLORS[member.level] ?? "bg-cream/5 text-cream/50 border-cream/10"
                  )}
                >
                  {LEVEL_LABELS[member.level] ?? member.level}
                </span>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-4 border-t border-gold/5 pt-3">
                <div className="flex items-center gap-1.5">
                  <Briefcase className="h-3 w-3 text-cream/30" />
                  <span className="font-[family-name:var(--font-satoshi)] text-xs text-cream/50">
                    {member.cases} cases
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="h-3 w-3 text-cream/30" />
                  <span className="font-[family-name:var(--font-satoshi)] text-xs text-cream/50">
                    {member.experience}
                  </span>
                </div>
              </div>

              {/* Expertise Tags */}
              <div className="mt-3 flex flex-wrap gap-1">
                {member.expertise.slice(0, 3).map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full bg-cream/5 px-2 py-0.5 font-[family-name:var(--font-satoshi)] text-[9px] text-cream/30"
                  >
                    {skill}
                  </span>
                ))}
                {member.expertise.length > 3 && (
                  <span className="rounded-full bg-cream/5 px-2 py-0.5 font-[family-name:var(--font-satoshi)] text-[9px] text-cream/30">
                    +{member.expertise.length - 3}
                  </span>
                )}
              </div>

              {/* Hover arrow */}
              <div className="absolute right-3 top-3 opacity-0 transition-opacity group-hover:opacity-100">
                <ChevronRight className="h-4 w-4 text-cream/30" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-center py-16"
          >
            <p className="font-[family-name:var(--font-satoshi)] text-sm text-cream/30">
              No team members found for this level.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
