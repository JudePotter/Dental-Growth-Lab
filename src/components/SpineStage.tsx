"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SCRUB } from "@/lib/scrollFeel";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { useFitZoom } from "@/lib/useFitZoom";

gsap.registerPlugin(ScrollTrigger);

export type SpineCell = { label?: string; text: string };
export type SpineRow = { left?: SpineCell; right?: SpineCell };
type Mark = "none" | "check" | "cross";

type Head = { title: string; meta?: string };

/*
 * One shared column template for the head row and every data row, so the
 * spine (centre column) can never be nudged by content elsewhere. The two
 * text columns use minmax(0, 1fr) so long copy wraps instead of stretching
 * its track.
 */
const ROW =
  "grid grid-cols-[minmax(0,1fr)_2.25rem_minmax(0,1fr)] sm:grid-cols-[minmax(0,1fr)_3.25rem_minmax(0,1fr)]";
const CELL_PAD = "py-[clamp(0.3rem,1.15vh,0.8rem)]";

/**
 * The two-sided "spine" used for Purchased / Sold and for "Is Dental
 * Coaching For Me?". Each row is matched across a centre spine. There is no
 * box around it: just the two columns, light rules between rows and the
 * spine down the middle.
 *
 * Desktop: a sticky, viewport-height stage. As the visitor scrolls, the
 * left column fills in line by line, then the right column fills in line by
 * line, each row landing opposite its partner and lighting the spine.
 * Under 1024px, or with reduced motion, the whole thing is simply shown.
 */
export default function SpineStage({
  leftHead,
  rightHead,
  rows,
  leftMark = "none",
  rightMark = "none",
  title,
  ariaLabel,
}: {
  leftHead: Head;
  rightHead: Head;
  rows: SpineRow[];
  leftMark?: Mark;
  rightMark?: Mark;
  /** Optional heading shown above the columns, inside the stage. */
  title?: string;
  ariaLabel: string;
}) {
  const reduced = useReducedMotion();
  const scrub = !reduced;

  const outerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const headRefs = useRef<(HTMLDivElement | null)[]>([]);
  const leftRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rightRefs = useRef<(HTMLDivElement | null)[]>([]);
  const fillLeftRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const fillRightRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const nodeLeftRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const nodeRightRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useFitZoom(stageRef, contentRef, scrub);

  // Timeline length in "steps", used to size the scroll distance.
  const STEP = 0.3;
  const outerVh = Math.round(100 + (rows.length * 2 * STEP + 2.6) * 48);

  useLayoutEffect(() => {
    if (reduced) return;
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const heads = headRefs.current.filter(Boolean) as HTMLElement[];
      const pick = (arr: (HTMLElement | null)[]) =>
        arr.slice(0, rows.length).filter(Boolean) as HTMLElement[];

      gsap.set(heads, { autoAlpha: 0, y: 18 });
      if (titleRef.current) gsap.set(titleRef.current, { autoAlpha: 0, y: 18 });
      gsap.set(pick(leftRefs.current), { autoAlpha: 0, x: -30 });
      gsap.set(pick(rightRefs.current), { autoAlpha: 0, x: 30 });
      gsap.set(pick(fillLeftRefs.current), { scaleY: 0 });
      gsap.set(pick(fillRightRefs.current), { scaleY: 0 });
      gsap.set(pick(nodeLeftRefs.current), { autoAlpha: 0 });
      gsap.set(pick(nodeRightRefs.current), { autoAlpha: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: outerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: SCRUB,
        },
        defaults: { ease: "power2.out" },
      });

      if (titleRef.current) tl.to(titleRef.current, { autoAlpha: 1, y: 0, duration: 0.6 }, 0);
      tl.to(heads, { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.08 }, 0.15);

      const start = 0.9;

      // Left column fills top to bottom, each row lighting the spine softly.
      rows.forEach((_row, i) => {
        const at = start + i * STEP;
        const cell = leftRefs.current[i];
        if (cell) tl.to(cell, { autoAlpha: 1, x: 0, duration: 0.5 }, at);
        const fill = fillLeftRefs.current[i];
        if (fill) tl.to(fill, { scaleY: 1, duration: 0.4, ease: "none" }, at);
        const node = nodeLeftRefs.current[i];
        if (node) tl.to(node, { autoAlpha: 1, duration: 0.25 }, at + 0.1);
      });

      // Then the right column fills top to bottom, row for row, lighting the
      // spine in full colour as each partner lands.
      const rightStart = start + rows.length * STEP + 0.5;
      rows.forEach((_row, i) => {
        const at = rightStart + i * STEP;
        const cell = rightRefs.current[i];
        if (cell) tl.to(cell, { autoAlpha: 1, x: 0, duration: 0.5 }, at);
        const fill = fillRightRefs.current[i];
        if (fill) tl.to(fill, { scaleY: 1, duration: 0.4, ease: "none" }, at);
        const node = nodeRightRefs.current[i];
        if (node) tl.to(node, { autoAlpha: 1, duration: 0.25 }, at + 0.1);
      });

      // Hold the finished spine for a beat before the stage releases.
      tl.to({}, { duration: 1.1 }, rightStart + rows.length * STEP + 0.4);
    });

    return () => mm.revert();
  }, [reduced, rows]);

  const hideUntilRevealed = scrub ? "lg:opacity-0" : "";

  return (
    <div
      ref={outerRef}
      className={scrub ? "lg:h-[var(--outer-h)]" : ""}
      style={{ "--outer-h": `${outerVh}vh` } as React.CSSProperties}
    >
      <div
        ref={stageRef}
        className={`py-16 ${
          scrub
            ? "lg:stage lg:sticky lg:top-0 lg:flex lg:flex-col lg:justify-center lg:overflow-hidden lg:py-0"
            : ""
        }`}
      >
        <div
          ref={contentRef}
          className="mx-auto w-full max-w-[1240px] px-6 sm:px-10"
        >
          {title && (
            <h2
              ref={titleRef}
              className={`t-big mb-[clamp(0.75rem,2.6vh,1.75rem)] text-center text-ink ${hideUntilRevealed}`}
            >
              {title}
            </h2>
          )}

          <div role="table" aria-label={ariaLabel}>
            <div role="row" className={ROW}>
              <div
                ref={(el) => {
                  headRefs.current[0] = el;
                }}
                role="columnheader"
                className={`flex flex-wrap items-center gap-x-3 gap-y-1 pb-[clamp(0.5rem,1.6vh,1rem)] ${hideUntilRevealed}`}
              >
                <span className="t-text-strong text-ink-soft">{leftHead.title}</span>
                {leftHead.meta && (
                  <span className="t-fit rounded-full border border-sheet-line bg-white px-3 py-0.5 text-ink-soft">
                    {leftHead.meta}
                  </span>
                )}
              </div>
              <div aria-hidden="true" />
              <div
                ref={(el) => {
                  headRefs.current[1] = el;
                }}
                role="columnheader"
                className={`flex flex-wrap items-center gap-x-3 gap-y-1 pb-[clamp(0.5rem,1.6vh,1rem)] ${hideUntilRevealed}`}
              >
                <span className="t-text-strong text-royal-700">{rightHead.title}</span>
                {rightHead.meta && (
                  <span className="t-fit rounded-full bg-royal-600 px-3 py-0.5 text-white">
                    {rightHead.meta}
                  </span>
                )}
              </div>
            </div>

            {rows.map((row, i) => {
              const last = i === rows.length - 1;
              const rule = last ? "" : "border-b border-sheet-line";
              return (
                <div key={i} role="row" className={ROW}>
                  <div role="cell" className={`${CELL_PAD} pr-3 sm:pr-5 ${rule}`}>
                    <div
                      ref={(el) => {
                        leftRefs.current[i] = el;
                      }}
                      className={`t-fit flex items-start gap-2.5 text-ink-soft ${hideUntilRevealed}`}
                    >
                      {row.left && (
                        <>
                          <MarkIcon kind={leftMark} />
                          <span>
                            {row.left.label && <span className="text-ink-soft/75">{row.left.label} </span>}
                            {row.left.text}
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  <div aria-hidden="true" className="relative">
                    <span className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-sheet-line" />
                    <span
                      ref={(el) => {
                        fillLeftRefs.current[i] = el;
                      }}
                      className="absolute inset-y-0 left-1/2 w-[3px] origin-top -translate-x-1/2 bg-sky-300"
                    />
                    <span
                      ref={(el) => {
                        fillRightRefs.current[i] = el;
                      }}
                      className="absolute inset-y-0 left-1/2 w-[3px] origin-top -translate-x-1/2 bg-royal-500"
                    />
                    <span className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-sheet-line bg-sheet" />
                    <span
                      ref={(el) => {
                        nodeLeftRefs.current[i] = el;
                      }}
                      className={`absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-sky-300 bg-sky-300 ${hideUntilRevealed}`}
                    />
                    <span
                      ref={(el) => {
                        nodeRightRefs.current[i] = el;
                      }}
                      className={`absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-royal-600 bg-royal-600 ${hideUntilRevealed}`}
                    />
                  </div>

                  <div role="cell" className={`${CELL_PAD} pl-3 sm:pl-5 ${rule}`}>
                    <div
                      ref={(el) => {
                        rightRefs.current[i] = el;
                      }}
                      className={`t-fit flex items-start gap-2.5 text-ink ${hideUntilRevealed}`}
                    >
                      {row.right && (
                        <>
                          <MarkIcon kind={rightMark} />
                          <span>
                            {row.right.label && <span className="text-ink-soft">{row.right.label} </span>}
                            <span className={rightMark === "none" ? "text-royal-700" : ""}>
                              {row.right.text}
                            </span>
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function MarkIcon({ kind }: { kind: Mark }) {
  if (kind === "none") return null;
  const tone = kind === "check" ? "text-royal-600" : "text-ink-soft/70";
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      className={`mt-[0.18em] h-[1.2em] w-[1.2em] shrink-0 ${tone}`}
    >
      <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.5" />
      {kind === "check" ? (
        <path
          d="M6.3 10.3 8.8 12.8 13.7 7.4"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ) : (
        <path
          d="M7 7l6 6M13 7l-6 6"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
      )}
    </svg>
  );
}
