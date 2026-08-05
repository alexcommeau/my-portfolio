"use client";

import { useEffect, type ComponentProps, type MouseEvent } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { animate, useReducedMotion } from "motion/react";

const PENDING_SECTION_KEY = "portfolio-section-target";
let stopActiveScroll: (() => void) | null = null;

function getSectionTop(element: HTMLElement) {
  const scrollPaddingTop = Number.parseFloat(
    getComputedStyle(document.documentElement).scrollPaddingTop,
  );

  return (
    window.scrollY +
    element.getBoundingClientRect().top -
    (Number.isFinite(scrollPaddingTop) ? scrollPaddingTop : 0)
  );
}

export function scrollToSection(sectionId: string, instant = false) {
  const element = document.getElementById(sectionId);
  if (!element) return;

  stopActiveScroll?.();

  const start = window.scrollY;
  const target = getSectionTop(element);

  if (instant) {
    window.scrollTo({ top: target, behavior: "auto" });
    return;
  }

  const distance = Math.abs(target - start);
  const duration = Math.min(1.25, Math.max(0.8, distance / 1600));
  const controls = animate(start, target, {
    duration,
    ease: [0.65, 0, 0.35, 1],
    onUpdate: (position) => window.scrollTo(0, position),
  });

  stopActiveScroll = () => controls.stop();
}

type SectionLinkProps = Omit<ComponentProps<typeof Link>, "href"> & {
  sectionId: string;
};

export function SectionLink({
  sectionId,
  onClick,
  ...props
}: SectionLinkProps) {
  const pathname = usePathname();
  const router = useRouter();
  const shouldReduceMotion = useReducedMotion();

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);

    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    event.preventDefault();

    if (pathname !== "/") {
      sessionStorage.setItem(PENDING_SECTION_KEY, sectionId);
      router.push("/", { scroll: false });
      return;
    }

    scrollToSection(sectionId, Boolean(shouldReduceMotion));
  };

  return <Link href={`/#${sectionId}`} onClick={handleClick} {...props} />;
}

export function PendingSectionScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const stopScroll = () => stopActiveScroll?.();

    window.addEventListener("wheel", stopScroll, { passive: true });
    window.addEventListener("touchstart", stopScroll, { passive: true });

    return () => {
      window.removeEventListener("wheel", stopScroll);
      window.removeEventListener("touchstart", stopScroll);
    };
  }, []);

  useEffect(() => {
    if (pathname !== "/") return;

    const sectionId = sessionStorage.getItem(PENDING_SECTION_KEY);
    if (!sectionId) return;

    sessionStorage.removeItem(PENDING_SECTION_KEY);
    const frame = requestAnimationFrame(() => scrollToSection(sectionId, true));

    return () => cancelAnimationFrame(frame);
  }, [pathname]);

  return null;
}
