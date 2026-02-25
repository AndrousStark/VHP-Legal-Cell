"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";
import { cn, assetPath } from "@/lib/utils";
import {
  Scale,
  Map,
  Calendar,
  BookOpen,
  Newspaper,
  Users,
  Phone,
  FileText,
  Menu,
  X,
  Search,
  Globe,
  ChevronDown,
} from "lucide-react";
import { openCommandPalette } from "@/components/search/CommandPalette";

/* ─── Types ─── */
interface NavItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
  children?: {
    label: string;
    href: string;
    description?: string;
  }[];
}

/* ─── Language Toggle ─── */
function LanguageToggle({ pathname }: { pathname: string }) {
  const locale = useLocale();
  const targetLocale = locale === "hi" ? "en" : "hi";

  return (
    <Link
      href={pathname}
      locale={targetLocale}
      className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-cream/70 transition-colors hover:text-cream hover:bg-cream/5"
    >
      <Globe className="h-4 w-4" />
      <span className="hidden sm:inline">
        {locale === "hi" ? "EN" : "हिं"}
      </span>
    </Link>
  );
}

/* ─── Navigation Config ─── */
function useNavItems(): NavItem[] {
  const t = useTranslations("nav");

  return [
    { label: t("home"), href: "/" },
    {
      label: t("about"),
      href: "/about",
      children: [
        { label: t("aboutVHP"), href: "/about", description: "Vision, mission, and history" },
        { label: t("structure"), href: "/about/structure", description: "National → Region → Prant → Court" },
      ],
    },
    { label: t("map"), href: "/map", icon: <Map className="h-4 w-4" /> },
    {
      label: t("activities"),
      href: "/activities",
      children: [
        { label: t("activitiesAll"), href: "/activities", description: "Table view with filters" },
        { label: t("calendar"), href: "/activities/calendar", description: "Monthly event calendar" },
        { label: t("gallery"), href: "/activities/gallery", description: "Event photo gallery" },
      ],
    },
    {
      label: t("cases"),
      href: "/cases",
      icon: <Scale className="h-4 w-4" />,
      children: [
        { label: t("casesAll"), href: "/cases", description: "Track ongoing and disposed cases" },
        { label: t("caseStats"), href: "/cases/stats", description: "Analytics and charts" },
      ],
    },
    { label: t("judgments"), href: "/judgments", icon: <BookOpen className="h-4 w-4" /> },
    { label: t("news"), href: "/news", icon: <Newspaper className="h-4 w-4" /> },
    { label: t("pillars"), href: "/pillars", icon: <Users className="h-4 w-4" /> },
    { label: t("resources"), href: "/resources", icon: <FileText className="h-4 w-4" /> },
    { label: t("contact"), href: "/contact", icon: <Phone className="h-4 w-4" /> },
  ];
}

/* ─── Header Component ─── */
export function Header() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const navItems = useNavItems();

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  const handleDropdownEnter = useCallback((label: string) => {
    setActiveDropdown(label);
  }, []);

  const handleDropdownLeave = useCallback(() => {
    setActiveDropdown(null);
  }, []);

  return (
    <header
      className={cn(
        "fixed left-0 right-0 z-[200] transition-all duration-300",
        scrolled ? "top-0" : "top-9",
        scrolled
          ? "h-14 bg-maroon-dark/95 backdrop-blur-xl shadow-lg"
          : "h-20 bg-transparent"
      )}
    >
      <div className="container-wide flex h-full items-center justify-between">
        {/* ─── Logo ─── */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <div className="flex items-center gap-1.5">
            <div className={cn("relative overflow-hidden rounded-full border border-gold/30 transition-all duration-300", scrolled ? "h-8 w-8" : "h-10 w-10")}>
              <Image src={assetPath("/images/vhp-logo.jpg")} alt="VHP" fill className="object-cover" sizes="40px" />
            </div>
            <div className={cn("relative transition-all duration-300", scrolled ? "h-7 w-7" : "h-9 w-9")}>
              <Image src={assetPath("/images/legal-logo.png")} alt="Legal Cell" fill className="object-contain" sizes="36px" />
            </div>
          </div>
          <div className={cn("transition-all duration-300", scrolled ? "hidden lg:block" : "block")}>
            <span className="block font-[family-name:var(--font-playfair)] text-sm font-bold leading-tight text-cream">
              VHP Legal Cell
            </span>
            <span className="block font-[family-name:var(--font-noto-serif)] text-xs text-gold/80">
              विधि प्रकोष्ठ
            </span>
          </div>
        </Link>

        {/* ─── Desktop Navigation ─── */}
        <nav className="hidden xl:flex items-center gap-1">
          {navItems.map((item) => (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => item.children && handleDropdownEnter(item.label)}
              onMouseLeave={handleDropdownLeave}
            >
              <Link
                href={item.href}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                  pathname === item.href
                    ? "text-gold-bright bg-gold/10"
                    : "text-cream/80 hover:text-cream hover:bg-cream/5"
                )}
              >
                {item.label}
                {item.children && (
                  <ChevronDown
                    className={cn(
                      "h-3.5 w-3.5 transition-transform duration-200",
                      activeDropdown === item.label && "rotate-180"
                    )}
                  />
                )}
              </Link>

              {/* ─── Mega Menu Dropdown ─── */}
              <AnimatePresence>
                {item.children && activeDropdown === item.label && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute top-full left-0 mt-1 min-w-[280px] rounded-xl border border-gold/10 bg-maroon-dark/95 p-2 shadow-xl backdrop-blur-xl"
                  >
                    {item.children.map((child, i) => (
                      <motion.div
                        key={child.href}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.03, duration: 0.2 }}
                      >
                        <Link
                          href={child.href}
                          className="flex flex-col gap-0.5 rounded-lg px-4 py-3 transition-colors duration-150 hover:bg-cream/5"
                        >
                          <span className="text-sm font-medium text-cream">{child.label}</span>
                          {child.description && (
                            <span className="text-xs text-cream/50">{child.description}</span>
                          )}
                        </Link>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </nav>

        {/* ─── Right Actions ─── */}
        <div className="flex items-center gap-2">
          {/* Language Toggle */}
          <LanguageToggle pathname={pathname} />

          {/* Search — opens Command Palette */}
          <button
            onClick={openCommandPalette}
            className="flex items-center justify-center rounded-lg p-2 text-cream/70 transition-colors hover:text-cream hover:bg-cream/5"
            aria-label="Search (Ctrl+K)"
          >
            <Search className="h-5 w-5" />
          </button>

          {/* Login */}
          <Link
            href="/login"
            className="hidden sm:flex items-center gap-2 rounded-lg bg-saffron-bright/90 px-4 py-2 text-sm font-semibold text-white transition-all duration-200 hover:bg-saffron-bright hover:shadow-lg hover:shadow-saffron-bright/20"
          >
            {t("login")}
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex xl:hidden items-center justify-center rounded-lg p-2 text-cream/80 hover:bg-cream/5"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* ─── Mobile Drawer ─── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[-1] bg-black/50"
              onClick={() => setMobileOpen(false)}
            />

            {/* Drawer */}
            <motion.nav
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 z-[1] w-[85vw] max-w-sm overflow-y-auto bg-maroon-dark p-6 shadow-2xl"
            >
              <div className="mb-8 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="relative h-8 w-8 overflow-hidden rounded-full border border-gold/30">
                    <Image src={assetPath("/images/vhp-logo.jpg")} alt="VHP" fill className="object-cover" sizes="32px" />
                  </div>
                  <div className="relative h-7 w-7">
                    <Image src={assetPath("/images/legal-logo.png")} alt="Legal Cell" fill className="object-contain" sizes="28px" />
                  </div>
                  <span className="font-[family-name:var(--font-playfair)] text-sm font-bold text-cream">
                    VHP Legal Cell
                  </span>
                </div>
                <button onClick={() => setMobileOpen(false)} aria-label="Close menu">
                  <X className="h-6 w-6 text-cream/80" />
                </button>
              </div>

              <div className="flex flex-col gap-1">
                {navItems.map((item) => (
                  <div key={item.label}>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-4 py-3 text-base font-medium transition-colors",
                        pathname === item.href
                          ? "bg-saffron/10 text-gold-bright"
                          : "text-cream/80 hover:bg-cream/5 hover:text-cream"
                      )}
                    >
                      {item.icon}
                      {item.label}
                    </Link>

                    {/* Sub-items */}
                    {item.children && (
                      <div className="ml-6 border-l border-gold/10 pl-4">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block rounded-lg px-3 py-2 text-sm text-cream/60 transition-colors hover:text-cream"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Mobile Login */}
              <div className="mt-8 border-t border-gold/10 pt-6">
                <Link
                  href="/login"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-saffron-bright py-3 text-base font-semibold text-white"
                >
                  {t("login")}
                </Link>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
