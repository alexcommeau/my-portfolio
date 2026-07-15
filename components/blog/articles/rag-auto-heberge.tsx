import { ImagePlaceholder } from "@/components/portfolio/image-placeholder";
import { ArticleCallout } from "@/components/blog/article-callout";
import { ArticleCodeBlock } from "@/components/blog/article-code-block";

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

      <h2 className="mt-12 mb-4.5 text-2xl font-bold tracking-tight text-zinc-100">
        Pourquoi auto-héberger
      </h2>
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

      <h2 className="mt-12 mb-4.5 text-2xl font-bold tracking-tight text-zinc-100">
        L&apos;architecture retenue
      </h2>
      <p className="mb-6">
        Le pipeline se découpe en trois briques&nbsp;: un job d&apos;ingestion
        qui découpe et vectorise les documents, une base vectorielle locale
        pour la recherche de similarité, et un serveur d&apos;inférence qui
        sert un modèle compact quand le GPU principal n&apos;est pas
        disponible.
      </p>

      <div className="mb-7 h-70 overflow-hidden rounded-xl border border-zinc-800">
        <ImagePlaceholder label="Schéma d'architecture" />
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

      <h2 className="mt-12 mb-4.5 text-2xl font-bold tracking-tight text-zinc-100">
        Ce que je referais différemment
      </h2>
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

      <p>
        Si ce sujet vous intéresse, n&apos;hésitez pas à me contacter — je
        serais ravi d&apos;échanger sur les détails d&apos;implémentation.
      </p>
    </div>
  );
}
