"use client";

import { useState } from "react";
import { Reveal } from "@/components/portfolio/reveal";
import { ImagePlaceholder } from "@/components/portfolio/image-placeholder";
import { useAboutTabContext } from "@/components/portfolio/ui-context";
import { filters, projectsData, type ProjectFilter } from "@/lib/data";
import { cn } from "@/lib/utils";

export function Projects() {
  const [filter, setFilter] = useState<ProjectFilter["key"]>("all");
  const { setAboutTab } = useAboutTabContext();

  const filteredProjects =
    filter === "all"
      ? projectsData
      : projectsData.filter((p) => p.category === filter);

  const goToIaChat = (e: React.MouseEvent) => {
    e.preventDefault();
    setAboutTab("chat");
    document.getElementById("about")?.scrollIntoView({ block: "start" });
  };

  return (
    <section className="relative border-t border-zinc-900">
      <span id="projects" aria-hidden="true" className="pointer-events-none absolute top-24" />
      <Reveal className="mx-auto max-w-6xl px-8 py-24">
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
            return (
              <div
                key={proj.id}
                className="flex min-h-[460px] flex-col overflow-hidden rounded-[10px] border border-zinc-800 bg-zinc-900 transition-colors hover:border-zinc-700"
              >
                <div className="h-[150px] shrink-0">
                  <ImagePlaceholder label="Capture du projet" />
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
                    {isFirst ? (
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
                    <a
                      href={isFirst ? "#chat-demo" : "#"}
                      onClick={
                        isFirst
                          ? goToIaChat
                          : (event) => event.preventDefault()
                      }
                      className="inline-flex items-center gap-1.5 rounded-md bg-cyan-400 px-4 py-2.25 text-[13.5px] font-semibold text-[#052027] transition-colors hover:bg-amber-400"
                    >
                      Démo
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Reveal>
    </section>
  );
}
