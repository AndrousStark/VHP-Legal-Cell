"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { FlipWords } from "@/components/animations/FlipWords";
import { assetPath } from "@/lib/utils";
import { Scale, ArrowRight, Users } from "lucide-react";
import Image from "next/image";

/* ─── Deterministic particles (avoid Math.random during render / SSR) ─── */
const PARTICLES = Array.from({ length: 20 }, (_, i) => ({
  size: ((i * 7 + 3) % 4) + 2,
  left: ((i * 17 + 11) % 100),
  top: ((i * 23 + 7) % 100),
  duration: ((i * 3 + 4) % 4) + 4,
  delay: ((i * 5) % 4),
}));

/* ─── Aurora Background ─── */
function AuroraBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-[linear-gradient(135deg,#3D0F0F_0%,#6B1D1D_40%,#B35A1F_100%)]" />

      {/* Animated aurora blobs */}
      <div className="absolute inset-0 opacity-30">
        <div
          className="absolute -left-1/4 -top-1/4 h-[600px] w-[600px] rounded-full bg-saffron-bright/40 blur-[120px]"
          style={{ animation: "float 8s ease-in-out infinite" }}
        />
        <div
          className="absolute -right-1/4 top-1/3 h-[500px] w-[500px] rounded-full bg-gold/30 blur-[100px]"
          style={{ animation: "float 10s ease-in-out infinite reverse" }}
        />
        <div
          className="absolute bottom-0 left-1/3 h-[400px] w-[400px] rounded-full bg-maroon/40 blur-[80px]"
          style={{ animation: "float 12s ease-in-out infinite 2s" }}
        />
      </div>

      {/* Grain texture */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Subtle particles — deterministic to avoid hydration mismatch */}
      {PARTICLES.map((p, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-gold-bright/20"
          style={{
            width: `${p.size}px`,
            height: `${p.size}px`,
            left: `${p.left}%`,
            top: `${p.top}%`,
            animation: `float ${p.duration}s ease-in-out infinite ${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

/* ─── DrawSVG Legal Scales ─── */
function LegalScalesSVG() {
  return (
    <motion.svg
      viewBox="0 0 120 120"
      fill="none"
      className="h-28 w-28 md:h-36 md:w-36"
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.15 }}
      transition={{ duration: 1, delay: 2 }}
    >
      <motion.path
        d="M60 10 L60 90 M30 30 L90 30 M30 30 L20 60 L40 60 Z M90 30 L80 60 L100 60 Z M45 90 L75 90"
        stroke="#E8B84B"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2.5, ease: [0.87, 0, 0.13, 1], delay: 0.5 }}
      />
    </motion.svg>
  );
}

/* ─── Hero Section ─── */
export function HeroSection() {
  const t = useTranslations("hero");
  const flipWords = t.raw("flipWords") as string[];

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src={assetPath("/images/supreme-court.jpg")}
          alt=""
          fill
          className="object-cover object-center"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-maroon-dark/80 via-maroon-dark/70 to-maroon-dark/90" />
      </div>

      <AuroraBackground />

      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        {/* Emblem + Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          className="mb-8 flex flex-col items-center gap-4"
        >
          {/* Spotlight ring around emblem */}
          <div className="relative">
            <div className="absolute inset-0 animate-pulse-glow rounded-full" />
            <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-gold/40 bg-maroon-dark/50 backdrop-blur-sm md:h-24 md:w-24">
              <Scale className="h-10 w-10 text-gold-bright md:h-12 md:w-12" />
            </div>
          </div>

          {/* Badge */}
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="rounded-full border border-gold/30 bg-gold/10 px-5 py-1.5 font-[family-name:var(--font-satoshi)] text-xs font-bold uppercase tracking-[0.2em] text-gold-bright"
          >
            {t("badge")}
          </motion.span>
        </motion.div>

        {/* Hindi Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="font-[family-name:var(--font-yatra)] text-[clamp(2.5rem,8vw,5rem)] leading-[1.1] text-cream"
        >
          {t("titleHi")}
        </motion.h1>

        {/* English Title */}
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          className="mt-2 font-[family-name:var(--font-playfair)] text-[clamp(1.25rem,3vw,2.5rem)] font-light tracking-[0.15em] text-cream/70"
        >
          {t("titleEn")}
        </motion.h2>

        {/* Tagline with FlipWords */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.5 }}
          className="mt-8 font-[family-name:var(--font-satoshi)] text-[clamp(1rem,2vw,1.5rem)] text-cream/80"
        >
          {t("taglinePre")}{" "}
          <FlipWords
            words={flipWords}
            interval={3000}
            className="font-bold text-saffron-bright"
          />
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 2, ease: [0.34, 1.56, 0.64, 1] }}
          className="mt-10 flex flex-col gap-4 sm:flex-row"
        >
          <Link
            href="/cases"
            className="group flex items-center gap-2 rounded-xl bg-saffron-bright px-8 py-3.5 font-[family-name:var(--font-satoshi)] text-base font-semibold text-white shadow-lg shadow-saffron-bright/30 transition-all duration-300 hover:bg-saffron-bright/90 hover:shadow-xl hover:shadow-saffron-bright/40"
          >
            {t("ctaPrimary")}
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>

          <Link
            href="/contact"
            className="group flex items-center gap-2 rounded-xl border-2 border-cream/20 px-8 py-3.5 font-[family-name:var(--font-satoshi)] text-base font-semibold text-cream transition-all duration-300 hover:border-gold/40 hover:bg-cream/5"
          >
            <Users className="h-4 w-4" />
            {t("ctaSecondary")}
          </Link>
        </motion.div>

        {/* Decorative SVG */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-20">
          <LegalScalesSVG />
        </div>
      </div>

      {/* VHP Logo watermark */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 opacity-[0.06] hidden lg:block">
        <Image
          src={assetPath("/images/vhp-logo.jpg")}
          alt=""
          width={300}
          height={300}
          className="rounded-full"
        />
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="h-10 w-6 rounded-full border-2 border-cream/30 p-1"
        >
          <div className="h-2 w-full rounded-full bg-cream/50" />
        </motion.div>
      </motion.div>
    </section>
  );
}
