"use client";

import { motion } from "framer-motion";
import { Scale, Users, MapPin, CalendarCheck } from "lucide-react";
import { NumberTicker } from "@/components/animations/NumberTicker";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface StatCard {
  icon: LucideIcon;
  value: number;
  suffix: string;
  label: string;
}

const STAT_CARDS: StatCard[] = [
  { icon: Scale, value: 342, suffix: "", label: "Total Cases" },
  { icon: Users, value: 500, suffix: "+", label: "Total Members" },
  { icon: MapPin, value: 12, suffix: "", label: "Active Chetras" },
  { icon: CalendarCheck, value: 30, suffix: "+", label: "Total Events" },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

interface MapStatCardsProps {
  className?: string;
}

export function MapStatCards({ className }: MapStatCardsProps) {
  return (
    <motion.div
      className={cn(
        "grid grid-cols-2 gap-4 lg:grid-cols-4",
        className,
      )}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      {STAT_CARDS.map((card) => (
        <motion.div
          key={card.label}
          variants={cardVariants}
          className="group relative overflow-hidden rounded-xl border border-gold/20 bg-maroon-dark p-5 transition-shadow hover:shadow-lg hover:shadow-saffron/10"
        >
          {/* Subtle gradient overlay */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent" />

          <div className="relative">
            <card.icon
              className="mb-3 h-6 w-6 text-gold-bright transition-transform group-hover:scale-110"
              strokeWidth={1.5}
            />

            <div className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-gold-bright md:text-3xl">
              <NumberTicker
                value={card.value}
                suffix={card.suffix}
                duration={2}
              />
            </div>

            <p className="mt-1 text-sm text-cream/70">{card.label}</p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
