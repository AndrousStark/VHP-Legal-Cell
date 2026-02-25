"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { CalendarCheck } from "lucide-react";
import { assetPath } from "@/lib/utils";
import { ACTIVITIES } from "@/lib/mock-data";

export function ActivitiesHero() {
  const completedCount = ACTIVITIES.filter((a) => a.status === "completed").length;
  const upcomingCount = ACTIVITIES.filter((a) => a.status === "upcoming").length;

  return (
    <section className="relative overflow-hidden bg-maroon-dark py-16 md:py-20">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src={assetPath("/images/navratri-celebration.jpg")}
          alt=""
          fill
          className="object-cover opacity-10"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-maroon-dark/70 via-maroon-dark/80 to-maroon-dark" />
      </div>
      <div className="absolute inset-0">
        <div className="absolute -left-32 top-1/4 h-80 w-80 rounded-full bg-saffron/8 blur-[100px]" />
        <div className="absolute -right-32 bottom-1/4 h-64 w-64 rounded-full bg-gold/6 blur-[80px]" />
      </div>

      <div className="container-default relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 font-[family-name:var(--font-satoshi)] text-xs font-bold uppercase tracking-[0.2em] text-gold-bright">
            <CalendarCheck className="h-3.5 w-3.5" />
            गतिविधियां एवं कार्यक्रम
          </span>
          <h1 className="mt-4 font-[family-name:var(--font-playfair)] text-[clamp(1.75rem,4vw,3rem)] font-bold text-cream">
            Activities & Events
          </h1>
          <p className="mt-2 font-[family-name:var(--font-satoshi)] text-base text-cream/50">
            Seminars, legal clinics, training programs, and more
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mx-auto mt-8 flex max-w-xs justify-center gap-8"
        >
          <div className="text-center">
            <p className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-gold-bright">
              {ACTIVITIES.length}
            </p>
            <p className="font-[family-name:var(--font-satoshi)] text-xs text-cream/50">
              Total Events
            </p>
          </div>
          <div className="h-12 w-px bg-gold/20" />
          <div className="text-center">
            <p className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-emerald-400">
              {completedCount}
            </p>
            <p className="font-[family-name:var(--font-satoshi)] text-xs text-cream/50">
              Completed
            </p>
          </div>
          <div className="h-12 w-px bg-gold/20" />
          <div className="text-center">
            <p className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-saffron-bright">
              {upcomingCount}
            </p>
            <p className="font-[family-name:var(--font-satoshi)] text-xs text-cream/50">
              Upcoming
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
