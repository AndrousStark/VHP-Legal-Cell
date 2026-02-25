"use client";

import { type ReactNode, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

const EASE_SPRING: [number, number, number, number] = [0.76, 0, 0.24, 1];

const curtainVariants = {
  initial: {
    scaleY: 0,
    transformOrigin: "bottom",
  },
  animate: {
    scaleY: 1,
    transformOrigin: "bottom",
    transition: {
      duration: 0.4,
      ease: EASE_SPRING,
    },
  },
  exit: {
    scaleY: 0,
    transformOrigin: "top",
    transition: {
      duration: 0.4,
      ease: EASE_SPRING,
    },
  },
};

const contentVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      delay: 0.3,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.2,
    },
  },
};

interface PageTransitionProps {
  children: ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const isFirstMount = useRef(true);

  useEffect(() => {
    isFirstMount.current = false;
  }, []);

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        variants={contentVariants}
        initial={isFirstMount.current ? false : "initial"}
        animate="animate"
        exit="exit"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

/** Saffron curtain overlay — use in template.tsx for route transitions */
export function SaffronCurtain() {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={`curtain-${pathname}`}
        variants={curtainVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="fixed inset-0 z-[9998] pointer-events-none"
        style={{
          background: "linear-gradient(135deg, #B35A1F 0%, #C4922C 100%)",
        }}
      />
    </AnimatePresence>
  );
}
