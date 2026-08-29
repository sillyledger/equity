import type { Metadata } from "next";
import { notFound, unstable_rethrow } from "next/navigation";
import { PostEntry } from "@/components/post-entry";
import { getAllPosts, getPostBySlug, getAdjacent } from "@/lib/posts";

// A bad row from a shared, externally-written table must never take the
// whole build down. If listing posts for static generation fails, fall
// back to on-demand rendering (dynamicParams stays true by default)
// instead of failing `next build`.
export async function generateStaticParams() {
  try {
    const posts = await getAllPosts();
    return posts.map((post) => ({ slug: post.slug }));
  } catch (error) {
    console.error("[slug] generateStaticParams failed, falling back to on-demand rendering", error);
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  try {
    const post = await getPostBySlug(slug);
    if (!post) return {};
    return {
      title: post.title,
      description: post.excerpt ?? undefined,
      openGraph: {
        title: post.title,
        description: post.excerpt ?? undefined,
        type: "article",
        publishedTime: post.published_at ?? undefined,
      },
    };
  } catch (error) {
    console.error(`[slug] generateMetadata failed for slug="${slug}"`, error);
    return {};
  }
}

export default async function EntryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  try {
    const post = await getPostBySlug(slug);
    if (!post) notFound();
    const { prev, next } = await getAdjacent(slug);

    return <PostEntry post={post} prev={prev} next={next} />;
  } catch (error) {
    // notFound() above throws Next's own control-flow error — let it
    // through unchanged. Anything else is a genuinely broken row: log it
    // and 404 rather than let it fail the build or 500 in production.
    unstable_rethrow(error);
    console.error(`[slug] failed to render post slug="${slug}"`, error);
    notFound();
  }
}
