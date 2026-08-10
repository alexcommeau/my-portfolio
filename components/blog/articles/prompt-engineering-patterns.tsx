import { ArticleCallout } from "@/components/blog/article-callout";
import { ArticleHeading } from "@/components/blog/article-heading";

export function PromptEngineeringPatternsContent() {
  return (
    <div className="text-[17px] leading-loose text-zinc-300">
      <p className="mb-6">
        La plupart des «&nbsp;astuces de prompt&nbsp;» virales vieillissent mal
        et cassent au premier changement de modèle. Quelques schémas, en
        revanche, restent robustes parce qu&apos;ils reposent sur la structure
        plutôt que sur la formulation magique.
      </p>

      <ArticleHeading id="objectif">
        Ce qu&apos;un prompt de production doit garantir
      </ArticleHeading>
      <p className="mb-6">
        Je cherche quatre propriétés&nbsp;: une intention non ambiguë, une frontière
        nette entre consigne et donnée, une sortie validable et un comportement
        explicite lorsque l&apos;information manque. La formulation exacte vient
        seulement après ces contraintes.
      </p>

      <ArticleHeading id="instruction-donnee">
        Séparer instruction et donnée
      </ArticleHeading>
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

      <ArticleHeading id="sortie-contrainte">Contraindre la sortie</ArticleHeading>
      <p className="mb-6">
        Demander un format explicite (JSON, liste, schéma) et fournir un exemple
        court réduit drastiquement les réponses hors-sujet. Un validateur en
        aval attrape les rares dérives et déclenche une nouvelle tentative.
      </p>

      <ArticleHeading id="evaluation">Versionner et évaluer</ArticleHeading>
      <p className="mb-6">
        Le prompt, le modèle et le jeu d&apos;évaluation sont versionnés ensemble.
        Avant une mise en production, je rejoue des cas nominaux, des entrées
        incomplètes et des tentatives d&apos;injection. Une amélioration n&apos;est retenue
        que si elle ne dégrade pas les cas déjà couverts.
      </p>

      <ArticleHeading id="prevoir-echec">Prévoir l&apos;échec</ArticleHeading>
      <p>
        Un bon prompt indique quoi répondre quand l&apos;information manque —
        «&nbsp;réponds <em>je ne sais pas</em> plutôt que d&apos;inventer&nbsp;».
        C&apos;est souvent la ligne qui fait le plus pour la fiabilité perçue.
      </p>

      <ArticleHeading id="conclusion">Conclusion</ArticleHeading>
      <p>
        Les prompts durables ressemblent moins à des incantations qu&apos;à des
        interfaces&nbsp;: entrées délimitées, contrat de sortie, validation et
        stratégie d&apos;échec. Cette structure survit mieux aux changements de modèle
        que n&apos;importe quelle formule magique.
      </p>
    </div>
  );
}
