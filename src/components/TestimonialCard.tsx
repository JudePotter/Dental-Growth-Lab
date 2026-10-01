"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Testimonial } from "@/lib/testimonials";
import { useReducedMotion } from "@/lib/useReducedMotion";
import PhotoSlot from "./PhotoSlot";
import { ease } from "./Reveal";

/**
 * One testimonial. Closed, a card is only the photo, the name and the titles
 * with a Read more button, so a whole row (and its button) fits on screen.
 * Opening reveals the full testimonial and any further titles in place,
 * under the button, which stays where it is so it is easy to close again.
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
        className="h-[clamp(9rem,27vh,22rem)] w-full shrink-0"
      />

      <figcaption className="flex-1 px-6 pt-5">
        <p className="t-text-strong text-ink">{t.name}</p>
        <p className="t-text mt-0.5 text-royal-700">{t.role}</p>
        {t.practice && <p className="t-text mt-0.5 text-ink-soft">{t.practice}</p>}
        {t.credentials && <p className="t-fit mt-1 text-ink-soft/80">{t.credentials}</p>}
      </figcaption>

      <div className="px-6 pb-5 pt-5">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls={bodyId}
          className="t-ui inline-flex items-center gap-2 rounded-full border border-royal-600/30 px-5 py-2.5 text-royal-700 transition-colors duration-200 hover:border-royal-600 hover:bg-royal-600 hover:text-white"
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

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={bodyId}
            initial={reduced ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduced ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: reduced ? 0 : 0.45, ease }}
            className="overflow-hidden"
          >
            <blockquote className="border-t border-sheet-line px-6 pb-6 pt-5">
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
            </blockquote>
          </motion.div>
        )}
      </AnimatePresence>
    </figure>
  );
}
