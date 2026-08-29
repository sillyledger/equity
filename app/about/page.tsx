import type { Metadata } from "next";
import { pageAlternates } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: "Unvarnished observations, micro-essays, and field notes on modern life.",
  alternates: pageAlternates("/about"),
  openGraph: { url: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <div className="about-head">
        <p className="eyebrow">About</p>
        <h1 className="rs">
          Equity<b>.</b>
        </h1>
      </div>

      <div className="about-body">
        <p>
          Most of what gets published online has been polished until the thinking fell out of it.
          Optimised for search, hedged for reach, written in the voice of someone pretending to
          have already arrived. Equity is an exercise in the opposite.
        </p>
        <p>
          It&apos;s a repository of unvarnished observations, micro-essays, and field notes on
          modern life, culture, and ordinary human behaviour. The subject is usually a system
          nobody notices they&apos;re inside: a habit, a default, a trade-off agreed to years ago
          and never revisited.
        </p>
        <p>
          Entries here are drafts on purpose. Some are wrong. An argument with its working still
          visible is worth more than a conclusion handed over finished, and revising in public
          costs less than being right in private.
        </p>
        <p>
          No schedule. No niche. No throughline beyond whatever refused to go away that week.
          Short when short is honest, long when the thing takes that long.
        </p>
        <p>No life advice. No growth hacks. No frameworks. Just honest drafts from a working mind.</p>
      </div>
    </>
  );
}
