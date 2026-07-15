type ArticleCodeBlockProps = {
  filename: string;
  children: React.ReactNode;
};

export function ArticleCodeBlock({ filename, children }: ArticleCodeBlockProps) {
  return (
    <div className="mb-7 overflow-hidden rounded-[10px] border border-zinc-800 bg-zinc-950">
      <div className="flex items-center gap-2 border-b border-zinc-800 bg-zinc-900 px-4 py-2.5">
        <span className="size-2.5 rounded-full bg-zinc-700" />
        <span className="size-2.5 rounded-full bg-zinc-700" />
        <span className="size-2.5 rounded-full bg-zinc-700" />
        <span className="ml-2 font-mono text-xs text-zinc-500">{filename}</span>
      </div>
      <pre className="m-0 overflow-x-auto px-5 py-4.5 font-mono text-[13px] leading-relaxed text-zinc-300">
        {children}
      </pre>
    </div>
  );
}
