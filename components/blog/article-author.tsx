import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/site";

export function ArticleAuthor() {
  return (
    <aside
      aria-labelledby="article-author-title"
      className="mt-12 rounded-xl border border-zinc-800 bg-zinc-900/60 p-6 sm:p-7"
    >
      <div className="flex items-start gap-4">
        <Image
          src={siteConfig.author.image}
          alt={`Portrait de ${siteConfig.author.name}`}
          width={64}
          height={64}
          className="size-14 shrink-0 rounded-full object-cover object-top sm:size-16"
        />
        <div className="min-w-0">
          <div className="font-mono text-[10px] tracking-wider text-cyan-400 uppercase">
            À propos de l&apos;auteur
          </div>
          <h2 id="article-author-title" className="mt-1 text-lg font-bold text-zinc-100">
            {siteConfig.author.name}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-zinc-400">
            Développeur fullstack et ingénieur IA, je documente ici mes choix
            d&apos;architecture, mes expérimentations et les compromis rencontrés
            sur des projets concrets.
          </p>
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm">
            <Link href="/#about" className="text-cyan-400 hover:text-cyan-300">
              Voir mon parcours
            </Link>
            <a
              href={siteConfig.author.github}
              target="_blank"
              rel="noreferrer"
              className="text-zinc-400 hover:text-zinc-200"
            >
              GitHub
            </a>
            <a
              href={siteConfig.author.linkedin}
              target="_blank"
              rel="noreferrer"
              className="text-zinc-400 hover:text-zinc-200"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </aside>
  );
}
