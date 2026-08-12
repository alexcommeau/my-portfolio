import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/portfolio/navbar";
import { BlogSubnav } from "@/components/blog/blog-subnav";
import { BlogCard } from "@/components/blog/blog-card";
import { ArticleFooter } from "@/components/blog/article-footer";
import { BlogCover } from "@/components/blog/blog-cover";
import { JsonLd } from "@/components/blog/json-ld";
import { blogPosts } from "@/lib/data";
import { formatBlogDate } from "@/lib/blog";
import { absoluteUrl, getPersonSchema, siteConfig } from "@/lib/site";

const blogDescription =
  "Notes techniques et retours d'expérience sur l'IA, l'auto-hébergement et le développement web.";
const blogTitle = `Blog — ${siteConfig.name}`;

export const metadata: Metadata = {
  title: "Blog",
  description: blogDescription,
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: "/blog",
    siteName: siteConfig.name,
    title: blogTitle,
    description: blogDescription,
    images: [
      {
        url: "/social-image",
        width: 1200,
        height: 630,
        alt: `Blog technique de ${siteConfig.author.name}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: blogTitle,
    description: blogDescription,
    images: [absoluteUrl("/social-image")],
  },
};

export default function BlogIndexPage() {
  const [featured, ...rest] = blogPosts;
  const hasPosts = blogPosts.length > 0;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${absoluteUrl("/blog")}#blog`,
    url: absoluteUrl("/blog"),
    name: blogTitle,
    description: blogDescription,
    inLanguage: siteConfig.language,
    author: getPersonSchema(),
    ...(hasPosts
      ? {
          blogPost: blogPosts.map((post) => ({
            "@type": "BlogPosting",
            headline: post.title,
            url: absoluteUrl(`/blog/${post.slug}`),
            datePublished: post.publishedAt,
            dateModified: post.modifiedAt,
          })),
        }
      : {}),
  };

  return (
    <div className="relative flex min-h-screen flex-col bg-zinc-950 text-zinc-200">
      <JsonLd data={jsonLd} />
      <Navbar />
      <BlogSubnav context="list" />

      <main className="mx-auto w-full max-w-6xl flex-1 px-5 py-14 sm:px-8 sm:py-20">
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

        {hasPosts ? (
          <>
            <div className="mb-12">
              <Link
                href={`/blog/${featured.slug}`}
                className="group grid overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/60 no-underline transition-all duration-200 hover:border-cyan-400/40 hover:bg-zinc-900 md:grid-cols-2"
              >
                <div className="relative aspect-[1200/630] overflow-hidden bg-[#09090b] md:aspect-auto md:h-full md:min-h-[280px]">
                  <BlogCover post={featured} preload />
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
                    <span className="text-xs text-zinc-500">
                      <time dateTime={featured.publishedAt}>
                        {formatBlogDate(featured.publishedAt)}
                      </time>{" "}
                      • {featured.readTime} de lecture
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
            </div>

            {rest.length > 0 && (
              <>
                <h2 className="mb-5 font-mono text-[11px] tracking-wider text-zinc-600 uppercase">
                  Autres articles
                </h2>
                <div className="grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {rest.map((post) => (
                    <div key={post.slug} className="h-full">
                      <BlogCard post={post} />
                    </div>
                  ))}
                </div>
              </>
            )}
          </>
        ) : (
          <section
            aria-labelledby="blog-empty-title"
            className="rounded-2xl border border-zinc-800 bg-zinc-900/60 px-6 py-16 text-center sm:px-10 sm:py-20"
          >
            <div
              aria-hidden="true"
              className="mx-auto mb-5 flex size-12 items-center justify-center rounded-full border border-cyan-400/25 bg-cyan-400/10 text-cyan-300"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="size-5">
                <path d="M7 3.75v3.5M17 3.75v3.5M4.75 9.5h14.5M6.5 5.5h11a1.75 1.75 0 0 1 1.75 1.75v10.25a1.75 1.75 0 0 1-1.75 1.75h-11a1.75 1.75 0 0 1-1.75-1.75V7.25A1.75 1.75 0 0 1 6.5 5.5Z" />
                <path d="M8.5 13h7M8.5 16h4" />
              </svg>
            </div>
            <h2 id="blog-empty-title" className="mb-3 text-2xl font-bold tracking-tight text-zinc-100 sm:text-3xl">
              Des articles arrivent prochainement.
            </h2>
            <p className="mx-auto max-w-xl text-[15.5px] leading-relaxed text-zinc-400">
              Je prépare de nouveaux retours d’expérience autour de l’IA, de
              l’auto-hébergement et du développement web. Revenez bientôt.
            </p>
          </section>
        )}
      </main>

      <ArticleFooter />
    </div>
  );
}
