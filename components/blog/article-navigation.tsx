import Link from "next/link";
import { BlogCover } from "@/components/blog/blog-cover";
import type { BlogPost } from "@/lib/data";

type ArticleNavigationProps = {
  newer?: BlogPost;
  older?: BlogPost;
  related: BlogPost[];
};

function DirectionLink({
  post,
  label,
  align,
}: {
  post?: BlogPost;
  label: string;
  align: "left" | "right";
}) {
  if (!post) return <div />;

  return (
    <Link
      href={`/blog/${post.slug}`}
      className={`group rounded-xl border border-zinc-800 bg-zinc-900/50 p-5 transition-colors hover:border-cyan-400/40 hover:bg-zinc-900 ${
        align === "right" ? "text-right" : "text-left"
      }`}
    >
      <div className="mb-1 font-mono text-[10px] tracking-wider text-zinc-500 uppercase">
        {label}
      </div>
      <div className="text-sm font-semibold text-zinc-200 transition-colors group-hover:text-cyan-300">
        {post.title}
      </div>
    </Link>
  );
}

export function ArticleNavigation({
  newer,
  older,
  related,
}: ArticleNavigationProps) {
  return (
    <section aria-labelledby="continue-reading-title" className="mt-14 border-t border-zinc-800 pt-10">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <DirectionLink post={newer} label="Article plus récent" align="left" />
        <DirectionLink post={older} label="Article plus ancien" align="right" />
      </div>

      <h2 id="continue-reading-title" className="mt-12 mb-5 text-2xl font-bold text-zinc-100">
        À lire aussi
      </h2>
      <div className="grid gap-4 sm:grid-cols-3">
        {related.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/50 transition-colors hover:border-cyan-400/40"
          >
            <div className="aspect-[1.9/1] overflow-hidden border-b border-zinc-800">
              <BlogCover post={post} />
            </div>
            <div className="p-4">
              <div className="mb-1 text-[11px] font-semibold text-cyan-400">{post.tag}</div>
              <div className="line-clamp-3 text-sm font-semibold leading-snug text-zinc-200 group-hover:text-cyan-300">
                {post.title}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

