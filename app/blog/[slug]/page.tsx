import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/portfolio/navbar";
import { BlogSubnav } from "@/components/blog/blog-subnav";
import { ArticleHeader } from "@/components/blog/article-header";
import { ArticleTags } from "@/components/blog/article-tags";
import { ArticleCta } from "@/components/blog/article-cta";
import { ArticleFooter } from "@/components/blog/article-footer";
import { ArticleAuthor } from "@/components/blog/article-author";
import { ArticleNavigation } from "@/components/blog/article-navigation";
import { ArticleReadingProgress } from "@/components/blog/article-reading-progress";
import { ArticleTableOfContents } from "@/components/blog/article-table-of-contents";
import { BlogCover } from "@/components/blog/blog-cover";
import { JsonLd } from "@/components/blog/json-ld";
import { articleRegistry } from "@/components/blog/articles";
import { blogPosts } from "@/lib/data";
import {
  getAbsoluteBlogPostUrl,
  getBlogNavigation,
  getBlogPost,
  getRelatedBlogPosts,
} from "@/lib/blog";
import { absoluteUrl, getPersonSchema, siteConfig } from "@/lib/site";

type Props = {
  params: Promise<{ slug: string }>;
};

function getArticle(slug: string) {
  const post = getBlogPost(slug);
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
  const articleUrl = getAbsoluteBlogPostUrl(article.post);
  const imageUrl = absoluteUrl(article.post.image.src);

  return {
    title: article.post.title,
    description: article.post.excerpt,
    authors: [{ name: siteConfig.author.name, url: siteConfig.author.url }],
    alternates: {
      canonical: `/blog/${article.post.slug}`,
    },
    openGraph: {
      type: "article",
      locale: siteConfig.locale,
      url: articleUrl,
      siteName: siteConfig.name,
      title: article.post.title,
      description: article.post.excerpt,
      publishedTime: article.post.publishedAt,
      modifiedTime: article.post.modifiedAt,
      authors: [siteConfig.author.url],
      tags: article.post.tags,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: article.post.image.alt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: article.post.title,
      description: article.post.excerpt,
      images: [imageUrl],
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();
  const { post, entry } = article;
  const { Content } = entry;
  const articleUrl = getAbsoluteBlogPostUrl(post);
  const { newer, older } = getBlogNavigation(post.slug);
  const related = getRelatedBlogPosts(post);
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      getPersonSchema(),
      {
        "@type": "BlogPosting",
        "@id": `${articleUrl}#article`,
        mainEntityOfPage: articleUrl,
        url: articleUrl,
        headline: post.title,
        description: post.excerpt,
        image: absoluteUrl(post.image.src),
        datePublished: post.publishedAt,
        dateModified: post.modifiedAt,
        articleSection: post.tag,
        keywords: post.tags,
        inLanguage: siteConfig.language,
        author: { "@id": `${siteConfig.url}/#person` },
        publisher: { "@id": `${siteConfig.url}/#person` },
        isPartOf: { "@id": `${absoluteUrl("/blog")}#blog` },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${articleUrl}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Accueil",
            item: absoluteUrl("/"),
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Blog",
            item: absoluteUrl("/blog"),
          },
          {
            "@type": "ListItem",
            position: 3,
            name: post.title,
            item: articleUrl,
          },
        ],
      },
    ],
  };

  return (
    <div className="relative min-h-screen bg-zinc-950 text-zinc-200">
      <JsonLd data={jsonLd} />
      <Navbar />
      <BlogSubnav context="article" currentTitle={post.title} />
      <ArticleReadingProgress>
        <ArticleHeader
          tag={post.tag}
          publishedAt={post.publishedAt}
          readTime={post.readTime}
          title={post.title}
          authorName={siteConfig.author.name}
          authorRole={siteConfig.author.role}
        />
        <div className="mb-10 aspect-video overflow-hidden rounded-xl border border-zinc-800">
          <BlogCover post={post} preload />
        </div>
        <ArticleTableOfContents sections={post.sections} />
        <Content />
        <ArticleTags tags={post.tags} />
        <ArticleAuthor />
        <ArticleNavigation newer={newer} older={older} related={related} />
        <ArticleCta />
      </ArticleReadingProgress>
      <ArticleFooter />
    </div>
  );
}
