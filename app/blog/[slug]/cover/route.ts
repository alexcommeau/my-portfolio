import { createBlogCoverImage } from "@/lib/blog-cover";
import { blogPosts } from "@/lib/data";
import { getBlogPost } from "@/lib/blog";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function GET(_request: Request, { params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    return new Response("Article introuvable", { status: 404 });
  }

  return createBlogCoverImage(post);
}

