type ArticleCalloutProps = {
  title: string;
  children: React.ReactNode;
};

export function ArticleCallout({ title, children }: ArticleCalloutProps) {
  return (
    <div className="mb-7 rounded-lg border border-zinc-800 border-l-[3px] border-l-cyan-400 bg-zinc-900 px-6 py-5">
      <div className="mb-2 flex items-center gap-2 text-[13.5px] font-bold text-cyan-400">
        <svg
          className="size-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M9.5 9a2.5 2.5 0 0 1 4.6 1.4c0 1.6-2.1 1.9-2.1 3.1" />
          <path d="M12 17.5h.01" />
        </svg>
        {title}
      </div>
      <div className="text-[14.5px] leading-relaxed text-zinc-400">{children}</div>
    </div>
  );
}
