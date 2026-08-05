import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/portfolio/navbar";
import { BlogSubnav } from "@/components/blog/blog-subnav";
import { BlogCard } from "@/components/blog/blog-card";
import { ArticleFooter } from "@/components/blog/article-footer";
import { ImagePlaceholder } from "@/components/portfolio/image-placeholder";
import { SectionReveal } from "@/components/ui/section-reveal";
import { blogPosts } from "@/lib/data";

export const metadata: Metadata = {
  title: "Blog — Alex Commeau",
  description:
    "Notes techniques et retours d'expérience sur l'IA, l'auto-hébergement et le développement web.",
};

export default function BlogIndexPage() {
  const [featured, ...rest] = blogPosts;

  return (
    <div className="relative flex min-h-screen flex-col bg-zinc-950 text-zinc-200">
      <Navbar />
      <BlogSubnav context="list" />

      <main className="mx-auto w-full max-w-6xl flex-1 px-5 py-14 sm:px-8 sm:py-20">
        <SectionReveal>
          <header className="mb-12 max-w-2xl">
            <h1 className="mb-3 text-4xl font-extrabold tracking-tight sm:text-5xl">
              <span className="bg-gradient-to-r from-cyan-400 via-teal-400 to-amber-400 bg-clip-text text-transparent">
                Blog
              </span>
            </h1>
            <p className="text-[15.5px] leading-relaxed text-zinc-400">
              Notes techniques et retours d&apos;expérience — IA, agents,
              auto-hébergement et développement web.
            </p>
          </header>
        </SectionReveal>

        {featured && (
          <SectionReveal delay={0.08} className="mb-12">
            <Link
              href={`/blog/${featured.slug}`}
              className="group grid overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/60 no-underline transition-all duration-200 hover:border-cyan-400/40 hover:bg-zinc-900 md:grid-cols-2"
            >
              <div className="relative h-56 overflow-hidden md:h-full md:min-h-[280px]">
                <ImagePlaceholder label="Image de l'article à la une" />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-zinc-900/50 to-transparent" />
                <span className="absolute top-4 left-4 rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-[11.5px] font-semibold text-amber-300">
                  À la une
                </span>
              </div>
              <div className="flex flex-col justify-center p-7 sm:p-9">
                <div className="mb-3 flex items-center gap-2.5">
                  <span className="rounded-md border border-cyan-400/25 bg-cyan-400/10 px-2.25 py-0.75 text-[11.5px] font-semibold text-cyan-300">
                    {featured.tag}
                  </span>
                  <span className="text-xs text-zinc-600">
                    {featured.date} • {featured.readTime} de lecture
                  </span>
                </div>
                <h2 className="mb-3 text-2xl font-bold leading-tight tracking-tight transition-colors group-hover:text-cyan-300 sm:text-[26px]">
                  {featured.title}
                </h2>
                <p className="mb-5 line-clamp-3 text-[14.5px] leading-relaxed text-zinc-400">
                  {featured.excerpt}
                </p>
                <div className="inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-cyan-400">
                  Lire l&apos;article
                  <svg
                    className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden="true"
                  >
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </div>
              </div>
            </Link>
          </SectionReveal>
        )}

        {rest.length > 0 && (
          <>
            <SectionReveal>
              <h2 className="mb-5 font-mono text-[11px] tracking-wider text-zinc-600 uppercase">
                Autres articles
              </h2>
            </SectionReveal>
            <div className="grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((post, index) => (
                <SectionReveal
                  key={post.slug}
                  delay={index * 0.08}
                  className="h-full"
                >
                  <BlogCard post={post} />
                </SectionReveal>
              ))}
            </div>
          </>
        )}
      </main>

      <ArticleFooter />
    </div>
  );
}
