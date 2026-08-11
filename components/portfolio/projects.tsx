"use client";

import { useState } from "react";
import { ImagePlaceholder } from "@/components/portfolio/image-placeholder";
import { SectionReveal } from "@/components/ui/section-reveal";
import { SectionLink } from "@/components/portfolio/section-link";
import { useAboutTabContext } from "@/components/portfolio/ui-context";
import { filters, projectsData, type ProjectFilter } from "@/lib/data";
import { cn } from "@/lib/utils";

function AboutPreview() {
  return (
    <div
      aria-label="Aperçu de la section À propos du portfolio"
      className="h-full overflow-hidden bg-[#090c12] p-3"
    >
      <div className="h-full overflow-hidden rounded-md border border-zinc-800 bg-zinc-950 shadow-[0_8px_24px_rgba(0,0,0,0.35)]">
        <div className="flex items-center justify-between border-b border-zinc-800 px-3 py-2 font-mono text-[7px] text-zinc-500">
          <span className="flex items-center gap-1.5 font-sans text-[9px] font-bold text-zinc-200">
            <span className="text-cyan-400">✦</span> Assistant IA auto-hébergé
          </span>
          <span className="rounded-full border border-zinc-800 px-2 py-0.5 text-[6px] text-zinc-500">
            Mode léger
          </span>
        </div>
        <div className="grid h-[calc(100%-32px)] grid-cols-[0.85fr_1.4fr]">
          <div className="border-r border-zinc-800 p-2">
            <div className="mb-2 font-mono text-[6px] tracking-wide text-zinc-600 uppercase">
              Questions suggérées
            </div>
            <div className="space-y-1.5">
              {[
                "Ton parcours ?",
                "Tes compétences ?",
                "Ton projet actuel ?",
              ].map((question) => (
                <div
                  key={question}
                  className="rounded border border-zinc-800 px-1.5 py-1 text-[7px] text-zinc-500"
                >
                  {question}
                </div>
              ))}
            </div>
          </div>
          <div className="flex min-w-0 flex-col justify-between p-3">
            <div className="flex flex-1 flex-col items-center justify-center text-center">
              <div className="mb-2 flex size-6 items-center justify-center rounded-full border border-cyan-400/30 bg-cyan-400/10 text-[11px] text-cyan-300">
                ✦
              </div>
              <div className="text-[10px] font-bold text-zinc-200">
                Que souhaitez-vous savoir ?
              </div>
              <div className="mt-1 max-w-[150px] text-[7px] leading-relaxed text-zinc-500">
                Posez une question sur mon parcours, mes compétences ou mes projets.
              </div>
            </div>
            <div className="flex items-center gap-1.5 border-t border-zinc-800 pt-2">
              <div className="h-4 flex-1 rounded border border-zinc-800 bg-zinc-900 px-1.5 text-[7px] leading-4 text-zinc-600">
                Posez votre question…
              </div>
              <div className="rounded bg-cyan-400 px-2 py-1 text-[7px] font-semibold text-[#052027]">
                Envoyer
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Projects() {
  const [filter, setFilter] = useState<ProjectFilter["key"]>("all");
  const { setAboutTab } = useAboutTabContext();

  const filteredProjects = projectsData.filter(
    (project) =>
      filter === "all" ||
      project.category === filter ||
      (filter === "devops" && project.tags.includes("DevOps"))
  );

  const goToIaChat = () => {
    setAboutTab("chat");
  };

  return (
    <section id="projects" className="relative border-t border-zinc-900">
      <SectionReveal className="mx-auto max-w-6xl px-8 py-24">
        <div className="mb-9 text-center">
          <h2 className="mb-3 text-4xl font-extrabold tracking-tight">
            <span className="bg-gradient-to-r from-cyan-400 via-teal-400 to-amber-400 bg-clip-text text-transparent">
              Projets
            </span>
          </h2>
          <p className="mb-6 text-[15.5px] text-zinc-400">
            Une sélection de réalisations récentes
          </p>
          <div className="flex justify-center gap-2">
            {filters.map((pill) => (
              <button
                key={pill.key}
                onClick={() => setFilter(pill.key)}
                className={cn(
                  "cursor-pointer rounded-md border px-4 py-1.75 text-[13px] font-medium transition-colors",
                  filter === pill.key
                    ? "border-cyan-400 bg-cyan-400 font-semibold text-[#052027]"
                    : "border-zinc-800 bg-transparent text-zinc-400 hover:text-zinc-200"
                )}
              >
                {pill.label}
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((proj) => {
            const isFirst = proj.id === "proj-1";
            const isInProgress = proj.status === "in-progress";
            const hasStatus = proj.status !== undefined;
            const statusLabel = isInProgress ? "En cours" : "Prévu";
            return (
              <div
                key={proj.id}
                className={cn(
                  "relative flex min-h-[460px] flex-col overflow-hidden rounded-[10px] border border-zinc-800 bg-zinc-900 transition-colors hover:border-zinc-700",
                  hasStatus && "after:pointer-events-none after:absolute after:inset-0 after:bg-zinc-950/20",
                )}
              >
                {hasStatus && (
                  <span className="absolute top-3 right-3 z-10 rounded-full border border-amber-400/30 bg-zinc-950/80 px-2.5 py-1 text-[10px] font-semibold text-amber-300">
                    {statusLabel}
                  </span>
                )}
                <div className={cn("h-[160px] shrink-0", hasStatus && "grayscale opacity-70")}>
                  {isFirst ? (
                    <AboutPreview />
                  ) : (
                    <ImagePlaceholder label="Capture du projet" />
                  )}
                </div>
                <div className="flex h-[270px] flex-1 flex-col p-5">
                  <div className="mb-3 flex gap-1.5">
                    {proj.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md border border-cyan-400/25 bg-cyan-400/10 px-2.25 py-0.75 text-[11.5px] font-semibold text-cyan-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="mb-2 line-clamp-2 text-lg font-bold">
                    {proj.title}
                  </h3>
                  <p className="mb-4 line-clamp-4 text-[13.5px] leading-relaxed text-zinc-400">
                    {proj.desc}
                  </p>
                  <div className="mt-auto flex gap-2.5">
                    {isFirst || hasStatus ? (
                      <span className="inline-flex cursor-not-allowed items-center gap-1.5 rounded-md border border-zinc-800 px-4 py-2.25 text-[13.5px] font-semibold text-zinc-600">
                        Code
                        <svg
                          className="size-3.5"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          aria-hidden="true"
                        >
                          <path d="M8 6L4 12l4 6M16 6l4 6-4 6" />
                        </svg>
                      </span>
                    ) : (
                      <a
                        href="#"
                        onClick={(event) => event.preventDefault()}
                        className="inline-flex items-center gap-1.5 rounded-md border border-zinc-800 px-4 py-2.25 text-[13.5px] font-semibold text-zinc-200 transition-colors hover:bg-zinc-800"
                      >
                        Code
                        <svg
                          className="size-3.5"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          aria-hidden="true"
                        >
                          <path d="M8 6L4 12l4 6M16 6l4 6-4 6" />
                        </svg>
                      </a>
                    )}
                    {isFirst ? (
                      <SectionLink
                        sectionId="about"
                        onClick={goToIaChat}
                        className="inline-flex items-center gap-1.5 rounded-md bg-cyan-400 px-4 py-2.25 text-[13.5px] font-semibold text-[#052027] transition-colors hover:bg-amber-400"
                      >
                        Démo
                      </SectionLink>
                    ) : hasStatus ? (
                      <span className="inline-flex cursor-not-allowed items-center gap-1.5 rounded-md bg-zinc-700/50 px-4 py-2.25 text-[13.5px] font-semibold text-zinc-500">
                        Démo
                      </span>
                    ) : (
                      <a
                        href="#"
                        onClick={(event) => event.preventDefault()}
                        className="inline-flex items-center gap-1.5 rounded-md bg-cyan-400 px-4 py-2.25 text-[13.5px] font-semibold text-[#052027] transition-colors hover:bg-amber-400"
                      >
                        Démo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </SectionReveal>
    </section>
  );
}
