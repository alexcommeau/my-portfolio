"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: React.ReactNode;
  variant?: "up" | "left";
  className?: string;
};

export function Reveal({ children, variant = "up", className }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: variant === "left" ? 0.2 : 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [variant]);

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-700 ease-out",
        !visible &&
          (variant === "left"
            ? "opacity-0 translate-x-15"
            : "opacity-0 translate-y-7"),
        visible && "opacity-100 translate-x-0 translate-y-0",
        className
      )}
    >
      {children}
    </div>
  );
}
