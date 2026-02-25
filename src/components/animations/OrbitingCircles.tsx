"use client";

import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface OrbitingCirclesProps {
  className?: string;
  children?: ReactNode;
  /** Orbit radius in pixels */
  radius?: number;
  /** Duration of one full orbit in seconds */
  duration?: number;
  /** Start delay in seconds */
  delay?: number;
  /** Reverse direction */
  reverse?: boolean;
  /** Path stroke color */
  pathColor?: string;
}

/**
 * Orbiting Circles — inspired by Magic UI
 * Items orbit around a center point on a circular path.
 */
export function OrbitingCircles({
  className,
  children,
  radius = 160,
  duration = 20,
  delay = 0,
  reverse = false,
  pathColor = "rgba(196,146,44,0.15)",
}: OrbitingCirclesProps) {
  return (
    <div
      className={cn("absolute", className)}
      style={
        {
          "--orbit-radius": `${radius}px`,
          "--orbit-duration": `${duration}s`,
          "--orbit-delay": `-${delay}s`,
          width: `${radius * 2}px`,
          height: `${radius * 2}px`,
        } as React.CSSProperties
      }
    >
      {/* Orbit path (visible ring) */}
      <svg
        className="absolute inset-0 h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="50%"
          cy="50%"
          r={radius - 1}
          fill="none"
          stroke={pathColor}
          strokeWidth="1"
          strokeDasharray="4 4"
        />
      </svg>

      {/* Orbiting element */}
      <div
        className="absolute flex h-full w-full items-center justify-center"
        style={{
          animation: `orbit var(--orbit-duration) linear var(--orbit-delay) infinite ${
            reverse ? "reverse" : "normal"
          }`,
        }}
      >
        <div
          className="absolute"
          style={{
            transform: `translateY(calc(-1 * var(--orbit-radius)))`,
          }}
        >
          {/* Counter-rotate to keep element upright */}
          <div
            style={{
              animation: `orbit var(--orbit-duration) linear var(--orbit-delay) infinite ${
                reverse ? "normal" : "reverse"
              }`,
            }}
          >
            {children}
          </div>
        </div>
      </div>

    </div>
  );
}

/** Center element for the orbit */
export function OrbitCenter({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("relative z-10 flex items-center justify-center", className)}>
      {children}
    </div>
  );
}
