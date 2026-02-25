"use client";

import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { AnimatedBeam } from "@/components/animations/AnimatedBeam";
import { AlertTriangle, Search, FileText, Scale, Gavel } from "lucide-react";

const PROCESS_STEPS = [
  { icon: <AlertTriangle className="h-6 w-6 text-danger" />, label: "Report Issue" },
  { icon: <Search className="h-6 w-6 text-info" />, label: "Legal Review" },
  { icon: <FileText className="h-6 w-6 text-saffron" />, label: "Case Filing" },
  { icon: <Scale className="h-6 w-6 text-gold" />, label: "Court Hearing" },
  { icon: <Gavel className="h-6 w-6 text-success" />, label: "Judgment" },
];

export function ProcessFlow() {
  return (
    <section className="section-padding bg-cream-mid/30">
      <div className="container-default">
        <ScrollReveal className="mb-8 text-center">
          <h3 className="font-[family-name:var(--font-playfair)] text-[var(--text-h2)] font-bold text-maroon-dark">
            How We Work
          </h3>
          <p className="mt-2 font-[family-name:var(--font-satoshi)] text-base text-charcoal-light">
            From issue to justice — our systematic legal advocacy process
          </p>
        </ScrollReveal>

        <ScrollReveal>
          <AnimatedBeam steps={PROCESS_STEPS} />
        </ScrollReveal>
      </div>
    </section>
  );
}
