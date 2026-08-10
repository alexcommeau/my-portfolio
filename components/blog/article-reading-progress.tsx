"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll } from "motion/react";

// Bas de la sous-navigation sticky (navbar 86px + BlogSubnav 48px). Source unique
// pour la position de la barre et le point de départ du suivi de défilement.
const SUBNAV_OFFSET = 134;

type ArticleReadingProgressProps = {
  children: ReactNode;
};

export function ArticleReadingProgress({
  children,
}: ArticleReadingProgressProps) {
  const articleRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: articleRef,
    offset: [`start ${SUBNAV_OFFSET}px`, "end end"],
    trackContentSize: true,
  });

  return (
    <>
      <div
        aria-hidden="true"
        style={{ top: SUBNAV_OFFSET }}
        className="pointer-events-none fixed right-0 left-0 z-[55] hidden h-[3px] overflow-hidden bg-zinc-800/80 motion-safe:block"
      >
        <motion.div
          className="h-full w-full origin-left bg-gradient-to-r from-cyan-400 via-teal-400 to-amber-400"
          style={{ scaleX: scrollYProgress }}
        />
      </div>
      <article
        ref={articleRef}
        className="mx-auto max-w-[760px] scroll-mt-[var(--article-anchor-offset)] px-5 py-16 sm:px-8 sm:py-20"
      >
        {children}
      </article>
    </>
  );
}

