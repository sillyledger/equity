import type { Metadata } from "next";
import Link from "next/link";
import { PostRow } from "@/components/post-row";
import { getAllPosts, groupPostsByCategory, categorySlug } from "@/lib/posts";
import { pageAlternates } from "@/lib/site";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog",
  alternates: pageAlternates("/blog"),
  openGraph: { url: "/blog" },
};

export default async function BlogPage() {
  const posts = await getAllPosts();
  const categories = groupPostsByCategory(posts);

  return (
    <>
      <div className="blog-head">
        <p className="eyebrow">Browse by category</p>
        <h1 className="rs">The journal.</h1>
      </div>

      {categories.length > 0 && (
        <div className="category-grid">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={`/blog/${categorySlug(category.name)}`}
              className="category-tile"
            >
              <div className="category-name rs">{category.name}</div>
              <div className="category-count">
                {category.count} {category.count === 1 ? "entry" : "entries"}
              </div>
            </Link>
          ))}
        </div>
      )}

      <div className="feed">
        <div className="feed-head">
          <span>All entries</span>
        </div>

        {posts.map((post) => (
          <PostRow key={post.id} post={post} />
        ))}
      </div>
    </>
  );
}
