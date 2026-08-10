import { ArticleCallout } from "@/components/blog/article-callout";
import { ArticleHeading } from "@/components/blog/article-heading";

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
      <p className="mb-6">
        Le passage à l&apos;App Router de Next.js n&apos;a pas été qu&apos;un
        changement de dossier. Server Components, layouts imbriqués et streaming
        ont modifié la façon dont je découpe une application — voici ce qui a
        survécu, et ce que j&apos;ai laissé derrière.
      </p>

      <ArticleHeading id="objectif">Ce que l&apos;App Router change</ArticleHeading>
      <p className="mb-6">
        Mon point de départ est désormais le serveur. Je garde le rendu et les
        accès aux données dans les Server Components, puis je descends la frontière
        client au plus près des boutons, formulaires ou API navigateur qui en ont
        réellement besoin.
      </p>

      <ArticleHeading id="frontiere-server-client">
        Choisir la frontière serveur-client
      </ArticleHeading>
      <p className="mb-6">
        Une directive <code>&quot;use client&quot;</code> déplace aussi les imports du
        composant dans le graphe client. Je crée donc de petits îlots interactifs
        auxquels le serveur passe des propriétés sérialisables, au lieu de faire
        basculer une page entière dans le navigateur.
      </p>

      <ArticleHeading id="habitudes-gardees">
        Les habitudes que j&apos;ai gardées
      </ArticleHeading>
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

      <ArticleHeading id="habitudes-abandonnees">
        Ce que j&apos;ai abandonné
      </ArticleHeading>
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

      <ArticleHeading id="conclusion">Conclusion</ArticleHeading>
      <p>
        Le workflow le plus efficace reste celui qui choisit explicitement où le
        code doit s&apos;exécuter. L&apos;App Router apporte surtout un meilleur défaut&nbsp;:
        envoyer du HTML et des données, puis ajouter du JavaScript seulement là où
        l&apos;interaction le justifie.
      </p>
    </div>
  );
}
