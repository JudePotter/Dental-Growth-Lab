type MarkProps = {
  className?: string;
};

/**
 * Ascent: refined ascending bars with a trend line and dot, the growth
 * chart idea sharpened and given a clear focal point instead of reading as
 * a generic bar chart.
 */
export function MarkAscent({ className }: MarkProps) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className} aria-hidden="true">
      <rect x="5.5" y="22" width="5.4" height="10.5" rx="1.8" fill="currentColor" />
      <rect x="17.3" y="15" width="5.4" height="17.5" rx="1.8" fill="currentColor" />
      <rect x="29.1" y="8" width="5.4" height="24.5" rx="1.8" fill="currentColor" />
      <path
        d="M8 20 L20 13 L31.8 6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.55"
      />
      <circle cx="31.8" cy="6" r="2.4" fill="currentColor" />
    </svg>
  );
}

/**
 * Momentum: a single swept stroke, a small loop at the tail (where a
 * practice starts) resolving into a confident upward arrow (where it
 * ends). No tooth, no bar chart, just direction and speed.
 */
export function MarkMomentum({ className }: MarkProps) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className} aria-hidden="true">
      <path
        d="M6 27a4 4 0 1 1 6.6 3c4.1 1.4 8.2 0.6 12.4-3.4 3.1-3 5.3-6.7 7-11"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M25.5 9.4 L32.4 8 L31 14.9"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

/**
 * Monogram: a rounded, shield-like lockup with an abstract G-spiral inside.
 * The steady, consultancy-credible option, quiet enough to work as a small
 * favicon or app icon on its own.
 */
export function MarkMonogram({ className }: MarkProps) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className} aria-hidden="true">
      <rect
        x="3.5"
        y="3.5"
        width="33"
        height="33"
        rx="11"
        stroke="currentColor"
        strokeWidth="2.2"
      />
      <path
        d="M24.5 15.2A8 8 0 1 0 26 24.5"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="26" cy="24.5" r="2.2" fill="currentColor" />
    </svg>
  );
}

/**
 * Compass: an orbit ring with a single node marking true north, standing
 * in for direction and control rather than growth alone, since the brief
 * is as much about the owner regaining control as it is about scale.
 */
export function MarkCompass({ className }: MarkProps) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className} aria-hidden="true">
      <circle cx="19" cy="21" r="13.5" stroke="currentColor" strokeWidth="2.2" />
      <path
        d="M19 21 L27 8.5"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <circle cx="27" cy="8.5" r="3" fill="currentColor" />
      <circle cx="19" cy="21" r="2" fill="currentColor" />
    </svg>
  );
}

export const MARK_OPTIONS = [
  {
    id: "ascent",
    name: "Ascent",
    blurb: "The growth chart idea, sharpened with a single trend line and dot.",
    Mark: MarkAscent,
  },
  {
    id: "momentum",
    name: "Momentum",
    blurb: "One swept stroke, from a slow start to a confident upward arrow.",
    Mark: MarkMomentum,
  },
  {
    id: "monogram",
    name: "Monogram",
    blurb: "A quiet, consultancy-credible mark that also works as a small app icon.",
    Mark: MarkMonogram,
  },
  {
    id: "compass",
    name: "Compass",
    blurb: "Direction and control, standing in for the freedom the brand promises.",
    Mark: MarkCompass,
  },
] as const;

export function WordmarkStandard({ className }: MarkProps) {
  return (
    <span
      className={`font-display tracking-tight ${className ?? ""}`}
      style={{ fontWeight: "var(--w-heading)" }}
    >
      Dental Growth Lab
    </span>
  );
}

export function WordmarkCompact({ className }: MarkProps) {
  return (
    <span
      className={`font-body uppercase tracking-[0.16em] ${className ?? ""}`}
      style={{ fontWeight: "var(--w-heading)" }}
    >
      Dental Growth Lab
    </span>
  );
}

export const WORDMARK_OPTIONS = [
  {
    id: "standard",
    name: "Standard",
    blurb: "The display wordmark already in the header, kept as the default.",
    Wordmark: WordmarkStandard,
  },
  {
    id: "compact",
    name: "Compact caps",
    blurb: "A tracked-out uppercase treatment for tighter or more formal spaces.",
    Wordmark: WordmarkCompact,
  },
] as const;
