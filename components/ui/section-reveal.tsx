"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

type SectionRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

const revealTransition = {
  duration: 0.5,
  ease: "easeOut" as const,
};

export function SectionReveal({
  children,
  className,
  delay = 0,
}: SectionRevealProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={
        shouldReduceMotion ? { duration: 0 } : { ...revealTransition, delay }
      }
      className={className}
    >
      {children}
    </motion.div>
  );
}
