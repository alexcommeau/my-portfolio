import { ArticleCallout } from "@/components/blog/article-callout";
import { SectionReveal } from "@/components/ui/section-reveal";

const kept = [
  "Colocaliser le data-fetching dans les Server Components plutôt que dans des hooks côté client.",
  "Utiliser les layouts imbriqués pour partager la navigation sans re-render inutile.",
  "Streamer les parties lentes avec Suspense au lieu de bloquer toute la page.",
];

const dropped = [
  "Les gros stores globaux pour de l'état qui n'a jamais quitté le serveur.",
  "Le réflexe « tout est client » hérité des SPA.",
];

export function NextAppRouterWorkflowContent() {
  return (
    <div className="text-[17px] leading-loose text-zinc-300">
      <SectionReveal>
        <p className="mb-6">
          Le passage à l&apos;App Router de Next.js n&apos;a pas été qu&apos;un
          changement de dossier. Server Components, layouts imbriqués et streaming
          ont modifié la façon dont je découpe une application — voici ce qui a
          survécu, et ce que j&apos;ai laissé derrière.
        </p>
      </SectionReveal>

      <SectionReveal>
        <h2 className="mt-12 mb-4.5 text-2xl font-bold tracking-tight text-zinc-100">
          Les habitudes que j&apos;ai gardées
        </h2>
        <div className="mb-7 flex flex-col gap-3">
          {kept.map((item) => (
            <div key={item} className="flex items-start gap-2.5">
              <span className="mt-0.5 shrink-0 text-cyan-400">›</span>
              <span>{item}</span>
            </div>
          ))}
        </div>

        <ArticleCallout title="À retenir">
          Par défaut, un composant est un Server Component. On ne bascule vers{" "}
          <code>&quot;use client&quot;</code> que lorsqu&apos;on a réellement
          besoin d&apos;interactivité — pas l&apos;inverse.
        </ArticleCallout>
      </SectionReveal>

      <SectionReveal>
        <h2 className="mt-12 mb-4.5 text-2xl font-bold tracking-tight text-zinc-100">
          Ce que j&apos;ai abandonné
        </h2>
        <div className="mb-7 flex flex-col gap-3">
          {dropped.map((item) => (
            <div key={item} className="flex items-start gap-2.5">
              <span className="mt-0.5 shrink-0 text-amber-400">›</span>
              <span>{item}</span>
            </div>
          ))}
        </div>

        <p>
          Le gain le plus net&nbsp;: moins de JavaScript envoyé au navigateur pour
          des pages qui, au fond, n&apos;avaient jamais eu besoin d&apos;être
          interactives.
        </p>
      </SectionReveal>
    </div>
  );
}
