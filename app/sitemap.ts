import type { MetadataRoute } from "next";
import { blogPosts } from "@/lib/data";
import { getLatestBlogUpdate } from "@/lib/blog";
import { absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const latestBlogUpdate = getLatestBlogUpdate();

  return [
    {
      url: absoluteUrl("/"),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: absoluteUrl("/blog"),
      lastModified: latestBlogUpdate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...blogPosts.map((post) => ({
      url: absoluteUrl(`/blog/${post.slug}`),
      lastModified: post.modifiedAt,
      changeFrequency: "monthly" as const,
      priority: 0.7,
      images: [absoluteUrl(post.image.src)],
    })),
  ];
}

