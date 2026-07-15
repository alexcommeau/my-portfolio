import { Reveal } from "@/components/portfolio/reveal";
import { education } from "@/lib/data";

export function Education() {
  return (
    <section
      id="education"
      className="relative border-t border-zinc-900 bg-white/[1.5%]"
    >
      <Reveal className="mx-auto max-w-6xl px-8 py-24">
        <div className="mb-11 text-center">
          <h2 className="mb-3 text-4xl font-extrabold tracking-tight">
            <span className="bg-gradient-to-r from-cyan-400 via-teal-400 to-amber-400 bg-clip-text text-transparent">
              Formation
            </span>
          </h2>
          <p className="text-[15.5px] text-zinc-400">
            Parcours académique et apprentissage continu
          </p>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {education.map((edu) => (
            <div
              key={edu.school}
              className="flex w-full min-h-[480px] flex-col overflow-hidden rounded-[10px] border border-zinc-800 bg-zinc-900 transition-colors hover:border-zinc-700"
            >
              <div className="flex flex-1 flex-col justify-center overflow-hidden p-6">
                <div className="mb-5 flex items-start gap-3.5">
                  <div className="flex size-10.5 shrink-0 items-center justify-center rounded-lg border border-cyan-400/20 bg-cyan-400/10 font-mono text-sm font-bold text-cyan-400">
                    {edu.initials}
                  </div>
                  <div>
                    <div className="mb-1.5 text-[19px] leading-tight font-bold">
                      {edu.degree}
                    </div>
                    <div className="text-[15px] font-semibold text-cyan-400">
                      {edu.school}
                    </div>
                  </div>
                </div>
                <div className="mb-4.5 flex flex-wrap gap-2">
                  <span className="rounded-md border border-zinc-700 bg-zinc-800 px-2.5 py-1 text-[12.5px] text-zinc-300">
                    {edu.period}
                  </span>
                  <span className="rounded-md border border-zinc-700 bg-zinc-800 px-2.5 py-1 text-[12.5px] text-zinc-300">
                    {edu.location}
                  </span>
                </div>
                <p className="mb-5.5 line-clamp-3 text-[14.5px] leading-loose text-zinc-400">
                  {edu.desc}
                </p>
                <div className="mb-3 text-[13.5px] font-bold text-zinc-200">
                  Compétences clés :
                </div>
                <div className="flex flex-col gap-2.5 overflow-hidden">
                  {edu.learnings.map((item) => (
                    <div
                      key={item}
                      className="flex items-start gap-2 text-[13.5px] leading-relaxed text-zinc-400"
                    >
                      <span className="shrink-0 text-amber-400">›</span>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
