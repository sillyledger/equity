export type NavLink = {
  label: string;
  href: string;
};

export const nav = {
  brand: "EQUITY.",
  links: [
    { label: "How it works", href: "#" },
    { label: "Built for", href: "#" },
    { label: "Pricing", href: "#" },
  ] as NavLink[],
  cta: { label: "Start tracking", href: "#" } as NavLink,
};

export type HeadlineSegment = {
  text: string;
  emphasis?: boolean;
  breakAfter?: boolean;
};

export const hero = {
  tag: "[ TW / ABROAD ]",
  headline: [
    { text: "Two Countries, " },
    { text: "One Net", emphasis: true, breakAfter: true },
    { text: "Worth, " },
    { text: "Finally", emphasis: true },
    { text: " Together." },
  ] as HeadlineSegment[],
  intro:
    "Built for foreigners settling in Taiwan, and Taiwanese living abroad. Property, investments, and mortgages — tracked in both currencies, in one place.",
  scrollLabel: "SCROLL DOWN",
};

export type DocLine = {
  width: string;
  strong?: boolean;
};

export type DocCard = {
  kind: "card";
  size: "h1" | "h2" | "featured";
  lines: DocLine[];
  pill?: string;
};

export type DocBars = {
  kind: "bars";
  heights: string[];
  align: "start" | "end";
};

export type DocRowItem = DocCard | DocBars;

export type Panel = {
  variant: "cream" | "lavender";
  docRow: DocRowItem[];
  title: string;
  description: string;
  learnLabel: string;
};

export const panels: {
  left: Panel;
  center: {
    brand: string;
    syncedLabel: string;
    footLabel: string;
  };
  right: Panel;
} = {
  left: {
    variant: "cream",
    docRow: [
      {
        kind: "card",
        size: "h1",
        lines: [{ width: "70%" }, { width: "50%" }],
      },
      {
        kind: "card",
        size: "featured",
        lines: [{ width: "80%", strong: true }, { width: "60%" }, { width: "70%" }],
        pill: "NT$ + US$",
      },
      {
        kind: "card",
        size: "h2",
        lines: [{ width: "65%" }, { width: "45%" }, { width: "55%" }],
      },
      {
        kind: "bars",
        heights: ["30%", "48%", "40%", "66%", "82%"],
        align: "end",
      },
    ],
    title: "Two Currencies, One Number",
    description: "NT$ and USD combined, always up to date.",
    learnLabel: "Learn More →",
  },
  center: {
    brand: "EQUITY.",
    syncedLabel: "SYNCED",
    footLabel: "NET WORTH · TW + ABROAD",
  },
  right: {
    variant: "lavender",
    docRow: [
      {
        kind: "bars",
        heights: ["70%", "52%", "60%", "36%", "24%"],
        align: "start",
      },
      {
        kind: "card",
        size: "h2",
        lines: [{ width: "60%" }, { width: "45%" }, { width: "70%" }],
      },
      {
        kind: "card",
        size: "featured",
        lines: [{ width: "75%", strong: true }, { width: "55%" }, { width: "65%" }],
        pill: "Added ✓",
      },
      {
        kind: "card",
        size: "h1",
        lines: [{ width: "65%" }, { width: "40%" }],
      },
    ],
    title: "Nothing To Connect",
    description: "Add what you own once a month — no bank linking.",
    learnLabel: "Learn More →",
  },
};

export type Stat = {
  n: string;
  l: string;
};

export const stats: Stat[] = [
  { n: "2", l: "countries, one household" },
  { n: "0", l: "bank connections required" },
  { n: "1×", l: "monthly check-in, not daily" },
];

export const footer = {
  note: "equity.tw — manually tracked, nothing connected.",
  copyright: "© 2026",
};

export const site = {
  title: "equity.tw — Two Countries, One Net Worth",
  description: hero.intro,
};
