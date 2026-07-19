import { stats } from "@/lib/content";

export default function StatStrip() {
  return (
    <section className="stats">
      <div className="wrap">
        {stats.map((stat) => (
          <div className="stat" key={stat.l}>
            <div className="n">{stat.n}</div>
            <div className="l">{stat.l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
