"use client";

import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { OrbitingCircles, OrbitCenter } from "@/components/animations/OrbitingCircles";
import { Link } from "@/i18n/routing";
import { Scale, MapPin, Building2, Gavel, FileText, Users, ArrowRight } from "lucide-react";

function OrbitIcon({ icon: Icon, label }: { icon: typeof Scale; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/20 bg-cream-light shadow-sm">
        <Icon className="h-5 w-5 text-saffron" />
      </div>
      <span className="whitespace-nowrap font-[family-name:var(--font-satoshi)] text-[10px] font-medium text-charcoal-light">
        {label}
      </span>
    </div>
  );
}

export function OrgStructurePreview() {
  return (
    <section className="section-padding relative overflow-hidden bg-maroon-dark">
      <div className="container-default relative z-10 text-center">
        <ScrollReveal>
          <h3 className="font-[family-name:var(--font-playfair)] text-[var(--text-h2)] font-bold text-cream">
            Our Ecosystem
          </h3>
          <p className="mt-2 font-[family-name:var(--font-satoshi)] text-base text-cream/60">
            A nationwide network of legal professionals working for Hindu causes
          </p>
        </ScrollReveal>

        {/* Orbiting circles visualization */}
        <ScrollReveal delay={0.3} className="mt-12">
          <div className="relative mx-auto flex h-[360px] w-[360px] items-center justify-center md:h-[420px] md:w-[420px]">
            {/* Center — VHP Logo */}
            <OrbitCenter className="z-20">
              <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-gold/40 bg-maroon-dark shadow-lg shadow-saffron-bright/10">
                <Scale className="h-10 w-10 text-gold-bright" />
              </div>
            </OrbitCenter>

            {/* Inner orbit — Core functions */}
            <OrbitingCircles radius={100} duration={25} delay={0}>
              <OrbitIcon icon={FileText} label="PILs" />
            </OrbitingCircles>
            <OrbitingCircles radius={100} duration={25} delay={6.25}>
              <OrbitIcon icon={Gavel} label="Cases" />
            </OrbitingCircles>
            <OrbitingCircles radius={100} duration={25} delay={12.5}>
              <OrbitIcon icon={Users} label="Clinics" />
            </OrbitingCircles>
            <OrbitingCircles radius={100} duration={25} delay={18.75}>
              <OrbitIcon icon={Scale} label="RTI" />
            </OrbitingCircles>

            {/* Outer orbit — Regional presence */}
            <OrbitingCircles radius={175} duration={35} delay={0} reverse>
              <OrbitIcon icon={MapPin} label="12 Chetras" />
            </OrbitingCircles>
            <OrbitingCircles radius={175} duration={35} delay={8.75} reverse>
              <OrbitIcon icon={Building2} label="35+ Prants" />
            </OrbitingCircles>
            <OrbitingCircles radius={175} duration={35} delay={17.5} reverse>
              <OrbitIcon icon={Gavel} label="High Courts" />
            </OrbitingCircles>
            <OrbitingCircles radius={175} duration={35} delay={26.25} reverse>
              <OrbitIcon icon={Scale} label="Supreme Court" />
            </OrbitingCircles>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.5}>
          <Link
            href="/about/structure"
            className="group mt-8 inline-flex items-center gap-2 rounded-xl bg-saffron-bright px-6 py-3 font-[family-name:var(--font-satoshi)] text-sm font-semibold text-white transition-all duration-300 hover:bg-saffron-bright/90 hover:shadow-lg"
          >
            View Full Org Structure
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
