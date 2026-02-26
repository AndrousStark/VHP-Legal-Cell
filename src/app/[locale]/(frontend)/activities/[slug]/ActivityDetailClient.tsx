"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { ACTIVITIES } from "@/lib/mock-data";
import { ACTIVITY_TYPES } from "@/lib/constants";
import { assetPath } from "@/lib/utils";
import {
  ArrowLeft,
  CalendarCheck,
  MapPin,
  Users,
  Clock,
  User,
  FileText,
  ExternalLink,
  Newspaper,
  Target,
  Star,
  CheckCircle,
  Share2,
  ChevronRight,
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

const STATUS_COLORS: Record<string, string> = {
  completed: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  upcoming: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  ongoing: "bg-amber-500/10 text-amber-600 border-amber-500/20",
};

function getTypeLabel(value: string): string {
  return ACTIVITY_TYPES.find((t) => t.value === value)?.label ?? value;
}

function getTypeLabelHi(value: string): string {
  return ACTIVITY_TYPES.find((t) => t.value === value)?.labelHi ?? "";
}

type DetailTab = "overview" | "agenda" | "coverage";

export default function ActivityDetailClient({ slug }: { slug: string }) {
  const [activeTab, setActiveTab] = useState<DetailTab>("overview");

  const activity = ACTIVITIES.find((a) => a.slug === slug);

  if (!activity) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-4">
        <CalendarCheck className="mb-4 h-12 w-12 text-saffron/30" />
        <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-maroon">
          Activity Not Found
        </h2>
        <p className="mt-2 font-[family-name:var(--font-satoshi)] text-sm text-charcoal/50">
          The activity you are looking for does not exist.
        </p>
        <Link
          href="/activities"
          className="mt-6 flex items-center gap-2 rounded-lg bg-saffron px-6 py-2.5 font-[family-name:var(--font-satoshi)] text-sm font-medium text-white transition-colors hover:bg-saffron-bright"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Activities
        </Link>
      </div>
    );
  }

  const dateFormatted = new Date(activity.date).toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const endDateFormatted = activity.endDate
    ? new Date(activity.endDate).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : null;

  const hasAgenda = activity.agenda && activity.agenda.length > 0;
  const hasCoverage =
    (activity.newsLinks && activity.newsLinks.length > 0) ||
    (activity.socialLinks && activity.socialLinks.length > 0);
  const hasHighlights = activity.highlights && activity.highlights.length > 0;
  const hasDignitaries = activity.keyDignitaries && activity.keyDignitaries.length > 0;

  const tabs: { key: DetailTab; label: string; icon: React.ReactNode; show: boolean }[] = [
    { key: "overview", label: "Overview", icon: <FileText className="h-3.5 w-3.5" />, show: true },
    { key: "agenda", label: "Agenda & Highlights", icon: <Target className="h-3.5 w-3.5" />, show: !!(hasAgenda || hasHighlights) },
    { key: "coverage", label: "Media Coverage", icon: <Newspaper className="h-3.5 w-3.5" />, show: !!hasCoverage },
  ];

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero */}
      <div className="relative overflow-hidden bg-gradient-to-br from-maroon-dark via-maroon to-maroon-dark">
        {/* Background image */}
        {activity.image && (
          <div className="absolute inset-0">
            <Image
              src={assetPath(activity.image)}
              alt=""
              fill
              className="object-cover opacity-[0.12]"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-maroon-dark/50 via-transparent to-maroon-dark/80" />
          </div>
        )}
        <div className="absolute inset-0">
          <div className="absolute -left-40 top-1/3 h-96 w-96 rounded-full bg-saffron/8 blur-[120px]" />
          <div className="absolute -right-40 bottom-1/4 h-80 w-80 rounded-full bg-gold/6 blur-[100px]" />
        </div>

        <div className="container-default relative z-10 pb-16 pt-10">
          <Link
            href="/activities"
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-cream/10 bg-cream/5 px-4 py-1.5 font-[family-name:var(--font-satoshi)] text-xs text-cream/50 backdrop-blur-sm transition-all hover:border-cream/20 hover:text-cream/80"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Activities & Events
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
            }}
          >
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-saffron/20 bg-saffron/10 px-3 py-1 font-[family-name:var(--font-satoshi)] text-xs font-medium text-saffron-light">
                {getTypeLabel(activity.type)}
              </span>
              <span
                className={`rounded-full border px-3 py-1 font-[family-name:var(--font-satoshi)] text-xs font-medium capitalize ${STATUS_COLORS[activity.status] ?? ""}`}
              >
                {activity.status}
              </span>
            </div>

            <h1 className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-cream lg:text-5xl">
              {activity.title}
            </h1>
            <p className="mt-2 font-[family-name:var(--font-noto-serif)] text-lg text-cream/50">
              {activity.titleHi}
            </p>

            {/* Quick stats row */}
            <div className="mt-6 flex flex-wrap gap-4">
              <div className="flex items-center gap-2 rounded-lg border border-cream/10 bg-cream/5 px-4 py-2 backdrop-blur-sm">
                <CalendarCheck className="h-4 w-4 text-gold-bright" />
                <span className="font-[family-name:var(--font-satoshi)] text-sm text-cream/80">
                  {dateFormatted}
                  {endDateFormatted && ` — ${endDateFormatted}`}
                </span>
              </div>
              <div className="flex items-center gap-2 rounded-lg border border-cream/10 bg-cream/5 px-4 py-2 backdrop-blur-sm">
                <MapPin className="h-4 w-4 text-gold-bright" />
                <span className="font-[family-name:var(--font-satoshi)] text-sm text-cream/80">
                  {activity.location}
                </span>
              </div>
              {activity.attendees > 0 && (
                <div className="flex items-center gap-2 rounded-lg border border-cream/10 bg-cream/5 px-4 py-2 backdrop-blur-sm">
                  <Users className="h-4 w-4 text-gold-bright" />
                  <span className="font-[family-name:var(--font-satoshi)] text-sm text-cream/80">
                    {activity.attendees}+ Attendees
                  </span>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="container-default py-10">
        {/* Tab bar */}
        <div className="mb-8 overflow-x-auto border-b border-gold/10">
          <div className="flex min-w-max gap-1">
            {tabs
              .filter((t) => t.show)
              .map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`relative flex items-center gap-2 px-4 py-3 font-[family-name:var(--font-satoshi)] text-xs font-semibold uppercase tracking-wider transition-colors ${
                    activeTab === tab.key
                      ? "text-saffron"
                      : "text-charcoal-light/50 hover:text-charcoal-light"
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                  {activeTab === tab.key && (
                    <motion.div
                      layoutId="activity-tab"
                      className="absolute bottom-0 left-2 right-2 h-[2px] rounded-full bg-saffron"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </button>
              ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {/* OVERVIEW TAB */}
          {activeTab === "overview" && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.25 }}
            >
              <div className="grid gap-8 lg:grid-cols-3">
                {/* Main content */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Description */}
                  <div className="rounded-2xl border border-gold/10 bg-white p-6 shadow-sm">
                    <h3 className="mb-4 font-[family-name:var(--font-playfair)] text-lg font-bold text-maroon">
                      About This Event
                    </h3>
                    <p className="font-[family-name:var(--font-satoshi)] text-sm leading-relaxed text-charcoal/70">
                      {activity.description}
                    </p>
                  </div>

                  {/* Outcome */}
                  {activity.outcome && (
                    <div className="rounded-2xl border border-emerald-500/15 bg-emerald-50/50 p-6">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                        <div>
                          <h3 className="mb-2 font-[family-name:var(--font-playfair)] text-base font-bold text-emerald-800">
                            Outcome & Impact
                          </h3>
                          <p className="font-[family-name:var(--font-satoshi)] text-sm leading-relaxed text-emerald-700/80">
                            {activity.outcome}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Key Dignitaries */}
                  {hasDignitaries && (
                    <div className="rounded-2xl border border-gold/10 bg-white p-6 shadow-sm">
                      <h3 className="mb-4 font-[family-name:var(--font-playfair)] text-lg font-bold text-maroon">
                        Key Dignitaries
                      </h3>
                      {activity.chiefGuest && (
                        <div className="mb-4 flex items-center gap-3 rounded-xl border border-gold/15 bg-gold/5 p-4">
                          <Star className="h-5 w-5 shrink-0 text-gold" />
                          <div>
                            <p className="font-[family-name:var(--font-satoshi)] text-[10px] font-medium uppercase tracking-wider text-gold">
                              Chief Guest
                            </p>
                            <p className="font-[family-name:var(--font-satoshi)] text-sm font-semibold text-maroon-dark">
                              {activity.chiefGuest}
                            </p>
                          </div>
                        </div>
                      )}
                      <div className="grid gap-2 sm:grid-cols-2">
                        {activity.keyDignitaries!.map((name) => (
                          <div
                            key={name}
                            className="flex items-center gap-3 rounded-lg border border-gold/5 px-4 py-3 transition-colors hover:bg-cream-light/80"
                          >
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-saffron/10">
                              <User className="h-3.5 w-3.5 text-saffron" />
                            </div>
                            <span className="font-[family-name:var(--font-satoshi)] text-sm text-maroon-dark">
                              {name}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Image gallery */}
                  {activity.image && (
                    <div className="overflow-hidden rounded-2xl border border-gold/10 shadow-sm">
                      <div className="relative h-64 md:h-80">
                        <Image
                          src={assetPath(activity.image)}
                          alt={activity.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 1024px) 100vw, 66vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-maroon-dark/30 to-transparent" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Sidebar */}
                <div className="space-y-4">
                  {/* Details card */}
                  <div className="rounded-2xl border border-gold/10 bg-white p-5 shadow-sm">
                    <h4 className="mb-4 font-[family-name:var(--font-playfair)] text-base font-bold text-maroon">
                      Event Details
                    </h4>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <CalendarCheck className="mt-0.5 h-4 w-4 shrink-0 text-saffron/60" />
                        <div>
                          <p className="font-[family-name:var(--font-satoshi)] text-sm text-maroon">
                            {dateFormatted}
                          </p>
                          {endDateFormatted && (
                            <p className="font-[family-name:var(--font-satoshi)] text-xs text-charcoal/40">
                              to {endDateFormatted}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-saffron/60" />
                        <p className="font-[family-name:var(--font-satoshi)] text-sm text-maroon">
                          {activity.location}
                        </p>
                      </div>

                      <div className="flex items-start gap-3">
                        <Users className="mt-0.5 h-4 w-4 shrink-0 text-saffron/60" />
                        <div>
                          <p className="font-[family-name:var(--font-satoshi)] text-sm text-maroon">
                            {activity.attendees > 0
                              ? `${activity.attendees}+ Attendees`
                              : "TBD"}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <User className="mt-0.5 h-4 w-4 shrink-0 text-saffron/60" />
                        <div>
                          <p className="font-[family-name:var(--font-satoshi)] text-sm text-maroon">
                            {activity.organizer}
                          </p>
                          <p className="font-[family-name:var(--font-satoshi)] text-xs text-charcoal/40">
                            Organizer
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Clock className="mt-0.5 h-4 w-4 shrink-0 text-saffron/60" />
                        <div>
                          <p className="font-[family-name:var(--font-satoshi)] text-sm capitalize text-maroon">
                            {activity.chetraId.replace(/-/g, " ")}
                          </p>
                          <p className="font-[family-name:var(--font-satoshi)] text-xs text-charcoal/40">
                            Chetra
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Activity Type */}
                  <div className="rounded-2xl border border-gold/10 bg-white p-5 shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-saffron/10">
                        <FileText className="h-5 w-5 text-saffron" />
                      </div>
                      <div>
                        <p className="font-[family-name:var(--font-satoshi)] text-sm font-medium text-maroon">
                          {getTypeLabel(activity.type)}
                        </p>
                        <p className="font-[family-name:var(--font-noto-serif)] text-xs text-charcoal/40">
                          {getTypeLabelHi(activity.type)}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Social Links */}
                  {activity.socialLinks && activity.socialLinks.length > 0 && (
                    <div className="rounded-2xl border border-gold/10 bg-white p-5 shadow-sm">
                      <h4 className="mb-3 font-[family-name:var(--font-playfair)] text-sm font-bold text-maroon">
                        Social Media
                      </h4>
                      <div className="space-y-2">
                        {activity.socialLinks.map((link) => (
                          <a
                            key={link.url}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 rounded-lg border border-gold/10 px-3 py-2.5 font-[family-name:var(--font-satoshi)] text-xs font-medium text-charcoal-light transition-colors hover:border-saffron/20 hover:text-saffron"
                          >
                            <Share2 className="h-3.5 w-3.5" />
                            {link.label}
                            <ExternalLink className="ml-auto h-3 w-3 opacity-40" />
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* AGENDA TAB */}
          {activeTab === "agenda" && (
            <motion.div
              key="agenda"
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.25 }}
              className="space-y-8"
            >
              {/* Agenda */}
              {hasAgenda && (
                <div>
                  <h3 className="mb-4 font-[family-name:var(--font-playfair)] text-lg font-bold text-maroon">
                    Agenda & Topics
                  </h3>
                  <div className="space-y-2">
                    {activity.agenda!.map((item, i) => (
                      <motion.div
                        key={item}
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.06 }}
                        className="flex items-start gap-3 rounded-xl border border-gold/8 bg-white p-4 shadow-sm"
                      >
                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-saffron/10 font-[family-name:var(--font-satoshi)] text-xs font-bold text-saffron">
                          {i + 1}
                        </div>
                        <span className="font-[family-name:var(--font-satoshi)] text-sm text-charcoal/80 leading-relaxed">
                          {item}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Highlights */}
              {hasHighlights && (
                <div>
                  <h3 className="mb-4 font-[family-name:var(--font-playfair)] text-lg font-bold text-maroon">
                    Key Highlights
                  </h3>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {activity.highlights!.map((highlight, i) => (
                      <motion.div
                        key={highlight}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.06 }}
                        className="flex items-start gap-3 rounded-xl border border-gold/10 bg-white p-4 shadow-sm"
                      >
                        <Star className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                        <span className="font-[family-name:var(--font-satoshi)] text-sm text-charcoal/80 leading-relaxed">
                          {highlight}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* COVERAGE TAB */}
          {activeTab === "coverage" && (
            <motion.div
              key="coverage"
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.25 }}
              className="space-y-8"
            >
              {/* Coverage summary */}
              {activity.newsLinks && activity.newsLinks.length > 0 && (
                <div className="rounded-xl border border-blue-500/10 bg-blue-50/50 p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10">
                      <Newspaper className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-[family-name:var(--font-satoshi)] text-sm font-semibold text-blue-800">
                        {activity.newsLinks.length} News Source{activity.newsLinks.length > 1 ? "s" : ""} Covered This Event
                      </p>
                      <p className="font-[family-name:var(--font-satoshi)] text-xs text-blue-600/60">
                        Including {[...new Set(activity.newsLinks.map((l) => l.source))].join(", ")}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* News Links */}
              {activity.newsLinks && activity.newsLinks.length > 0 && (
                <div>
                  <h3 className="mb-4 font-[family-name:var(--font-playfair)] text-lg font-bold text-maroon">
                    News & Media Coverage
                  </h3>
                  <div className="space-y-4">
                    {activity.newsLinks.map((link, i) => (
                      <motion.a
                        key={link.url}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.06 }}
                        className="group flex items-start gap-4 rounded-xl border border-gold/10 bg-white p-5 shadow-sm transition-all duration-200 hover:border-saffron/20 hover:shadow-md"
                      >
                        {/* Source badge */}
                        <div className="flex shrink-0 flex-col items-center gap-1.5">
                          <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-maroon/5">
                            <Newspaper className="h-5 w-5 text-maroon/50" />
                          </div>
                          <span className="rounded bg-charcoal/80 px-1.5 py-0.5 font-[family-name:var(--font-satoshi)] text-[8px] font-bold uppercase tracking-wider text-white">
                            {link.source}
                          </span>
                        </div>

                        {/* Content */}
                        <div className="min-w-0 flex-1">
                          <h4 className="font-[family-name:var(--font-satoshi)] text-sm font-semibold leading-snug text-maroon-dark group-hover:text-saffron">
                            {link.title}
                          </h4>
                          <div className="mt-2 flex flex-wrap items-center gap-3 font-[family-name:var(--font-satoshi)] text-xs text-charcoal-light/60">
                            {link.byline && (
                              <span className="flex items-center gap-1">
                                <User className="h-3 w-3" />
                                {link.byline}
                              </span>
                            )}
                            {link.date && (
                              <span className="flex items-center gap-1">
                                <CalendarCheck className="h-3 w-3" />
                                {new Date(link.date).toLocaleDateString("en-IN", {
                                  day: "numeric",
                                  month: "short",
                                  year: "numeric",
                                })}
                              </span>
                            )}
                            <span className="font-medium text-charcoal-light/40">
                              {link.source}
                            </span>
                          </div>
                          <span className="mt-2 inline-flex items-center gap-1 font-[family-name:var(--font-satoshi)] text-[10px] font-medium uppercase tracking-wider text-saffron/50 transition-colors group-hover:text-saffron">
                            Read Full Article
                            <ExternalLink className="h-2.5 w-2.5" />
                          </span>
                        </div>

                        <ExternalLink className="mt-1 h-4 w-4 shrink-0 text-charcoal-light/20 transition-colors group-hover:text-saffron" />
                      </motion.a>
                    ))}
                  </div>
                </div>
              )}

              {/* Social Media */}
              {activity.socialLinks && activity.socialLinks.length > 0 && (
                <div>
                  <h3 className="mb-4 font-[family-name:var(--font-playfair)] text-lg font-bold text-maroon">
                    Social Media Posts
                  </h3>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {activity.socialLinks.map((link) => (
                      <a
                        key={link.url}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-3 rounded-xl border border-gold/10 bg-white p-4 shadow-sm transition-all hover:border-saffron/20 hover:shadow-md"
                      >
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-500/10">
                          <Share2 className="h-5 w-5 text-blue-500" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <span className="font-[family-name:var(--font-satoshi)] text-sm font-medium text-maroon-dark">
                            {link.label}
                          </span>
                          <p className="truncate font-[family-name:var(--font-satoshi)] text-[10px] text-charcoal-light/40">
                            {link.url.replace(/^https?:\/\//, "").split("/")[0]}
                          </p>
                        </div>
                        <ExternalLink className="h-3.5 w-3.5 shrink-0 text-charcoal-light/30 transition-colors group-hover:text-saffron" />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Related Activities */}
        <div className="mt-16 border-t border-gold/10 pt-10">
          <h3 className="mb-6 font-[family-name:var(--font-playfair)] text-xl font-bold text-maroon-dark">
            Other Activities & Events
          </h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {ACTIVITIES.filter((a) => a.slug !== slug)
              .slice(0, 3)
              .map((related) => (
                <Link
                  key={related.id}
                  href={`/activities/${related.slug}`}
                  className="group flex items-start gap-3 rounded-xl border border-gold/10 bg-white p-4 shadow-sm transition-all hover:border-gold/20 hover:shadow-md"
                >
                  {related.image && (
                    <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg">
                      <Image src={assetPath(related.image)} alt="" fill className="object-cover" sizes="64px" />
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <h4 className="line-clamp-2 font-[family-name:var(--font-playfair)] text-sm font-bold text-maroon-dark group-hover:text-saffron">
                      {related.title}
                    </h4>
                    <p className="mt-1 font-[family-name:var(--font-satoshi)] text-xs text-charcoal-light">
                      {new Date(related.date).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                  <ChevronRight className="mt-1 h-4 w-4 shrink-0 text-charcoal-light/30 group-hover:text-saffron" />
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
