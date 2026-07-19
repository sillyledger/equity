export default function NetWorthChart({ syncedLabel }: { syncedLabel: string }) {
  return (
    <svg width="210" height="140" viewBox="0 0 210 140" fill="none">
      <defs>
        <linearGradient id="cfill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F2F1EC" stopOpacity="0.16" />
          <stop offset="100%" stopColor="#F2F1EC" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d="M8,96 C32,98 48,104 64,101 C86,97 96,68 116,62 C136,56 149,84 166,76 C182,68 189,41 198,26 L198,118 L8,118 Z"
        fill="url(#cfill)"
      />
      <path
        d="M8,96 C32,98 48,104 64,101 C86,97 96,68 116,62 C136,56 149,84 166,76 C182,68 189,41 198,26"
        stroke="#F2F1EC"
        strokeWidth="1.6"
        fill="none"
      />
      <circle cx="116" cy="62" r="3.5" fill="#F2F1EC" />
      <circle cx="116" cy="62" r="7" fill="none" stroke="#F2F1EC" strokeOpacity="0.35" />
      <g transform="translate(88,30)">
        <rect
          width="56"
          height="18"
          rx="9"
          fill="rgba(242,241,236,0.12)"
          stroke="rgba(242,241,236,0.3)"
          strokeWidth="1"
        />
        <circle cx="12" cy="9" r="2.5" fill="#7FE0A8" />
        <text
          x="22"
          y="12.5"
          fontFamily="var(--font-sans), Inter, sans-serif"
          fontSize="8.5"
          fontWeight="700"
          fill="#F2F1EC"
          letterSpacing="0.5"
        >
          {syncedLabel}
        </text>
      </g>
      <line x1="8" y1="118" x2="198" y2="118" stroke="rgba(242,241,236,0.2)" strokeWidth="1" />
      <g fill="rgba(242,241,236,0.28)">
        <rect x="8" y="112" width="3" height="6" />
        <rect x="24" y="109" width="3" height="9" />
        <rect x="40" y="113" width="3" height="5" />
        <rect x="56" y="107" width="3" height="11" />
        <rect x="72" y="104" width="3" height="14" />
        <rect x="88" y="110" width="3" height="8" />
        <rect x="104" y="100" width="3" height="18" />
        <rect x="120" y="105" width="3" height="13" />
        <rect x="136" y="97" width="3" height="21" />
        <rect x="152" y="102" width="3" height="16" />
        <rect x="168" y="94" width="3" height="24" />
        <rect x="184" y="90" width="3" height="28" />
      </g>
    </svg>
  );
}
