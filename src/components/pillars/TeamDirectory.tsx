"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@/i18n/routing";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { TEAM_MEMBERS, type TeamMember } from "@/lib/mock-data";
import { KHETRAS } from "@/lib/map-config";
import { cn, assetPath } from "@/lib/utils";
import Image from "next/image";
import { Search, LayoutGrid, List, Scale, MapPin, ArrowRight } from "lucide-react";

type ViewMode = "grid" | "list";
type LevelFilter = "all" | "national" | "khetra" | "prant" | "court";

function MemberCard({ member }: { member: TeamMember }) {
  return (
    <Link href={`/pillars/${member.slug}`} className="group block">
      <motion.div
        layout
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        whileHover={{ y: -4 }}
        className="overflow-hidden rounded-2xl border border-gold/10 bg-cream-light shadow-sm transition-shadow duration-300 hover:shadow-md"
      >
        {/* Photo / Avatar */}
        <div className="relative flex h-48 items-center justify-center bg-gradient-to-br from-saffron/5 to-gold/5">
          {member.photo ? (
            <div className="relative h-full w-full">
              <Image src={assetPath(member.photo)} alt={member.name} fill className="object-cover" sizes="(max-width: 640px) 100vw, 300px" />
              <div className="absolute inset-0 bg-gradient-to-t from-maroon-dark/30 to-transparent" />
            </div>
          ) : (
            <div className="flex h-24 w-24 items-center justify-center rounded-full border-[3px] border-gold/25 bg-cream shadow-md">
              <span className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-maroon/50">
                {member.name.split(" ").map((w) => w[0]).join("").slice(0, 2)}
              </span>
            </div>
          )}

          {/* Level badge */}
          <span
            className={cn(
              "absolute top-3 right-3 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white",
              member.level === "national" && "bg-saffron-bright",
              member.level === "khetra" && "bg-maroon",
              member.level === "prant" && "bg-gold",
              member.level === "court" && "bg-info"
            )}
          >
            {member.level}
          </span>
        </div>

        {/* Info */}
        <div className="p-4">
          <h3 className="font-[family-name:var(--font-playfair)] text-lg font-bold text-maroon-dark group-hover:text-saffron">
            {member.name}
          </h3>
          <p className="font-[family-name:var(--font-noto-serif)] text-sm text-charcoal-light">
            {member.nameHi}
          </p>
          <p className="mt-1 font-[family-name:var(--font-satoshi)] text-sm font-bold uppercase tracking-wider text-saffron">
            {member.designation}
          </p>

          {/* Expertise tags */}
          <div className="mt-3 flex flex-wrap gap-1.5">
            {member.expertise.slice(0, 3).map((exp) => (
              <span
                key={exp}
                className="rounded-full bg-gold/8 px-2.5 py-0.5 font-[family-name:var(--font-satoshi)] text-xs font-medium text-charcoal-light"
              >
                {exp}
              </span>
            ))}
          </div>

          {/* Stats */}
          <div className="mt-3 flex items-center gap-4 text-sm font-medium text-charcoal-light">
            <span className="flex items-center gap-1">
              <Scale className="h-3.5 w-3.5 text-saffron" />
              {member.cases} cases
            </span>
            <span>{member.experience}</span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

function MemberListRow({ member }: { member: TeamMember }) {
  return (
    <Link href={`/pillars/${member.slug}`} className="group block">
      <motion.div
        layout
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="flex items-center gap-4 rounded-xl border border-gold/5 bg-cream-light p-4 transition-all duration-200 hover:border-gold/15 hover:shadow-sm"
      >
        {/* Avatar */}
        {member.photo ? (
          <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border-2 border-gold/20">
            <Image src={assetPath(member.photo)} alt={member.name} fill className="object-cover" sizes="48px" />
          </div>
        ) : (
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-gold/20 bg-cream">
            <span className="font-[family-name:var(--font-playfair)] text-sm font-bold text-maroon/50">
              {member.name.split(" ").map((w) => w[0]).join("").slice(0, 2)}
            </span>
          </div>
        )}

        {/* Info */}
        <div className="flex-1 min-w-0">
          <h3 className="font-[family-name:var(--font-playfair)] text-base font-bold text-maroon-dark group-hover:text-saffron">
            {member.name}
          </h3>
          <p className="font-[family-name:var(--font-satoshi)] text-sm font-semibold text-saffron">
            {member.designation}
          </p>
        </div>

        {/* Stats */}
        <div className="hidden sm:flex items-center gap-3 text-sm font-medium text-charcoal-light">
          <span>{member.cases} cases</span>
          <span>{member.experience}</span>
        </div>

        <ArrowRight className="h-4 w-4 text-charcoal-light/30 transition-all group-hover:text-saffron group-hover:translate-x-1" />
      </motion.div>
    </Link>
  );
}

export function TeamDirectory() {
  const [searchQuery, setSearchQuery] = useState("");
  const [levelFilter, setLevelFilter] = useState<LevelFilter>("all");
  const [khetraFilter, setKhetraFilter] = useState<string>("all");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");

  const filteredMembers = useMemo(() => {
    return TEAM_MEMBERS.filter((member) => {
      const matchesSearch =
        searchQuery === "" ||
        member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.nameHi.includes(searchQuery) ||
        member.designation.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesLevel = levelFilter === "all" || member.level === levelFilter;
      const matchesKhetra =
        khetraFilter === "all" || member.khetraId === khetraFilter || (!member.khetraId && khetraFilter === "all");

      return matchesSearch && matchesLevel && matchesKhetra;
    });
  }, [searchQuery, levelFilter, khetraFilter]);

  const levels: { value: LevelFilter; label: string }[] = [
    { value: "all", label: "All Levels" },
    { value: "national", label: "National" },
    { value: "khetra", label: "Khetra" },
    { value: "prant", label: "Prant" },
    { value: "court", label: "Court" },
  ];

  return (
    <section className="section-padding bg-cream">
      <div className="container-default">
        {/* Header + Filters */}
        <ScrollReveal>
          <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            {/* Search */}
            <div className="relative max-w-md flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-charcoal-light/50" />
              <input
                type="text"
                placeholder="Search by name, designation..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-gold/15 bg-cream-light py-2.5 pl-10 pr-4 font-[family-name:var(--font-satoshi)] text-sm text-charcoal placeholder:text-charcoal-light/40 focus:border-saffron/30 focus:outline-none focus:ring-2 focus:ring-saffron/10"
              />
            </div>

            {/* View toggle */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode("grid")}
                aria-label="Grid view"
                aria-pressed={viewMode === "grid"}
                className={cn(
                  "rounded-lg p-2 transition-colors",
                  viewMode === "grid" ? "bg-saffron/10 text-saffron" : "text-charcoal-light/40 hover:text-charcoal-light"
                )}
              >
                <LayoutGrid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                aria-label="List view"
                aria-pressed={viewMode === "list"}
                className={cn(
                  "rounded-lg p-2 transition-colors",
                  viewMode === "list" ? "bg-saffron/10 text-saffron" : "text-charcoal-light/40 hover:text-charcoal-light"
                )}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Filter pills */}
          <div className="mb-8 flex flex-wrap gap-2">
            {/* Level filters */}
            {levels.map((level) => (
              <button
                key={level.value}
                onClick={() => setLevelFilter(level.value)}
                className={cn(
                  "rounded-full px-4 py-1.5 font-[family-name:var(--font-satoshi)] text-xs font-medium transition-all",
                  levelFilter === level.value
                    ? "bg-saffron text-white shadow-sm"
                    : "bg-gold/8 text-charcoal-light hover:bg-gold/15"
                )}
              >
                {level.label}
              </button>
            ))}

            <div className="mx-2 h-6 w-px bg-gold/15" />

            {/* Khetra filter dropdown */}
            <select
              value={khetraFilter}
              onChange={(e) => setKhetraFilter(e.target.value)}
              className="rounded-full border border-gold/15 bg-cream-light px-3 py-1.5 font-[family-name:var(--font-satoshi)] text-xs text-charcoal focus:border-saffron/30 focus:outline-none"
            >
              <option value="all">All Regions</option>
              {KHETRAS.map((k) => (
                <option key={k.id} value={k.id}>
                  {k.nameEn}
                </option>
              ))}
            </select>
          </div>
        </ScrollReveal>

        {/* Count */}
        <p className="mb-4 font-[family-name:var(--font-satoshi)] text-sm text-charcoal-light">
          Showing {filteredMembers.length} of {TEAM_MEMBERS.length} members
        </p>

        {/* Members Grid/List */}
        <AnimatePresence mode="popLayout">
          {viewMode === "grid" ? (
            <motion.div
              key="grid"
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            >
              {filteredMembers.map((member) => (
                <MemberCard key={member.id} member={member} />
              ))}
            </motion.div>
          ) : (
            <motion.div key="list" className="flex flex-col gap-2">
              {filteredMembers.map((member) => (
                <MemberListRow key={member.id} member={member} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {filteredMembers.length === 0 && (
          <div className="py-20 text-center">
            <MapPin className="mx-auto h-12 w-12 text-charcoal-light/20" />
            <p className="mt-4 font-[family-name:var(--font-satoshi)] text-base text-charcoal-light">
              No members found matching your filters.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
