import type { Metadata } from "next";
import Link from "next/link";
import { PostRow } from "@/components/post-row";
import { LedgerPanel } from "@/components/ledger-panel";
import { getLatestPosts } from "@/lib/posts";
import { getFeaturedPlay, getOpenPlays, sumAmountCents } from "@/lib/plays";
import { pageAlternates } from "@/lib/site";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  alternates: pageAlternates("/"),
  openGraph: { url: "/" },
};

export default async function Home() {
  const [posts, featured, openPlays] = await Promise.all([
    getLatestPosts(5),
    getFeaturedPlay(),
    getOpenPlays(),
  ]);

  const rows = openPlays.filter((play) => play.id !== featured?.id);
  const totalCents = sumAmountCents(featured ? [featured, ...rows] : rows);

  return (
    <>
      <div className="eq-hero-bleed">
        <div className="eq-hero">
          <div>
            <p className="eq-eyebrow">
              <span className="eq-rule" />
              Every reckless idea that might make money
            </p>
            <h1 className="eq-h1 rs">
              High stakes. Stupid shit. Reckless on purpose: <span className="risk">$1,000,000,000.</span>
            </h1>
            <p className="eq-sub">
              Bigger poker sessions than I should play. Trades sized past sane risk. Domain flips, resales, weird
              bets, whatever looks dumb enough to work. Every play published in public, up or down. Nothing here is
              advice.
            </p>
            <div className="eq-ctas">
              <Link className="eq-cta" href="/ledger">
                See the ledger →
              </Link>
            </div>
          </div>

          <LedgerPanel featured={featured} rows={rows} totalCents={totalCents} />
        </div>
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
    </>
  );
}
