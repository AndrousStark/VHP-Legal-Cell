"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface BeamStepProps {
  icon: ReactNode;
  label: string;
  isLast?: boolean;
}

function BeamStep({ icon, label, isLast = false }: BeamStepProps) {
  return (
    <div className="flex items-center gap-0">
      {/* Node */}
      <div className="flex flex-col items-center gap-2">
        <div className="flex h-14 w-14 items-center justify-center rounded-xl border-2 border-gold/20 bg-cream-light shadow-sm">
          {icon}
        </div>
        <span className="max-w-[100px] text-center font-[family-name:var(--font-satoshi)] text-xs font-medium text-charcoal-light">
          {label}
        </span>
      </div>

      {/* Beam connector */}
      {!isLast && (
        <div className="relative mx-2 h-0.5 w-12 overflow-hidden bg-gold/10 md:w-16 lg:w-20">
          <motion.div
            className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-saffron to-gold"
            initial={{ scaleX: 0, transformOrigin: "left" }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
          />
          {/* Animated dot */}
          <motion.div
            className="absolute top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-saffron-bright"
            initial={{ left: "0%" }}
            whileInView={{ left: "100%" }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear", delay: 0.5 }}
            viewport={{ once: true }}
          />
        </div>
      )}
    </div>
  );
}

interface AnimatedBeamProps {
  steps: { icon: ReactNode; label: string }[];
  className?: string;
}

/**
 * Animated Beam — inspired by Magic UI
 * Shows a flow/process with animated connecting beams between steps.
 */
export function AnimatedBeam({ steps, className }: AnimatedBeamProps) {
  return (
    <div
      className={cn(
        "flex items-start justify-center overflow-x-auto py-8",
        className
      )}
    >
      {steps.map((step, i) => (
        <BeamStep
          key={i}
          icon={step.icon}
          label={step.label}
          isLast={i === steps.length - 1}
        />
      ))}
    </div>
  );
}
