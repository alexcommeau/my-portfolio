import type { BlogPost } from "@/lib/data";

export function ArticleTableOfContents({
  sections,
}: {
  sections: BlogPost["sections"];
}) {
  return (
    <nav
      aria-label="Table des matières"
      className="mb-10 rounded-xl border border-zinc-800 bg-zinc-900/60 p-5 sm:p-6"
    >
      <div className="mb-3 font-mono text-[11px] font-semibold tracking-wider text-cyan-300 uppercase">
        Dans cet article
      </div>
      <ol className="grid gap-2 text-sm text-zinc-400 sm:grid-cols-2 sm:gap-x-6">
        {sections.map((section, index) => (
          <li key={section.id} className="min-w-0">
            <a
              href={`#${section.id}`}
              className="group inline-flex items-start gap-2 rounded-sm transition-colors hover:text-cyan-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-400"
            >
              <span className="font-mono text-[11px] leading-5 text-zinc-600 group-hover:text-cyan-400">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span>{section.title}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

