import Link from "next/link";

type BlogSubnavProps = {
  context: "list" | "article";
  currentTitle?: string;
};

export function BlogSubnav({ context, currentTitle }: BlogSubnavProps) {
  const isList = context === "list";

  return (
    <div className="sticky top-[86px] z-50 border-b border-zinc-900 bg-zinc-950/80 backdrop-blur-md">
      <div className="mx-auto flex h-12 max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
        <div className="flex min-w-0 flex-1 items-center gap-2 text-[13px]">
          {isList ? (
            <span className="inline-flex items-center gap-2 font-semibold text-zinc-200">
              <span className="size-1.5 rounded-full bg-cyan-400" />
              Tous les articles
            </span>
          ) : (
            <nav aria-label="Fil d'Ariane" className="flex min-w-0 items-center gap-2 text-zinc-500">
              <Link
                href="/"
                className="shrink-0 rounded-sm font-medium text-zinc-400 transition-colors hover:text-cyan-400 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-400"
              >
                Accueil
              </Link>
              <span aria-hidden="true" className="shrink-0 text-zinc-700">/</span>
              <Link
                href="/blog"
                className="shrink-0 rounded-sm font-medium text-zinc-400 transition-colors hover:text-cyan-400 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-400"
              >
                Blog
              </Link>
              {currentTitle && (
                <>
                  <span className="shrink-0 text-zinc-700">/</span>
                  <span aria-current="page" className="truncate text-zinc-300">{currentTitle}</span>
                </>
              )}
            </nav>
          )}
        </div>

        {isList && (
          <Link
            href="/"
            className="inline-flex shrink-0 items-center gap-1.5 rounded-sm text-[13px] font-medium text-zinc-500 transition-colors hover:text-zinc-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-400"
          >
            Retour à l&apos;accueil
          </Link>
        )}
      </div>
    </div>
  );
}
