import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { getArchive } from "@/lib/posts";
import { formatDate, formatMonthYear } from "@/lib/format";
import type { Post } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Archive",
};

function groupByMonth(posts: Post[]): { label: string; posts: Post[] }[] {
  const groups = new Map<string, Post[]>();
  for (const post of posts) {
    const label = formatMonthYear(post.published_at);
    const existing = groups.get(label);
    if (existing) existing.push(post);
    else groups.set(label, [post]);
  }
  return Array.from(groups, ([label, posts]) => ({ label, posts }));
}

export default async function ArchivePage() {
  const posts = await getArchive();
  const groups = groupByMonth(posts);

  return (
    <div className="col">
      <Nav current="archive" />

      <div className="archive-head">
        <h1 className="rs">Archive</h1>
      </div>

      {groups.map((group) => (
        <div className="month-group" key={group.label}>
          <h2>{group.label}</h2>
          {group.posts.map((post) => (
            <Link key={post.id} href={`/${post.slug}`} className="archive-row">
              <span className="date">{formatDate(post.published_at)}</span>
              <span className="title rs">{post.title}</span>
            </Link>
          ))}
        </div>
      ))}

      <Footer />
    </div>
  );
}
