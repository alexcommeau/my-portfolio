import { ArticleCallout } from "@/components/blog/article-callout";
import { ArticleCodeBlock } from "@/components/blog/article-code-block";
import { ArticleHeading } from "@/components/blog/article-heading";

const differentlyItems = [
  "Mettre en place le monitoring de latence dès le premier jour plutôt qu'après les premiers ralentissements constatés.",
  "Versionner les embeddings séparément du code applicatif pour pouvoir re-indexer sans redéployer.",
  "Prévoir un mode dégradé (modèle plus léger) dès la conception plutôt qu'en rustine.",
];

export function RagAutoHebergeContent() {
  return (
    <div className="text-[17px] leading-loose text-zinc-300">
      <p className="mb-6">
        Depuis quelques mois, je fais tourner un assistant documentaire RAG
        entièrement sur mon propre matériel — pas d&apos;API tierce, pas de
        facture par token. Cet article résume les choix d&apos;architecture,
        les pièges rencontrés, et ce que je referais différemment.
      </p>

      <ArticleHeading id="prerequis">Objectif et prérequis</ArticleHeading>
      <p className="mb-6">
        L&apos;objectif n&apos;est pas de remplacer un service cloud dans tous les
        cas, mais de construire une chaîne locale compréhensible et mesurable.
        Il faut au minimum un serveur capable d&apos;exécuter un petit LLM, un
        stockage persistant et un corpus dont on peut vérifier les réponses.
      </p>

      <ArticleHeading id="pourquoi-auto-heberger">
        Pourquoi auto-héberger
      </ArticleHeading>
      <p className="mb-6">
        Trois raisons m&apos;ont poussé dans cette direction&nbsp;: la
        confidentialité des documents internes que je voulais indexer, le
        coût imprévisible des API propriétaires à l&apos;usage, et surtout la
        curiosité de comprendre ce qui se passe sous le capot d&apos;un
        pipeline RAG plutôt que de consommer une boîte noire.
      </p>

      <ArticleCallout title="À retenir">
        L&apos;auto-hébergement a un coût en temps de maintenance largement
        sous-estimé au départ — prévoyez de la marge sur le calendrier, pas
        seulement sur le budget matériel.
      </ArticleCallout>

      <ArticleHeading id="architecture">L&apos;architecture retenue</ArticleHeading>
      <p className="mb-6">
        Le pipeline se découpe en trois briques&nbsp;: un job d&apos;ingestion
        qui découpe et vectorise les documents, une base vectorielle locale
        pour la recherche de similarité, et un serveur d&apos;inférence qui
        sert un modèle compact quand le GPU principal n&apos;est pas
        disponible.
      </p>

      <div
        role="img"
        aria-label="Pipeline RAG local : ingestion des documents, recherche dans la base vectorielle, puis génération par le serveur d'inférence"
        className="mb-7 grid gap-3 rounded-xl border border-zinc-800 bg-zinc-900/70 p-5 sm:grid-cols-[1fr_auto_1fr_auto_1fr] sm:items-center"
      >
        {[
          ["01", "Ingestion", "Découpage et embeddings"],
          ["02", "Recherche", "Base vectorielle locale"],
          ["03", "Génération", "LLM servi sur le homelab"],
        ].map(([number, title, description], index) => (
          <div key={title} className="contents">
            <div className="rounded-lg border border-zinc-700 bg-zinc-950 p-4">
              <div className="font-mono text-[10px] text-cyan-400">{number}</div>
              <div className="mt-1 text-sm font-bold text-zinc-100">{title}</div>
              <div className="mt-1 text-xs leading-relaxed text-zinc-500">
                {description}
              </div>
            </div>
            {index < 2 && (
              <span aria-hidden="true" className="hidden text-center text-teal-400 sm:block">
                →
              </span>
            )}
          </div>
        ))}
      </div>

      <p className="mb-6">
        Le point le plus délicat a été le découpage des documents&nbsp;: un
        chunking trop fin dilue le contexte, trop large et la recherche de
        similarité perd en précision. Après plusieurs itérations, un
        découpage par section avec chevauchement de 15% a donné les meilleurs
        résultats sur mon corpus.
      </p>

      <ArticleCodeBlock filename="chunking.py">
        <span className="text-cyan-400">def</span>{" "}
        <span className="text-amber-400">chunk_document</span>
        {"(text, size="}
        <span className="text-teal-400">800</span>
        {", overlap="}
        <span className="text-teal-400">120</span>
        {"):"}
        {"\n    chunks = []"}
        {"\n    "}
        <span className="text-cyan-400">for</span> i{" "}
        <span className="text-cyan-400">in</span> range(
        <span className="text-teal-400">0</span>
        {", len(text), size - overlap):"}
        {"\n        chunks.append(text[i:i + size])"}
        {"\n    "}
        <span className="text-cyan-400">return</span> chunks
      </ArticleCodeBlock>

      <ArticleHeading id="evaluation">Évaluer avant d&apos;optimiser</ArticleHeading>
      <p className="mb-6">
        J&apos;ai constitué un petit jeu de questions avec leurs sources attendues,
        puis suivi trois signaux&nbsp;: la pertinence des passages retrouvés, la
        fidélité de la réponse aux sources et la latence totale. Sans cette base,
        changer de modèle ou de stratégie de chunking revient à optimiser à
        l&apos;aveugle.
      </p>

      <ArticleHeading id="retour-experience">
        Ce que je referais différemment
      </ArticleHeading>
      <p className="mb-4">
        Quelques ajustements que j&apos;apporterais avec le recul&nbsp;:
      </p>
      <div className="mb-7 flex flex-col gap-3">
        {differentlyItems.map((item) => (
          <div key={item} className="flex items-start gap-2.5">
            <span className="mt-0.5 shrink-0 text-amber-400">›</span>
            <span>{item}</span>
          </div>
        ))}
      </div>

      <ArticleHeading id="conclusion">Conclusion</ArticleHeading>
      <p>
        Un RAG auto-hébergé devient crédible quand son corpus, son évaluation et
        son exploitation sont traités comme un seul produit. Le choix du modèle
        compte, mais la qualité du découpage, des sources et des mesures compte
        davantage.
      </p>
    </div>
  );
}
