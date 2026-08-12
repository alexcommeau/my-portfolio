import type { ComponentType } from "react";

type IconProps = {
  className?: string;
};

export function GithubIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .5C5.6.5.5 5.6.5 12c0 5.1 3.3 9.4 7.9 11 .6.1.8-.3.8-.6v-2.2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.4-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11.4 11.4 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.6.2 2.8.1 3.1.8.8 1.2 1.9 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6 4.6-1.6 7.9-5.9 7.9-11C23.5 5.6 18.4.5 12 .5z" />
    </svg>
  );
}

export function LinkedinIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M4.98 3.5C4.98 4.9 3.9 6 2.5 6S0 4.9 0 3.5 1.1 1 2.5 1s2.48 1.1 2.48 2.5zM.24 8.25h4.5V23H.24V8.25zM8.25 8.25h4.31v2.02h.06c.6-1.13 2.06-2.32 4.24-2.32 4.53 0 5.37 2.98 5.37 6.86V23h-4.5v-6.36c0-1.52-.03-3.47-2.11-3.47-2.12 0-2.44 1.66-2.44 3.36V23h-4.5V8.25z" />
    </svg>
  );
}

export function ArtstationIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
      <path d="M0 23.63l2.703 4.672c.552 1.094 1.667 1.781 2.885 1.781h17.943l-3.724-6.453H0ZM32 23.661c0-.641-.193-1.245-.516-1.75L20.968 3.635c-.557-1.057-1.656-1.719-2.854-1.719h-5.557l16.24 28.135 2.563-4.432c.5-.849.641-1.224.641-1.958ZM17.161 19.047 9.906 6.479l-7.26 12.568h14.515Z" />
    </svg>
  );
}

export type SocialLink = {
  label: string;
  href: string;
  Icon: ComponentType<IconProps>;
};

/** Source unique des liens sociaux, réutilisée par le Hero et le Footer. */
export const socialLinks: SocialLink[] = [
  {
    label: "GitHub",
    href: "https://github.com/alexcommeau",
    Icon: GithubIcon,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/alex-commeau-5a1799127/",
    Icon: LinkedinIcon,
  },
  {
    label: "ArtStation",
    href: "https://www.artstation.com/commea_sculpt",
    Icon: ArtstationIcon,
  },
];
