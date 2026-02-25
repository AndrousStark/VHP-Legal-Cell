"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface NumberTickerProps {
  value: number;
  /** Suffix like "+" or "%" */
  suffix?: string;
  /** Prefix like "₹" */
  prefix?: string;
  /** Animation duration in seconds */
  duration?: number;
  /** Decimal places */
  decimals?: number;
  className?: string;
  /** Format with Indian numbering */
  locale?: string;
}

export function NumberTicker({
  value,
  suffix = "",
  prefix = "",
  duration = 2.5,
  decimals = 0,
  className,
  locale = "en-IN",
}: NumberTickerProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const startTime = Date.now();
    const endValue = value;

    let frameId: number;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / (duration * 1000), 1);

      // Ease out expo for odometer feel
      const eased = 1 - Math.pow(1 - progress, 4);
      const current = Math.round(eased * endValue * Math.pow(10, decimals)) / Math.pow(10, decimals);

      setDisplayValue(current);

      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      }
    };

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [isInView, value, duration, decimals]);

  const formattedValue = new Intl.NumberFormat(locale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(displayValue);

  return (
    <motion.span
      ref={ref}
      className={cn("tabular-nums", className)}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
    >
      {prefix}
      {formattedValue}
      {suffix}
    </motion.span>
  );
}
