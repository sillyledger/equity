# equity.tw

This repo currently ships a **coming-soon placeholder** — a single static page at `/`
with no app functionality behind it yet. The real product (see below) hasn't been built
out in this codebase.

## Product scope (for future reference)

**equity.tw** is planned as a cross-border net worth tracker built for two audiences:
foreigners settling in Taiwan and Taiwanese living abroad. It will combine property,
investments, and mortgages held in NT$ and USD into a single, manually-updated net worth
figure — no bank linking required, just a monthly check-in.

## Tech stack

- [Next.js 15](https://nextjs.org) (App Router, TypeScript strict mode)
- [`next/font/google`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts)
  for Fraunces (display headline), Inter (body), and JetBrains Mono (labels/eyebrow),
  each loaded as a CSS variable (`--font-fraunces`, `--font-inter`, `--font-jetbrains-mono`)
- Bespoke CSS in `app/globals.css` — no utility framework
- pnpm

## Local development

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

Other scripts: `pnpm build`, `pnpm start`, `pnpm lint`, `pnpm format`.

## Project structure

- `app/` — root layout (fonts + metadata), global styles, and the single coming-soon page
- `design/mockup.html` — the approved, static coming-soon mockup. It is the design
  reference for this build: layout, spacing, colors, motion, and copy in `app/` are
  ported from it pixel-for-pixel, not reinterpreted.

## Deploying

The app builds clean with `pnpm build` and has no required environment variables, so it can
be imported into Vercel with zero extra configuration.
