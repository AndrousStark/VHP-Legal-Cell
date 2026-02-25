"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import { ArrowUp, MapPin, Phone, Mail } from "lucide-react";

const quickLinks = [
  { href: "/about", labelKey: "about" },
  { href: "/map", labelKey: "map" },
  { href: "/cases", labelKey: "cases" },
  { href: "/judgments", labelKey: "judgments" },
  { href: "/activities", labelKey: "activities" },
  { href: "/pillars", labelKey: "pillars" },
];

const legalLinks = [
  { href: "/resources", labelKey: "resources" },
  { href: "/news", labelKey: "news" },
  { href: "/contact", labelKey: "contact" },
];

export function Footer() {
  const t = useTranslations("footer");
  const nav = useTranslations("nav");

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-maroon-dark text-cream/80">
      {/* Decorative top border */}
      <div className="h-1 bg-gradient-to-r from-saffron via-gold to-saffron" />

      {/* Subtle background texture */}
      <div className="absolute inset-0 pointer-events-none">
        <Image
          src="/images/golden-om.jpg"
          alt=""
          fill
          className="object-cover opacity-[0.03]"
          sizes="100vw"
        />
      </div>

      <div className="container-wide relative z-10 py-16">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Column 1 — Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div className="relative h-11 w-11 overflow-hidden rounded-full border border-gold/30">
                  <Image src="/images/vhp-logo.jpg" alt="VHP" fill className="object-cover" sizes="44px" />
                </div>
                <div className="relative h-10 w-10">
                  <Image src="/images/legal-logo.png" alt="Legal Cell" fill className="object-contain" sizes="40px" />
                </div>
              </div>
              <div>
                <span className="block font-[family-name:var(--font-playfair)] text-base font-bold text-cream">
                  VHP Legal Cell
                </span>
                <span className="block font-[family-name:var(--font-noto-serif)] text-xs text-gold/80">
                  विश्व हिन्दू परिषद — विधि प्रकोष्ठ
                </span>
              </div>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-cream/60">
              धर्मो रक्षति रक्षितः — Dharma protects those who protect it.
              We serve Hindu legal rights across India through advocacy, awareness, and justice.
            </p>
          </div>

          {/* Column 2 — Quick Links */}
          <div>
            <h4 className="mb-4 font-[family-name:var(--font-playfair)] text-sm font-bold uppercase tracking-wider text-gold">
              {t("quickLinks")}
            </h4>
            <ul className="flex flex-col gap-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-cream/60 transition-colors duration-200 hover:text-gold-bright"
                  >
                    {nav(link.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Legal Pages */}
          <div>
            <h4 className="mb-4 font-[family-name:var(--font-playfair)] text-sm font-bold uppercase tracking-wider text-gold">
              {t("legalPages")}
            </h4>
            <ul className="flex flex-col gap-2.5">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-cream/60 transition-colors duration-200 hover:text-gold-bright"
                  >
                    {nav(link.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 — Contact */}
          <div>
            <h4 className="mb-4 font-[family-name:var(--font-playfair)] text-sm font-bold uppercase tracking-wider text-gold">
              {t("contactInfo")}
            </h4>
            <ul className="flex flex-col gap-3">
              <li className="flex items-start gap-2 text-sm text-cream/60">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-saffron" />
                <span>VHP Legal Cell Office, New Delhi, India</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-cream/60">
                <Phone className="h-4 w-4 shrink-0 text-saffron" />
                <span>+91 XXXXX XXXXX</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-cream/60">
                <Mail className="h-4 w-4 shrink-0 text-saffron" />
                <span>legal@vhp.org</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-cream/10 pt-8 sm:flex-row">
          <p className="text-xs text-cream/40">
            {t("copyright", { year: new Date().getFullYear() })}
          </p>
          <a
            href="https://metaminds.firm.in"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2.5 text-sm text-cream/40 transition-colors duration-200 hover:text-gold-bright"
          >
            <span className="text-sm">Made by</span>
            <span className="relative h-10 w-10 overflow-hidden rounded">
              <Image
                src="/images/metaminds-logo.jpg"
                alt="MetaMinds"
                fill
                className="object-contain transition-transform duration-200 group-hover:scale-110"
                sizes="40px"
              />
            </span>
            <span className="text-sm font-bold tracking-wide">MetaMinds</span>
          </a>
        </div>
      </div>

      {/* Back to top */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-saffron-bright text-white shadow-lg shadow-saffron-bright/30 transition-transform duration-300 hover:scale-110"
        aria-label="Back to top"
      >
        <ArrowUp className="h-5 w-5" />
      </button>
    </footer>
  );
}
