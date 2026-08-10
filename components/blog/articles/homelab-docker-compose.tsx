import { ArticleCallout } from "@/components/blog/article-callout";
import { ArticleCodeBlock } from "@/components/blog/article-code-block";
import { ArticleHeading } from "@/components/blog/article-heading";

export function HomelabDockerComposeContent() {
  return (
    <div className="text-[17px] leading-loose text-zinc-300">
      <p className="mb-6">
        Un homelab devient vite ingérable si chaque service vit dans son coin.
        Depuis que j&apos;ai tout regroupé dans un seul fichier Docker Compose,
        j&apos;ai gagné en lisibilité, en reproductibilité et — surtout — en
        sérénité le jour où il faut tout redémarrer.
      </p>

      <ArticleHeading id="objectif">Objectif et organisation</ArticleHeading>
      <p className="mb-6">
        Je cherche à pouvoir comprendre l&apos;état du homelab en ouvrant un seul
        dépôt&nbsp;: services, réseaux, volumes, variables attendues et procédure de
        restauration. Le fichier Compose reste lisible, tandis que les données et
        les secrets vivent en dehors de Git.
      </p>

      <ArticleHeading id="reseaux-isoles">
        Un seul fichier, des réseaux isolés
      </ArticleHeading>
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

      <ArticleHeading id="secrets-configuration">
        Séparer secrets et configuration
      </ArticleHeading>
      <p className="mb-6">
        Le dépôt versionne uniquement un fichier d&apos;exemple documentant les
        variables requises. Les valeurs sensibles sont injectées au déploiement,
        et chaque service ne reçoit que les secrets dont il a besoin. Cette
        discipline rend les migrations plus prévisibles et limite les fuites.
      </p>

      <ArticleHeading id="sauvegardes">
        Des sauvegardes qui tiennent la route
      </ArticleHeading>
      <p className="mb-6">
        Les volumes nommés sont sauvegardés chaque nuit par un petit conteneur
        cron qui archive puis pousse vers un stockage distant. La règle
        d&apos;or&nbsp;: une sauvegarde non testée n&apos;est pas une
        sauvegarde. Je restaure donc un volume au hasard une fois par mois.
      </p>

      <p className="mb-6">
        Résultat&nbsp;: reconstruire l&apos;ensemble du homelab sur une machine
        neuve tient désormais en un <code>git clone</code> et un{" "}
        <code>docker compose up</code>.
      </p>

      <ArticleHeading id="conclusion">Conclusion</ArticleHeading>
      <p>
        Une configuration Compose utile n&apos;est pas seulement capable de démarrer
        les conteneurs. Elle rend visibles les frontières réseau, documente les
        entrées attendues et s&apos;accompagne d&apos;une restauration testée.
      </p>
    </div>
  );
}
