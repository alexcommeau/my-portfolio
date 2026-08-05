import { experiences } from "@/lib/data";
import { SectionReveal } from "@/components/ui/section-reveal";

export function Experience() {
  return (
    <section
      id="experience"
      className="relative border-t border-zinc-900 bg-white/[1.5%]"
    >
      <SectionReveal className="mx-auto max-w-6xl px-8 py-24">
        <div className="mb-10 text-center">
          <h2 className="mb-3 text-4xl font-extrabold tracking-tight">
            <span className="bg-gradient-to-r from-cyan-400 via-teal-400 to-amber-400 bg-clip-text text-transparent">
              Expérience
            </span>
          </h2>
          <p className="text-[15.5px] text-zinc-400">
            Mon parcours professionnel
          </p>
        </div>
        <div className="relative mx-auto max-w-3xl border-l-2 border-zinc-800 pl-8">
          {experiences.map((job, index) => (
            <SectionReveal
              key={job.company}
              delay={index * 0.08}
              className="relative pb-10"
            >
              <span className="absolute top-1 -left-9.75 size-3.5 rounded-full bg-teal-400 shadow-[0_0_0_4px_rgba(45,212,191,0.15)]" />
              <div className="mb-1.5 font-mono text-[13.5px] text-amber-400">
                {job.period}
              </div>
              <div className="mb-0.5 text-[19px] font-bold">{job.title}</div>
              <div className="mb-3 text-[14.5px] text-teal-400">
                {job.company}
              </div>
              <div className="flex max-w-[640px] flex-col gap-2">
                {job.bullets.map((bullet) => (
                  <div
                    key={bullet}
                    className="text-[14.5px] leading-relaxed text-zinc-400"
                  >
                    {bullet}
                  </div>
                ))}
              </div>
            </SectionReveal>
          ))}
        </div>
      </SectionReveal>
    </section>
  );
}
