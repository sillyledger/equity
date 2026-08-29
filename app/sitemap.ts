import type { MetadataRoute } from "next";
import { getAllPosts, groupPostsByCategory } from "@/lib/posts";
import { SITE_URL } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts();
  const categories = groupPostsByCategory(posts);
  const now = new Date();

  return [
    { url: SITE_URL, changeFrequency: "daily", priority: 1.0 },
    { url: `${SITE_URL}/blog`, changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE_URL}/about`, changeFrequency: "monthly", priority: 0.5 },
    ...posts.map((post) => ({
      url: `${SITE_URL}/${post.slug}`,
      lastModified: post.updated_at ?? post.published_at ?? now,
      priority: 0.8,
    })),
    ...categories.map((category) => ({
      url: `${SITE_URL}/blog/${encodeURIComponent(category.name)}`,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })),
  ];
}
