"use client";

import { navItems } from "@/lib/data";

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (el) {
    const top = el.getBoundingClientRect().top + window.scrollY - 10;
    window.scrollTo({ top, behavior: "smooth" });
  }
}

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 flex h-[86px] items-center justify-between gap-4 border-b border-zinc-800 bg-zinc-950/85 px-8 backdrop-blur-md">
      <button
        onClick={() => scrollToSection("hero")}
        className="shrink-0 cursor-pointer bg-gradient-to-r from-cyan-400 via-teal-400 to-amber-400 bg-clip-text font-mono text-lg font-bold text-transparent"
      >
        [ AC ]
      </button>
      <div className="flex items-center gap-4.5 overflow-x-auto">
        {navItems.map((item) => (
          <button
            key={item.href}
            onClick={() => scrollToSection(item.href.slice(1))}
            className="group relative cursor-pointer whitespace-nowrap pb-1 text-[13px] font-medium text-zinc-400 transition-colors hover:text-zinc-100"
          >
            {item.label}
            <span className="absolute bottom-0 left-0 h-0.5 w-full origin-left scale-x-0 rounded-full bg-gradient-to-r from-cyan-400 via-teal-400 to-amber-400 transition-transform duration-250 ease-out group-hover:scale-x-100" />
          </button>
        ))}
      </div>
      <button
        onClick={() => scrollToSection("contact")}
        className="shrink-0 cursor-pointer rounded-md bg-cyan-400 px-4.5 py-2 text-[13.5px] font-semibold text-[#052027] shadow-sm transition-colors hover:bg-cyan-300"
      >
        Me contacter
      </button>
    </nav>
  );
}
