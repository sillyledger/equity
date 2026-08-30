// The bare domain is canonical — www.equity.tw redirects to equity.tw at
// the Vercel domain level, and every generated URL (sitemap, feeds, OG
// tags, canonical links) must match that host or Google Search Console
// will flag it as a mismatch.
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://equity.tw").replace(
  /\/$/,
  "",
);

// Shown in the nav badge ("Tracking since Aug 2026"). Fixed at the date
// the billion-dollar ledger launched — not derived from data, since
// there's no "campaign start" row anywhere to read it from.
export const TRACKING_SINCE = "Aug 2026";

const FEED_TYPES = {
  "application/rss+xml": "/rss.xml",
  "application/feed+json": "/feed.json",
} as const;

/**
 * Next.js doesn't deep-merge `alternates` across layout/page metadata — a
 * page that sets its own `alternates.canonical` replaces the root layout's
 * `alternates` entirely, feed `types` included. Every page's `alternates`
 * goes through this so the feed links never silently disappear.
 */
export function pageAlternates(path: string) {
  return {
    canonical: path,
    types: FEED_TYPES,
  };
}
