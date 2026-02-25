"use client";

import { useTranslations } from "next-intl";
import Marquee from "react-fast-marquee";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

/* ─── Mock Data — will be replaced by API ─── */
const ROW_1_ITEMS = [
  "VHP Legal Cell files PIL for temple reclamation in Mathura",
  "National Legal Cell Seminar held at Vigyan Bhawan, Delhi",
  "500+ advocates join VHP Legal Cell across 12 regions",
  "PIL filed in Allahabad HC for cow protection enforcement",
  "VHP Legal Cell launches digital case tracking system",
];

const ROW_2_ITEMS = [
  "Gyanvapi case: SC orders fresh survey — VHP counsel argues",
  "Landmark judgment: Allahabad HC upholds anti-conversion law",
  "Ram Janmabhoomi complex legal archives digitized",
  "Religious Freedom Act challenge — next hearing 5 March",
  "VHP wins cow transport ban PIL in Rajasthan HC",
];

const ROW_3_ITEMS = [
  "VHP national leadership meeting — Delhi, 15 March 2026",
  "Prant Shiksha Varg scheduled: UP, MP, Rajasthan",
  "New legal clinics opened in 8 states this quarter",
  "Annual report 2025 released by National Convenor",
];

const ROW_4_ITEMS = [
  "Hearing: Kashi Vishwanath Survey Case — 28 Feb",
  "Hearing: Cow Protection PIL — 3 March",
  "Hearing: Temple Land Encroachment — 7 March",
  "Hearing: Religious Conversion Challenge — 12 March",
];

function TickerRow({
  items,
  direction,
  speed,
  bgClass,
}: {
  items: string[];
  direction: "left" | "right";
  speed: number;
  bgClass: string;
}) {
  return (
    <div className={`${bgClass} py-2`}>
      <Marquee
        direction={direction}
        speed={speed}
        pauseOnHover
        gradient
        gradientWidth={60}
        gradientColor="transparent"
      >
        {items.map((item, i) => (
          <span
            key={`${item.slice(0, 20)}-${i}`}
            className="mx-8 cursor-pointer whitespace-nowrap font-[family-name:var(--font-satoshi)] text-sm text-white/90 transition-colors duration-200 hover:text-gold-bright"
          >
            <span className="mr-2 text-gold-bright">●</span>
            {item}
          </span>
        ))}
      </Marquee>
    </div>
  );
}

/* ─── Vertical Ticker (CSS animation) ─── */
function VerticalTicker({
  items,
  direction,
  bgClass,
  intervalMs = 4000,
}: {
  items: string[];
  direction: "up" | "down";
  bgClass: string;
  intervalMs?: number;
}) {
  return (
    <div className={`${bgClass} relative h-10 overflow-hidden`}>
      <div
        className="flex flex-col"
        style={{
          animation: `scroll-${direction} ${items.length * (intervalMs / 1000)}s linear infinite`,
        }}
      >
        {[...items, ...items].map((item, i) => (
          <div
            key={`${item.slice(0, 20)}-${i}`}
            className="flex h-10 items-center justify-center whitespace-nowrap px-4 font-[family-name:var(--font-satoshi)] text-sm text-white/90"
          >
            <span className="mr-2 text-gold-bright">⚖</span>
            {item}
          </div>
        ))}
      </div>

    </div>
  );
}

/* ─── 4-Directional News Ticker Section ─── */
export function NewsTickerSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Row 1: Left to Right — VHP Headlines (Saffron) */}
      <TickerRow
        items={ROW_1_ITEMS}
        direction="right"
        speed={40}
        bgClass="bg-saffron"
      />

      {/* Row 2: Right to Left — Judgments & Cases (Gold) */}
      <TickerRow
        items={ROW_2_ITEMS}
        direction="left"
        speed={35}
        bgClass="bg-gold"
      />

      {/* Row 3: Vertical Down — VHP Updates (Maroon) */}
      <VerticalTicker
        items={ROW_3_ITEMS}
        direction="down"
        bgClass="bg-maroon"
        intervalMs={5000}
      />

      {/* Row 4: Vertical Up — Hearing Dates (Dark) */}
      <VerticalTicker
        items={ROW_4_ITEMS}
        direction="up"
        bgClass="bg-maroon-dark"
        intervalMs={4000}
      />
    </section>
  );
}
