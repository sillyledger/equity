import type { Metadata } from "next";
import Link from "next/link";
import { pageAlternates } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "One absurd number, chased in public. No system, no advice, every play published until it hits $1,000,000,000.",
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
          Most people who talk about money online are selling something. A course, a signal, a
          version of themselves that never loses. This isn&apos;t that.
        </p>
        <p>
          This is one absurd number, chased in public, through whatever stupid idea looks like it
          might work. Poker sessions sized bigger than they should be. Trades that ignore every
          rule about position sizing. Domain flips bought at 2am for reasons that don&apos;t
          survive daylight. Resales, weird bets, whatever&apos;s next.
        </p>
        <p>
          None of it is a system. Some of it is skill pushed past where skill should stop. Some of
          it is just recklessness with a spreadsheet attached. The point isn&apos;t the method,
          it&apos;s the number: zero, on the way to one billion dollars, tracked the whole way so
          there&apos;s nowhere to quietly stop counting.
        </p>
        <p>
          Every play gets published. The wins and the ones that don&apos;t work, in the same
          place, at the same size. No performance, no highlight reel. If it goes to zero, it says
          zero.
        </p>
        <p>
          This is not advice. Nobody should copy any of it, least of all the parts that work,
          because the parts that work are usually the parts that got lucky.
        </p>
        <p>No plan beyond the number. No exit beyond hitting it or running out of money trying.</p>
        <div className="eq-ctas">
          <Link className="eq-cta" href="/a-billion-or-it-doesnt-end-well">
            Read the first entry →
          </Link>
        </div>
      </div>
    </>
  );
}
