import { Fragment } from "react";
import { hero } from "@/lib/content";
import Panels from "@/components/Panels";

export default function Hero() {
  return (
    <section className="hero">
      <div className="wrap">
        <div className="hero-grid">
          <div className="headline-row">
            <h1>
              {hero.headline.map((segment, i) => (
                <Fragment key={i}>
                  {segment.emphasis ? <span className="g">{segment.text}</span> : segment.text}
                  {segment.breakAfter && <br />}
                </Fragment>
              ))}
            </h1>
            <div className="tag">{hero.tag}</div>
          </div>

          <div className="intro-row">
            <p className="hero-p">{hero.intro}</p>
          </div>

          <div className="scroll-col">
            <div className="scroll-mark">
              <div className="dash" />
              <div className="o" />
              <div className="dash" />
            </div>
            <div className="scroll-vert">{hero.scrollLabel}</div>
          </div>

          <div className="panels-col">
            <Panels />
          </div>
        </div>
      </div>
    </section>
  );
}
