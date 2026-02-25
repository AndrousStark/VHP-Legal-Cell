"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface LampEffectProps {
  children: ReactNode;
  className?: string;
}

/**
 * Lamp Effect — inspired by Aceternity UI
 * A dramatic lamp light that illuminates from top, revealing content below.
 */
export function LampEffect({ children, className }: LampEffectProps) {
  return (
    <div
      className={cn(
        "relative flex min-h-[500px] flex-col items-center justify-center overflow-hidden bg-maroon-dark",
        className
      )}
    >
      {/* Lamp glow */}
      <div className="relative flex w-full flex-1 items-center justify-center">
        <motion.div
          initial={{ opacity: 0.5, width: "8rem" }}
          whileInView={{ opacity: 1, width: "20rem" }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          viewport={{ once: true }}
          className="absolute inset-auto z-50 h-0.5 w-[20rem] -translate-y-[7rem] bg-saffron-bright"
        />

        {/* Conic gradient glow */}
        <motion.div
          initial={{ opacity: 0.2, width: "15rem" }}
          whileInView={{ opacity: 0.6, width: "30rem" }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          viewport={{ once: true }}
          style={{
            backgroundImage:
              "conic-gradient(var(--saffron-bright) 0deg, transparent 60deg, transparent 300deg, var(--saffron-bright) 360deg)",
          }}
          className="absolute inset-auto right-1/2 h-56 w-[30rem] translate-y-[-8rem] overflow-visible bg-gradient-to-r from-saffron-bright via-transparent to-transparent [--conic-position:from_70deg_at_center_top]"
        >
          {/* Shadow masks */}
          <div className="absolute bottom-0 left-0 z-20 h-40 w-[100%] bg-maroon-dark [mask-image:linear-gradient(to_top,white,transparent)]" />
          <div className="absolute bottom-0 left-0 z-20 h-[100%] w-40 bg-maroon-dark [mask-image:linear-gradient(to_right,white,transparent)]" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0.2, width: "15rem" }}
          whileInView={{ opacity: 0.6, width: "30rem" }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          viewport={{ once: true }}
          style={{
            backgroundImage:
              "conic-gradient(var(--saffron-bright) 0deg, transparent 60deg, transparent 300deg, var(--saffron-bright) 360deg)",
          }}
          className="absolute inset-auto left-1/2 h-56 w-[30rem] translate-y-[-8rem] overflow-visible bg-gradient-to-l from-saffron-bright via-transparent to-transparent [--conic-position:from_290deg_at_center_top]"
        >
          <div className="absolute bottom-0 right-0 z-20 h-[100%] w-40 bg-maroon-dark [mask-image:linear-gradient(to_left,white,transparent)]" />
          <div className="absolute bottom-0 right-0 z-20 h-40 w-[100%] bg-maroon-dark [mask-image:linear-gradient(to_top,white,transparent)]" />
        </motion.div>

        {/* Soft glow underneath */}
        <div className="absolute top-1/2 h-48 w-full translate-y-12 bg-maroon-dark blur-2xl" />
        <div className="absolute top-1/2 z-50 h-48 w-full bg-transparent opacity-10 backdrop-blur-md" />
        <div className="absolute inset-auto z-50 h-36 w-[28rem] -translate-y-1/2 rounded-full bg-saffron-bright/20 opacity-50 blur-3xl" />

        {/* Narrow beam */}
        <motion.div
          initial={{ width: "6rem" }}
          whileInView={{ width: "16rem" }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          viewport={{ once: true }}
          className="absolute inset-auto z-30 h-36 w-64 -translate-y-[6rem] rounded-full bg-saffron/30 blur-2xl"
        />

        {/* Top line */}
        <motion.div
          initial={{ width: "8rem" }}
          whileInView={{ width: "16rem" }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          viewport={{ once: true }}
          className="absolute inset-auto z-50 h-0.5 w-[16rem] -translate-y-[7rem] bg-gold"
        />
      </div>

      {/* Content below lamp */}
      <div className="relative z-50 -mt-32 flex flex-col items-center px-5">
        {children}
      </div>
    </div>
  );
}
