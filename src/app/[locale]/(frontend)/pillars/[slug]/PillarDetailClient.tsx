"use client";

import { motion } from "framer-motion";
import { Link } from "@/i18n/routing";
import { TEAM_MEMBERS } from "@/lib/mock-data";
import { getEnhancedProfile } from "@/lib/team-profiles";
import { EnhancedProfileView } from "@/components/pillars/EnhancedProfile";
import {
  ArrowLeft,
  Briefcase,
  Clock,
  MapPin,
  Scale,
  Award,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const LEVEL_COLORS: Record<string, string> = {
  national: "bg-saffron/15 text-saffron border-saffron/20",
  chetra: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  prant: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  court: "bg-purple-500/10 text-purple-400 border-purple-500/20",
};

export default function PillarDetailClient({ slug }: { slug: string }) {
  // Check for enhanced profile first
  const enhancedProfile = getEnhancedProfile(slug);
  if (enhancedProfile) {
    return <EnhancedProfileView profile={enhancedProfile} />;
  }

  // Fallback to basic mock data
  const member = TEAM_MEMBERS.find((m) => m.slug === slug);

  if (!member) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-4">
        <Scale className="mb-4 h-12 w-12 text-saffron/30" />
        <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-maroon">
          Member Not Found
        </h2>
        <p className="mt-2 font-[family-name:var(--font-satoshi)] text-sm text-charcoal/50">
          The profile you are looking for does not exist.
        </p>
        <Link
          href="/pillars"
          className="mt-6 flex items-center gap-2 rounded-lg bg-saffron px-6 py-2.5 font-[family-name:var(--font-satoshi)] text-sm font-medium text-white transition-colors hover:bg-saffron-bright"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Pillars
        </Link>
      </div>
    );
  }

  const initials = member.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2);

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero */}
      <div className="relative overflow-hidden bg-gradient-to-br from-maroon-dark to-maroon px-4 pb-16 pt-8">
        <div className="absolute inset-0 opacity-[0.02]" />
        <div className="relative mx-auto max-w-4xl">
          <Link
            href="/pillars"
            className="mb-6 inline-flex items-center gap-2 font-[family-name:var(--font-satoshi)] text-xs text-cream/50 transition-colors hover:text-cream/80"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Pillars of Justice
          </Link>

          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-6 sm:flex-row sm:items-end"
          >
            {/* Avatar */}
            <motion.div
              variants={fadeUp}
              className="flex h-28 w-28 shrink-0 items-center justify-center rounded-2xl border-2 border-gold/20 bg-gradient-to-br from-saffron/20 to-maroon/40"
            >
              <span className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-gold-bright/80">
                {initials}
              </span>
            </motion.div>

            <motion.div variants={fadeUp}>
              <h1 className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-cream lg:text-4xl">
                {member.name}
              </h1>
              <p className="mt-1 font-[family-name:var(--font-noto-serif)] text-lg text-cream/60">
                {member.nameHi}
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-3">
                <span className="font-[family-name:var(--font-satoshi)] text-sm text-saffron/80">
                  {member.designation}
                </span>
                <span
                  className={`rounded-full border px-3 py-0.5 font-[family-name:var(--font-satoshi)] text-[10px] font-medium capitalize ${LEVEL_COLORS[member.level] ?? "bg-cream/5 text-cream/50 border-cream/10"}`}
                >
                  {member.level}
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-4xl px-4 py-10">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="grid gap-6 lg:grid-cols-3"
        >
          {/* Left: Bio */}
          <motion.div variants={fadeUp} className="lg:col-span-2">
            <div className="rounded-xl border border-gold/10 bg-white p-6 shadow-sm">
              <h3 className="mb-4 font-[family-name:var(--font-playfair)] text-lg font-bold text-maroon">
                About
              </h3>
              <p className="font-[family-name:var(--font-satoshi)] text-sm leading-relaxed text-charcoal/70">
                {member.bio}
              </p>
            </div>

            {/* Expertise */}
            <div className="mt-6 rounded-xl border border-gold/10 bg-white p-6 shadow-sm">
              <h3 className="mb-4 font-[family-name:var(--font-playfair)] text-lg font-bold text-maroon">
                Areas of Expertise
              </h3>
              <div className="flex flex-wrap gap-2">
                {member.expertise.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-saffron/15 bg-saffron/5 px-3 py-1 font-[family-name:var(--font-satoshi)] text-xs text-saffron"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: Stats */}
          <motion.div variants={fadeUp} className="space-y-4">
            <div className="rounded-xl border border-gold/10 bg-white p-5 shadow-sm">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-saffron/10">
                    <Briefcase className="h-4 w-4 text-saffron" />
                  </div>
                  <div>
                    <p className="font-[family-name:var(--font-playfair)] text-xl font-bold text-maroon">
                      {member.cases}+
                    </p>
                    <p className="font-[family-name:var(--font-satoshi)] text-[11px] text-charcoal/40">
                      Cases Handled
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gold/10">
                    <Clock className="h-4 w-4 text-gold" />
                  </div>
                  <div>
                    <p className="font-[family-name:var(--font-playfair)] text-xl font-bold text-maroon">
                      {member.experience}
                    </p>
                    <p className="font-[family-name:var(--font-satoshi)] text-[11px] text-charcoal/40">
                      Experience
                    </p>
                  </div>
                </div>

                {member.chetraId && (
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500/10">
                      <MapPin className="h-4 w-4 text-blue-500" />
                    </div>
                    <div>
                      <p className="font-[family-name:var(--font-satoshi)] text-sm font-medium text-maroon capitalize">
                        {member.chetraId.replace(/-/g, " ")}
                      </p>
                      <p className="font-[family-name:var(--font-satoshi)] text-[11px] text-charcoal/40">
                        Chetra
                      </p>
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/10">
                    <Award className="h-4 w-4 text-emerald-500" />
                  </div>
                  <div>
                    <p className="font-[family-name:var(--font-satoshi)] text-sm font-medium capitalize text-maroon">
                      {member.level} Level
                    </p>
                    <p className="font-[family-name:var(--font-satoshi)] text-[11px] text-charcoal/40">
                      Designation Level
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
