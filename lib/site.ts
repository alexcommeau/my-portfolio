const authorProfiles = {
  github: "https://github.com/alexcommeau",
  linkedin: "https://www.linkedin.com/in/alex-commeau-5a1799127/",
} as const;

export const siteConfig = {
  name: "Alex Commeau",
  title: "Alex Commeau — Développeur Fullstack & Ingénieur IA",
  description:
    "Portfolio d'Alex Commeau, développeur fullstack et ingénieur IA — projets, expérience, compétences et articles techniques.",
  url: "https://alexcommeau.com",
  locale: "fr_FR",
  language: "fr-FR",
  author: {
    name: "Alex Commeau",
    role: "Développeur Fullstack, Ingénieur IA",
    url: "https://alexcommeau.com/#about",
    image: "/images/hero.webp",
    github: authorProfiles.github,
    linkedin: authorProfiles.linkedin,
    // Dérivé des profils nommés pour rester synchronisé avec le JSON-LD.
    sameAs: [authorProfiles.github, authorProfiles.linkedin],
  },
} as const;

export function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.url).toString();
}

export function serializeJsonLd(value: unknown) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

// Nœud Person JSON-LD partagé (index blog et pages d'article), référencé par `@id`.
export function getPersonSchema() {
  return {
    "@type": "Person",
    "@id": `${siteConfig.url}/#person`,
    name: siteConfig.author.name,
    url: siteConfig.author.url,
    image: absoluteUrl(siteConfig.author.image),
    jobTitle: siteConfig.author.role,
    sameAs: siteConfig.author.sameAs,
  };
}
