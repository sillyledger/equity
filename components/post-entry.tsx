import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import type { Post } from "@/lib/posts";
import { formatDate, formatReadTime } from "@/lib/format";

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
    <div className="col">
      <header className="entry-head">
        <div className="meta">
          <span>{formatDate(post.published_at) || "Unpublished"}</span>
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

      <div className="prose">
        <MDXRemote source={post.body} />
      </div>

      {(prev || next) && (
        <nav className="adjacent" aria-label="Adjacent posts">
          {prev ? (
            <Link href={`/${prev.slug}`}>
              <div className="dir">← Older</div>
              <div className="title rs">{prev.title}</div>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link href={`/${next.slug}`} className="next">
              <div className="dir">Newer →</div>
              <div className="title rs">{next.title}</div>
            </Link>
          ) : (
            <span />
          )}
        </nav>
      )}
    </div>
  );
}
