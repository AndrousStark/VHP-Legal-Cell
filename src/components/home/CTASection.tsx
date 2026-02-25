"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { assetPath } from "@/lib/utils";
import { ArrowRight, Users } from "lucide-react";
import Image from "next/image";

export function CTASection() {
  const t = useTranslations("cta");

  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,#3D0F0F_0%,#1A0E0A_100%)] py-24 md:py-32">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src={assetPath("/images/temple-diyas.jpg")}
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-maroon-dark/85" />
      </div>

      {/* Grain texture */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Decorative blurred circles */}
      <div className="absolute -left-32 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-saffron/10 blur-[100px]" />
      <div className="absolute -right-32 top-1/3 h-48 w-48 rounded-full bg-gold/10 blur-[80px]" />

      <div className="container-narrow relative z-10 text-center">
        <ScrollReveal>
          <h2 className="font-[family-name:var(--font-yatra)] text-[clamp(1.75rem,5vw,3rem)] leading-[1.2] text-cream">
            {t("headline")}
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/contact"
              className="group flex items-center gap-2 rounded-xl bg-saffron-bright px-8 py-3.5 font-[family-name:var(--font-satoshi)] text-base font-semibold text-white shadow-lg shadow-saffron-bright/30 transition-all duration-300 hover:bg-saffron-bright/90 hover:shadow-xl"
            >
              {t("join")}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>

            <Link
              href="/contact"
              className="group flex items-center gap-2 rounded-xl border-2 border-cream/20 px-8 py-3.5 font-[family-name:var(--font-satoshi)] text-base font-semibold text-cream transition-all duration-300 hover:border-gold/40 hover:bg-cream/5"
            >
              <Users className="h-4 w-4" />
              {t("contact")}
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
