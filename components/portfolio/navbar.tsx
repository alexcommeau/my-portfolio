"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { navItems } from "@/lib/data";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  el?.scrollIntoView({ block: "start" });
}

export function Navbar() {
  const [open, setOpen] = useState(false);

  function handleNavigate(id: string) {
    setOpen(false);
    scrollToSection(id);
  }

  return (
    <nav className="sticky top-0 z-[60] flex h-[86px] items-center justify-between gap-4 border-b border-zinc-800 bg-zinc-950/85 px-5 backdrop-blur-md sm:px-8">
      <button
        onClick={() => handleNavigate("hero")}
        className="shrink-0 cursor-pointer bg-gradient-to-r from-cyan-400 via-teal-400 to-amber-400 bg-clip-text font-mono text-xl font-bold text-transparent"
      >
        [ AC ]
      </button>

      <div className="hidden items-center gap-4.5 overflow-x-auto md:flex">
        {navItems.map((item) => (
          <button
            key={item.href}
            onClick={() => handleNavigate(item.href.slice(1))}
            className="group relative cursor-pointer whitespace-nowrap pb-1 text-[13px] font-medium text-zinc-400 transition-colors hover:text-zinc-100"
          >
            {item.label}
            <span className="absolute bottom-0 left-0 h-0.5 w-full origin-left scale-x-0 rounded-full bg-gradient-to-r from-cyan-400 via-teal-400 to-amber-400 transition-transform duration-250 ease-out group-hover:scale-x-100" />
          </button>
        ))}
      </div>

      <button
        onClick={() => handleNavigate("contact")}
        className="hidden shrink-0 cursor-pointer rounded-md bg-cyan-400 px-4.5 py-2 text-[13.5px] font-semibold text-[#052027] shadow-sm transition-colors hover:bg-cyan-300 md:block"
      >
        Me contacter
      </button>

      <button
        onClick={() => setOpen((prev) => !prev)}
        aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
        aria-expanded={open}
        className="relative flex size-9.5 shrink-0 cursor-pointer items-center justify-center rounded-md border border-zinc-800 bg-zinc-900 text-zinc-300 transition-colors hover:border-cyan-400 hover:text-cyan-400 md:hidden"
      >
        <Menu
          aria-hidden="true"
          className={`absolute size-4.5 transition-all duration-300 ease-out ${
            open ? "rotate-45 opacity-0" : "rotate-0 opacity-100"
          }`}
        />
        <X
          aria-hidden="true"
          className={`absolute size-4.5 transition-all duration-300 ease-out ${
            open ? "rotate-0 opacity-100" : "-rotate-45 opacity-0"
          }`}
        />
      </button>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          side="right"
          showCloseButton={false}
          className="w-3/4 border-l border-zinc-800 bg-zinc-950/90 backdrop-blur-md sm:max-w-xs"
        >
          <SheetTitle className="sr-only">Menu de navigation</SheetTitle>
          <div className="flex h-full flex-col pt-[86px]">
            <div className="flex flex-col gap-1 px-5 py-6">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => handleNavigate(item.href.slice(1))}
                  className="cursor-pointer rounded-md px-3 py-3 text-left text-[15px] font-medium text-zinc-300 transition-colors hover:bg-zinc-900 hover:text-cyan-400"
                >
                  {item.label}
                </button>
              ))}
            </div>
            <div className="mt-auto px-5 pb-8">
              <button
                onClick={() => handleNavigate("contact")}
                className="w-full cursor-pointer rounded-md bg-cyan-400 px-4.5 py-2.5 text-[13.5px] font-semibold text-[#052027] shadow-sm transition-colors hover:bg-cyan-300"
              >
                Me contacter
              </button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </nav>
  );
}
