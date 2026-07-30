# Instructions permanentes du projet

## Démarrage obligatoire

- Lire intégralement `CONTEXT.md` avant toute intervention.
- Exécuter `git status --short` et préserver les changements préexistants.
- Avant de modifier du code Next.js, lire le guide pertinent dans
  `node_modules/next/dist/docs/`.
- Le code reste la source de vérité si la documentation est obsolète.

## Maintenance de la cartographie

Après chaque modification, vérifier si elle affecte :

- l’architecture ou l’arborescence ;
- une route, une API ou un flux de données ;
- une variable d’environnement ;
- une commande ou une dépendance ;
- une convention de développement ;
- une procédure d’ajout de fonctionnalité ;
- une limitation ou un risque documenté.

Si oui, mettre à jour `CONTEXT.md` dans la même intervention.

Ne pas mettre à jour `CONTEXT.md` pour :

- une correction purement visuelle sans impact structurel ;
- un changement temporaire ou local ;
- un journal de travail ou le détail de chaque commit.

Avant de terminer une mission, indiquer explicitement :

- `CONTEXT.md mis à jour`, avec la raison ;
- ou `CONTEXT.md inchangé`, car aucun élément durable n’a changé.
