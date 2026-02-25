"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@/i18n/routing";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { ACTIVITIES, type ActivityData } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import {
  Search,
  Calendar,
  MapPin,
  Users,
  ArrowRight,
  CalendarCheck,
  Newspaper,
  Star,
  ExternalLink,
} from "lucide-react";

type StatusFilter = "all" | "completed" | "upcoming" | "ongoing";
type TypeFilter =
  | "all"
  | "seminar"
  | "legal-clinic"
  | "shiksha-varg"
  | "rally"
  | "meeting"
  | "workshop"
  | "conference"
  | "outreach";

const STATUS_COLORS: Record<string, string> = {
  completed: "bg-emerald-500/10 text-emerald-700 border-emerald-500/20",
  upcoming: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  ongoing: "bg-amber-500/10 text-amber-600 border-amber-500/20",
};

const TYPE_ICONS: Record<string, string> = {
  seminar: "🎤",
  "legal-clinic": "⚕️",
  "shiksha-varg": "📚",
  rally: "🚩",
  meeting: "🤝",
  workshop: "🔧",
  conference: "🏛️",
  outreach: "🌐",
};

function ActivityCard({ activity }: { activity: ActivityData }) {
  const newsCount = activity.newsLinks?.length ?? 0;
  const hasChiefGuest = !!activity.chiefGuest;

  return (
    <Link href={`/activities/${activity.slug}`} className="group block h-full">
      <motion.div
        layout
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{
          duration: 0.3,
          ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
        }}
        whileHover={{ y: -4 }}
        className="flex h-full flex-col overflow-hidden rounded-2xl border border-gold/10 bg-cream-light shadow-sm transition-shadow duration-300 hover:border-gold/20 hover:shadow-md"
      >
        {/* Image with overlay info */}
        {activity.image && (
          <div className="relative h-44 overflow-hidden">
            <Image
              src={activity.image}
              alt={activity.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-maroon-dark/70 via-maroon-dark/20 to-transparent" />

            {/* Attendees pill — top left */}
            {activity.attendees > 0 && (
              <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-white/90 px-2.5 py-1 shadow-sm backdrop-blur-sm">
                <Users className="h-3 w-3 text-saffron" />
                <span className="font-[family-name:var(--font-satoshi)] text-[10px] font-bold text-maroon-dark">
                  {activity.attendees}+
                </span>
              </div>
            )}

            {/* News coverage badge — top right */}
            {newsCount > 0 && (
              <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-blue-600/90 px-2.5 py-1 shadow-sm backdrop-blur-sm">
                <Newspaper className="h-3 w-3 text-white" />
                <span className="font-[family-name:var(--font-satoshi)] text-[10px] font-bold text-white">
                  {newsCount} source{newsCount > 1 ? "s" : ""}
                </span>
              </div>
            )}

            {/* Bottom overlay — title */}
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h3 className="line-clamp-2 font-[family-name:var(--font-playfair)] text-base font-bold leading-snug text-cream drop-shadow-sm group-hover:text-gold-bright">
                {activity.title}
              </h3>
            </div>
          </div>
        )}

        {/* Type + status banner */}
        <div className="flex items-center justify-between bg-gradient-to-r from-maroon-dark to-maroon px-4 py-2.5">
          <div className="flex items-center gap-2">
            <span className="text-base">{TYPE_ICONS[activity.type] ?? "📋"}</span>
            <span className="font-[family-name:var(--font-satoshi)] text-[10px] font-bold uppercase tracking-wider text-gold-bright">
              {activity.type.replace("-", " ")}
            </span>
          </div>
          <span
            className={cn(
              "rounded-full border px-2.5 py-0.5 text-[9px] font-bold uppercase",
              STATUS_COLORS[activity.status]
            )}
          >
            {activity.status}
          </span>
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col p-4">
          {/* Title (only if no image) */}
          {!activity.image && (
            <h3 className="font-[family-name:var(--font-playfair)] text-base font-bold text-maroon-dark group-hover:text-saffron">
              {activity.title}
            </h3>
          )}
          <p className="mt-0.5 font-[family-name:var(--font-noto-serif)] text-[11px] text-charcoal-light">
            {activity.titleHi}
          </p>

          <p className="mt-2 line-clamp-2 font-[family-name:var(--font-satoshi)] text-xs leading-relaxed text-charcoal-light/70">
            {activity.description}
          </p>

          {/* Chief guest */}
          {hasChiefGuest && (
            <div className="mt-2.5 flex items-center gap-2 rounded-lg bg-gold/5 px-3 py-2">
              <Star className="h-3 w-3 shrink-0 text-gold" />
              <div>
                <p className="font-[family-name:var(--font-satoshi)] text-[9px] font-medium uppercase tracking-wider text-gold/70">
                  Chief Guest
                </p>
                <p className="font-[family-name:var(--font-satoshi)] text-[11px] font-semibold text-maroon-dark">
                  {activity.chiefGuest}
                </p>
              </div>
            </div>
          )}

          {/* Metadata */}
          <div className="mt-auto space-y-1.5 pt-3">
            <div className="flex items-center gap-1.5 font-[family-name:var(--font-satoshi)] text-xs text-charcoal-light">
              <Calendar className="h-3 w-3 text-saffron/70" />
              <span>
                {new Date(activity.date).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
                {activity.endDate &&
                  ` — ${new Date(activity.endDate).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                  })}`}
              </span>
            </div>
            <div className="flex items-center gap-1.5 font-[family-name:var(--font-satoshi)] text-xs text-charcoal-light">
              <MapPin className="h-3 w-3 text-saffron/70" />
              <span className="truncate">{activity.location}</span>
            </div>
          </div>

          {/* News sources row */}
          {newsCount > 0 && (
            <div className="mt-3 border-t border-gold/8 pt-3">
              <p className="mb-1.5 font-[family-name:var(--font-satoshi)] text-[9px] font-bold uppercase tracking-[0.15em] text-charcoal-light/40">
                Covered by
              </p>
              <div className="flex flex-wrap gap-1">
                {activity.newsLinks!.slice(0, 4).map((link) => (
                  <span
                    key={link.url}
                    className="rounded bg-charcoal/5 px-1.5 py-0.5 font-[family-name:var(--font-satoshi)] text-[9px] font-medium text-charcoal-light"
                  >
                    {link.source}
                  </span>
                ))}
                {newsCount > 4 && (
                  <span className="rounded bg-charcoal/5 px-1.5 py-0.5 font-[family-name:var(--font-satoshi)] text-[9px] font-medium text-charcoal-light">
                    +{newsCount - 4} more
                  </span>
                )}
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="mt-3 flex items-center justify-between">
            <span className="font-[family-name:var(--font-satoshi)] text-[11px] font-medium text-saffron opacity-0 transition-opacity group-hover:opacity-100">
              View Details
            </span>
            <ArrowRight className="h-3.5 w-3.5 text-charcoal-light/20 transition-all group-hover:translate-x-1 group-hover:text-saffron" />
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

export function ActivitiesDirectory() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("all");

  const filteredActivities = useMemo(() => {
    return ACTIVITIES.filter((a) => {
      const matchesSearch =
        searchQuery === "" ||
        a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.titleHi.includes(searchQuery) ||
        a.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (a.chiefGuest ?? "").toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || a.status === statusFilter;
      const matchesType = typeFilter === "all" || a.type === typeFilter;

      return matchesSearch && matchesStatus && matchesType;
    });
  }, [searchQuery, statusFilter, typeFilter]);

  const statuses: { value: StatusFilter; label: string }[] = [
    { value: "all", label: "All" },
    { value: "upcoming", label: "Upcoming" },
    { value: "ongoing", label: "Ongoing" },
    { value: "completed", label: "Completed" },
  ];

  const types: { value: TypeFilter; label: string }[] = [
    { value: "all", label: "All Types" },
    { value: "seminar", label: "Seminars" },
    { value: "legal-clinic", label: "Legal Clinics" },
    { value: "shiksha-varg", label: "Shiksha Varg" },
    { value: "workshop", label: "Workshops" },
    { value: "rally", label: "Rallies" },
    { value: "meeting", label: "Meetings" },
    { value: "conference", label: "Conferences" },
    { value: "outreach", label: "Outreach" },
  ];

  return (
    <section className="section-padding bg-cream">
      <div className="container-default">
        <ScrollReveal>
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative max-w-md flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-charcoal-light/50" />
              <input
                type="text"
                placeholder="Search events, locations, guests..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-gold/15 bg-cream-light py-2.5 pl-10 pr-4 font-[family-name:var(--font-satoshi)] text-sm text-charcoal placeholder:text-charcoal-light/40 focus:border-saffron/30 focus:outline-none focus:ring-2 focus:ring-saffron/10"
              />
            </div>

            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value as TypeFilter)}
              className="rounded-xl border border-gold/15 bg-cream-light px-3 py-2 font-[family-name:var(--font-satoshi)] text-xs text-charcoal focus:border-saffron/30 focus:outline-none"
            >
              {types.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>

          {/* Status pills */}
          <div className="mb-6 flex flex-wrap gap-2">
            {statuses.map((s) => (
              <button
                key={s.value}
                onClick={() => setStatusFilter(s.value)}
                className={cn(
                  "rounded-full px-4 py-1.5 font-[family-name:var(--font-satoshi)] text-xs font-medium transition-all",
                  statusFilter === s.value
                    ? "bg-saffron text-white shadow-sm"
                    : "bg-gold/8 text-charcoal-light hover:bg-gold/15"
                )}
              >
                {s.label}
              </button>
            ))}
          </div>
        </ScrollReveal>

        <p className="mb-4 font-[family-name:var(--font-satoshi)] text-sm text-charcoal-light">
          Showing {filteredActivities.length} of {ACTIVITIES.length} events
        </p>

        <AnimatePresence mode="popLayout">
          <motion.div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredActivities.map((a) => (
              <ActivityCard key={a.id} activity={a} />
            ))}
          </motion.div>
        </AnimatePresence>

        {filteredActivities.length === 0 && (
          <div className="py-20 text-center">
            <CalendarCheck className="mx-auto h-12 w-12 text-charcoal-light/20" />
            <p className="mt-4 font-[family-name:var(--font-satoshi)] text-base text-charcoal-light">
              No activities found matching your filters.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
