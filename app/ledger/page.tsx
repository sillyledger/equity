import type { Metadata } from "next";
import { LedgerPanel } from "@/components/ledger-panel";
import { getOpenPlays, sumAmountCents } from "@/lib/plays";
import { pageAlternates } from "@/lib/site";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Ledger",
  description: "Every open play toward $1,000,000,000, tracked in public.",
  alternates: pageAlternates("/ledger"),
  openGraph: { url: "/ledger" },
};

export default async function LedgerPage() {
  const plays = await getOpenPlays();
  const totalCents = sumAmountCents(plays);

  return (
    <>
      <div className="ledger-head">
        <p className="eyebrow">The ledger</p>
        <h1 className="rs">Every play, up or down.</h1>
      </div>

      <div className="ledger-panel-wrap">
        <LedgerPanel featured={null} rows={plays} totalCents={totalCents} />
      </div>
    </>
  );
}
