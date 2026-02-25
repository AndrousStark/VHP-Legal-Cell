"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { motion } from "framer-motion";
import Image from "next/image";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/animations/ScrollReveal";
import { NumberTicker } from "@/components/animations/NumberTicker";
import { assetPath } from "@/lib/utils";
import { Map, Scale, BookOpen, Calendar, Newspaper, FileText, ArrowRight } from "lucide-react";

/* Full class strings for Tailwind JIT — dynamic concatenation gets purged */
const ACCENT_CLASSES: Record<string, { bg: string; text: string }> = {
  "saffron-bright": { bg: "bg-saffron-bright/10", text: "text-saffron-bright" },
  maroon: { bg: "bg-maroon/10", text: "text-maroon" },
  gold: { bg: "bg-gold/10", text: "text-gold" },
  success: { bg: "bg-emerald-500/10", text: "text-emerald-600" },
  info: { bg: "bg-blue-500/10", text: "text-blue-600" },
  charcoal: { bg: "bg-charcoal/10", text: "text-charcoal" },
  saffron: { bg: "bg-saffron/10", text: "text-saffron" },
};

interface BentoCardProps {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
  className?: string;
  stat?: { value: number; suffix: string };
  cta?: string;
  accentColor?: string;
}

function BentoCard({
  title,
  description,
  href,
  icon,
  className = "",
  stat,
  cta,
  accentColor = "saffron-bright",
}: BentoCardProps) {
  return (
    <Link href={href} className={`group block ${className}`}>
      <motion.div
        whileHover={{ y: -6, scale: 1.01 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="relative h-full overflow-hidden rounded-2xl border border-gold/10 bg-gradient-to-b from-cream-light to-cream p-6 shadow-sm transition-shadow duration-300 hover:shadow-lg"
      >
        {/* Subtle gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-saffron/0 to-gold/0 transition-all duration-500 group-hover:from-saffron/3 group-hover:to-gold/5" />

        <div className="relative z-10 flex h-full flex-col">
          {/* Icon */}
          <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${ACCENT_CLASSES[accentColor ?? "saffron"]?.bg ?? "bg-saffron/10"} ${ACCENT_CLASSES[accentColor ?? "saffron"]?.text ?? "text-saffron"}`}>
            {icon}
          </div>

          {/* Title */}
          <h3 className="font-[family-name:var(--font-playfair)] text-xl font-bold text-maroon-dark">
            {title}
          </h3>

          {/* Stat or Description */}
          {stat ? (
            <div className="mt-2 font-[family-name:var(--font-satoshi)] text-3xl font-bold text-saffron">
              <NumberTicker value={stat.value} suffix={stat.suffix} duration={2} />
            </div>
          ) : (
            <p className="mt-2 font-[family-name:var(--font-satoshi)] text-sm text-charcoal-light leading-relaxed">
              {description}
            </p>
          )}

          {/* CTA */}
          {cta && (
            <div className="mt-auto pt-4 font-[family-name:var(--font-satoshi)] text-sm font-semibold text-saffron transition-colors group-hover:text-saffron-bright">
              {cta}
              <ArrowRight className="ml-1 inline h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </div>
          )}
        </div>

        {/* Corner decoration */}
        <div className="absolute -bottom-4 -right-4 h-24 w-24 rounded-full bg-gold/5 blur-xl transition-all duration-500 group-hover:bg-saffron/10" />
      </motion.div>
    </Link>
  );
}

export function BentoGridSection() {
  const t = useTranslations("bento");

  return (
    <section className="section-padding bg-cream">
      <div className="container-default">
        <StaggerContainer className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2">
          {/* Large — Interactive Map (spans 2 rows) */}
          <StaggerItem className="sm:col-span-2 lg:col-span-1 lg:row-span-2">
            <Link href="/map" className="group block h-full">
              <motion.div
                whileHover={{ y: -6, scale: 1.01 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="relative h-full overflow-hidden rounded-2xl border border-gold/10 bg-gradient-to-b from-cream-light to-cream p-6 shadow-sm transition-shadow duration-300 hover:shadow-lg"
              >
                {/* India cultural map background */}
                <div className="absolute inset-0 opacity-[0.08] transition-opacity duration-500 group-hover:opacity-[0.15]">
                  <Image
                    src={assetPath("/images/india-cultural-map.jpg")}
                    alt=""
                    fill
                    className="object-contain object-center"
                    sizes="(max-width: 640px) 100vw, 33vw"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-saffron/0 to-gold/0 transition-all duration-500 group-hover:from-saffron/3 group-hover:to-gold/5" />
                <div className="relative z-10 flex h-full flex-col">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-saffron-bright/10 text-saffron-bright">
                    <Map className="h-6 w-6" />
                  </div>
                  <h3 className="font-[family-name:var(--font-playfair)] text-xl font-bold text-maroon-dark">
                    {t("mapTitle")}
                  </h3>
                  <p className="mt-2 font-[family-name:var(--font-satoshi)] text-sm text-charcoal-light leading-relaxed">
                    {t("mapDesc")}
                  </p>
                  <div className="mt-auto pt-4 font-[family-name:var(--font-satoshi)] text-sm font-semibold text-saffron transition-colors group-hover:text-saffron-bright">
                    {t("mapCta")}
                    <ArrowRight className="ml-1 inline h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-4 h-24 w-24 rounded-full bg-gold/5 blur-xl transition-all duration-500 group-hover:bg-saffron/10" />
              </motion.div>
            </Link>
          </StaggerItem>

          {/* Case Tracker */}
          <StaggerItem>
            <BentoCard
              title={t("casesTitle")}
              description=""
              href="/cases"
              icon={<Scale className="h-6 w-6" />}
              stat={{ value: 342, suffix: "" }}
              cta={t("casesActive")}
              accentColor="maroon"
            />
          </StaggerItem>

          {/* Judgment Library */}
          <StaggerItem>
            <BentoCard
              title={t("judgmentsTitle")}
              description={t("judgmentsCount")}
              href="/judgments"
              icon={<BookOpen className="h-6 w-6" />}
              stat={{ value: 150, suffix: "+" }}
              accentColor="gold"
            />
          </StaggerItem>

          {/* Activities */}
          <StaggerItem>
            <BentoCard
              title={t("activitiesTitle")}
              description={t("activitiesCount")}
              href="/activities"
              icon={<Calendar className="h-6 w-6" />}
              accentColor="success"
            />
          </StaggerItem>

          {/* News & Insights */}
          <StaggerItem>
            <BentoCard
              title={t("newsTitle")}
              description=""
              href="/news"
              icon={<Newspaper className="h-6 w-6" />}
              cta={t("newsCta")}
              accentColor="info"
            />
          </StaggerItem>

          {/* Hidden on small — Resources */}
          <StaggerItem className="hidden lg:block">
            <BentoCard
              title={t("resourcesTitle")}
              description={t("resourcesDesc")}
              href="/resources"
              icon={<FileText className="h-6 w-6" />}
              accentColor="charcoal"
            />
          </StaggerItem>
        </StaggerContainer>
      </div>
    </section>
  );
}
