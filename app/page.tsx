import Link from "next/link";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { PostRow } from "@/components/post-row";
import { getLatestPosts } from "@/lib/posts";

export default async function Home() {
  const posts = await getLatestPosts(5);

  return (
    <div className="col">
      <Nav current="home" />

      <div className="hero">
        <div className="wm rs">
          Equity<b>.</b>
        </div>
        <p className="sub">Thinking out loud, badly, in public.</p>
      </div>

      <div className="feed">
        <div className="feed-head">
          <span>Latest posts</span>
          <Link href="/blog">View all posts →</Link>
        </div>

        {posts.map((post) => (
          <PostRow key={post.id} post={post} />
        ))}
      </div>

      <Footer />
    </div>
  );
}
