import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/nav";
import { PostRow } from "@/components/post-row";
import { getLatestPosts } from "@/lib/posts";
import { pageAlternates } from "@/lib/site";

export const metadata: Metadata = {
  alternates: pageAlternates("/"),
  openGraph: { url: "/" },
};

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
    </div>
  );
}
