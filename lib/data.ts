export type NavItem = {
  label: string;
  href: string;
};

export const navItems: NavItem[] = [
  { label: "À propos", href: "#about" },
  { label: "Compétences", href: "#skills" },
  { label: "Expérience", href: "#experience" },
  { label: "Projets", href: "#projects" },
  { label: "Formation", href: "#education" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
];

export const roles = [
  "Développeur FullStack",
  "Ingénieur IA",
  "Techno-Artisan",
  "ML Explorer",
];

export const bio: string[] = [
  "Avec plusieurs années d'expérience en développement fullstack, j'ai travaillé sur l'ensemble du cycle produit : architecture d'API, interfaces React, bases de données, déploiement cloud. Cette pratique m'a naturellement mené vers l'ingénierie IA, où je conçois aujourd'hui des agents et des pipelines RAG qui combinent connaissance métier et modèles de langage.",
  "Ce qui me motive : transformer des besoins ambigus en systèmes simples, robustes et agréables à utiliser — que ce soit pour un utilisateur final ou pour l'équipe qui maintient le code.",
];

export type AboutCard = {
  glyph: string;
  title: string;
  desc: string;
};

export const aboutCards: AboutCard[] = [
  {
    glyph: "{}",
    title: "Fullstack",
    desc: "Applications web complètes, du schéma de données à l'interface.",
  },
  {
    glyph: "◆",
    title: "Intelligence Artificielle",
    desc: "Agents et pipelines RAG connectés à des LLMs.",
  },
  {
    glyph: "</>",
    title: "Code propre",
    desc: "Un code lisible, testé et pensé pour durer.",
  },
  {
    glyph: "→",
    title: "Résolution de problèmes",
    desc: "Décomposer le complexe en solutions simples.",
  },
  {
    glyph: "⚡",
    title: "Automatisation",
    desc: "Workflows n8n et intégrations qui font gagner du temps.",
  },
  {
    glyph: "⟷",
    title: "Collaboration",
    desc: "Travailler efficacement avec des équipes produit & data.",
  },
];

export type SkillGroup = {
  title: string;
  tags: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    title: "Frontend",
    tags: ["React", "Next.js", "TypeScript", "Tailwind CSS", "TanStack Query"],
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
      "MongoDB",
      "Java",
    ],
  },
  {
    title: "IA & Agents",
    tags: ["LLM API", "RAG", "Prompt Engineering", "Embeddings", "Vector Search"],
  },
  {
    title: "Data & Cloud",
    tags: ["Docker", "Linux", "Cloudflare Tunnel", "SSH", "GitHub Actions", "AWS"],
  },
  {
    title: "Outils",
    tags: ["Git / GitHub", "Docker Compose", "Postman", "Jira"],
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
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Un agent RAG qui répond aux questions internes à partir de la base de connaissances de l'entreprise, avec citations des sources.",
  },
  {
    id: "proj-2",
    category: "web",
    tags: ["Web", "Fullstack"],
    title: "Plateforme de gestion de projets",
    desc: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Une application fullstack pour suivre l'avancement d'équipes, avec tableaux de bord temps réel.",
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
  date: string;
  readTime: string;
  title: string;
  excerpt: string;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "rag-auto-heberge",
    tag: "IA",
    date: "3 juin 2026",
    readTime: "6 min",
    title: "Construire un agent RAG auto-hébergé de A à Z",
    excerpt:
      "Retour d'expérience sur la conception d'un assistant documentaire qui tourne entièrement sur mon homelab, du choix du modèle au pipeline d'ingestion.",
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
