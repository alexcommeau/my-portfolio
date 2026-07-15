import Link from "next/link";
import { Reveal } from "@/components/portfolio/reveal";
import { ImagePlaceholder } from "@/components/portfolio/image-placeholder";
import { blogPosts } from "@/lib/data";

export function Blog() {
  return (
    <section id="blog" className="relative border-t border-zinc-900">
      <Reveal className="mx-auto max-w-6xl px-8 py-24">
        <div className="mb-9 text-center">
          <h2 className="mb-3 text-4xl font-extrabold tracking-tight">
            <span className="bg-gradient-to-r from-cyan-400 via-teal-400 to-amber-400 bg-clip-text text-transparent">
              Blog
            </span>
          </h2>
          <p className="text-[15.5px] text-zinc-400">
            Notes techniques et retours d&apos;expérience
          </p>
        </div>
        <div className="grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="flex h-[400px] flex-col overflow-hidden rounded-[10px] border border-zinc-800 bg-zinc-900 text-inherit no-underline transition-colors hover:border-zinc-700"
            >
              <div className="h-[160px] shrink-0">
                <ImagePlaceholder label="Image de l'article" />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <div className="mb-3 flex items-center gap-2.5">
                  <span className="rounded-md border border-cyan-400/25 bg-cyan-400/10 px-2.25 py-0.75 text-[11.5px] font-semibold text-cyan-300">
                    {post.tag}
                  </span>
                  <span className="text-xs text-zinc-600">
                    {post.date} • {post.readTime} de lecture
                  </span>
                </div>
                <h3 className="mb-2 line-clamp-2 text-[17px] leading-snug font-bold">
                  {post.title}
                </h3>
                <p className="mb-4 line-clamp-3 text-[13.5px] leading-relaxed text-zinc-400">
                  {post.excerpt}
                </p>
                <div className="mt-auto inline-flex items-center gap-1.5 text-[13px] font-semibold text-cyan-400">
                  Lire l&apos;article
                  <svg
                    className="size-3.5"
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
          ))}
        </div>
      </Reveal>
    </section>
  );
}
