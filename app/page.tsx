export default function Home() {
  return (
    <div className="wrap">
      <header>
        <div className="logo">
          EQUITY<em>.</em>
        </div>
        <div className="eyebrow">
          Coming Soon
          <br />
          Taipei ↔ Abroad
        </div>
      </header>

      <main>
        <div className="headline-col">
          <h1>
            Home in <em>two</em>
            <br />
            places. Tracked
            <br />
            as one.
          </h1>
          <p className="desc">
            Built for foreigners settling in Taiwan, and Taiwanese living abroad. Property,
            investments, and mortgages — tracked in both currencies, in one place.
          </p>
          <p className="note">No launch date yet. We&apos;d rather get it right than get it out.</p>
        </div>

        <div className="stamp-col">
          <svg className="stamp" viewBox="0 0 300 300" fill="none" aria-hidden="true">
            <circle className="stamp-ring" cx="150" cy="150" r="128" />
            <circle className="stamp-ring-solid" cx="150" cy="150" r="108" />
            <g className="needle">
              <line
                x1="150"
                y1="80"
                x2="150"
                y2="220"
                stroke="var(--terracotta)"
                strokeWidth="1.2"
                opacity="0.7"
              />
              <line
                x1="80"
                y1="150"
                x2="220"
                y2="150"
                stroke="var(--terracotta)"
                strokeWidth="1.2"
                opacity="0.7"
              />
              <path
                d="M150 100 L162 150 L150 200 L138 150 Z"
                fill="var(--terracotta)"
                opacity="0.9"
              />
              <circle cx="150" cy="150" r="5" fill="var(--cream)" />
            </g>
            <defs>
              <path id="circlePath" d="M150,150 m-95,0 a95,95 0 1,1 190,0 a95,95 0 1,1 -190,0" />
            </defs>
            <text>
              <textPath href="#circlePath" startOffset="2%">
                EQUITY.TW · COMING SOON · EQUITY.TW · COMING SOON ·
              </textPath>
            </text>
          </svg>
        </div>
      </main>

      <footer>
        <p className="footnote">
          Two ledgers, one household. Follow the build on GitHub.
          <br />A project by{" "}
          <a href="https://www.ryokagroup.com" target="_blank" rel="noopener">
            Ryoka Group
          </a>
          .
        </p>
        <div className="socials">
          <a
            href="https://github.com/sillyledger/equity"
            aria-label="GitHub"
            target="_blank"
            rel="noopener"
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.5 0 12.3c0 5.44 3.44 10.05 8.21 11.68.6.11.82-.27.82-.6 0-.29-.01-1.06-.02-2.08-3.34.75-4.04-1.65-4.04-1.65-.55-1.42-1.34-1.8-1.34-1.8-1.09-.77.08-.75.08-.75 1.2.09 1.84 1.26 1.84 1.26 1.07 1.87 2.81 1.33 3.5 1.02.11-.79.42-1.33.76-1.64-2.67-.31-5.47-1.37-5.47-6.08 0-1.34.46-2.44 1.22-3.3-.12-.31-.53-1.56.12-3.25 0 0 1-.33 3.3 1.26a11.2 11.2 0 0 1 6 0c2.28-1.59 3.29-1.26 3.29-1.26.65 1.69.24 2.94.12 3.25.76.86 1.22 1.96 1.22 3.3 0 4.72-2.81 5.76-5.49 6.07.43.38.81 1.13.81 2.29 0 1.65-.02 2.98-.02 3.39 0 .33.22.72.83.6C20.57 22.34 24 17.74 24 12.3 24 5.5 18.63 0 12 0z" />
            </svg>
          </a>
          <a href="mailto:pieter@ryokagroup.com" aria-label="Email">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <path d="M3 7l9 6 9-6" />
            </svg>
          </a>
        </div>
      </footer>
    </div>
  );
}
