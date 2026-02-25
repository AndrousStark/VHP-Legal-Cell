"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@/i18n/routing";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { NEWS_ARTICLES, type NewsArticle } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import {
  Search,
  Calendar,
  ArrowUpRight,
  Newspaper,
  User,
  ExternalLink,
  BookOpen,
} from "lucide-react";

type CategoryFilter =
  | "all"
  | "press"
  | "media"
  | "article"
  | "vhp-update"
  | "court-update";

const CATEGORY_COLORS: Record<string, string> = {
  press: "bg-blue-500/10 text-blue-700 border-blue-500/20",
  media: "bg-purple-500/10 text-purple-700 border-purple-500/20",
  article: "bg-emerald-500/10 text-emerald-700 border-emerald-500/20",
  "vhp-update": "bg-saffron/10 text-saffron border-saffron/20",
  "court-update": "bg-maroon/10 text-maroon border-maroon/20",
};

const SOURCE_COLORS: Record<string, string> = {
  "The Wire": "bg-slate-800 text-white",
  "Indian Express": "bg-red-700 text-white",
  NDTV: "bg-red-600 text-white",
  "Bar & Bench": "bg-indigo-700 text-white",
  LiveLaw: "bg-blue-600 text-white",
  ThePrint: "bg-gray-800 text-white",
  OpIndia: "bg-orange-600 text-white",
  "India Today": "bg-red-500 text-white",
  "Tribune India": "bg-blue-800 text-white",
  "Scroll.in": "bg-black text-white",
  Organiser: "bg-saffron text-white",
  "Outlook India": "bg-red-800 text-white",
  "Hindustan Times": "bg-blue-900 text-white",
};

function getSourceColor(source: string): string {
  return SOURCE_COLORS[source] ?? "bg-charcoal text-white";
}

/* ── Featured Card — large hero-style for top stories ── */
function FeaturedCard({ article }: { article: NewsArticle }) {
  const CardWrapper = article.sourceUrl ? "a" : "div";
  const cardProps = article.sourceUrl
    ? {
        href: article.sourceUrl,
        target: "_blank" as const,
        rel: "noopener noreferrer",
      }
    : {};

  return (
    <CardWrapper {...cardProps} className="group block">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
          ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
        }}
        className="overflow-hidden rounded-2xl border border-gold/15 bg-gradient-to-br from-maroon-dark to-maroon shadow-lg transition-shadow hover:shadow-xl"
      >
        {/* Image */}
        <div className="relative h-52 overflow-hidden md:h-60">
          {article.image ? (
            <Image
              src={article.image}
              alt={article.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-saffron/10 to-gold/10">
              <Newspaper className="h-16 w-16 text-gold/20" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-maroon-dark/80 via-maroon-dark/20 to-transparent" />

          {/* Source badge — top left */}
          <div className="absolute left-4 top-4 flex items-center gap-2">
            <span
              className={cn(
                "rounded-md px-2.5 py-1 font-[family-name:var(--font-satoshi)] text-[10px] font-bold uppercase tracking-wider shadow-sm",
                getSourceColor(article.source)
              )}
            >
              {article.source}
            </span>
          </div>

          {/* Category + Featured badges — top right */}
          <div className="absolute right-4 top-4 flex items-center gap-2">
            <span
              className={cn(
                "rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm",
                CATEGORY_COLORS[article.category]
              )}
            >
              {article.category.replace("-", " ")}
            </span>
          </div>

          {/* Bottom overlay content */}
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <h3 className="line-clamp-2 font-[family-name:var(--font-playfair)] text-xl font-bold leading-tight text-cream group-hover:text-gold-bright">
              {article.title}
            </h3>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <p className="line-clamp-2 font-[family-name:var(--font-satoshi)] text-sm leading-relaxed text-cream/60">
            {article.excerpt}
          </p>

          {/* Meta row */}
          <div className="mt-4 flex items-center justify-between border-t border-cream/10 pt-3">
            <div className="flex items-center gap-4 font-[family-name:var(--font-satoshi)] text-xs text-cream/40">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-3 w-3" />
                {new Date(article.date).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </span>
              <span className="flex items-center gap-1.5">
                <User className="h-3 w-3" />
                {article.author}
              </span>
            </div>
            {article.sourceUrl && (
              <span className="flex items-center gap-1 font-[family-name:var(--font-satoshi)] text-[10px] font-medium uppercase tracking-wider text-gold/50 transition-colors group-hover:text-gold-bright">
                Read Article
                <ArrowUpRight className="h-3 w-3" />
              </span>
            )}
          </div>
        </div>
      </motion.div>
    </CardWrapper>
  );
}

/* ── Article Card — regular grid item ── */
function ArticleCard({ article }: { article: NewsArticle }) {
  const CardWrapper = article.sourceUrl ? "a" : "div";
  const cardProps = article.sourceUrl
    ? {
        href: article.sourceUrl,
        target: "_blank" as const,
        rel: "noopener noreferrer",
      }
    : {};

  return (
    <CardWrapper {...cardProps} className="group block">
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
        className="h-full overflow-hidden rounded-2xl border border-gold/10 bg-cream-light shadow-sm transition-shadow duration-300 hover:border-gold/20 hover:shadow-md"
      >
        {/* Image with source badge */}
        <div className="relative h-40 overflow-hidden">
          {article.image ? (
            <Image
              src={article.image}
              alt={article.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, 33vw"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-saffron/5 to-gold/5">
              <Newspaper className="h-10 w-10 text-charcoal-light/10" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

          {/* Source badge */}
          <div className="absolute left-3 top-3">
            <span
              className={cn(
                "rounded-md px-2 py-0.5 font-[family-name:var(--font-satoshi)] text-[9px] font-bold uppercase tracking-wider shadow-sm",
                getSourceColor(article.source)
              )}
            >
              {article.source}
            </span>
          </div>

          {/* Category badge */}
          <div className="absolute right-3 top-3">
            <span
              className={cn(
                "rounded-full border px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider backdrop-blur-sm",
                CATEGORY_COLORS[article.category]
              )}
            >
              {article.category.replace("-", " ")}
            </span>
          </div>

          {/* External link indicator */}
          {article.sourceUrl && (
            <div className="absolute bottom-3 right-3 flex h-7 w-7 items-center justify-center rounded-full bg-white/90 opacity-0 shadow-sm transition-opacity duration-200 group-hover:opacity-100">
              <ExternalLink className="h-3.5 w-3.5 text-maroon" />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-col p-4">
          <h3 className="line-clamp-2 font-[family-name:var(--font-playfair)] text-sm font-bold leading-snug text-maroon-dark group-hover:text-saffron">
            {article.title}
          </h3>

          <p className="mt-2 line-clamp-2 font-[family-name:var(--font-satoshi)] text-xs leading-relaxed text-charcoal-light/70">
            {article.excerpt}
          </p>

          {/* Byline + date */}
          <div className="mt-3 flex items-center gap-2 border-t border-gold/8 pt-3">
            <div className="flex flex-1 flex-col gap-0.5">
              <span className="font-[family-name:var(--font-satoshi)] text-[11px] font-medium text-maroon-dark/80">
                {article.author}
              </span>
              <span className="font-[family-name:var(--font-satoshi)] text-[10px] text-charcoal-light/50">
                {new Date(article.date).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>
            {article.sourceUrl && (
              <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-charcoal-light/30 transition-colors group-hover:text-saffron" />
            )}
          </div>

          {/* Related activity link */}
          {article.relatedActivitySlug && (
            <Link
              href={`/activities/${article.relatedActivitySlug}`}
              className="mt-2 flex items-center gap-1.5 rounded-lg bg-saffron/5 px-2.5 py-1.5 font-[family-name:var(--font-satoshi)] text-[10px] font-medium text-saffron transition-colors hover:bg-saffron/10"
              onClick={(e) => e.stopPropagation()}
            >
              <BookOpen className="h-3 w-3" />
              View Related Event
            </Link>
          )}
        </div>
      </motion.div>
    </CardWrapper>
  );
}

export function NewsGrid() {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>("all");

  const featured = useMemo(
    () => NEWS_ARTICLES.filter((a) => a.featured),
    []
  );

  const filteredArticles = useMemo(() => {
    return NEWS_ARTICLES.filter((article) => {
      if (article.featured) return false;

      const matchesSearch =
        searchQuery === "" ||
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.titleHi.includes(searchQuery) ||
        article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.source.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        categoryFilter === "all" || article.category === categoryFilter;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, categoryFilter]);

  const categories: { value: CategoryFilter; label: string }[] = [
    { value: "all", label: "All" },
    { value: "press", label: "Press" },
    { value: "media", label: "Media" },
    { value: "court-update", label: "Court Updates" },
    { value: "vhp-update", label: "VHP Updates" },
    { value: "article", label: "Articles" },
  ];

  /* Unique source names for the source bar */
  const sources = useMemo(() => {
    const set = new Set<string>();
    NEWS_ARTICLES.forEach((a) => set.add(a.source));
    return Array.from(set);
  }, []);

  return (
    <section className="section-padding bg-cream">
      <div className="container-default">
        {/* Source ticker */}
        <ScrollReveal>
          <div className="mb-10 rounded-xl border border-gold/10 bg-white p-4 shadow-sm">
            <p className="mb-3 font-[family-name:var(--font-satoshi)] text-[10px] font-bold uppercase tracking-[0.2em] text-charcoal-light/50">
              As covered by
            </p>
            <div className="flex flex-wrap gap-2">
              {sources.map((source) => (
                <span
                  key={source}
                  className={cn(
                    "rounded-md px-3 py-1 font-[family-name:var(--font-satoshi)] text-[10px] font-bold uppercase tracking-wider",
                    getSourceColor(source)
                  )}
                >
                  {source}
                </span>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Featured Articles */}
        {featured.length > 0 && (
          <ScrollReveal>
            <div className="mb-12">
              <div className="mb-6 flex items-center gap-3">
                <div className="h-8 w-1 rounded-full bg-saffron" />
                <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-maroon-dark">
                  Featured Coverage
                </h2>
              </div>
              <div className="grid gap-6 lg:grid-cols-3">
                {featured.map((article, i) => (
                  <div
                    key={article.id}
                    className={i === 0 ? "lg:col-span-2 lg:row-span-2" : ""}
                  >
                    <FeaturedCard article={article} />
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        )}

        {/* Filters */}
        <ScrollReveal>
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative max-w-md flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-charcoal-light/50" />
              <input
                type="text"
                placeholder="Search articles, sources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-gold/15 bg-cream-light py-2.5 pl-10 pr-4 font-[family-name:var(--font-satoshi)] text-sm text-charcoal placeholder:text-charcoal-light/40 focus:border-saffron/30 focus:outline-none focus:ring-2 focus:ring-saffron/10"
              />
            </div>

            <p className="font-[family-name:var(--font-satoshi)] text-xs text-charcoal-light/50">
              {filteredArticles.length} article
              {filteredArticles.length !== 1 ? "s" : ""}
            </p>
          </div>

          {/* Category pills */}
          <div className="mb-6 flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setCategoryFilter(cat.value)}
                className={cn(
                  "rounded-full px-4 py-1.5 font-[family-name:var(--font-satoshi)] text-xs font-medium transition-all",
                  categoryFilter === cat.value
                    ? "bg-saffron text-white shadow-sm"
                    : "bg-gold/8 text-charcoal-light hover:bg-gold/15"
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Articles Grid */}
        <AnimatePresence mode="popLayout">
          <motion.div
            key="news-grid"
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filteredArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </motion.div>
        </AnimatePresence>

        {filteredArticles.length === 0 && (
          <div className="py-20 text-center">
            <Newspaper className="mx-auto h-12 w-12 text-charcoal-light/20" />
            <p className="mt-4 font-[family-name:var(--font-satoshi)] text-base text-charcoal-light">
              No articles found matching your filters.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
