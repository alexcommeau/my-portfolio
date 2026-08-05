"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { SectionLink } from "@/components/portfolio/section-link";
import { navItems } from "@/lib/data";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";

const underline =
  "absolute bottom-0 left-0 h-0.5 w-full origin-left scale-x-0 rounded-full bg-gradient-to-r from-cyan-400 via-teal-400 to-amber-400 transition-transform duration-250 ease-out group-hover:scale-x-100";

const desktopItemClass =
  "group relative cursor-pointer whitespace-nowrap pb-1 text-[13px] font-medium text-zinc-400 transition-colors hover:text-zinc-100";
const mobileItemClass =
  "cursor-pointer rounded-md px-3 py-3 text-left text-[15px] font-medium text-zinc-300 transition-colors hover:bg-zinc-900 hover:text-cyan-400";

export function Navbar() {
  const [open, setOpen] = useState(false);

  function closeMenu() {
    setOpen(false);
  }

  function renderNavItem(
    item: (typeof navItems)[number],
    className: string,
    withUnderline: boolean,
  ) {
    const content = (
      <>
        {item.label}
        {withUnderline && <span className={underline} />}
      </>
    );

    if (item.href.startsWith("#")) {
      return (
        <SectionLink
          key={item.href}
          sectionId={item.href.slice(1)}
          onClick={closeMenu}
          className={className}
        >
          {content}
        </SectionLink>
      );
    }

    return (
      <Link
        key={item.href}
        href={item.href}
        onClick={closeMenu}
        className={className}
      >
        {content}
      </Link>
    );
  }

  return (
    <nav className="sticky top-0 z-[60] flex h-[86px] items-center justify-between gap-4 border-b border-zinc-800 bg-zinc-950/85 px-5 backdrop-blur-md sm:px-8">
      <SectionLink
        sectionId="hero"
        className="shrink-0 cursor-pointer bg-gradient-to-r from-cyan-400 via-teal-400 to-amber-400 bg-clip-text font-mono text-xl font-bold text-transparent"
      >
        [ AC ]
      </SectionLink>

      <div className="hidden items-center gap-4.5 overflow-x-auto md:flex">
        {navItems.map((item) => renderNavItem(item, desktopItemClass, true))}
      </div>

      <SectionLink
        sectionId="contact"
        className="hidden shrink-0 cursor-pointer rounded-md bg-cyan-400 px-4.5 py-2 text-[13.5px] font-semibold text-[#052027] shadow-sm transition-colors hover:bg-cyan-300 md:block"
      >
        Me contacter
      </SectionLink>

      <button
        type="button"
        onClick={() => setOpen((previousOpen) => !previousOpen)}
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
              {navItems.map((item) =>
                renderNavItem(item, mobileItemClass, false),
              )}
            </div>
            <div className="mt-auto px-5 pb-8">
              <SectionLink
                sectionId="contact"
                onClick={closeMenu}
                className="block w-full cursor-pointer rounded-md bg-cyan-400 px-4.5 py-2.5 text-center text-[13.5px] font-semibold text-[#052027] shadow-sm transition-colors hover:bg-cyan-300"
              >
                Me contacter
              </SectionLink>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </nav>
  );
}
