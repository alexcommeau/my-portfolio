import { blogPosts, type BlogPost } from "@/lib/data";
import { absoluteUrl } from "@/lib/site";

const blogDateFormatter = new Intl.DateTimeFormat("fr-FR", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

export function formatBlogDate(date: string) {
  return blogDateFormatter.format(new Date(`${date}T00:00:00.000Z`));
}

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}

export function getBlogPostUrl(post: Pick<BlogPost, "slug">) {
  return `/blog/${post.slug}`;
}

export function getAbsoluteBlogPostUrl(post: Pick<BlogPost, "slug">) {
  return absoluteUrl(getBlogPostUrl(post));
}

export function getBlogNavigation(slug: string) {
  const index = blogPosts.findIndex((post) => post.slug === slug);

  return {
    newer: index > 0 ? blogPosts[index - 1] : undefined,
    older: index >= 0 && index < blogPosts.length - 1 ? blogPosts[index + 1] : undefined,
  };
}

export function getRelatedBlogPosts(post: BlogPost, limit = 3) {
  return blogPosts
    .filter((candidate) => candidate.slug !== post.slug)
    .map((candidate) => ({
      post: candidate,
      sharedTags: candidate.tags.filter((tag) => post.tags.includes(tag)).length,
    }))
    .sort(
      (left, right) =>
        right.sharedTags - left.sharedTags ||
        right.post.publishedAt.localeCompare(left.post.publishedAt),
    )
    .slice(0, limit)
    .map(({ post: candidate }) => candidate);
}

export function getLatestBlogUpdate() {
  return blogPosts.reduce(
    (latest, post) =>
      post.modifiedAt.localeCompare(latest) > 0 ? post.modifiedAt : latest,
    blogPosts[0]?.modifiedAt ?? "",
  );
}

