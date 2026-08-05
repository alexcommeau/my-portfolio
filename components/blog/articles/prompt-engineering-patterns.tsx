import { ArticleCallout } from "@/components/blog/article-callout";
import { SectionReveal } from "@/components/ui/section-reveal";

export function PromptEngineeringPatternsContent() {
  return (
    <div className="text-[17px] leading-loose text-zinc-300">
      <SectionReveal>
        <p className="mb-6">
          La plupart des «&nbsp;astuces de prompt&nbsp;» virales vieillissent mal
          et cassent au premier changement de modèle. Quelques schémas, en
          revanche, restent robustes parce qu&apos;ils reposent sur la structure
          plutôt que sur la formulation magique.
        </p>
      </SectionReveal>

      <SectionReveal>
        <h2 className="mt-12 mb-4.5 text-2xl font-bold tracking-tight text-zinc-100">
          Séparer instruction et donnée
        </h2>
        <p className="mb-6">
          Mélanger la consigne et l&apos;entrée utilisateur dans un même bloc, c&apos;est
          ouvrir la porte aux injections. Je délimite systématiquement la donnée
          (balises, séparateurs) et je rappelle au modèle qu&apos;elle ne contient
          pas d&apos;instructions à exécuter.
        </p>

        <ArticleCallout title="À retenir">
          Traiter l&apos;entrée utilisateur comme de la donnée, jamais comme une
          instruction, est le pattern qui évite le plus de problèmes en
          production.
        </ArticleCallout>
      </SectionReveal>

      <SectionReveal>
        <h2 className="mt-12 mb-4.5 text-2xl font-bold tracking-tight text-zinc-100">
          Contraindre la sortie
        </h2>
        <p className="mb-6">
          Demander un format explicite (JSON, liste, schéma) et fournir un exemple
          court réduit drastiquement les réponses hors-sujet. Un validateur en
          aval attrape les rares dérives et déclenche une nouvelle tentative.
        </p>
      </SectionReveal>

      <SectionReveal>
        <h2 className="mt-12 mb-4.5 text-2xl font-bold tracking-tight text-zinc-100">
          Prévoir l&apos;échec
        </h2>
        <p>
          Un bon prompt indique quoi répondre quand l&apos;information manque —
          «&nbsp;réponds <em>je ne sais pas</em> plutôt que d&apos;inventer&nbsp;».
          C&apos;est souvent la ligne qui fait le plus pour la fiabilité perçue.
        </p>
      </SectionReveal>
    </div>
  );
}
