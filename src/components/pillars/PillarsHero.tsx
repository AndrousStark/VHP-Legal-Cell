"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { TEAM_MEMBERS } from "@/lib/mock-data";

/** Orbit ring for national leadership — center is the National Convenor */
export function PillarsHero() {
  const nationalTeam = TEAM_MEMBERS.filter((m) => m.level === "national");
  const convenor = nationalTeam.find((m) => m.designation === "National Convenor");
  const others = nationalTeam.filter((m) => m.designation !== "National Convenor");

  return (
    <section className="relative overflow-hidden bg-maroon-dark py-24 md:py-32">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/images/rama-navami.jpg"
          alt=""
          fill
          className="object-cover opacity-10"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-maroon-dark/60 via-maroon-dark/70 to-maroon-dark/90" />
      </div>
      {/* Aurora background */}
      <div className="absolute inset-0">
        <div className="absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-saffron/8 blur-[120px]" />
        <div className="absolute -right-32 bottom-1/4 h-80 w-80 rounded-full bg-gold/6 blur-[100px]" />
      </div>

      <div className="container-default relative z-10">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block rounded-full border border-gold/30 bg-gold/10 px-5 py-1.5 font-[family-name:var(--font-satoshi)] text-xs font-bold uppercase tracking-[0.2em] text-gold-bright">
            न्याय के प्रहरी
          </span>
          <h1 className="mt-4 font-[family-name:var(--font-playfair)] text-[clamp(2rem,5vw,3.5rem)] font-bold text-cream">
            Pillars of Justice
          </h1>
          <p className="mt-2 font-[family-name:var(--font-satoshi)] text-lg font-medium text-cream/50">
            The leadership driving India&apos;s largest Hindu legal advocacy network
          </p>
        </motion.div>

        {/* Orbit Layout */}
        <div className="relative mx-auto flex h-[380px] w-[380px] items-center justify-center md:h-[480px] md:w-[480px]">
          {/* Orbit rings (decorative) */}
          <div className="absolute h-[280px] w-[280px] rounded-full border border-dashed border-gold/10 md:h-[360px] md:w-[360px]" />

          {/* Center — National Convenor */}
          {convenor && (
            <Link href={`/pillars/${convenor.slug}`} className="relative z-20">
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.6, type: "spring" }}
                className="flex flex-col items-center"
              >
                <div className="relative flex h-28 w-28 items-center justify-center overflow-hidden rounded-full border-[3px] border-gold/50 bg-maroon shadow-lg shadow-saffron-bright/20 transition-transform duration-300 hover:scale-105 md:h-32 md:w-32">
                  {convenor.photo ? (
                    <Image src={convenor.photo} alt={convenor.name} fill className="object-cover object-top" sizes="128px" />
                  ) : (
                    <span className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-gold-bright">
                      {convenor.name.split(" ").map((w) => w[0]).join("").slice(0, 2)}
                    </span>
                  )}
                </div>
                <div className="mt-3 text-center">
                  <p className="font-[family-name:var(--font-playfair)] text-base font-bold text-cream">
                    {convenor.name}
                  </p>
                  <p className="font-[family-name:var(--font-satoshi)] text-sm font-medium text-gold/80">
                    {convenor.designation}
                  </p>
                </div>
              </motion.div>
            </Link>
          )}

          {/* Orbiting members */}
          {others.map((member, i) => {
            const angle = (i / others.length) * 2 * Math.PI - Math.PI / 2;
            const radius = 160; // px from center
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;

            return (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + i * 0.15, duration: 0.5, type: "spring" }}
                className="absolute z-10 flex flex-col items-center"
                style={{
                  left: `calc(50% + ${x}px - 32px)`,
                  top: `calc(50% + ${y}px - 32px)`,
                }}
              >
                <Link href={`/pillars/${member.slug}`} className="group relative block">
                  <div className="relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border-2 border-gold/20 bg-maroon-dark/80 shadow-md backdrop-blur-sm transition-all duration-300 hover:border-gold/50 hover:shadow-lg hover:scale-110 md:h-18 md:w-18">
                    {member.photo ? (
                      <Image src={member.photo} alt={member.name} fill className="object-cover object-top" sizes="72px" />
                    ) : (
                      <span className="font-[family-name:var(--font-playfair)] text-sm font-bold text-cream/70 transition-colors group-hover:text-gold-bright">
                        {member.name.split(" ").map((w) => w[0]).join("").slice(0, 2)}
                      </span>
                    )}
                  </div>

                  {/* Hover card */}
                  <div className="pointer-events-none absolute left-1/2 top-full z-30 mt-2 -translate-x-1/2 rounded-lg border border-gold/10 bg-maroon-dark/95 px-3 py-2 text-center opacity-0 shadow-lg backdrop-blur-xl transition-opacity duration-200 group-hover:pointer-events-auto group-hover:opacity-100">
                    <p className="whitespace-nowrap font-[family-name:var(--font-satoshi)] text-sm font-bold text-cream">
                      {member.name}
                    </p>
                    <p className="whitespace-nowrap font-[family-name:var(--font-satoshi)] text-xs font-medium text-gold/70">
                      {member.designation}
                    </p>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
