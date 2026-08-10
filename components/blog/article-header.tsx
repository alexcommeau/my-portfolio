import Image from "next/image";
import { formatBlogDate } from "@/lib/blog";
import { siteConfig } from "@/lib/site";

type ArticleHeaderProps = {
  tag: string;
  publishedAt: string;
  readTime: string;
  title: string;
  authorName: string;
  authorRole: string;
};

export function ArticleHeader({
  tag,
  publishedAt,
  readTime,
  title,
  authorName,
  authorRole,
}: ArticleHeaderProps) {
  return (
    <>
      <div className="mb-7">
        <span className="rounded-md border border-cyan-400/25 bg-cyan-400/10 px-2.75 py-1 text-xs font-semibold text-cyan-300">
          {tag}
        </span>
        <span className="ml-3 text-[13px] text-zinc-500">
          <time dateTime={publishedAt}>{formatBlogDate(publishedAt)}</time> • {readTime} de lecture
        </span>
      </div>

      <h1 className="mb-6 text-4xl leading-tight font-extrabold tracking-tight sm:text-[44px]">
        {title}
      </h1>

      <div className="mb-10 flex items-center gap-3 border-b border-zinc-800 pb-8">
        <div className="size-10 shrink-0 overflow-hidden rounded-full">
          <Image
            src={siteConfig.author.image}
            alt={`Portrait de ${authorName}`}
            width={40}
            height={40}
            className="size-full object-cover object-top"
          />
        </div>
        <div>
          <div className="text-sm font-bold">{authorName}</div>
          <div className="text-[12.5px] text-zinc-500">{authorRole}</div>
        </div>
      </div>
    </>
  );
}
