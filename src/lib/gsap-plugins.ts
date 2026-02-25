"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Register plugins and set defaults — only in browser
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);

  gsap.defaults({
    ease: "power3.out",
    duration: 0.8,
  });

  ScrollTrigger.defaults({
    toggleActions: "play none none reverse",
  });
}

export { gsap, ScrollTrigger, useGSAP };

/* ─── Reusable Animation Presets ─── */

/** Fade up from below — the workhorse scroll reveal */
export const ANIM_FADE_UP = {
  from: { y: 60, opacity: 0 },
  to: { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
};

/** Blur-to-sharp fade in */
export const ANIM_BLUR_FADE = {
  from: { filter: "blur(10px)", opacity: 0 },
  to: { filter: "blur(0px)", opacity: 1, duration: 0.6, ease: "power2.out" },
};

/** Scale-in with slight bounce */
export const ANIM_SCALE_IN = {
  from: { scale: 0.85, opacity: 0 },
  to: { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.7)" },
};

/** Stagger children with fade-up */
export const ANIM_STAGGER_CHILDREN = {
  from: { y: 40, opacity: 0 },
  stagger: 0.1,
  duration: 0.6,
  ease: "power3.out",
};

/** Card hover animation values */
export const CARD_HOVER = {
  y: -8,
  boxShadow: "0 8px 30px rgba(61,15,15,0.15)",
  duration: 0.3,
  ease: "power2.out",
};

/** Page transition timing */
export const PAGE_TRANSITION = {
  curtainDuration: 0.4,
  curtainEase: [0.76, 0, 0.24, 1] as [number, number, number, number],
  contentDelay: 0.3,
  contentDuration: 0.4,
};
