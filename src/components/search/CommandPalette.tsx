"use client";

import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import {
  Search,
  X,
  Home,
  Info,
  Map,
  Calendar,
  Scale,
  BookOpen,
  Newspaper,
  Users,
  Phone,
  FileText,
  Gavel,
  ArrowRight,
  Command,
} from "lucide-react";
import { CASES, type CaseData } from "@/lib/mock-data";
import { JUDGMENTS, type Judgment } from "@/lib/mock-data";
import { NEWS_ARTICLES, type NewsArticle } from "@/lib/mock-data";
import { TEAM_MEMBERS, type TeamMember } from "@/lib/mock-data";

/* ─── Types ─── */
interface SearchResult {
  id: string;
  title: string;
  subtitle: string;
  href: string;
  category: SearchCategory;
  icon: React.ReactNode;
}

type SearchCategory = "Pages" | "Cases" | "Judgments" | "News" | "Team";

const CATEGORY_ORDER: SearchCategory[] = [
  "Pages",
  "Cases",
  "Judgments",
  "News",
  "Team",
];

const CATEGORY_COLORS: Record<SearchCategory, string> = {
  Pages: "bg-saffron/20 text-saffron-bright",
  Cases: "bg-blue-500/20 text-blue-400",
  Judgments: "bg-emerald-500/20 text-emerald-400",
  News: "bg-amber-500/20 text-amber-400",
  Team: "bg-purple-500/20 text-purple-400",
};

/* ─── Static Page Routes ─── */
const PAGES: SearchResult[] = [
  {
    id: "page-home",
    title: "Home",
    subtitle: "Main landing page",
    href: "/",
    category: "Pages",
    icon: <Home className="h-4 w-4" />,
  },
  {
    id: "page-about",
    title: "About Us",
    subtitle: "Vision, mission, and history",
    href: "/about",
    category: "Pages",
    icon: <Info className="h-4 w-4" />,
  },
  {
    id: "page-structure",
    title: "Organizational Structure",
    subtitle: "National to Region to Prant to Court",
    href: "/about/structure",
    category: "Pages",
    icon: <Users className="h-4 w-4" />,
  },
  {
    id: "page-map",
    title: "India Map",
    subtitle: "Interactive drilldown map of legal presence",
    href: "/map",
    category: "Pages",
    icon: <Map className="h-4 w-4" />,
  },
  {
    id: "page-activities",
    title: "Activities",
    subtitle: "Events, seminars, and legal camps",
    href: "/activities",
    category: "Pages",
    icon: <Calendar className="h-4 w-4" />,
  },
  {
    id: "page-calendar",
    title: "Event Calendar",
    subtitle: "Monthly event calendar view",
    href: "/activities/calendar",
    category: "Pages",
    icon: <Calendar className="h-4 w-4" />,
  },
  {
    id: "page-gallery",
    title: "Photo Gallery",
    subtitle: "Event photo gallery",
    href: "/activities/gallery",
    category: "Pages",
    icon: <FileText className="h-4 w-4" />,
  },
  {
    id: "page-cases",
    title: "Cases",
    subtitle: "Track ongoing and disposed cases",
    href: "/cases",
    category: "Pages",
    icon: <Scale className="h-4 w-4" />,
  },
  {
    id: "page-case-stats",
    title: "Case Statistics",
    subtitle: "Analytics and charts",
    href: "/cases/stats",
    category: "Pages",
    icon: <Scale className="h-4 w-4" />,
  },
  {
    id: "page-judgments",
    title: "Judgment Library",
    subtitle: "Landmark judgments and legal references",
    href: "/judgments",
    category: "Pages",
    icon: <BookOpen className="h-4 w-4" />,
  },
  {
    id: "page-news",
    title: "News & Media",
    subtitle: "Latest press releases and court updates",
    href: "/news",
    category: "Pages",
    icon: <Newspaper className="h-4 w-4" />,
  },
  {
    id: "page-pillars",
    title: "Our Team",
    subtitle: "Leadership and advocates directory",
    href: "/pillars",
    category: "Pages",
    icon: <Users className="h-4 w-4" />,
  },
  {
    id: "page-resources",
    title: "Resources",
    subtitle: "Legal documents, forms, and downloads",
    href: "/resources",
    category: "Pages",
    icon: <FileText className="h-4 w-4" />,
  },
  {
    id: "page-contact",
    title: "Contact",
    subtitle: "Get in touch with VHP Legal Cell",
    href: "/contact",
    category: "Pages",
    icon: <Phone className="h-4 w-4" />,
  },
];

/* ─── Build Searchable Items ─── */
function buildCaseResults(cases: CaseData[]): SearchResult[] {
  return cases.map((c) => ({
    id: `case-${c.id}`,
    title: c.title,
    subtitle: `${c.court} — ${c.caseNumber}`,
    href: `/cases/${c.slug}`,
    category: "Cases" as const,
    icon: <Scale className="h-4 w-4" />,
  }));
}

function buildJudgmentResults(judgments: Judgment[]): SearchResult[] {
  return judgments.map((j) => ({
    id: `judgment-${j.id}`,
    title: j.caseName,
    subtitle: `${j.court} — ${j.date}`,
    href: `/judgments/${j.slug}`,
    category: "Judgments" as const,
    icon: <Gavel className="h-4 w-4" />,
  }));
}

function buildNewsResults(articles: NewsArticle[]): SearchResult[] {
  return articles.map((n) => ({
    id: `news-${n.id}`,
    title: n.title,
    subtitle: `${n.category} — ${n.date}`,
    href: `/news/${n.slug}`,
    category: "News" as const,
    icon: <Newspaper className="h-4 w-4" />,
  }));
}

function buildTeamResults(members: TeamMember[]): SearchResult[] {
  return members.map((m) => ({
    id: `team-${m.id}`,
    title: m.name,
    subtitle: m.designation,
    href: `/pillars/${m.slug}`,
    category: "Team" as const,
    icon: <Users className="h-4 w-4" />,
  }));
}

/* ─── Search / Filter Logic ─── */
const MAX_PER_CATEGORY = 3;

function filterResults(
  allResults: SearchResult[],
  query: string
): Record<SearchCategory, SearchResult[]> {
  const normalizedQuery = query.toLowerCase().trim();
  const grouped: Record<string, SearchResult[]> = {};

  for (const category of CATEGORY_ORDER) {
    grouped[category] = [];
  }

  if (!normalizedQuery) {
    grouped["Pages"] = PAGES.slice(0, MAX_PER_CATEGORY);
    return grouped as Record<SearchCategory, SearchResult[]>;
  }

  for (const result of allResults) {
    const matches =
      result.title.toLowerCase().includes(normalizedQuery) ||
      result.subtitle.toLowerCase().includes(normalizedQuery);

    if (matches) {
      const existing = grouped[result.category] ?? [];
      if (existing.length < MAX_PER_CATEGORY) {
        grouped[result.category] = [...existing, result];
      }
    }
  }

  return grouped as Record<SearchCategory, SearchResult[]>;
}

function countResults(grouped: Record<SearchCategory, SearchResult[]>): number {
  let total = 0;
  for (const results of Object.values(grouped)) {
    total += results.length;
  }
  return total;
}

/* ─── Animation Variants ─── */
const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.95, y: -20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.2,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: -20,
    transition: {
      duration: 0.15,
      ease: [0.4, 0, 1, 1] as [number, number, number, number],
    },
  },
};

const resultVariants = {
  hidden: { opacity: 0, x: -8 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.02,
      duration: 0.2,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  }),
};

/* ─── CommandPalette Component ─── */
export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Build all searchable items (memoized since data is static)
  const allResults = useMemo<SearchResult[]>(
    () => [
      ...PAGES,
      ...buildCaseResults(CASES),
      ...buildJudgmentResults(JUDGMENTS),
      ...buildNewsResults(NEWS_ARTICLES),
      ...buildTeamResults(TEAM_MEMBERS),
    ],
    []
  );

  // Filter results based on query
  const groupedResults = useMemo(
    () => filterResults(allResults, query),
    [allResults, query]
  );

  // Flatten grouped results for keyboard navigation
  const flatResults = useMemo(() => {
    const flat: SearchResult[] = [];
    for (const category of CATEGORY_ORDER) {
      const items = groupedResults[category] ?? [];
      flat.push(...items);
    }
    return flat;
  }, [groupedResults]);

  const totalCount = countResults(groupedResults);

  // Reset state when opening/closing
  const open = useCallback(() => {
    setIsOpen(true);
    setQuery("");
    setActiveIndex(0);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    setQuery("");
    setActiveIndex(0);
  }, []);

  // Navigate to selected result
  const navigateTo = useCallback(
    (href: string) => {
      close();
      router.push(href);
    },
    [close, router]
  );

  // Global keyboard shortcut: Cmd+K / Ctrl+K
  useEffect(() => {
    function handleGlobalKeydown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) {
          close();
        } else {
          open();
        }
      }
    }

    window.addEventListener("keydown", handleGlobalKeydown);
    return () => window.removeEventListener("keydown", handleGlobalKeydown);
  }, [isOpen, open, close]);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      // Small delay to allow animation to start
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Reset active index when results change
  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  // Keyboard navigation inside modal
  const handleKeydown = useCallback(
    (e: React.KeyboardEvent) => {
      switch (e.key) {
        case "ArrowDown": {
          e.preventDefault();
          setActiveIndex((prev) =>
            prev < flatResults.length - 1 ? prev + 1 : 0
          );
          break;
        }
        case "ArrowUp": {
          e.preventDefault();
          setActiveIndex((prev) =>
            prev > 0 ? prev - 1 : flatResults.length - 1
          );
          break;
        }
        case "Enter": {
          e.preventDefault();
          const selected = flatResults[activeIndex];
          if (selected) {
            navigateTo(selected.href);
          }
          break;
        }
        case "Escape": {
          e.preventDefault();
          close();
          break;
        }
      }
    },
    [flatResults, activeIndex, navigateTo, close]
  );

  // Scroll active item into view
  useEffect(() => {
    if (!listRef.current) return;
    const activeEl = listRef.current.querySelector(
      `[data-index="${activeIndex}"]`
    );
    if (activeEl) {
      activeEl.scrollIntoView({ block: "nearest" });
    }
  }, [activeIndex]);

  // Expose open function globally for other components
  useEffect(() => {
    (window as unknown as Record<string, unknown>).__openCommandPalette = open;
    return () => {
      delete (window as unknown as Record<string, unknown>).__openCommandPalette;
    };
  }, [open]);

  // Track flat index for rendering
  let flatIndex = -1;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* ─── Backdrop ─── */}
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-[9998] bg-maroon-dark/60 backdrop-blur-sm"
            onClick={close}
            aria-hidden="true"
          />

          {/* ─── Modal ─── */}
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-[9999] flex items-start justify-center px-4 pt-[15vh]"
            role="dialog"
            aria-modal="true"
            aria-label="Search command palette"
            onKeyDown={handleKeydown}
          >
            <div
              className={cn(
                "w-full max-w-lg overflow-hidden rounded-2xl border shadow-2xl",
                "border-gold/15 bg-cream-light",
                "shadow-maroon/20"
              )}
            >
              {/* ─── Search Input ─── */}
              <div className="flex items-center gap-3 border-b border-gold/15 px-4 py-3">
                <Search className="h-5 w-5 shrink-0 text-maroon/50" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search pages, cases, judgments, news, team..."
                  className={cn(
                    "flex-1 bg-transparent text-sm text-maroon placeholder:text-maroon/40",
                    "font-[family-name:var(--font-satoshi)] font-medium",
                    "outline-none"
                  )}
                  aria-label="Search across all content"
                  autoComplete="off"
                  spellCheck={false}
                />
                <button
                  onClick={close}
                  className="flex items-center gap-1 rounded-md border border-gold/20 bg-cream/80 px-2 py-1 text-[10px] font-medium text-maroon/60 transition-colors hover:border-gold/30 hover:text-maroon"
                >
                  ESC
                </button>
              </div>

              {/* ─── Results ─── */}
              <div
                ref={listRef}
                className="max-h-[50vh] overflow-y-auto overscroll-contain p-2"
                role="listbox"
              >
                {totalCount === 0 && query.trim() !== "" ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <Search className="mb-3 h-8 w-8 text-maroon/20" />
                    <p className="font-[family-name:var(--font-satoshi)] text-sm font-medium text-maroon/60">
                      No results found
                    </p>
                    <p className="mt-1 font-[family-name:var(--font-satoshi)] text-xs text-maroon/40">
                      Try a different search term
                    </p>
                  </div>
                ) : (
                  CATEGORY_ORDER.map((category) => {
                    const items = groupedResults[category] ?? [];
                    if (items.length === 0) return null;

                    return (
                      <div key={category} className="mb-2 last:mb-0">
                        {/* Category Header */}
                        <div className="mb-1 flex items-center gap-2 px-3 py-1.5">
                          <span
                            className={cn(
                              "font-[family-name:var(--font-satoshi)] text-[10px] font-bold uppercase tracking-wider",
                              "text-maroon/40"
                            )}
                          >
                            {category}
                          </span>
                          <div className="h-px flex-1 bg-gold/10" />
                        </div>

                        {/* Category Items */}
                        {items.map((result) => {
                          flatIndex += 1;
                          const currentIndex = flatIndex;
                          const isActive = currentIndex === activeIndex;

                          return (
                            <motion.button
                              key={result.id}
                              custom={currentIndex}
                              variants={resultVariants}
                              initial="hidden"
                              animate="visible"
                              data-index={currentIndex}
                              role="option"
                              aria-selected={isActive}
                              onClick={() => navigateTo(result.href)}
                              onMouseEnter={() => setActiveIndex(currentIndex)}
                              className={cn(
                                "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors duration-100",
                                isActive
                                  ? "bg-maroon/8 ring-1 ring-gold/15"
                                  : "hover:bg-maroon/5"
                              )}
                            >
                              {/* Icon */}
                              <div
                                className={cn(
                                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg",
                                  isActive
                                    ? "bg-saffron/15 text-saffron-bright"
                                    : "bg-maroon/5 text-maroon/40"
                                )}
                              >
                                {result.icon}
                              </div>

                              {/* Text */}
                              <div className="min-w-0 flex-1">
                                <p
                                  className={cn(
                                    "truncate font-[family-name:var(--font-playfair)] text-sm font-semibold",
                                    isActive ? "text-maroon" : "text-maroon/80"
                                  )}
                                >
                                  {result.title}
                                </p>
                                <p
                                  className={cn(
                                    "truncate font-[family-name:var(--font-satoshi)] text-xs",
                                    isActive
                                      ? "text-maroon/60"
                                      : "text-maroon/40"
                                  )}
                                >
                                  {result.subtitle}
                                </p>
                              </div>

                              {/* Category Badge */}
                              <span
                                className={cn(
                                  "shrink-0 rounded-md px-2 py-0.5 font-[family-name:var(--font-satoshi)] text-[10px] font-bold",
                                  CATEGORY_COLORS[result.category]
                                )}
                              >
                                {result.category}
                              </span>

                              {/* Arrow for active item */}
                              {isActive && (
                                <ArrowRight className="h-3.5 w-3.5 shrink-0 text-saffron-bright" />
                              )}
                            </motion.button>
                          );
                        })}
                      </div>
                    );
                  })
                )}
              </div>

              {/* ─── Footer Hints ─── */}
              <div className="flex items-center justify-between border-t border-gold/15 px-4 py-2.5">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <kbd className="flex h-5 min-w-[20px] items-center justify-center rounded border border-gold/20 bg-cream/80 px-1 font-[family-name:var(--font-mono)] text-[10px] text-maroon/50">
                      &uarr;
                    </kbd>
                    <kbd className="flex h-5 min-w-[20px] items-center justify-center rounded border border-gold/20 bg-cream/80 px-1 font-[family-name:var(--font-mono)] text-[10px] text-maroon/50">
                      &darr;
                    </kbd>
                    <span className="font-[family-name:var(--font-satoshi)] text-[10px] text-maroon/40">
                      Navigate
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <kbd className="flex h-5 items-center justify-center rounded border border-gold/20 bg-cream/80 px-1.5 font-[family-name:var(--font-mono)] text-[10px] text-maroon/50">
                      &crarr;
                    </kbd>
                    <span className="font-[family-name:var(--font-satoshi)] text-[10px] text-maroon/40">
                      Open
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <kbd className="flex h-5 items-center justify-center rounded border border-gold/20 bg-cream/80 px-1.5 font-[family-name:var(--font-mono)] text-[10px] text-maroon/50">
                      Esc
                    </kbd>
                    <span className="font-[family-name:var(--font-satoshi)] text-[10px] text-maroon/40">
                      Close
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-maroon/30">
                  <Command className="h-3 w-3" />
                  <span className="font-[family-name:var(--font-satoshi)] text-[10px]">
                    K
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/* ─── Helper to open the command palette from anywhere ─── */
export function openCommandPalette() {
  const opener = (window as unknown as Record<string, unknown>)
    .__openCommandPalette;
  if (typeof opener === "function") {
    (opener as () => void)();
  }
}
