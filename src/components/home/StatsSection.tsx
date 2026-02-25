"use client";

import { useTranslations } from "next-intl";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/animations/ScrollReveal";
import { NumberTicker } from "@/components/animations/NumberTicker";
import { Users, MapPin, Building2, Scale, BookOpen, Gavel, PenLine, Calendar } from "lucide-react";
import Image from "next/image";

const STATS = [
  { icon: Users, value: 500, suffix: "+", labelKey: "advocates" },
  { icon: MapPin, value: 12, suffix: "", labelKey: "regions" },
  { icon: Building2, value: 35, suffix: "+", labelKey: "prants" },
  { icon: Scale, value: 342, suffix: "", labelKey: "activeCases" },
  { icon: BookOpen, value: 150, suffix: "+", labelKey: "judgments" },
  { icon: Gavel, value: 30, suffix: "+", labelKey: "formerJudges" },
  { icon: PenLine, value: 20, suffix: "+", labelKey: "articles" },
  { icon: Calendar, value: 8, suffix: "+", labelKey: "events" },
] as const;

export function StatsSection() {
  const t = useTranslations("stats");

  return (
    <section className="relative overflow-hidden bg-maroon-dark py-20">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/images/golden-om.jpg"
          alt=""
          fill
          className="object-cover opacity-15"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-maroon-dark/70" />
      </div>

      {/* Grain texture */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="container-default relative z-10">
        <StaggerContainer className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {STATS.map((stat) => {
            const Icon = stat.icon;
            return (
              <StaggerItem
                key={stat.labelKey}
                className="flex flex-col items-center text-center"
              >
                <Icon className="mb-3 h-8 w-8 text-gold/60" />
                <div className="font-[family-name:var(--font-playfair)] text-4xl font-bold text-gold-bright md:text-5xl">
                  <NumberTicker
                    value={stat.value}
                    suffix={stat.suffix}
                    duration={2.5}
                  />
                </div>
                <span className="mt-2 font-[family-name:var(--font-satoshi)] text-sm font-medium uppercase tracking-wider text-cream/60">
                  {t(stat.labelKey)}
                </span>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
