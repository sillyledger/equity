import Link from "next/link";
import type { Post, CategoryCount } from "@/lib/posts";
import { formatDate, formatReadTime } from "@/lib/format";

export function HomeFeed({ posts, categories }: { posts: Post[]; categories: CategoryCount[] }) {
  return (
    <div className="hf-section">
      <div className="hf-head">
        <span>Latest posts</span>
        <Link href="/blog">View all posts →</Link>
      </div>

      <div className="hf-grid">
        <div>
          {posts.map((post) => (
            <article key={post.id} className="hf-post">
              <Link href={`/${post.slug}`}>
                <div className="hf-meta">
                  <span>{formatDate(post.published_at)}</span>
                  {post.category && (
                    <>
                      <span>·</span>
                      <span>{post.category}</span>
                    </>
                  )}
                  <span>·</span>
                  <span>{formatReadTime(post.read_minutes)}</span>
                </div>
                <h2 className="rs">{post.title}</h2>
                {post.excerpt && <p>{post.excerpt}</p>}
              </Link>
            </article>
          ))}
        </div>

        {categories.length > 0 && (
          <aside className="hf-side">
            <div className="hf-catbox">
              {categories.map((category) => (
                <Link key={category.name} href={`/blog/${encodeURIComponent(category.name)}`} className="hf-cat">
                  <span className="hf-cat-name rs">{category.name}</span>
                  <span className="hf-cat-count">
                    {category.count} {category.count === 1 ? "entry" : "entries"}
                  </span>
                </Link>
              ))}
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}
