import { ArticleCallout } from "@/components/blog/article-callout";
import { ArticleCodeBlock } from "@/components/blog/article-code-block";
import { SectionReveal } from "@/components/ui/section-reveal";

export function HomelabDockerComposeContent() {
  return (
    <div className="text-[17px] leading-loose text-zinc-300">
      <SectionReveal>
        <p className="mb-6">
          Un homelab devient vite ingérable si chaque service vit dans son coin.
          Depuis que j&apos;ai tout regroupé dans un seul fichier Docker Compose,
          j&apos;ai gagné en lisibilité, en reproductibilité et — surtout — en
          sérénité le jour où il faut tout redémarrer.
        </p>
      </SectionReveal>

      <SectionReveal>
        <h2 className="mt-12 mb-4.5 text-2xl font-bold tracking-tight text-zinc-100">
          Un seul fichier, des réseaux isolés
        </h2>
        <p className="mb-6">
          Chaque service déclare explicitement à quel réseau il appartient. Les
          services exposés au reverse proxy partagent un réseau «&nbsp;edge&nbsp;»,
          tandis que les bases de données restent sur un réseau interne
          inaccessible depuis l&apos;extérieur.
        </p>

        <ArticleCodeBlock filename="docker-compose.yml">
          <span className="text-cyan-400">services</span>
          {":\n  app:\n    image: my-app:latest\n    networks: [edge, internal]\n  db:\n    image: postgres:16\n    networks: [internal]\n\n"}
          <span className="text-cyan-400">networks</span>
          {":\n  edge:\n  internal:\n    internal: "}
          <span className="text-teal-400">true</span>
        </ArticleCodeBlock>

        <ArticleCallout title="À retenir">
          Un réseau marqué <code>internal: true</code> n&apos;a aucune route vers
          l&apos;extérieur — c&apos;est la façon la plus simple d&apos;empêcher une
          base de données d&apos;être exposée par erreur.
        </ArticleCallout>
      </SectionReveal>

      <SectionReveal>
        <h2 className="mt-12 mb-4.5 text-2xl font-bold tracking-tight text-zinc-100">
          Des sauvegardes qui tiennent la route
        </h2>
        <p className="mb-6">
          Les volumes nommés sont sauvegardés chaque nuit par un petit conteneur
          cron qui archive puis pousse vers un stockage distant. La règle
          d&apos;or&nbsp;: une sauvegarde non testée n&apos;est pas une
          sauvegarde. Je restaure donc un volume au hasard une fois par mois.
        </p>

        <p>
          Résultat&nbsp;: reconstruire l&apos;ensemble du homelab sur une machine
          neuve tient désormais en un <code>git clone</code> et un{" "}
          <code>docker compose up</code>.
        </p>
      </SectionReveal>
    </div>
  );
}
