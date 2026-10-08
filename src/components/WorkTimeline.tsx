"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { phases } from "@/lib/howWeWork";
import { useReducedMotion } from "@/lib/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

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
 *
 * Smoothness: the circle and the travelled line move with transforms only
 * (never `top` or `height`, which re-lay the page out on every scroll event),
 * the phase positions are measured once (and again on a resize), nothing
 * re-renders while scrolling, and a phase lighting up is a short 300ms
 * transition, so it lands with the circle instead of trailing behind it.
 */
export default function WorkTimeline() {
  const reduced = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLSpanElement>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const markerRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useLayoutEffect(() => {
    if (reduced) return;
    const track = trackRef.current;
    const line = lineRef.current;
    const dot = dotRef.current;
    if (!track || !line || !dot) return;

    const items = itemRefs.current;
    let height = 0;
    let marks: number[] = [];
    let lit = -1;

    const measure = () => {
      height = track.offsetHeight;
      marks = markerRefs.current.map((m) => (m ? offsetWithin(m, track) : 0));
    };

    const apply = (progress: number) => {
      const y = progress * height;
      dot.style.transform = `translate3d(0, ${y.toFixed(1)}px, 0)`;
      line.style.transform = `scaleY(${progress.toFixed(4)})`;
      let count = 0;
      for (const m of marks) if (y >= m) count += 1;
      if (count === lit) return;
      lit = count;
      items.forEach((li, i) => {
        if (li) li.dataset.lit = i < count ? "true" : "false";
      });
    };

    measure();
    apply(0);
    const trigger = ScrollTrigger.create({
      trigger: track,
      start: "top 70%",
      end: "bottom 70%",
      onUpdate: (self) => apply(self.progress),
      onRefresh: (self) => {
        measure();
        lit = -1;
        apply(self.progress);
      },
    });

    return () => {
      trigger.kill();
      for (const li of items) if (li) delete li.dataset.lit;
    };
  }, [reduced]);

  // Reduced motion: no travelling circle, every phase simply lit.
  const initial = reduced ? "true" : "false";

  return (
    <div ref={trackRef} className="relative">
      {/* The line, and the part of it already travelled. */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-[1.25rem] top-0 w-px -translate-x-1/2 bg-white/20"
      />
      {!reduced && (
        <div
          ref={lineRef}
          aria-hidden="true"
          className="absolute bottom-0 left-[1.25rem] top-0 w-[3px] origin-top -translate-x-1/2 scale-y-0 bg-white will-change-transform"
        />
      )}
      {!reduced && (
        <span
          ref={dotRef}
          aria-hidden="true"
          className="absolute left-[1.25rem] top-0 z-10 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-royal-600 bg-white shadow-[0_0_0_6px_rgba(255,255,255,0.25),0_0_32px_8px_rgba(255,255,255,0.45)] will-change-transform"
        />
      )}

      <ol className="flex flex-col gap-[clamp(3.5rem,11vh,7rem)]">
        {phases.map((phase, i) => (
          <li
            key={phase.numeral}
            ref={(el) => {
              itemRefs.current[i] = el;
            }}
            data-lit={initial}
            className="group relative pl-[3.75rem] sm:pl-[5.5rem]"
          >
            <span
              ref={(el) => {
                markerRefs.current[i] = el;
              }}
              aria-hidden="true"
              className="absolute left-[1.25rem] top-[0.55rem] h-4 w-4 -translate-x-1/2 rounded-full border-2 border-white/40 bg-royal-700 transition-[transform,background-color,border-color,box-shadow] duration-300 group-data-[lit=true]:scale-125 group-data-[lit=true]:border-white group-data-[lit=true]:bg-white group-data-[lit=true]:shadow-[0_0_20px_4px_rgba(255,255,255,0.55)]"
            />

            <div className="opacity-40 transition-opacity duration-300 group-data-[lit=true]:opacity-100">
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
        ))}
      </ol>
    </div>
  );
}
