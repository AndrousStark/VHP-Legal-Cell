"use client";

import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { motion } from "framer-motion";

const MILESTONES = [
  {
    year: "1964",
    title: "VHP Founded",
    description: "Vishwa Hindu Parishad established in Mumbai to unite Hindu society.",
  },
  {
    year: "1984",
    title: "Ram Janmabhoomi Movement",
    description: "VHP leads the legal and social campaign for Ram Janmabhoomi liberation.",
  },
  {
    year: "2001",
    title: "Legal Cell Formation",
    description: "Vidhi Prakoshtha formally constituted to provide legal support for Hindu causes nationwide.",
  },
  {
    year: "2010",
    title: "Allahabad HC Verdict",
    description: "Historic three-way division of disputed site. VHP Legal Cell instrumental in presenting evidence.",
  },
  {
    year: "2019",
    title: "Supreme Court Ayodhya Verdict",
    description: "Landmark 5-0 unanimous verdict. Ram Temple at the birthplace. VHP advocates led the legal fight.",
  },
  {
    year: "2022",
    title: "National Expansion",
    description: "Legal Cell expands to all 12 Chetras with dedicated teams at Supreme Court and High Courts.",
  },
  {
    year: "2024",
    title: "Digital Transformation",
    description: "Launch of case tracking system, judgment library, and national convenor portal.",
  },
  {
    year: "2026",
    title: "First-Ever Website",
    description: "VHP Legal Cell launches its comprehensive digital platform — the website you're viewing now.",
  },
];

export function HistoryTimeline() {
  return (
    <section className="section-padding bg-cream">
      <div className="container-narrow">
        <ScrollReveal className="mb-12 text-center">
          <h3 className="font-[family-name:var(--font-playfair)] text-[var(--text-h2)] font-bold text-maroon-dark">
            Our Journey
          </h3>
          <p className="mt-2 font-[family-name:var(--font-satoshi)] text-base text-charcoal-light">
            Decades of legal advocacy for Hindu causes
          </p>
        </ScrollReveal>

        {/* Timeline */}
        <div className="relative">
          {/* Center line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 bg-gradient-to-b from-saffron via-gold to-saffron/20" />

          <div className="flex flex-col gap-12">
            {MILESTONES.map((milestone, i) => {
              const isLeft = i % 2 === 0;

              return (
                <ScrollReveal
                  key={milestone.year}
                  variant={isLeft ? "fadeRight" : "fadeLeft"}
                  delay={i * 0.05}
                >
                  <div className={`flex items-center gap-8 ${isLeft ? "flex-row" : "flex-row-reverse"}`}>
                    {/* Content */}
                    <div className={`flex-1 ${isLeft ? "text-right" : "text-left"}`}>
                      <div
                        className={`inline-block rounded-2xl border border-gold/10 bg-cream-light p-5 shadow-sm transition-shadow duration-300 hover:shadow-md ${
                          isLeft ? "ml-auto" : "mr-auto"
                        }`}
                      >
                        <span className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-saffron">
                          {milestone.year}
                        </span>
                        <h4 className="mt-1 font-[family-name:var(--font-playfair)] text-lg font-bold text-maroon-dark">
                          {milestone.title}
                        </h4>
                        <p className="mt-2 font-[family-name:var(--font-satoshi)] text-sm leading-relaxed text-charcoal-light">
                          {milestone.description}
                        </p>
                      </div>
                    </div>

                    {/* Center dot */}
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
                      viewport={{ once: true }}
                      className="relative z-10 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-saffron-bright shadow-lg shadow-saffron-bright/30"
                    >
                      <div className="h-2 w-2 rounded-full bg-white" />
                    </motion.div>

                    {/* Spacer */}
                    <div className="flex-1" />
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
