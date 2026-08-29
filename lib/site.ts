// www is canonical — the site resolves at https://www.equity.tw, and every
// generated URL (sitemap, feeds, OG tags, canonical links) must match that
// host or Google Search Console will flag it as a mismatch.
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.equity.tw").replace(
  /\/$/,
  "",
);

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
