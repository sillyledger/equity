import type { Play } from "@/lib/plays";
import { formatDollars } from "@/lib/format";

export function PlayRow({ play }: { play: Play }) {
  return (
    <div className="ledger-row">
      <span className={`ledger-dot ${play.status}`} />
      <span className="ledger-row-label">{play.label}</span>
      <span className={`ledger-row-amt ${play.status}`}>
        {play.amountCents === null
          ? "not started"
          : `${play.amountCents >= 0 ? "+" : "-"}${formatDollars(play.amountCents)}`}
      </span>
    </div>
  );
}
