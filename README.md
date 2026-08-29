# equity.tw

**Equity** is a personal journal — short, unpolished entries, no theme, no editorial calendar.

Posts live in a shared Supabase `posts` table that Ryoka OS publishes to directly (it also
publishes pieter.tw and pieterborremans.com from the same table). This repo only reads: every
query in `lib/posts.ts` is scoped to `target_site = 'equity.tw'` and `status = 'published'`, using
the anon key. It never writes, and drafts and other sites' rows are invisible here by design.

## Tech stack

- [Next.js 15](https://nextjs.org) (App Router, TypeScript strict, static rendering with
  time-based revalidation)
- [`next/font/google`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) —
  Reddit Sans (wordmark, titles), IBM Plex Sans (body), IBM Plex Mono (dates, meta, footer)
- [`@supabase/supabase-js`](https://supabase.com/docs/reference/javascript) — the anon-key public
  client, used only from `lib/posts.ts`
- [`next-mdx-remote`](https://github.com/hashicorp/next-mdx-remote) — renders post bodies (stored
  as MDX) via `next-mdx-remote/rsc`
- Bespoke CSS in `app/globals.css` — no utility framework
- pnpm

## Local development

```bash
pnpm install
cp .env.example .env.local   # fill in the Supabase URL and anon key
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

Other scripts: `pnpm build`, `pnpm start`, `pnpm lint`, `pnpm format`.

## Environment variables

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

That's the whole list — public, read-only, safe in the browser bundle. This repo has no service
role key, no write path, and no webhook to receive.

## Project structure

- `app/` — home, `[slug]` entry, `blog`, `blog/[category]`, `about`, feeds, sitemap, robots, and
  OG images
- `lib/posts.ts` — the only file that talks to Supabase
- `components/` — `Nav`, `Footer`, `PostEntry`, `PostRow`
- `design/mockup.html` — the approved static reference for the dark/navy journal design. Layout,
  spacing, colors, and type scale in `app/` are ported from it, not reinterpreted.

## Deploying

Vercel. Set the two env variables above. `pnpm build` is clean with no other required config.

## What changed from the previous direction

This repo used to ship a "coming soon" placeholder for a cross-border net worth tracker. That
product direction is dead — no finance, net worth, or cross-border copy remains anywhere in the
code, copy, or metadata. Equity is now a journal.
