import Link from "next/link";

export function ArticleCta() {
  return (
    <div className="mt-12 rounded-xl border border-zinc-800 bg-zinc-900 px-8 py-8 text-center">
      <div className="mb-2.5 text-[19px] font-bold">
        Une question sur cet article ?
      </div>
      <div className="mb-5 text-[14.5px] text-zinc-400">
        Discutez-en directement avec mon assistant IA ou écrivez-moi.
      </div>
      <div className="flex flex-wrap justify-center gap-3">
        <Link
          href="/#about"
          className="rounded-md bg-cyan-400 px-5.5 py-2.75 text-sm font-semibold text-[#052027] transition-colors hover:bg-amber-400"
        >
          ✦ Discuter avec l&apos;IA
        </Link>
        <Link
          href="/#contact"
          className="rounded-md border border-zinc-800 px-5.5 py-2.75 text-sm font-semibold text-zinc-200 transition-colors hover:border-zinc-600"
        >
          Me contacter
        </Link>
      </div>
    </div>
  );
}
