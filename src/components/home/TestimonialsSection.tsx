"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { assetPath } from "@/lib/utils";
import { Quote } from "lucide-react";

/* ─── Mock testimonials — will be API-driven ─── */
const TESTIMONIALS = [
  {
    id: 1,
    quote:
      "VHP Legal Cell has been instrumental in protecting Hindu temple rights across Uttar Pradesh. Their systematic approach to legal advocacy is unmatched.",
    name: "Justice (Retd.) B.K. Sharma",
    designation: "Former High Court Judge",
    photo: null,
  },
  {
    id: 2,
    quote:
      "The Legal Cell provided crucial support during our temple reclamation case. Their team of dedicated advocates fought tirelessly for justice.",
    name: "Pandit Ramesh Shastri",
    designation: "Temple Trust Secretary, Varanasi",
    photo: null,
  },
  {
    id: 3,
    quote:
      "Through Prant Shiksha Varg programs, VHP Legal Cell is creating awareness about Hindu legal rights in every corner of India. A truly national effort.",
    name: "Adv. Meena Kumari",
    designation: "High Court Advocate, Delhi",
    photo: null,
  },
  {
    id: 4,
    quote:
      "The cow protection PIL filed by the Legal Cell set a landmark precedent in Rajasthan. This is legal advocacy at its finest.",
    name: "Adv. Suresh Bhatt",
    designation: "Senior Advocate, Rajasthan HC",
    photo: null,
  },
];

export function TestimonialsSection() {
  const t = useTranslations("testimonials");
  const [activeIndex, setActiveIndex] = useState(0);

  const nextTestimonial = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  }, []);

  useEffect(() => {
    const interval = setInterval(nextTestimonial, 5000);
    return () => clearInterval(interval);
  }, [nextTestimonial]);

  const current = TESTIMONIALS[activeIndex];

  return (
    <section className="section-padding relative overflow-hidden bg-cream">
      {/* Subtle shimmer background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gold/3 to-saffron/3" />

      {/* Decorative temple diyas image */}
      <div className="absolute -left-16 bottom-0 top-0 w-64 opacity-[0.04] hidden lg:block pointer-events-none">
        <Image
          src={assetPath("/images/temple-diyas.jpg")}
          alt=""
          fill
          className="object-cover"
          sizes="256px"
        />
      </div>

      <div className="container-narrow relative z-10">
        <ScrollReveal className="mb-12 text-center">
          <h2 className="font-[family-name:var(--font-playfair)] text-[var(--text-display)] font-bold text-maroon-dark">
            {t("heading")}
          </h2>
        </ScrollReveal>

        {/* Testimonial Card */}
        <div className="relative mx-auto max-w-2xl">
          {/* Giant quote mark */}
          <Quote className="absolute -top-4 -left-4 h-16 w-16 text-saffron/10" />

          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.98 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-2xl border border-gold/10 bg-cream-light/80 p-8 shadow-md backdrop-blur-sm md:p-10"
            >
              {/* Quote */}
              <blockquote className="font-[family-name:var(--font-playfair)] text-lg leading-relaxed text-maroon-dark/90 italic md:text-xl">
                &ldquo;{current.quote}&rdquo;
              </blockquote>

              {/* Author */}
              <div className="mt-6 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-saffron/10 border border-gold/20">
                  <span className="font-[family-name:var(--font-playfair)] text-base font-bold text-saffron">
                    {current.name[0]}
                  </span>
                </div>
                <div>
                  <p className="font-[family-name:var(--font-satoshi)] text-base font-bold text-maroon-dark">
                    {current.name}
                  </p>
                  <p className="font-[family-name:var(--font-satoshi)] text-sm text-charcoal-light">
                    {current.designation}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Dots */}
          <div className="mt-6 flex justify-center gap-2">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === activeIndex
                    ? "w-8 bg-saffron-bright"
                    : "w-2 bg-gold/30 hover:bg-gold/50"
                }`}
                aria-label={`Testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
