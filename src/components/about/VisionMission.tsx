"use client";

import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { Scale, Shield, Globe, BookOpen } from "lucide-react";

const PILLARS = [
  {
    icon: Scale,
    title: "Legal Advocacy",
    titleHi: "न्यायिक वकालत",
    description:
      "Filing and fighting PILs, interventions, and cases in Supreme Court, High Courts, and District Courts across India for Hindu causes.",
  },
  {
    icon: Shield,
    title: "Rights Protection",
    titleHi: "अधिकार संरक्षण",
    description:
      "Defending constitutional rights of Hindus — temple management, religious freedom, anti-conversion, cow protection, and cultural preservation.",
  },
  {
    icon: Globe,
    title: "Pan-India Presence",
    titleHi: "अखिल भारतीय उपस्थिति",
    description:
      "Organized across 12 Chetras, 35+ Prants, with legal teams at Supreme Court, High Courts, and District Courts nationwide.",
  },
  {
    icon: BookOpen,
    title: "Legal Awareness",
    titleHi: "कानूनी जागरूकता",
    description:
      "Conducting Prant Shiksha Vargs, seminars, and legal clinics to empower Hindus with knowledge of their legal rights and remedies.",
  },
];

export function VisionMission() {
  return (
    <section className="section-padding bg-cream">
      <div className="container-default">
        {/* Vision & Mission */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          <ScrollReveal>
            <div>
              <span className="mb-3 inline-block rounded-full bg-saffron/10 px-4 py-1 font-[family-name:var(--font-satoshi)] text-xs font-bold uppercase tracking-widest text-saffron">
                Our Vision
              </span>
              <h2 className="font-[family-name:var(--font-playfair)] text-[var(--text-h1)] font-bold text-maroon-dark">
                धर्मो रक्षति रक्षितः
              </h2>
              <p className="mt-1 font-[family-name:var(--font-satoshi)] text-lg text-saffron italic">
                Dharma protects those who protect it
              </p>
              <p className="mt-4 font-[family-name:var(--font-satoshi)] text-base leading-relaxed text-charcoal-light">
                To create a robust legal ecosystem that safeguards the religious, cultural,
                and constitutional rights of Hindus across India. Through systematic legal
                intervention, we aim to establish judicial precedents that protect Hindu
                dharmic traditions for future generations.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div>
              <span className="mb-3 inline-block rounded-full bg-gold/10 px-4 py-1 font-[family-name:var(--font-satoshi)] text-xs font-bold uppercase tracking-widest text-gold">
                Our Mission
              </span>
              <h2 className="font-[family-name:var(--font-playfair)] text-[var(--text-h1)] font-bold text-maroon-dark">
                न्याय की सेवा
              </h2>
              <p className="mt-1 font-[family-name:var(--font-satoshi)] text-lg text-gold italic">
                Serving Justice
              </p>
              <p className="mt-4 font-[family-name:var(--font-satoshi)] text-base leading-relaxed text-charcoal-light">
                To provide free legal aid to Hindus facing religious persecution, temple
                encroachment, forced conversion, and cultural suppression. We train
                advocates, file strategic PILs, maintain a nationwide case tracking system,
                and publish landmark judgments for community benefit.
              </p>
            </div>
          </ScrollReveal>
        </div>

        {/* Four Pillars */}
        <div className="mt-20">
          <ScrollReveal className="mb-10 text-center">
            <h3 className="font-[family-name:var(--font-playfair)] text-[var(--text-h2)] font-bold text-maroon-dark">
              Four Pillars of Our Work
            </h3>
          </ScrollReveal>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PILLARS.map((pillar, i) => {
              const Icon = pillar.icon;
              return (
                <ScrollReveal key={pillar.title} delay={i * 0.1}>
                  <div className="group rounded-2xl border border-gold/10 bg-cream-light p-6 shadow-sm transition-all duration-300 hover:border-saffron/20 hover:shadow-md">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-saffron/10 text-saffron transition-colors group-hover:bg-saffron group-hover:text-white">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h4 className="font-[family-name:var(--font-playfair)] text-lg font-bold text-maroon-dark">
                      {pillar.title}
                    </h4>
                    <p className="mt-0.5 font-[family-name:var(--font-noto-serif)] text-xs text-saffron/70">
                      {pillar.titleHi}
                    </p>
                    <p className="mt-3 font-[family-name:var(--font-satoshi)] text-sm leading-relaxed text-charcoal-light">
                      {pillar.description}
                    </p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
