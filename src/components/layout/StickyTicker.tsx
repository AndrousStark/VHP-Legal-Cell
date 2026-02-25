"use client";

import { useState, useEffect } from "react";
import Marquee from "react-fast-marquee";
import { useTranslations } from "next-intl";

// Placeholder news items — will be replaced by API data
const TICKER_ITEMS = [
  { id: 1, text: "VHP Legal Cell files PIL for temple reclamation in Mathura", href: "/news/mathura-pil" },
  { id: 2, text: "Supreme Court hearing on Gyanvapi case — 28 Feb 2026", href: "/cases/gyanvapi" },
  { id: 3, text: "Prant Shiksha Varg held in Jaipur — 200+ advocates attend", href: "/activities/jaipur-varg" },
  { id: 4, text: "VHP Legal Cell wins landmark cow protection case in Allahabad HC", href: "/cases/cow-protection-ahc" },
  { id: 5, text: "National Convenor addresses Hindu legal conclave in Delhi", href: "/news/delhi-conclave" },
];

export function StickyTicker() {
  const t = useTranslations("ticker");
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const onScroll = () => setHidden(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed left-0 right-0 top-0 z-[210] w-full overflow-hidden bg-maroon-dark transition-transform duration-300 ${hidden ? "-translate-y-full" : "translate-y-0"}`}
    >
      <div className="flex items-center">
        {/* Label */}
        <div className="shrink-0 bg-saffron-bright px-4 py-1.5 font-[family-name:var(--font-satoshi)] text-xs font-bold uppercase tracking-widest text-white">
          {t("heading")}
        </div>

        {/* Scrolling content */}
        <Marquee
          speed={40}
          pauseOnHover
          gradient
          gradientColor="#3D0F0F"
          gradientWidth={60}
          className="py-1.5"
        >
          {TICKER_ITEMS.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className="mx-8 inline-block whitespace-nowrap font-[family-name:var(--font-satoshi)] text-sm text-cream/90 transition-colors duration-200 hover:text-gold-bright hover:underline underline-offset-4"
            >
              <span className="mr-2 text-saffron-bright">●</span>
              {item.text}
            </a>
          ))}
        </Marquee>
      </div>
    </div>
  );
}
