import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/portfolio/navbar";
import { BlogSubnav } from "@/components/blog/blog-subnav";
import { ArticleHeader } from "@/components/blog/article-header";
import { ArticleTags } from "@/components/blog/article-tags";
import { ArticleCta } from "@/components/blog/article-cta";
import { ArticleFooter } from "@/components/blog/article-footer";
import { ImagePlaceholder } from "@/components/portfolio/image-placeholder";
import { SectionReveal } from "@/components/ui/section-reveal";
import { articleRegistry } from "@/components/blog/articles";
import { blogPosts } from "@/lib/data";

type Props = {
  params: Promise<{ slug: string }>;
};

function getArticle(slug: string) {
  const post = blogPosts.find((p) => p.slug === slug);
  const entry = articleRegistry[slug];
  if (!post || !entry) return null;
  return { post, entry };
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return {
    title: `${article.post.title} — Alex Commeau`,
    description: article.post.excerpt,
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();
  const { post, entry } = article;
  const { Content } = entry;

  return (
    <div className="relative min-h-screen bg-zinc-950 text-zinc-200">
      <Navbar />
      <BlogSubnav context="article" currentTitle={post.title} />
      <article className="mx-auto max-w-[760px] px-8 py-16 sm:py-20">
        <SectionReveal>
          <ArticleHeader
            tag={post.tag}
            date={post.date}
            readTime={post.readTime}
            title={post.title}
            authorName="Alex Commeau"
            authorRole="Développeur Fullstack, Ingénieur IA"
          />
        </SectionReveal>
        <SectionReveal delay={0.08}>
          <div className="mb-10 aspect-video overflow-hidden rounded-xl border border-zinc-800">
            <ImagePlaceholder label="Image de couverture de l'article" />
          </div>
        </SectionReveal>
        <Content />
        <SectionReveal>
          <ArticleTags tags={entry.tags} />
        </SectionReveal>
        <SectionReveal delay={0.08}>
          <ArticleCta />
        </SectionReveal>
      </article>
      <ArticleFooter />
    </div>
  );
}
