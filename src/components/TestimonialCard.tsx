"use client";

import { useId, useState } from "react";
import { motion } from "framer-motion";
import type { Testimonial } from "@/lib/testimonials";
import { useReducedMotion } from "@/lib/useReducedMotion";
import PhotoSlot from "./PhotoSlot";
import { ease } from "./Reveal";

/**
 * One testimonial. Closed, a card shows the photo, the name and titles, and
 * the first four lines of the review with a Read more button. Opening swaps
 * the four lines for the full review (and any further titles) in place, and
 * the button, which stays at the bottom, becomes Show less.
 */
export default function TestimonialCard({
  testimonial: t,
  src,
}: {
  testimonial: Testimonial;
  /** Resolved on the server from public/images, or null for the placeholder. */
  src: string | null;
}) {
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion();
  const bodyId = useId();
  const lastParagraph = t.quote.length - 1;

  return (
    <figure className="on-sheet flex w-full flex-col overflow-hidden rounded-[1.75rem] bg-white text-ink shadow-[0_30px_70px_-40px_var(--shadow)]">
      <PhotoSlot
        src={src}
        alt={`${t.name}${t.practice ? `, ${t.practice}` : ""}`}
        kind="person"
        hint={`${t.imageName}.jpg`}
        sizes="(min-width: 1024px) 30vw, 90vw"
        objectPosition={t.imagePosition}
        early
        className="aspect-[3/2] w-full shrink-0 md:aspect-[16/10] lg:aspect-auto lg:h-[clamp(9rem,26vh,20rem)]"
      />

      <figcaption className="px-6 pt-5 lg:flex-1">
        <p className="t-text-strong text-ink">{t.name}</p>
        <p className="t-text mt-0.5 text-royal-700">{t.role}</p>
        {t.practice && <p className="t-text mt-0.5 text-ink-soft">{t.practice}</p>}
        {t.credentials && <p className="t-fit mt-1 text-ink-soft/80">{t.credentials}</p>}
      </figcaption>

      <blockquote id={bodyId} className="px-6 pt-5">
        {open ? (
          <motion.div
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: reduced ? 0 : 0.4, ease }}
          >
            <div className="t-text flex flex-col gap-3 text-ink-soft">
              {t.quote.map((paragraph, i) => (
                <p key={i}>
                  {i === 0 && <>&ldquo;</>}
                  {paragraph}
                  {i === lastParagraph && <>&rdquo;</>}
                </p>
              ))}
            </div>

            {t.more && (
              <ul className="t-fit mt-5 flex flex-col gap-1.5 border-t border-sheet-line pt-4 text-ink-soft/80">
                {t.more.map((line, i) => (
                  <li key={i}>{line}</li>
                ))}
              </ul>
            )}
          </motion.div>
        ) : (
          <p className="t-text line-clamp-4 text-ink-soft">
            &ldquo;{t.quote.join(" ")}&rdquo;
          </p>
        )}
      </blockquote>

      <div className="px-6 pb-6 pt-4">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls={bodyId}
          className="t-ui inline-flex min-h-11 items-center gap-2 rounded-full border border-royal-600/30 px-5 py-2.5 text-royal-700 transition-colors duration-200 hover:border-royal-600 hover:bg-royal-600 hover:text-white"
        >
          {open ? "Show less" : "Read more"}
          <svg
            viewBox="0 0 12 12"
            fill="none"
            aria-hidden="true"
            className={`h-3 w-3 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          >
            <path
              d="M2.5 4.5 6 8l3.5-3.5"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </figure>
  );
}
