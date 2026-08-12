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
  "Créatif et curieux, j'aime comprendre comment les choses fonctionnent, donner vie à mes idées et construire des applications complètes en prenant soin de l'expérience utilisateur.",
  "En ce moment, j'explore avec enthousiasme l'intelligence artificielle, les agents et l'auto-hébergement. J'apprends surtout en expérimentant : un nouveau modèle, une application à imaginer ou une amélioration à apporter à mon homelab.",
  "La création occupe aussi une grande place dans mon quotidien. J'adore imaginer des objets avec Blender et ZBrush pour les imprimer en 3D, créer des scènes Three.js et travailler de mes mains à travers la gravure et la bijouterie.",
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
    desc: "J'aime construire des applications complètes, de leur architecture jusqu'aux détails de l'interface.",
  },
  {
    glyph: "◆",
    title: "IA & auto-hébergement",
    desc: "J'explore les modèles, les agents et les outils que je peux faire tourner et comprendre par moi-même.",
  },
  {
    glyph: "✦",
    title: "Gravure & bijouterie",
    desc: "J'aime travailler de mes mains et créer des pièces qui demandent précision, patience et créativité.",
  },
  {
    glyph: "◈",
    title: "Création 3D",
    desc: "Blender et ZBrush me servent au quotidien pour imprimer mes idées et créer des scènes Three.js.",
  },
];

export type SkillGroup = {
  title: string;
  tags: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    title: "Frontend",
    tags: ["React.js", "Next.js", "Tailwind CSS", "TypeScript"],
  },
  {
    title: "Backend",
    tags: [
      "Node.js",
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
      "Embeddings",
      "Prompt Engineering",
      "Vector Search",
    ],
  },
  {
    title: "Data & Cloud",
    tags: [
      "Cloudflare Tunnel",
      "SSH",
      "AWS",
      "Docker",
      "Linux",
      "GitHub Actions",
    ],
  },
  {
    title: "Outils",
    tags: ["Docker Compose", "Claude Code", "Git", "Codex"],
  },
  {
    title: "Bonnes pratiques",
    tags: [
      "Tests unitaires",
      "System Design",
      "Code review",
      "Clean code",
      "Agile",
    ],
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
  status?: "in-progress" | "planned";
};

export const projectsData: Project[] = [
  {
    id: "proj-1",
    category: "ia",
    tags: ["IA", "RAG"],
    title: "Assistant documentaire IA",
    desc: "Un agent RAG auto-hébergé qui répond aux questions à partir d'une base de connaissances dédiée à mon parcours et à mes projets.",
  },
  {
    id: "proj-2",
    category: "web",
    tags: ["Web", "Homelab", "DevOps"],
    title: "Monitoring de mon homelab",
    desc: "Une application légère pour suivre l'état de mes services auto-hébergés, leurs ressources et leur disponibilité.",
    status: "in-progress",
  },
  {
    id: "proj-3",
    category: "web",
    tags: ["Web"],
    title: "ERP devis & factures pour bijoutiers",
    desc: "Un outil léger pour gérer les devis et les factures, pensé pour les créateurs indépendants qui veulent gagner du temps.",
    status: "in-progress",
  },
];

export type ProjectFilter = {
  key: "all" | "ia" | "web" | "devops";
  label: string;
};

export const filters: ProjectFilter[] = [
  { key: "all", label: "✨ Tous" },
  { key: "ia", label: "🤖 IA" },
  { key: "web", label: "🌐 Web" },
  { key: "devops", label: "⚙️ DevOps" },
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
  // {
  //   slug: "rag-auto-heberge",
  //   tag: "IA",
  //   publishedAt: "2026-06-03",
  //   modifiedAt: "2026-06-03",
  //   readTime: "6 min",
  //   title: "Construire un agent RAG auto-hébergé de A à Z",
  //   excerpt:
  //     "Retour d'expérience sur la conception d'un assistant documentaire qui tourne entièrement sur mon homelab, du choix du modèle au pipeline d'ingestion.",
  //   tags: ["RAG", "Auto-hébergement", "LLM", "Homelab"],
  //   searchIntent: "Comment construire un agent RAG auto-hébergé ?",
  //   image: {
  //     src: "/blog/rag-auto-heberge/cover",
  //     alt: "Couverture graphique de l'article sur la construction d'un agent RAG auto-hébergé",
  //   },
  //   sections: [
  //     { id: "prerequis", title: "Objectif et prérequis" },
  //     { id: "pourquoi-auto-heberger", title: "Pourquoi auto-héberger" },
  //     { id: "architecture", title: "L'architecture retenue" },
  //     { id: "evaluation", title: "Évaluer avant d'optimiser" },
  //     { id: "retour-experience", title: "Ce que je referais différemment" },
  //     { id: "conclusion", title: "Conclusion" },
  //   ],
  // },
];

export type ChatQA = {
  q: string;
};

export const chatQA: ChatQA[] = [
  { q: "Peux-tu résumer ton parcours professionnel ?" },
  { q: "Quelles sont tes compétences frontend et backend ?" },
  { q: "Peux-tu présenter un projet technique récent ?" },
  { q: "Sur quel projet travailles-tu en ce moment ?" },
];
