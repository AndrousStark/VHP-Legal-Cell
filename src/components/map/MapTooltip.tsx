"use client";

import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MapTooltipProps {
  visible: boolean;
  x: number;
  y: number;
  stateName: string;
  chetraName: string;
  districtName?: string;
  cases?: number;
  members?: number;
  className?: string;
}

export function MapTooltip({
  visible,
  x,
  y,
  stateName,
  chetraName,
  districtName,
  cases,
  members,
  className,
}: MapTooltipProps) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className={cn(
            "glass-dark pointer-events-none fixed z-[600] rounded-lg px-4 py-3 shadow-lg",
            className,
          )}
          style={{
            left: Math.min(x + 14, (typeof window !== "undefined" ? window.innerWidth : 1200) - 220),
            top: Math.min(y + 14, (typeof window !== "undefined" ? window.innerHeight : 800) - 100),
          }}
          initial={{ opacity: 0, scale: 0.85, y: 6 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.85, y: 6 }}
          transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          {districtName ? (
            <>
              <p className="font-[family-name:var(--font-playfair)] text-sm font-bold text-cream">
                {districtName}
              </p>
              <p className="mt-0.5 text-xs text-cream/60">{stateName}</p>
              <p className="mt-0.5 text-xs text-gold-bright">{chetraName}</p>
            </>
          ) : (
            <>
              <p className="font-[family-name:var(--font-playfair)] text-sm font-bold text-cream">
                {stateName}
              </p>
              <p className="mt-0.5 text-xs text-gold-bright">{chetraName}</p>
            </>
          )}

          {(cases !== undefined || members !== undefined) && (
            <div className="mt-2 flex gap-4 border-t border-gold/20 pt-2">
              {cases !== undefined && (
                <div>
                  <span className="text-xs text-cream/60">Cases</span>
                  <p className="text-sm font-semibold text-saffron-bright">
                    {cases}
                  </p>
                </div>
              )}
              {members !== undefined && (
                <div>
                  <span className="text-xs text-cream/60">Members</span>
                  <p className="text-sm font-semibold text-saffron-bright">
                    {members}
                  </p>
                </div>
              )}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
