"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { assetPath } from "@/lib/utils";
import type { EnhancedProfile } from "@/lib/team-profiles";
import {
  ArrowLeft,
  Globe,
  Linkedin,
  Mail,
  Phone,
  Github,
  Instagram,
  MessageCircle,
  BookOpen,
  FileText,
  Tv,
  Mic,
  Trophy,
  GraduationCap,
  Briefcase,
  Shield,
  Award,
  ChevronRight,
  ExternalLink,
  Sparkles,
} from "lucide-react";

/* ═══════════════════════════════════════════════════════════
   LINK ICON MAPPING
   ═══════════════════════════════════════════════════════════ */

function LinkIcon({ type }: { type: string }) {
  const cls = "h-3.5 w-3.5";
  switch (type) {
    case "web": return <Globe className={cls} />;
    case "linkedin": return <Linkedin className={cls} />;
    case "email": return <Mail className={cls} />;
    case "phone": return <Phone className={cls} />;
    case "github": return <Github className={cls} />;
    case "instagram": return <Instagram className={cls} />;
    case "whatsapp": return <MessageCircle className={cls} />;
    default: return <Globe className={cls} />;
  }
}

/* ═══════════════════════════════════════════════════════════
   SUB-COMPONENTS
   ═══════════════════════════════════════════════════════════ */

function StatCard({ value, label, index }: { value: string; label: string; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 + index * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="group relative overflow-hidden rounded-xl border border-gold/15 bg-gradient-to-br from-cream-light to-cream p-4 text-center transition-all duration-300 hover:border-gold/30 hover:shadow-md"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-saffron/[0.02] to-gold/[0.04] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <p className="relative font-[family-name:var(--font-playfair)] text-2xl font-bold text-maroon">
        {value}
      </p>
      <p className="relative mt-1 font-[family-name:var(--font-satoshi)] text-xs font-medium uppercase tracking-wider text-charcoal-light">
        {label}
      </p>
    </motion.div>
  );
}

function TabButton({
  active,
  label,
  icon,
  onClick,
  layoutId,
}: {
  active: boolean;
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
  layoutId: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`relative flex items-center gap-2 px-4 py-3 font-[family-name:var(--font-satoshi)] text-sm font-semibold uppercase tracking-wider transition-colors duration-200 ${
        active ? "text-saffron" : "text-charcoal-light/50 hover:text-charcoal-light"
      }`}
    >
      {icon}
      <span className="hidden sm:inline">{label}</span>
      {active && (
        <motion.div
          layoutId={layoutId}
          className="absolute bottom-0 left-2 right-2 h-[2px] rounded-full bg-saffron"
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        />
      )}
    </button>
  );
}

function TimelineItem({
  role,
  org,
  period,
  detail,
  index,
}: {
  role: string;
  org: string;
  period?: string;
  detail?: string;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.4 }}
      className="relative pl-7 pb-6 last:pb-0"
    >
      <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-saffron/30 to-gold/10" />
      <div className="absolute left-[-3.5px] top-1.5 h-2 w-2 rounded-full border-2 border-saffron bg-cream" />
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5">
        <span className="font-[family-name:var(--font-satoshi)] text-base font-semibold text-maroon-dark">
          {role}
        </span>
        {period && (
          <span className="font-[family-name:var(--font-satoshi)] text-[10px] font-medium text-saffron">
            {period}
          </span>
        )}
      </div>
      <span className="font-[family-name:var(--font-satoshi)] text-sm text-charcoal-light">
        {org}
      </span>
      {detail && (
        <p className="mt-0.5 font-[family-name:var(--font-satoshi)] text-sm text-charcoal-light/60">
          {detail}
        </p>
      )}
    </motion.div>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mb-4 font-[family-name:var(--font-playfair)] text-base font-bold uppercase tracking-wider text-maroon">
      {children}
    </h3>
  );
}

/* ═══════════════════════════════════════════════════════════
   TAB CONTENT PANELS
   ═══════════════════════════════════════════════════════════ */

function OverviewTab({ profile }: { profile: EnhancedProfile }) {
  return (
    <motion.div
      key="overview"
      initial={{ opacity: 0, x: 12 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -12 }}
      transition={{ duration: 0.25 }}
    >
      {/* Bio */}
      {profile.bio.map((p, i) => (
        <p
          key={i}
          className={`font-[family-name:var(--font-satoshi)] leading-relaxed ${
            i === 0
              ? "mb-4 text-lg font-medium text-charcoal"
              : "mb-3 text-base text-charcoal/70"
          }`}
        >
          {p}
        </p>
      ))}

      {/* Education */}
      <div className="mt-8">
        <SectionHeading>Education</SectionHeading>
        <div className="space-y-1">
          {profile.education.map((edu) => (
            <div
              key={edu.degree}
              className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5 rounded-lg border border-gold/5 bg-cream-light/50 px-4 py-3"
            >
              <GraduationCap className="h-3.5 w-3.5 text-saffron" />
              <span className="font-[family-name:var(--font-satoshi)] text-base font-semibold text-maroon-dark">
                {edu.degree}
              </span>
              <span className="font-[family-name:var(--font-satoshi)] text-sm text-charcoal-light">
                {edu.institution}
              </span>
              {edu.year && (
                <span className="font-[family-name:var(--font-satoshi)] text-[10px] font-medium text-saffron">
                  {edu.year}
                </span>
              )}
              {edu.extra && (
                <span className="basis-full pl-7 font-[family-name:var(--font-satoshi)] text-xs text-charcoal-light/60">
                  {edu.extra}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Practice Areas / Expertise */}
      <div className="mt-8">
        <SectionHeading>{profile.paLabel}</SectionHeading>
        <div className="flex flex-wrap gap-2">
          {profile.practiceAreas.map((area) => (
            <span
              key={area}
              className="rounded-full border border-saffron/15 bg-saffron/5 px-3.5 py-1.5 font-[family-name:var(--font-satoshi)] text-sm font-medium text-saffron transition-colors duration-200 hover:bg-saffron/10"
            >
              {area}
            </span>
          ))}
        </div>
      </div>

      {/* Empanelments (Dr. Atrey specific) */}
      {profile.empanelments && (
        <div className="mt-8">
          <SectionHeading>Government Empanelments</SectionHeading>
          <ul className="space-y-2">
            {profile.empanelments.map((emp) => (
              <li key={emp} className="flex items-start gap-3">
                <Shield className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold" />
                <span className="font-[family-name:var(--font-satoshi)] text-base text-charcoal/80">
                  {emp}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </motion.div>
  );
}

function ExperienceTab({ profile }: { profile: EnhancedProfile }) {
  return (
    <motion.div
      key="experience"
      initial={{ opacity: 0, x: 12 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -12 }}
      transition={{ duration: 0.25 }}
    >
      <SectionHeading>Professional Experience</SectionHeading>
      {profile.experience.map((exp, i) => (
        <TimelineItem
          key={exp.role + exp.org}
          role={exp.role}
          org={exp.org}
          period={exp.period}
          detail={exp.detail}
          index={i}
        />
      ))}
    </motion.div>
  );
}

function PublicationsTab({ profile }: { profile: EnhancedProfile }) {
  const books = profile.books ?? [];
  const articles = profile.articles ?? [];
  const pubs = profile.publications ?? [];

  return (
    <motion.div
      key="publications"
      initial={{ opacity: 0, x: 12 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -12 }}
      transition={{ duration: 0.25 }}
      className="space-y-8"
    >
      {/* Books */}
      {books.length > 0 && (
        <div>
          <SectionHeading>Books Authored</SectionHeading>
          <div className="space-y-3">
            {books.map((book, i) => (
              <motion.div
                key={book.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="flex gap-4 rounded-xl border border-gold/10 bg-cream-light/50 p-4"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-maroon/10">
                  <BookOpen className="h-5 w-5 text-maroon" />
                </div>
                <div>
                  <h4 className="font-[family-name:var(--font-satoshi)] text-base font-semibold text-maroon-dark leading-snug">
                    {book.title}
                  </h4>
                  <p className="mt-0.5 font-[family-name:var(--font-satoshi)] text-sm text-charcoal-light">
                    {book.source}
                  </p>
                  <span className="mt-1 inline-block font-[family-name:var(--font-satoshi)] text-[10px] font-medium text-saffron">
                    {book.year}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Articles */}
      {articles.length > 0 && (
        <div>
          <SectionHeading>Published Articles ({articles.length})</SectionHeading>
          <div className="space-y-2">
            {articles.map((article, i) => (
              <motion.div
                key={article.title}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                className="flex items-start gap-3 rounded-lg border border-gold/5 px-4 py-3 transition-colors duration-200 hover:bg-cream-light/80"
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-charcoal/[0.04] font-[family-name:var(--font-satoshi)] text-[10px] font-bold text-charcoal-light/60">
                  {i + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <h4 className="font-[family-name:var(--font-satoshi)] text-base font-medium text-maroon-dark leading-snug">
                    {article.title}
                  </h4>
                  <div className="mt-0.5 flex flex-wrap items-center gap-2">
                    <span className="font-[family-name:var(--font-satoshi)] text-sm text-charcoal-light">
                      {article.source}
                    </span>
                    <span className="font-[family-name:var(--font-satoshi)] text-[10px] text-saffron">
                      {article.year}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* IEEE / Research Publications */}
      {pubs.length > 0 && (
        <div>
          <SectionHeading>Research Publications</SectionHeading>
          <div className="space-y-3">
            {pubs.map((pub, i) => (
              <motion.div
                key={pub.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="flex gap-4 rounded-xl border border-gold/10 bg-cream-light/50 p-4"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-info/10">
                  <FileText className="h-5 w-5 text-info" />
                </div>
                <div>
                  <h4 className="font-[family-name:var(--font-satoshi)] text-base font-semibold text-maroon-dark leading-snug">
                    {pub.title}
                  </h4>
                  <p className="mt-0.5 font-[family-name:var(--font-satoshi)] text-sm text-charcoal-light">
                    {pub.source}
                  </p>
                  <span className="mt-1 inline-block font-[family-name:var(--font-satoshi)] text-[10px] font-medium text-saffron">
                    {pub.year}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}

function MediaTab({ profile }: { profile: EnhancedProfile }) {
  const media = profile.mediaAppearances ?? [];
  const speaking = profile.speakingEngagements ?? [];

  return (
    <motion.div
      key="media"
      initial={{ opacity: 0, x: 12 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -12 }}
      transition={{ duration: 0.25 }}
      className="space-y-8"
    >
      {media.length > 0 && (
        <div>
          <SectionHeading>Television Appearances</SectionHeading>
          <div className="grid gap-2 sm:grid-cols-2">
            {media.map((m, i) => (
              <motion.div
                key={m.show + m.channel}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-start gap-3 rounded-lg border border-gold/8 bg-cream-light/50 p-3"
              >
                <Tv className="mt-0.5 h-4 w-4 shrink-0 text-saffron" />
                <div>
                  <span className="block font-[family-name:var(--font-satoshi)] text-base font-semibold text-maroon-dark">
                    {m.show}
                  </span>
                  <span className="block font-[family-name:var(--font-satoshi)] text-sm text-charcoal-light">
                    {m.channel}
                  </span>
                  <span className="block font-[family-name:var(--font-satoshi)] text-[10px] text-saffron/80">
                    {m.dates}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {speaking.length > 0 && (
        <div>
          <SectionHeading>Speaking Engagements ({speaking.length})</SectionHeading>
          <ul className="space-y-2">
            {speaking.map((s, i) => (
              <motion.li
                key={s}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.03 }}
                className="flex items-start gap-3"
              >
                <Mic className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold" />
                <span className="font-[family-name:var(--font-satoshi)] text-base text-charcoal/80 leading-relaxed">
                  {s}
                </span>
              </motion.li>
            ))}
          </ul>
        </div>
      )}
    </motion.div>
  );
}

function SkillsTab({ profile }: { profile: EnhancedProfile }) {
  const skills = profile.skills ?? [];
  return (
    <motion.div
      key="skills"
      initial={{ opacity: 0, x: 12 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -12 }}
      transition={{ duration: 0.25 }}
      className="space-y-6"
    >
      {skills.map((cat, ci) => (
        <motion.div
          key={cat.category}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: ci * 0.08 }}
        >
          <h4 className="mb-3 font-[family-name:var(--font-satoshi)] text-sm font-bold uppercase tracking-wider text-maroon">
            {cat.category}
          </h4>
          <div className="flex flex-wrap gap-2">
            {cat.items.map((skill) => (
              <span
                key={skill}
                className="rounded-lg border border-gold/10 bg-cream-light px-3 py-1.5 font-[family-name:var(--font-satoshi)] text-sm font-medium text-charcoal-light transition-colors duration-200 hover:border-saffron/20 hover:text-saffron"
              >
                {skill}
              </span>
            ))}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}

function CertificationsTab({ profile }: { profile: EnhancedProfile }) {
  const certs = profile.certifications ?? [];
  return (
    <motion.div
      key="certifications"
      initial={{ opacity: 0, x: 12 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -12 }}
      transition={{ duration: 0.25 }}
    >
      <SectionHeading>Professional Certifications ({certs.length})</SectionHeading>
      <div className="grid gap-2 sm:grid-cols-2">
        {certs.map((cert, i) => (
          <motion.div
            key={cert.name}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
            className="flex items-start gap-3 rounded-xl border border-gold/8 bg-cream-light/50 p-3.5 transition-colors duration-200 hover:border-gold/20"
          >
            <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-success/10">
              <svg className="h-3 w-3 text-success" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <path d="M20 6 9 17l-5-5" />
              </svg>
            </div>
            <div>
              <span className="block font-[family-name:var(--font-satoshi)] text-base font-medium text-maroon-dark leading-tight">
                {cert.name}
              </span>
              <span className="block font-[family-name:var(--font-satoshi)] text-sm text-charcoal-light">
                {cert.issuer}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function AchievementsTab({ profile }: { profile: EnhancedProfile }) {
  const achievements = profile.achievements ?? [];
  return (
    <motion.div
      key="achievements"
      initial={{ opacity: 0, x: 12 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -12 }}
      transition={{ duration: 0.25 }}
    >
      <SectionHeading>Awards & Achievements</SectionHeading>
      <ul className="space-y-3">
        {achievements.map((ach, i) => (
          <motion.li
            key={ach}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className="flex items-start gap-3 rounded-lg border border-gold/5 px-4 py-3 transition-colors duration-200 hover:bg-cream-light/80"
          >
            <Trophy className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
            <span className="font-[family-name:var(--font-satoshi)] text-base text-charcoal/80 leading-relaxed">
              {ach}
            </span>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════
   MAIN ENHANCED PROFILE COMPONENT
   ═══════════════════════════════════════════════════════════ */

export function EnhancedProfileView({ profile }: { profile: EnhancedProfile }) {
  const [activeTab, setActiveTab] = useState("overview");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  // Determine which tabs to show based on available data
  const hasPublications =
    (profile.books && profile.books.length > 0) ||
    (profile.articles && profile.articles.length > 0) ||
    (profile.publications && profile.publications.length > 0);
  const hasMedia =
    (profile.mediaAppearances && profile.mediaAppearances.length > 0) ||
    (profile.speakingEngagements && profile.speakingEngagements.length > 0);
  const hasSkills = profile.skills && profile.skills.length > 0;
  const hasCerts = profile.certifications && profile.certifications.length > 0;
  const hasAchievements = profile.achievements && profile.achievements.length > 0;

  const tabs = [
    { key: "overview", label: "Overview", icon: <Sparkles className="h-3.5 w-3.5" /> },
    { key: "experience", label: "Experience", icon: <Briefcase className="h-3.5 w-3.5" /> },
    ...(hasPublications ? [{ key: "publications", label: "Publications", icon: <BookOpen className="h-3.5 w-3.5" /> }] : []),
    ...(hasMedia ? [{ key: "media", label: "Media", icon: <Tv className="h-3.5 w-3.5" /> }] : []),
    ...(hasSkills ? [{ key: "skills", label: "Skills", icon: <Award className="h-3.5 w-3.5" /> }] : []),
    ...(hasCerts ? [{ key: "certifications", label: "Certs", icon: <Shield className="h-3.5 w-3.5" /> }] : []),
    ...(hasAchievements ? [{ key: "achievements", label: "Achievements", icon: <Trophy className="h-3.5 w-3.5" /> }] : []),
  ];

  const initials = profile.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2);

  return (
    <div className="min-h-screen bg-cream">
      {/* ── HERO ── */}
      <div className="relative overflow-hidden bg-gradient-to-br from-maroon-dark via-maroon to-maroon-dark">
        {/* Background decorative elements */}
        <div className="absolute inset-0">
          <Image
            src={assetPath("/images/supreme-court.jpg")}
            alt=""
            fill
            className="object-cover opacity-[0.07]"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-maroon-dark/40 via-transparent to-maroon-dark/80" />
        </div>
        <div className="absolute inset-0">
          <div className="absolute -left-40 top-1/3 h-96 w-96 rounded-full bg-saffron/8 blur-[120px]" />
          <div className="absolute -right-40 bottom-1/4 h-80 w-80 rounded-full bg-gold/6 blur-[100px]" />
        </div>

        <div className="container-default relative z-10 pb-20 pt-10">
          {/* Back link */}
          <Link
            href="/pillars"
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-cream/10 bg-cream/5 px-4 py-1.5 font-[family-name:var(--font-satoshi)] text-xs text-cream/50 backdrop-blur-sm transition-all duration-200 hover:border-cream/20 hover:text-cream/80"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Pillars of Justice
          </Link>

          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:gap-12">
            {/* Photo / Avatar */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="shrink-0"
            >
              {profile.photo ? (
                <div className="relative h-44 w-44 overflow-hidden rounded-2xl border-[3px] border-gold/30 bg-maroon-dark/50 shadow-xl shadow-black/20 lg:h-52 lg:w-52">
                  <Image
                    src={assetPath(profile.photo)}
                    alt={profile.name}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 1024px) 176px, 208px"
                    priority
                  />
                </div>
              ) : (
                <div className="flex h-44 w-44 items-center justify-center rounded-2xl border-[3px] border-gold/30 bg-gradient-to-br from-saffron/20 to-maroon/40 shadow-xl shadow-black/20 lg:h-52 lg:w-52">
                  <span className="font-[family-name:var(--font-playfair)] text-5xl font-bold text-gold-bright/80">
                    {initials}
                  </span>
                </div>
              )}
            </motion.div>

            {/* Name & Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex-1"
            >
              <h1 className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-cream lg:text-5xl">
                {profile.name}
              </h1>
              <p className="mt-1 font-[family-name:var(--font-noto-serif)] text-lg text-cream/50">
                {profile.nameHi}
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-saffron/15 px-4 py-1 font-[family-name:var(--font-satoshi)] text-sm font-semibold text-saffron-light">
                  {profile.title}
                </span>
              </div>
              {profile.subtitle && (
                <p className="mt-2 font-[family-name:var(--font-satoshi)] text-base text-cream/40">
                  {profile.subtitle}
                </p>
              )}

              {/* Links row */}
              <div className="mt-5 flex flex-wrap gap-2">
                {profile.links.map((link) => (
                  <a
                    key={link.label}
                    href={link.url}
                    target={link.url.startsWith("http") ? "_blank" : undefined}
                    rel={link.url.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="inline-flex items-center gap-1.5 rounded-full border border-cream/10 bg-cream/5 px-3 py-1.5 font-[family-name:var(--font-satoshi)] text-[11px] font-medium text-cream/60 backdrop-blur-sm transition-all duration-200 hover:border-gold/30 hover:text-gold-bright"
                  >
                    <LinkIcon type={link.icon} />
                    {link.label}
                    {link.url.startsWith("http") && (
                      <ExternalLink className="h-2.5 w-2.5 opacity-40" />
                    )}
                  </a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Stats Grid */}
          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {profile.stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="rounded-xl border border-cream/10 bg-cream/5 p-3 text-center backdrop-blur-sm"
              >
                <p className="font-[family-name:var(--font-playfair)] text-xl font-bold text-gold-bright">
                  {s.value}
                </p>
                <p className="mt-0.5 font-[family-name:var(--font-satoshi)] text-[10px] font-medium uppercase tracking-wider text-cream/40">
                  {s.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ── CONTENT ── */}
      <div ref={ref} className="container-default py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Tab bar */}
          <div className="mb-8 overflow-x-auto border-b border-gold/10">
            <div className="flex min-w-max gap-0.5">
              {tabs.map((tab) => (
                <TabButton
                  key={tab.key}
                  active={activeTab === tab.key}
                  label={tab.label}
                  icon={tab.icon}
                  onClick={() => setActiveTab(tab.key)}
                  layoutId={`tab-${profile.slug}`}
                />
              ))}
            </div>
          </div>

          {/* Tab content */}
          <AnimatePresence mode="wait">
            {activeTab === "overview" && <OverviewTab profile={profile} />}
            {activeTab === "experience" && <ExperienceTab profile={profile} />}
            {activeTab === "publications" && <PublicationsTab profile={profile} />}
            {activeTab === "media" && <MediaTab profile={profile} />}
            {activeTab === "skills" && <SkillsTab profile={profile} />}
            {activeTab === "certifications" && <CertificationsTab profile={profile} />}
            {activeTab === "achievements" && <AchievementsTab profile={profile} />}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
