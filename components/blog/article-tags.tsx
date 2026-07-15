type ArticleTagsProps = {
  tags: string[];
};

export function ArticleTags({ tags }: ArticleTagsProps) {
  return (
    <div className="mt-12 flex flex-wrap items-center gap-2 border-t border-zinc-800 pt-8">
      {tags.map((tag) => (
        <span
          key={tag}
          className="rounded-md border border-zinc-800 bg-zinc-900 px-3 py-1.25 text-[12.5px] text-zinc-300"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}
