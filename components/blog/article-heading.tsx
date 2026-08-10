import type { ReactNode } from "react";

// Titre de section d'article. Centralise le style et le décalage d'ancre
// (`--article-anchor-offset`) partagés par tous les articles du blog.
export function ArticleHeading({
  id,
  children,
}: {
  id: string;
  children: ReactNode;
}) {
  return (
    <h2
      id={id}
      className="mt-12 mb-4.5 scroll-mt-[var(--article-anchor-offset)] text-2xl font-bold tracking-tight text-zinc-100"
    >
      {children}
    </h2>
  );
}
