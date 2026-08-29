import type { Metadata } from "next";
import { notFound, unstable_rethrow } from "next/navigation";
import { PostRow } from "@/components/post-row";
import { getPostsByCategory } from "@/lib/posts";
import { pageAlternates } from "@/lib/site";

// Every request reads Supabase live so a publish/edit in Ryoka OS shows
// up immediately — no generateStaticParams pinning pages at build time,
// no ISR window to wait out.
export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const path = `/blog/${encodeURIComponent(category)}`;
  return {
    title: category,
    alternates: pageAlternates(path),
    openGraph: { url: path },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;

  try {
    const posts = await getPostsByCategory(category);
    if (posts.length === 0) notFound();

    return (
      <>
        <div className="category-head">
          <h1 className="rs">{category}</h1>
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
    console.error(`[blog/category] failed to render category="${category}"`, error);
    notFound();
  }
}
