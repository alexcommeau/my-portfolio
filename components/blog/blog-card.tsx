import Link from "next/link";
import { ImagePlaceholder } from "@/components/portfolio/image-placeholder";
import type { BlogPost } from "@/lib/data";

function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-[10px] border border-zinc-800 bg-zinc-900/60 text-inherit no-underline transition-all duration-200 hover:-translate-y-1 hover:border-cyan-400/40 hover:bg-zinc-900"
    >
      <div className="relative h-[160px] shrink-0 overflow-hidden">
        <ImagePlaceholder label="Image de l'article" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-zinc-900/40 to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
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
        <h3 className="mb-2 line-clamp-2 text-[17px] leading-snug font-bold transition-colors group-hover:text-cyan-300">
          {post.title}
        </h3>
        <p className="mb-4 line-clamp-3 text-[13.5px] leading-relaxed text-zinc-400">
          {post.excerpt}
        </p>
        <div className="mt-auto inline-flex items-center gap-1.5 text-[13px] font-semibold text-cyan-400">
          Lire l&apos;article
          <ArrowRightIcon className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
        </div>
      </div>
    </Link>
  );
}
