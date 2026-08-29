import type { Metadata } from "next";
import { notFound, unstable_rethrow } from "next/navigation";
import { PostEntry } from "@/components/post-entry";
import { getPostBySlug, getAdjacent } from "@/lib/posts";
import { pageAlternates } from "@/lib/site";

// Every request reads Supabase live so a publish/edit in Ryoka OS shows
// up immediately — no generateStaticParams pinning pages at build time,
// no ISR window to wait out.
export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  try {
    const post = await getPostBySlug(slug);
    if (!post) return {};
    const path = `/${post.slug}`;
    return {
      title: post.title,
      description: post.excerpt ?? undefined,
      alternates: pageAlternates(path),
      openGraph: {
        url: path,
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
