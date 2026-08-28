import Link from "next/link";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { getLatestPosts } from "@/lib/posts";
import { formatDate, formatReadTime } from "@/lib/format";

export default async function Home() {
  const posts = await getLatestPosts(5);

  return (
    <div className="col">
      <Nav current="journal" />

      <div className="hero">
        <div className="wm rs">
          Equity<b>.</b>
        </div>
        <p className="sub">Thinking out loud, badly, in public.</p>
      </div>

      <div className="feed">
        <div className="feed-head">
          <span>Latest posts</span>
          <Link href="/archive">View all posts →</Link>
        </div>

        {posts.map((post) => (
          <article key={post.id} className="post">
            <Link href={`/${post.slug}`}>
              <div className="meta">
                <span>{formatDate(post.published_at)}</span>
                <span>{formatReadTime(post.read_minutes)}</span>
              </div>
              <h2 className="rs">{post.title}</h2>
              {post.excerpt && <p>{post.excerpt}</p>}
            </Link>
          </article>
        ))}
      </div>

      <Footer />
    </div>
  );
}
