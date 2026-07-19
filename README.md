# equity.tw

**equity.tw** is a cross-border net worth tracker built for two audiences: foreigners
settling in Taiwan and Taiwanese living abroad. It combines property, investments, and
mortgages held in NT$ and USD into a single, manually-updated net worth figure — no bank
linking required, just a monthly check-in.

## Tech stack

- [Next.js 15](https://nextjs.org) (App Router, TypeScript strict mode)
- [Tailwind CSS v4](https://tailwindcss.com) for utility spacing/typography (Preflight is
  disabled — see note in `app/globals.css` — so bespoke layout CSS ported from the mockup
  renders exactly as designed)
- [`next/font/google`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts)
  for Inter, loaded as two CSS variables (`--font-inter` for body text, `--font-inter-headline`
  for the display headline) so the headline typeface can be swapped independently later
- pnpm

## Local development

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

Other scripts: `pnpm build`, `pnpm start`, `pnpm lint`, `pnpm format`.

## Project structure

- `app/` — root layout, global styles, metadata, page composition
- `components/` — `Nav`, `Hero`, `Panels`, `DocStack`, `NetWorthChart`, `StatStrip`, `Footer`
- `lib/content.ts` — all site copy as typed constants, so text edits don't require hunting
  through JSX
- `design/mockup.html` — the approved, static landing page mockup. It is the design
  reference for this build: layout, spacing, colors, and copy in `app/` and `components/`
  are ported from it pixel-for-pixel, not reinterpreted.

## Deploying

The app builds clean with `pnpm build` and has no required environment variables, so it can
be imported into Vercel with zero extra configuration.
