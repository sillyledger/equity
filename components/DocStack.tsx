import type { DocRowItem } from "@/lib/content";

function DocCard({ item }: { item: Extract<DocRowItem, { kind: "card" }> }) {
  return (
    <div className={`doc-card ${item.size}`}>
      {item.lines.map((line, i) => (
        <div
          key={i}
          className={`ln${line.strong ? " strong" : ""}`}
          style={{ width: line.width }}
        />
      ))}
      {item.pill && <div className="pill">{item.pill}</div>}
    </div>
  );
}

function DocBars({ item }: { item: Extract<DocRowItem, { kind: "bars" }> }) {
  return (
    <div className={`mini-bars${item.align === "start" ? " align-start" : ""}`}>
      {item.heights.map((height, i) => (
        <div key={i} style={{ height }} />
      ))}
    </div>
  );
}

export default function DocStack({ items }: { items: DocRowItem[] }) {
  return (
    <div className="doc-row">
      {items.map((item, i) =>
        item.kind === "card" ? <DocCard key={i} item={item} /> : <DocBars key={i} item={item} />,
      )}
    </div>
  );
}
