// The mark. A drawn seal rather than a logo file, so it stays crisp at any
// size and inherits the page's colour.
//
// The Obama Library footer closes on an institutional emblem beside its
// statement of record; this is the same move for a personal site — circular
// legend, double rule, initials at the centre.

export default function Monogram({ className = "", title = "Opeyemi T. Ojurongbe" }) {
  return (
    <svg
      viewBox="0 0 120 120"
      role="img"
      aria-label={title}
      className={className}
      fill="none"
    >
      <defs>
        <path id="monogram-arc-top" d="M 16,60 A 44,44 0 0 1 104,60" />
        <path id="monogram-arc-bottom" d="M 20,60 A 40,40 0 0 0 100,60" />
      </defs>

      <circle cx="60" cy="60" r="58" stroke="currentColor" strokeWidth="1" opacity="0.28" />
      <circle cx="60" cy="60" r="52" stroke="currentColor" strokeWidth="0.75" opacity="0.18" />

      {/* Circular legend */}
      <text
        fill="currentColor"
        fontSize="8"
        letterSpacing="1.6"
        fontWeight="600"
        opacity="0.6"
        fontFamily="var(--font-inter), sans-serif"
      >
        <textPath href="#monogram-arc-top" startOffset="50%" textAnchor="middle">
          OPEYEMI T. OJURONGBE
        </textPath>
      </text>
      <text
        fill="currentColor"
        fontSize="7"
        letterSpacing="2"
        fontWeight="600"
        opacity="0.45"
        fontFamily="var(--font-inter), sans-serif"
      >
        <textPath href="#monogram-arc-bottom" startOffset="50%" textAnchor="middle">
          DESIGN ENGINEER
        </textPath>
      </text>

      {/* Initials */}
      <text
        x="60"
        y="60"
        textAnchor="middle"
        dominantBaseline="central"
        fill="currentColor"
        fontSize="30"
        fontWeight="600"
        letterSpacing="1"
        fontFamily="var(--font-archivo), sans-serif"
      >
        OTO
      </text>

      {/* Rules flanking the initials */}
      <line x1="30" y1="60" x2="40" y2="60" stroke="currentColor" strokeWidth="1" opacity="0.35" />
      <line x1="80" y1="60" x2="90" y2="60" stroke="currentColor" strokeWidth="1" opacity="0.35" />
    </svg>
  );
}
