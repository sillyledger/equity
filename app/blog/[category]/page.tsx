import type { Metadata } from "next";
import { notFound, unstable_rethrow } from "next/navigation";
import { Nav } from "@/components/nav";
import { PostRow } from "@/components/post-row";
import { getAllPosts, getPostsByCategory, groupPostsByCategory } from "@/lib/posts";
import { pageAlternates } from "@/lib/site";

export async function generateStaticParams() {
  try {
    const posts = await getAllPosts();
    const categories = groupPostsByCategory(posts);
    return categories.map((category) => ({ category: category.name }));
  } catch (error) {
    console.error(
      "[blog/category] generateStaticParams failed, falling back to on-demand rendering",
      error,
    );
    return [];
  }
}

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
      <div className="col">
        <Nav current="blog" />

        <div className="category-head">
          <h1 className="rs">{category}</h1>
        </div>

        <div className="feed">
          {posts.map((post) => (
            <PostRow key={post.id} post={post} />
          ))}
        </div>
      </div>
    );
  } catch (error) {
    unstable_rethrow(error);
    console.error(`[blog/category] failed to render category="${category}"`, error);
    notFound();
  }
}
