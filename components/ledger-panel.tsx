import type { Play } from "@/lib/plays";
import { formatDollars, amountTone } from "@/lib/format";
import { PlayRow } from "@/components/play-row";

const GOAL_CENTS = 1_000_000_000 * 100;

/** "day N" since a play opened, floored at 1 so a play started today still reads as day 1. */
function dayCount(iso: string | null): number {
  if (!iso) return 1;
  const elapsedMs = Date.now() - new Date(iso).getTime();
  return Math.max(1, Math.floor(elapsedMs / 86_400_000) + 1);
}

export function LedgerPanel({
  featured,
  rows,
  totalCents,
}: {
  featured: Play | null;
  rows: Play[];
  totalCents: number;
}) {
  const pct = ((totalCents / GOAL_CENTS) * 100).toFixed(2);
  const netWorth = totalCents < 0 ? `-${formatDollars(totalCents)}` : formatDollars(totalCents);

  return (
    <div className="panel">
      <div className="ledger-top">
        <div className="ledger-k">Net worth</div>
        <div className="ledger-num rs">{netWorth}</div>
        <div className="ledger-of">of $1,000,000,000 · {pct}%</div>
      </div>

      {featured && (
        <div className="ledger-featured">
          <div className="ledger-featured-label">
            Latest play{featured.category ? ` · ${featured.category}` : ""}
          </div>
          {featured.note && <div className="ledger-featured-quote">{featured.note}</div>}
          {featured.amountCents !== null && (
            <div className="ledger-featured-amt">
              {featured.status === "down" ? "Down" : featured.status === "up" ? "Up" : ""}{" "}
              <b className={`amt-num ${amountTone(featured.amountCents)}`}>
                {formatDollars(featured.amountCents)}
              </b>{" "}
              · day {dayCount(featured.createdAt)} · {featured.isOpen ? "still holding" : "closed"}
            </div>
          )}
        </div>
      )}

      {rows.map((play) => (
        <PlayRow key={play.id} play={play} />
      ))}
    </div>
  );
}
