import type { Metadata } from "next";
import { notFound, unstable_rethrow } from "next/navigation";
import { PostRow } from "@/components/post-row";
import { getPostsByCategory, getCategoryNameBySlug } from "@/lib/posts";
import { pageAlternates } from "@/lib/site";

// Every request reads Supabase live so a publish/edit in Ryoka OS shows
// up immediately — no generateStaticParams pinning pages at build time,
// no ISR window to wait out.
export const dynamic = "force-dynamic";

// The [category] param is a slug (e.g. "field-notes"), never the raw
// category name — see lib/posts.ts:categorySlug for why.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category: slug } = await params;
  const name = await getCategoryNameBySlug(slug);
  const path = `/blog/${slug}`;
  return {
    title: name ?? slug,
    alternates: pageAlternates(path),
    openGraph: { url: path },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: slug } = await params;

  try {
    const name = await getCategoryNameBySlug(slug);
    if (!name) notFound();

    const posts = await getPostsByCategory(name);
    if (posts.length === 0) notFound();

    return (
      <>
        <div className="category-head">
          <h1 className="rs">{name}</h1>
        </div>

        <div className="feed">
          {posts.map((post) => (
            <PostRow key={post.id} post={post} />
          ))}
        </div>
      </>
    );
  } catch (error) {
    unstable_rethrow(error);
    console.error(`[blog/category] failed to render category slug="${slug}"`, error);
    notFound();
  }
}
