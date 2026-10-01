import Image from "next/image";

type Kind = "person" | "practice";

/**
 * A photo frame. Renders the real image when `src` is set, otherwise an
 * on-brand placeholder. `src` comes from `findPublicImage` (lib/images.ts),
 * so dropping a file into `public/images/` is all it takes to swap the
 * placeholder for the real photo.
 */
export default function PhotoSlot({
  src,
  alt,
  kind,
  hint,
  sizes,
  objectPosition,
  className = "",
  priority = false,
  early = false,
}: {
  src: string | null;
  alt: string;
  kind: Kind;
  /** File name shown on the placeholder, e.g. "pujan.jpg". */
  hint: string;
  sizes: string;
  /** CSS object-position, to keep a face in frame when the photo is cropped. */
  objectPosition?: string;
  className?: string;
  priority?: boolean;
  /**
   * For photos below the fold. Starts the download as soon as the page is
   * ready, at low priority so nothing above the fold waits for it, instead of
   * only when the visitor scrolls close. A big jump down the page then lands
   * on a photo that is already there.
   */
  early?: boolean;
}) {
  return (
    <div
      className={`relative overflow-hidden bg-gradient-to-br from-sky-100 via-sky-200 to-sky-300 ${className}`}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          {...(early ? { loading: "eager" as const, fetchPriority: "low" as const } : {})}
          className="object-cover"
          style={objectPosition ? { objectPosition } : undefined}
        />
      ) : (
        <div
          role="img"
          aria-label={`${alt} (placeholder)`}
          className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-royal-700"
        >
          {kind === "person" ? <PersonGlyph /> : <PracticeGlyph />}
          <p className="t-text px-4 text-center text-royal-800/80">
            Add <span className="text-royal-800">public/images/{hint}</span>
          </p>
        </div>
      )}
    </div>
  );
}

function PersonGlyph() {
  return (
    <svg viewBox="0 0 80 80" className="h-16 w-16" fill="none" aria-hidden="true">
      <circle cx="40" cy="30" r="13" fill="currentColor" opacity="0.85" />
      <path
        d="M14 68c2-14 12-22 26-22s24 8 26 22"
        fill="currentColor"
        opacity="0.55"
      />
    </svg>
  );
}

function PracticeGlyph() {
  return (
    <svg viewBox="0 0 80 80" className="h-14 w-14" fill="none" aria-hidden="true">
      <path d="M10 68V34l30-18 30 18v34" fill="currentColor" opacity="0.5" />
      <rect x="18" y="38" width="14" height="14" rx="2" fill="#fff" opacity="0.85" />
      <rect x="48" y="38" width="14" height="14" rx="2" fill="#fff" opacity="0.85" />
      <rect x="33" y="50" width="14" height="18" rx="2" fill="currentColor" opacity="0.9" />
    </svg>
  );
}
