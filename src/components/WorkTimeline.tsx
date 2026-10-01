"use client";

import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { phases } from "@/lib/howWeWork";
import { useReducedMotion } from "@/lib/useReducedMotion";

/** Distance from `el`'s top to `ancestor`'s top, ignoring transforms. */
function offsetWithin(el: HTMLElement, ancestor: HTMLElement) {
  let top = 0;
  let node: HTMLElement | null = el;
  while (node && node !== ancestor) {
    top += node.offsetTop;
    node = node.offsetParent as HTMLElement | null;
  }
  return top;
}

/**
 * The phase timeline. A line runs down the left with a circle that follows
 * the scroll; each phase lights up as the circle reaches it, with the text
 * on the right.
 */
export default function WorkTimeline() {
  const reduced = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const markerRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [reached, setReached] = useState(0);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 62%", "end 62%"],
  });
  const dotTop = useTransform(scrollYProgress, (v) => `${v * 100}%`);

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    const track = trackRef.current;
    if (!track) return;
    const y = progress * track.offsetHeight;
    let count = 0;
    markerRefs.current.forEach((marker) => {
      if (marker && y >= offsetWithin(marker, track)) count += 1;
    });
    setReached((prev) => (prev === count ? prev : count));
  });

  // Reduced motion: no travelling circle, every phase simply lit.
  const litCount = reduced ? phases.length : reached;

  return (
    <div ref={trackRef} className="relative">
      {/* The line, and the part of it already travelled. */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-[1.25rem] top-0 w-px -translate-x-1/2 bg-white/20"
      />
      {!reduced && (
        <motion.div
          aria-hidden="true"
          style={{ scaleY: scrollYProgress }}
          className="absolute bottom-0 left-[1.25rem] top-0 w-[3px] origin-top -translate-x-1/2 bg-white"
        />
      )}
      {!reduced && (
        <motion.span
          aria-hidden="true"
          style={{ top: dotTop }}
          className="absolute left-[1.25rem] z-10 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-royal-600 bg-white shadow-[0_0_0_6px_rgba(255,255,255,0.25),0_0_32px_8px_rgba(255,255,255,0.45)]"
        />
      )}

      <ol className="flex flex-col gap-[clamp(3.5rem,11vh,7rem)]">
        {phases.map((phase, i) => {
          const lit = i < litCount;
          return (
            <li key={phase.numeral} className="relative pl-[3.75rem] sm:pl-[5.5rem]">
              <span
                ref={(el) => {
                  markerRefs.current[i] = el;
                }}
                aria-hidden="true"
                className={`absolute left-[1.25rem] top-[0.55rem] h-4 w-4 -translate-x-1/2 rounded-full border-2 transition-all duration-500 ${
                  lit
                    ? "scale-125 border-white bg-white shadow-[0_0_20px_4px_rgba(255,255,255,0.55)]"
                    : "border-white/40 bg-royal-700"
                }`}
              />

              <div
                className={`transition-opacity duration-700 ${lit ? "opacity-100" : "opacity-40"}`}
              >
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                  <p className="t-text-strong text-white/85">{phase.numeral}</p>
                  {phase.duration && (
                    <p className="t-text rounded-full border border-white/25 bg-white/10 px-3 py-0.5 text-white/90">
                      {phase.duration}
                    </p>
                  )}
                </div>
                <h3 className="t-big mt-2 text-white">{phase.title}</h3>

                {phase.lead && (
                  <p className="t-text mt-5 max-w-[62ch] text-white/85">{phase.lead}</p>
                )}

                <ul className="t-text mt-6 grid max-w-[62rem] gap-x-10 gap-y-2.5 text-white/90 md:grid-cols-2">
                  {phase.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-3">
                      <span
                        aria-hidden="true"
                        className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-sky-300"
                      />
                      {bullet}
                    </li>
                  ))}
                </ul>

                {phase.outro && (
                  <p className="t-text-strong mt-6 text-white">{phase.outro}</p>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
