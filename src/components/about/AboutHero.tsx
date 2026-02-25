"use client";

import { LampEffect } from "@/components/animations/LampEffect";
import { motion } from "framer-motion";
import Image from "next/image";
import { assetPath } from "@/lib/utils";

export function AboutHero() {
  return (
    <div className="relative">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src={assetPath("/images/peacock-temple.jpg")}
          alt=""
          fill
          className="object-cover opacity-10"
          sizes="100vw"
        />
      </div>
      <LampEffect className="min-h-[60vh]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="mb-4 inline-block rounded-full border border-gold/30 bg-gold/10 px-5 py-1.5 font-[family-name:var(--font-satoshi)] text-xs font-bold uppercase tracking-[0.2em] text-gold-bright">
            Est. 1964
          </span>

          <h1 className="mt-4 font-[family-name:var(--font-playfair)] text-[clamp(2rem,5vw,3.5rem)] font-bold text-cream">
            About VHP Legal Cell
          </h1>
          <p className="mt-2 font-[family-name:var(--font-noto-serif)] text-[clamp(1.25rem,3vw,2rem)] text-gold/80">
            विधि प्रकोष्ठ के बारे में
          </p>

          <p className="mx-auto mt-6 max-w-xl font-[family-name:var(--font-satoshi)] text-base leading-relaxed text-cream/60">
            The legal wing of Vishwa Hindu Parishad, dedicated to protecting Hindu rights
            through judicial advocacy, legal awareness, and constitutional safeguards across India.
          </p>
        </motion.div>
      </LampEffect>
    </div>
  );
}
