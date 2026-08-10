export type NavItem = {
  label: string;
  href: string;
};

export const navItems: NavItem[] = [
  { label: "À propos", href: "#about" },
  { label: "Projets", href: "#projects" },
  { label: "Compétences", href: "#skills" },
  { label: "Expérience", href: "#experience" },
  { label: "Formation", href: "#education" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "#contact" },
];

export const roles = [
  "Développeur FullStack",
  "Techno-Artisan",
  "IA/ML Explorer",
];

export const bio: string[] = [
  "Je suis Alex, développeur fullstack et passionné par les technologies qui permettent de créer des choses utiles. J'aime comprendre comment les systèmes fonctionnent, expérimenter de nouvelles idées et transformer mes découvertes en projets concrets.",
  "Aujourd'hui, je m'intéresse particulièrement à l'intelligence artificielle, aux agents et à l'auto-hébergement. Je prends plaisir à apprendre par la pratique, que ce soit en développant une application, en testant un nouveau modèle ou en faisant évoluer mon homelab.",
  "En dehors du développement, je m'intéresse à des activités qui demandent précision et créativité, comme la gravure et la bijouterie. Le sport occupe aussi une place importante dans mon quotidien : il m'aide à garder un bon équilibre et à rester discipliné.",
];

export type AboutCard = {
  glyph: string;
  title: string;
  desc: string;
};

export const aboutCards: AboutCard[] = [
  {
    glyph: "{}",
    title: "Développement fullstack",
    desc: "Concevoir des applications complètes, de l'architecture technique jusqu'à l'interface utilisateur.",
  },
  {
    glyph: "◆",
    title: "IA & auto-hébergement",
    desc: "Explorer les modèles, les agents et les outils que je peux faire tourner et comprendre par moi-même.",
  },
  {
    glyph: "✦",
    title: "Gravure & bijouterie",
    desc: "Des activités manuelles qui nourrissent ma précision, ma créativité et mon goût du travail bien fait.",
  },
  {
    glyph: "↗",
    title: "Sport & équilibre",
    desc: "Le sport m'aide à garder un rythme régulier, de la discipline et un équilibre au quotidien.",
  },
];

export type SkillGroup = {
  title: string;
  tags: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    title: "Frontend",
    tags: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    title: "Backend",
    tags: [
      "Node.js",
      "Python",
      "Express",
      "PostgreSQL",
      "REST / GraphQL",
      "Nest",
      "Java",
    ],
  },
  {
    title: "IA & Agents",
    tags: [
      "LLM API",
      "RAG",
      "Prompt Engineering",
      "Embeddings",
      "Vector Search",
    ],
  },
  {
    title: "Data & Cloud",
    tags: [
      "Docker",
      "Linux",
      "Cloudflare Tunnel",
      "SSH",
      "GitHub Actions",
      "AWS",
    ],
  },
  {
    title: "Outils",
    tags: ["Git / GitHub", "Docker Compose", "Claude Code", "Codex"],
  },
  {
    title: "Bonnes pratiques",
    tags: ["Tests unitaires", "Code review", "System Design", "Agile", "CI/CD"],
  },
];

export type Experience = {
  period: string;
  title: string;
  company: string;
  bullets: string[];
};

export const experiences: Experience[] = [
  {
    period: "2022 — nov. 2025",
    title: "Développeur Fullstack (CDI)",
    company: "VayanData — Antony",
    bullets: [
      "Participation à l'évolution d'une plateforme utilisée pour piloter des bâtiments intelligents. J'y ai développé de nouvelles fonctionnalités en React et implémenté la logique métier en Java, tout en collaborant étroitement avec les équipes produit et techniques.",
    ],
  },
  {
    period: "2021 — 2022",
    title: "Assistant Product Owner",
    company: "Service Central des Armes et Explosifs (SCAE) — Nanterre",
    bullets: [
      "Participation au développement d'un système d'information national dans un contexte Agile Scrum. Mon rôle mêlait cadrage fonctionnel, rédaction des User Stories et coordination d'une équipe de développement.",
    ],
  },
  {
    period: "2019 — 2021",
    title: "Développeur Fullstack React / Node",
    company: "Goshaba — Paris",
    bullets: [
      "Chez Goshaba, j'ai découvert le développement de produits ludiques appliqués au recrutement (Jeux intéractifs). J'y ai travaillé sur des interfaces React animées, des API Node.js et une migration technologique importante d'Angular vers React.",
    ],
  },
];

export type Project = {
  id: string;
  category: "ia" | "web";
  tags: string[];
  title: string;
  desc: string;
};

export const projectsData: Project[] = [
  {
    id: "proj-1",
    category: "ia",
    tags: ["IA", "RAG"],
    title: "Assistant documentaire IA",
    desc: "Un agent RAG auto-hébergé qui répond aux questions à partir d'une base de connaissances, avec des citations pour retrouver facilement les sources.",
  },
  {
    id: "proj-2",
    category: "web",
    tags: ["Web", "Fullstack"],
    title: "Plateforme de gestion de projets",
    desc: "Description à venir.",
  },
  {
    id: "proj-3",
    category: "web",
    tags: ["Web"],
    title: "Projet à venir",
    desc: "Description à venir.",
  },
];

export type ProjectFilter = {
  key: "all" | "ia" | "web";
  label: string;
};

export const filters: ProjectFilter[] = [
  { key: "all", label: "✨ Tous" },
  { key: "ia", label: "🤖 IA" },
  { key: "web", label: "🌐 Web" },
];

export type EducationItem = {
  initials: string;
  degree: string;
  school: string;
  period: string;
  location: string;
  desc: string;
  learnings: string[];
};

export const education: EducationItem[] = [
  {
    initials: "EP",
    degree: "Diplôme d'expert en informatique — Master 2",
    school: "EPITECH",
    period: "2022",
    location: "Le Kremlin-Bicêtre",
    desc: "Cursus d'expertise en ingénierie informatique, orienté développement logiciel et gestion de projets techniques.",
    learnings: [
      "Architecture logicielle et conception de systèmes",
      "Gestion de projet et travail en équipe agile",
      "Développement fullstack avancé",
    ],
  },
  {
    initials: "LI",
    degree: "BAC Technologique — STI2D",
    school: "Lycée Ionesco",
    period: "2015",
    location: "Issy-les-Moulineaux",
    desc: "Baccalauréat technologique avec une spécialisation en sciences et technologies de l'industrie et du développement durable.",
    learnings: [
      "Bases en sciences de l'ingénieur",
      "Approche technique et méthodique des projets",
      "Premiers pas en programmation",
    ],
  },
];

export type BlogPost = {
  slug: string;
  tag: string;
  publishedAt: string;
  modifiedAt: string;
  readTime: string;
  title: string;
  excerpt: string;
  tags: string[];
  searchIntent: string;
  image: {
    src: string;
    alt: string;
  };
  sections: {
    id: string;
    title: string;
  }[];
};

// Ordre du plus récent au plus ancien : `app/blog/page.tsx` met blogPosts[0] à la une.
export const blogPosts: BlogPost[] = [
  {
    slug: "rag-auto-heberge",
    tag: "IA",
    publishedAt: "2026-06-03",
    modifiedAt: "2026-06-03",
    readTime: "6 min",
    title: "Construire un agent RAG auto-hébergé de A à Z",
    excerpt:
      "Retour d'expérience sur la conception d'un assistant documentaire qui tourne entièrement sur mon homelab, du choix du modèle au pipeline d'ingestion.",
    tags: ["RAG", "Auto-hébergement", "LLM", "Homelab"],
    searchIntent: "Comment construire un agent RAG auto-hébergé ?",
    image: {
      src: "/blog/rag-auto-heberge/cover",
      alt: "Couverture graphique de l'article sur la construction d'un agent RAG auto-hébergé",
    },
    sections: [
      { id: "prerequis", title: "Objectif et prérequis" },
      { id: "pourquoi-auto-heberger", title: "Pourquoi auto-héberger" },
      { id: "architecture", title: "L'architecture retenue" },
      { id: "evaluation", title: "Évaluer avant d'optimiser" },
      { id: "retour-experience", title: "Ce que je referais différemment" },
      { id: "conclusion", title: "Conclusion" },
    ],
  },
  {
    slug: "homelab-docker-compose",
    tag: "Homelab",
    publishedAt: "2026-05-18",
    modifiedAt: "2026-05-18",
    readTime: "5 min",
    title: "Structurer un homelab avec Docker Compose",
    excerpt:
      "Comment j'organise une dizaine de services auto-hébergés avec un seul fichier Compose lisible, des réseaux isolés et des sauvegardes qui tiennent la route.",
    tags: ["Docker", "Homelab", "Auto-hébergement", "DevOps"],
    searchIntent: "Comment structurer un homelab avec Docker Compose ?",
    image: {
      src: "/blog/homelab-docker-compose/cover",
      alt: "Couverture graphique de l'article sur l'organisation d'un homelab avec Docker Compose",
    },
    sections: [
      { id: "objectif", title: "Objectif et organisation" },
      { id: "reseaux-isoles", title: "Un seul fichier, des réseaux isolés" },
      { id: "secrets-configuration", title: "Séparer secrets et configuration" },
      { id: "sauvegardes", title: "Des sauvegardes qui tiennent la route" },
      { id: "conclusion", title: "Conclusion" },
    ],
  },
  {
    slug: "next-app-router-workflow",
    tag: "Web",
    publishedAt: "2026-05-02",
    modifiedAt: "2026-05-02",
    readTime: "7 min",
    title: "Next.js App Router : ce qui a changé dans mon workflow",
    excerpt:
      "Server Components, layouts imbriqués et streaming ont rebattu les cartes. Les habitudes que j'ai gardées, celles que j'ai abandonnées, et pourquoi.",
    tags: ["Next.js", "React", "Server Components", "Web"],
    searchIntent: "Comment adopter un workflow efficace avec Next.js App Router ?",
    image: {
      src: "/blog/next-app-router-workflow/cover",
      alt: "Couverture graphique de l'article sur le workflow Next.js App Router",
    },
    sections: [
      { id: "objectif", title: "Ce que l'App Router change" },
      { id: "frontiere-server-client", title: "Choisir la frontière serveur-client" },
      { id: "habitudes-gardees", title: "Les habitudes que j'ai gardées" },
      { id: "habitudes-abandonnees", title: "Ce que j'ai abandonné" },
      { id: "conclusion", title: "Conclusion" },
    ],
  },
  {
    slug: "prompt-engineering-patterns",
    tag: "IA",
    publishedAt: "2026-04-14",
    modifiedAt: "2026-04-14",
    readTime: "5 min",
    title: "Prompt engineering : les patterns qui tiennent en prod",
    excerpt:
      "Au-delà des astuces virales, quelques schémas de prompts robustes qui survivent aux changements de modèle et aux entrées utilisateur imprévisibles.",
    tags: ["Prompt Engineering", "LLM", "IA", "Fiabilité"],
    searchIntent: "Quels patterns rendent les prompts robustes en production ?",
    image: {
      src: "/blog/prompt-engineering-patterns/cover",
      alt: "Couverture graphique de l'article sur les patterns de prompt engineering fiables en production",
    },
    sections: [
      { id: "objectif", title: "Ce qu'un prompt de production doit garantir" },
      { id: "instruction-donnee", title: "Séparer instruction et donnée" },
      { id: "sortie-contrainte", title: "Contraindre la sortie" },
      { id: "evaluation", title: "Versionner et évaluer" },
      { id: "prevoir-echec", title: "Prévoir l'échec" },
      { id: "conclusion", title: "Conclusion" },
    ],
  },
];

export type ChatQA = {
  q: string;
};

export const chatQA: ChatQA[] = [
  { q: "Quelles technologies maîtrises-tu ?" },
  { q: "Sur quoi travailles-tu en ce moment ?" },
  { q: "Es-tu disponible pour une mission ?" },
  { q: "Comment te contacter ?" },
];
