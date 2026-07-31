import Link from "next/link";

export function ArticleNav() {
  return (
    <nav className="sticky top-0 z-50 flex h-16 items-center justify-between border-b border-zinc-800 bg-zinc-950/85 px-8 backdrop-blur-md sm:px-16">
      <Link
        href="/"
        className="font-mono text-lg font-bold bg-gradient-to-r from-cyan-400 via-teal-400 to-amber-400 bg-clip-text text-transparent"
      >
        [ AC ]
      </Link>
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-zinc-400 transition-colors hover:text-zinc-100"
      >
        <svg
          className="size-3.75"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <path d="M19 12H5M11 18l-6-6 6-6" />
        </svg>
        Retour à l&apos;accueil
      </Link>
    </nav>
  );
}
