import Link from "next/link";
import type { Post } from "@/lib/posts";
import { formatDate, formatReadTime } from "@/lib/format";
import { PostBody } from "@/components/post-body";

export function PostEntry({
  post,
  prev,
  next,
}: {
  post: Post;
  prev: Post | null;
  next: Post | null;
}) {
  return (
    <>
      <Link href="/blog" className="back-link">
        ← Blog
      </Link>

      <header className="entry-head">
        <div className="meta">
          <span>
            {formatDate(post.published_at) || "Unpublished"}
            {post.category ? ` · ${post.category}` : ""}
          </span>
          <span>{formatReadTime(post.read_minutes)}</span>
        </div>
        <h1 className="rs">{post.title}</h1>
        {post.tags.length > 0 && (
          <div className="entry-tags">
            {post.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        )}
      </header>

      <PostBody body={post.body} slug={post.slug} />

      {(prev || next) && (
        <nav className="adjacent" aria-label="Adjacent posts">
          {prev && (
            <Link href={`/${prev.slug}`}>
              <div className="dir">Previous</div>
              <div className="title rs">{prev.title}</div>
            </Link>
          )}
          {next && (
            <Link href={`/${next.slug}`} className="next">
              <div className="dir">Next</div>
              <div className="title rs">{next.title}</div>
            </Link>
          )}
        </nav>
      )}
    </>
  );
}
