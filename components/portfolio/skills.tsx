import { Reveal } from "@/components/portfolio/reveal";
import { skillGroups } from "@/lib/data";

export function Skills() {
  return (
    <section id="skills" className="relative border-t border-zinc-900">
      <Reveal className="mx-auto max-w-6xl px-8 py-24">
        <div className="mb-10 text-center">
          <h2 className="mb-3 text-4xl font-extrabold tracking-tight">
            Compétences &amp;{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-teal-400 to-amber-400 bg-clip-text text-transparent">
              Expertise
            </span>
          </h2>
          <p className="text-[15.5px] text-zinc-400">
            Les technologies que j&apos;utilise au quotidien
          </p>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group) => (
            <div
              key={group.title}
              className="flex h-[300px] flex-col overflow-hidden rounded-[10px] border border-zinc-800 bg-zinc-900 p-7"
            >
              <h3 className="mb-4.5 shrink-0 border-b border-zinc-800 pb-3 text-[17px] font-bold text-cyan-400">
                {group.title}
              </h3>
              <div className="flex flex-wrap content-start gap-2 overflow-hidden">
                {group.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md border border-zinc-700 bg-zinc-800 px-3.25 py-1.75 text-[13.5px] text-zinc-300 transition-colors hover:border-zinc-600"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
