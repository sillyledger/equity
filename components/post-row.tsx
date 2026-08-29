import Link from "next/link";
import type { Post } from "@/lib/posts";
import { formatDate, formatReadTime } from "@/lib/format";

export function PostRow({ post }: { post: Post }) {
  return (
    <article className="post">
      <Link href={`/${post.slug}`}>
        <div className="meta">
          <span>
            {formatDate(post.published_at)}
            {post.category ? ` · ${post.category}` : ""}
          </span>
          <span>{formatReadTime(post.read_minutes)}</span>
        </div>
        <h2 className="rs">{post.title}</h2>
        {post.excerpt && <p>{post.excerpt}</p>}
      </Link>
    </article>
  );
}
