"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { IndiaMap } from "./IndiaMap";
import { MapSidebar } from "./MapSidebar";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { MapPin } from "lucide-react";

export function MapPageClient() {
  const [selectedKhetra, setSelectedKhetra] = useState<string | null>(null);

  const handleStateClick = (_stateName: string, khetraId: string) => {
    setSelectedKhetra((prev) => (prev === khetraId ? null : khetraId));
  };

  return (
    <>
      {/* Hero Banner */}
      <section className="relative overflow-hidden bg-maroon-dark py-16 md:py-20">
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
              <MapPin className="h-3.5 w-3.5" />
              भारत मानचित्र
            </span>
            <h1 className="mt-4 font-[family-name:var(--font-playfair)] text-[clamp(1.75rem,4vw,3rem)] font-bold text-cream">
              Interactive India Map
            </h1>
            <p className="mt-2 font-[family-name:var(--font-satoshi)] text-base text-cream/50">
              Explore VHP Legal Cell&apos;s presence across 12 Khetras and 35+ Prants
            </p>
          </motion.div>
        </div>
      </section>

      {/* Map + Sidebar */}
      <section className="section-padding bg-cream">
        <div className="container-default">
          <ScrollReveal>
            <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
              {/* Map */}
              <IndiaMap
                selectedKhetra={selectedKhetra}
                onStateClick={handleStateClick}
              />

              {/* Sidebar */}
              <MapSidebar
                selectedKhetra={selectedKhetra}
                onKhetraSelect={setSelectedKhetra}
                className="h-fit lg:sticky lg:top-24"
              />
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
