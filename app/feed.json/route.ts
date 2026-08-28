import { getArchive } from "@/lib/posts";
import { SITE_URL } from "@/lib/site";

export async function GET() {
  const posts = await getArchive();

  const feed = {
    version: "https://jsonfeed.org/version/1.1",
    title: "Equity",
    home_page_url: SITE_URL,
    feed_url: `${SITE_URL}/feed.json`,
    description: "A journal. Thinking out loud, badly, in public.",
    items: posts.map((post) => ({
      id: `${SITE_URL}/${post.slug}`,
      url: `${SITE_URL}/${post.slug}`,
      title: post.title,
      summary: post.excerpt ?? undefined,
      date_published: post.published_at ?? undefined,
      tags: post.tags,
    })),
  };

  return Response.json(feed, {
    headers: { "Content-Type": "application/feed+json; charset=utf-8" },
  });
}
