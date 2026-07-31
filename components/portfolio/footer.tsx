import Link from "next/link";
import { navItems } from "@/lib/data";
import { GithubIcon, LinkedinIcon, MailIcon } from "@/components/portfolio/social-icons";

export function Footer() {
  return (
    <footer className="border-t border-zinc-900 px-8 py-10">
      <div className="mx-auto flex max-w-6xl flex-col flex-wrap items-center justify-center gap-6 text-center sm:flex-row sm:gap-4">
        <Link
          href="#hero"
          className="bg-gradient-to-r from-cyan-400 via-teal-400 to-amber-400 bg-clip-text font-mono text-base font-bold text-transparent"
        >
          [ AC ]
        </Link>
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[13.5px] text-zinc-500 transition-colors hover:text-zinc-200"
            >
              {item.label}
            </Link>
          ))}
        </div>
        <div className="flex gap-3">
          <span
            aria-label="GitHub"
            aria-disabled="true"
            className="flex size-8.5 items-center justify-center rounded-md border border-zinc-800 bg-zinc-900 text-zinc-500 transition-colors hover:border-cyan-400 hover:text-cyan-400"
          >
            <GithubIcon className="size-3.75" />
          </span>
          <span
            aria-label="LinkedIn"
            aria-disabled="true"
            className="flex size-8.5 items-center justify-center rounded-md border border-zinc-800 bg-zinc-900 text-zinc-500 transition-colors hover:border-cyan-400 hover:text-cyan-400"
          >
            <LinkedinIcon className="size-3.75" />
          </span>
          <a
            href="mailto:alex.commeau@example.com"
            aria-label="Email"
            className="flex size-8.5 items-center justify-center rounded-md border border-zinc-800 bg-zinc-900 text-zinc-500 transition-colors hover:border-cyan-400 hover:text-cyan-400"
          >
            <MailIcon className="size-3.75" />
          </a>
        </div>
      </div>
      <div className="mx-auto mt-6 max-w-6xl border-t border-zinc-900 pt-5 text-center text-[12.5px] text-zinc-600">
        © 2026 Alex Commeau — conçu &amp; développé avec soin.
      </div>
    </footer>
  );
}
