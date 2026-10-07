"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SCRUB } from "@/lib/scrollFeel";
import { useReducedMotion } from "@/lib/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

export type PanelCell = { label?: string; text: string };
export type PanelRow = { left?: PanelCell; right?: PanelCell };
export type PanelMark = "dash" | "x" | "check" | "cross";
type Head = { title: string; meta?: string };
type Side = "left" | "right";
type Tone = "light" | "dark";
type Key = "light-muted" | "light-bright" | "dark-muted" | "dark-bright";

/*
 * Every class is written out whole, since Tailwind only generates classes it
 * can read in full. One side of the pair is the muted panel and the other the
 * bright one; the bright panel is the one that lights up as it fills. On the
 * pastel sheet the bright panel is deep royal blue, on the Style 2 blue it is
 * white. The two comparisons on the site differ only in tone and markers.
 */
const SURFACE: Record<Key, string> = {
  "light-muted": "border border-sheet-line bg-white",
  "light-bright": "border border-royal-500/60 bg-gradient-to-br from-royal-600 to-royal-800",
  "dark-muted": "border border-white/25 bg-white/10",
  "dark-bright": "border border-white bg-white",
};
const TEXT: Record<Key, string> = {
  "light-muted": "text-ink-soft",
  "light-bright": "text-white",
  "dark-muted": "text-white",
  "dark-bright": "text-ink",
};
const LABEL: Record<Key, string> = {
  "light-muted": "text-ink-soft/65",
  "light-bright": "text-white/70",
  "dark-muted": "text-white/65",
  "dark-bright": "text-ink-soft",
};
const PILL: Record<Key, string> = {
  "light-muted": "border border-sheet-line bg-sheet text-ink-soft",
  "light-bright": "bg-white/20 text-white",
  "dark-muted": "bg-white/15 text-white",
  "dark-bright": "bg-royal-600 text-white",
};
const GLOW: Record<Key, string> = {
  "light-muted": "",
  "light-bright": "bg-royal-500/60",
  "dark-muted": "",
  "dark-bright": "bg-sky-300/70",
};
const SWEEP: Record<Key, string> = {
  "light-muted": "",
  "light-bright": "via-white/35",
  "dark-muted": "",
  "dark-bright": "via-sky-300/55",
};
const MARK_CIRCLE: Record<Key, string> = {
  "light-muted": "fill-transparent stroke-ink-soft/45",
  "light-bright": "fill-white stroke-white",
  "dark-muted": "fill-transparent stroke-white/60",
  "dark-bright": "fill-royal-600 stroke-royal-600",
};
const MARK_GLYPH: Record<Key, string> = {
  "light-muted": "stroke-ink-soft",
  "light-bright": "stroke-royal-700",
  "dark-muted": "stroke-white",
  "dark-bright": "stroke-white",
};
const TITLE: Record<Tone, string> = { light: "text-ink", dark: "text-white" };
const SEAM_TRACK: Record<Tone, string> = { light: "bg-sheet-line", dark: "bg-white/25" };
const SEAM_FIRST: Record<Tone, string> = { light: "bg-sky-300", dark: "bg-white/80" };
const SEAM_SECOND: Record<Tone, string> = { light: "bg-royal-600", dark: "bg-sky-300" };

/** The smallest the fitting loop will take the pinned panels' text, as a share of full size. */
const MIN_FIT = 0.78;

const GLYPH: Record<PanelMark, string> = {
  dash: "M7.5 12h9",
  x: "M8.2 8.2l7.6 7.6M15.8 8.2l-7.6 7.6",
  check: "M7.2 12.4l3.1 3.1 6.5-7.2",
  cross: "M8.2 8.2l7.6 7.6M15.8 8.2l-7.6 7.6",
};

/**
 * The two-sided comparison, as twin panels. One panel is muted and the other
 * bright. Every line is a row with a large marker that draws itself on, the
 * two panels' rows sit level so each pair reads straight across, and every
 * line carries the same weight. The muted panel fills line by line, then the
 * bright one lights up, with a sweep of light, as its lines fill beside it,
 * and a seam between them runs down as the rows land.
 *
 * Used for Purchased and Sold (on the pastel sheet) and for "Is Dental
 * Coaching For Me?" (on the Style 2 blue). The same design in both, in the
 * tone of the surface it sits on.
 *
 * It is compact, about 1180px wide and never taller than the screen, so the
 * whole thing can be read at once. From 1024px wide and 760px tall it holds
 * the page for a short stretch (the panels are pinned in the middle of the
 * screen) while the scroll drives it: the muted panel fills line by line, then
 * the bright one beside it, with the seam running down. On a shorter laptop
 * screen it is not pinned and fills as it travels up the screen. Under 1024px
 * the panels stack and each line arrives as it scrolls into view. With reduced
 * motion everything is simply shown. If a screen is too short for the pinned
 * layout the text shrinks, never below MIN_FIT.
 */
export default function TwinPanels({
  leftHead,
  rightHead,
  rows,
  leftMark,
  rightMark,
  bright,
  tone,
  title,
  ariaLabel,
  className = "py-[clamp(4rem,11vh,7.5rem)]",
}: {
  leftHead: Head;
  rightHead: Head;
  rows: PanelRow[];
  leftMark: PanelMark;
  rightMark: PanelMark;
  /** Which panel lights up. */
  bright: Side;
  tone: Tone;
  /** Optional heading above the panels. */
  title?: string;
  ariaLabel: string;
  /** Spacing round the section, which depends on what it sits between. */
  className?: string;
}) {
  const reduced = useReducedMotion();
  const scrub = !reduced;

  const outerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const groupRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const rowRefs = useRef<Record<Side, (HTMLDivElement | null)[]>>({ left: [], right: [] });
  const markRefs = useRef<Record<Side, (SVGPathElement | null)[]>>({ left: [], right: [] });
  const glowRef = useRef<HTMLDivElement>(null);
  const sweepRef = useRef<HTMLDivElement>(null);
  const seamFirstRef = useRef<HTMLSpanElement>(null);
  const seamSecondRef = useRef<HTMLSpanElement>(null);

  // One line takes this much of the timeline, which is stretched over the
  // scroll while the panels pass through the screen.
  const STEP = 0.34;
  const lineCount = rows.reduce((n, r) => n + (r.left ? 1 : 0) + (r.right ? 1 : 0), 0);
  // How long the page is held on the pinned panels: about a screen and a half
  // of scrolling for a table this size.
  const holdVh = Math.round((lineCount * STEP + 1.5) * 24);

  // In the pinned layout the panels sit in the middle of the screen under the
  // header. If a screen is too short to hold them at full size, the text
  // shrinks until they fit.
  useLayoutEffect(() => {
    const stage = stageRef.current;
    const content = contentRef.current;
    if (!stage || !content) return;
    const query = window.matchMedia("(min-width: 1024px) and (min-height: 760px)");
    const apply = () => {
      if (!scrub || !query.matches) {
        content.style.removeProperty("--fit-scale");
        return;
      }
      const style = getComputedStyle(stage);
      const available =
        stage.clientHeight - parseFloat(style.paddingTop) - parseFloat(style.paddingBottom) - 16;
      let scale = 1;
      content.style.setProperty("--fit-scale", "1");
      while (content.offsetHeight > available && scale > MIN_FIT) {
        scale = Math.max(MIN_FIT, scale - 0.02);
        content.style.setProperty("--fit-scale", scale.toFixed(2));
      }
    };
    apply();
    const observer = new ResizeObserver(apply);
    observer.observe(stage);
    document.fonts?.ready.then(apply).catch(() => {});
    return () => observer.disconnect();
  }, [scrub, rows]);

  useLayoutEffect(() => {
    if (reduced) return;
    const mm = gsap.matchMedia();

    const pick = <T extends Element>(side: Side, list: (T | null)[]) =>
      rows.map((r, i) => (r[side] ? list[i] : null)).filter(Boolean) as T[];

    // The two wide layouts share one timeline. Only what drives it differs:
    // the pinned layout runs it across the held stretch, the other across the
    // time the panels take to travel up the screen.
    const wide = (trigger: () => ScrollTrigger.Vars) => () => {
      const lefts = pick<HTMLDivElement>("left", rowRefs.current.left);
      const rights = pick<HTMLDivElement>("right", rowRefs.current.right);
      const leftMarks = pick<SVGPathElement>("left", markRefs.current.left);
      const rightMarks = pick<SVGPathElement>("right", markRefs.current.right);
      const glow = glowRef.current;
      const sweep = sweepRef.current;

      gsap.set(lefts, { autoAlpha: 0, x: -28 });
      gsap.set(rights, { autoAlpha: 0, x: 28 });
      gsap.set([...leftMarks, ...rightMarks], { strokeDasharray: 1, strokeDashoffset: 1 });
      gsap.set([seamFirstRef.current, seamSecondRef.current], { scaleY: 0 });
      if (titleRef.current) gsap.set(titleRef.current, { autoAlpha: 0, y: 20 });
      if (glow) gsap.set(glow, { autoAlpha: 0 });
      if (sweep) gsap.set(sweep, { xPercent: -170 });

      const tl = gsap.timeline({
        scrollTrigger: { ...trigger(), scrub: SCRUB },
        defaults: { ease: "power2.out" },
      });

      if (titleRef.current) tl.to(titleRef.current, { autoAlpha: 1, y: 0, duration: 0.6 }, 0);

      const fill = (
        els: HTMLElement[],
        marks: SVGPathElement[],
        start: number,
        seam: HTMLElement | null,
        lightUp: boolean
      ) => {
        els.forEach((el, i) => {
          const at = start + i * STEP;
          tl.to(el, { autoAlpha: 1, x: 0, duration: 0.5 }, at);
          tl.to(marks[i], { strokeDashoffset: 0, duration: 0.45, ease: "power1.out" }, at + 0.12);
        });
        if (seam) tl.to(seam, { scaleY: 1, duration: els.length * STEP, ease: "none" }, start);
        if (lightUp) {
          if (glow) tl.to(glow, { autoAlpha: 1, duration: 0.8 }, start);
          if (sweep) tl.to(sweep, { xPercent: 470, duration: 1.2, ease: "power1.inOut" }, start);
        }
      };

      const leftStart = 0.4;
      const rightStart = leftStart + lefts.length * STEP + 0.3;
      fill(lefts, leftMarks, leftStart, seamFirstRef.current, bright === "left");
      fill(rights, rightMarks, rightStart, seamSecondRef.current, bright === "right");

      // A rest at the end, with everything in place, before the page is let go.
      tl.to({}, { duration: 0.9 }, rightStart + rights.length * STEP + 0.4);
    };

    // Wide and tall enough: the page is held on the panels while they play.
    mm.add(
      "(min-width: 1024px) and (min-height: 760px)",
      wide(() => ({
        trigger: outerRef.current,
        start: "top top",
        end: "bottom bottom",
      }))
    );

    // Wide but short (a small laptop): not pinned. The lines fill as the panels
    // travel up the screen to the middle of it.
    mm.add(
      "(min-width: 1024px) and (max-height: 759px)",
      wide(() => ({
        trigger: groupRef.current,
        start: "top 80%",
        end: "bottom 56%",
      }))
    );

    // Phones and iPads in portrait: the panels are stacked and not pinned, so
    // each line (and its marker) simply arrives as it scrolls into view, and
    // the bright panel glows and gets its sweep of light as it comes up.
    mm.add("(max-width: 1023px)", () => {
      const sides: Side[] = ["left", "right"];
      const glow = glowRef.current;
      const sweep = sweepRef.current;

      if (titleRef.current) {
        gsap.set(titleRef.current, { autoAlpha: 0, y: 20 });
        gsap.to(titleRef.current, {
          autoAlpha: 1,
          y: 0,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: { trigger: titleRef.current, start: "top 92%", once: true },
        });
      }

      sides.forEach((side) => {
        const els = pick<HTMLDivElement>(side, rowRefs.current[side]);
        const marks = pick<SVGPathElement>(side, markRefs.current[side]);
        gsap.set(els, { autoAlpha: 0, y: 18 });
        gsap.set(marks, { strokeDasharray: 1, strokeDashoffset: 1 });
        els.forEach((el, k) => {
          gsap
            .timeline({ scrollTrigger: { trigger: el, start: "top 92%", once: true } })
            .to(el, { autoAlpha: 1, y: 0, duration: 0.55, ease: "power2.out" })
            .to(marks[k], { strokeDashoffset: 0, duration: 0.5, ease: "power1.out" }, 0.15);
        });
      });

      if (glow) {
        gsap.set(glow, { autoAlpha: 0 });
        gsap.to(glow, {
          autoAlpha: 1,
          duration: 0.9,
          scrollTrigger: { trigger: glow.parentElement, start: "top 80%", once: true },
        });
      }
      if (sweep) {
        gsap.set(sweep, { xPercent: -170 });
        gsap.to(sweep, {
          xPercent: 470,
          duration: 1.3,
          ease: "power1.inOut",
          scrollTrigger: { trigger: sweep.parentElement, start: "top 80%", once: true },
        });
      }
    });

    return () => mm.revert();
  }, [reduced, rows, bright]);

  const hide = scrub ? "lg:opacity-0" : "";

  return (
    <div
      ref={outerRef}
      className={scrub ? "pin:h-[var(--outer-h)]" : ""}
      style={{ "--outer-h": `calc(100svh + ${holdVh}vh)` } as React.CSSProperties}
    >
      <div
        ref={stageRef}
        className={
          scrub
            ? "pin:sticky pin:top-0 pin:flex pin:h-svh pin:flex-col pin:justify-center pin:overflow-hidden pin:pb-4 pin:pt-[var(--header-h)]"
            : ""
        }
      >
        <div
          ref={contentRef}
          className={`type-panels mx-auto w-full max-w-[1180px] px-6 sm:px-10 ${className} ${scrub ? "pin:py-0" : ""}`}
        >
          {title && (
            <h2
              ref={titleRef}
              className={`t-big mb-[clamp(1rem,3.4vh,2.25rem)] text-center text-balance ${TITLE[tone]} ${scrub ? "opacity-0" : ""}`}
            >
              {title}
            </h2>
          )}

          <div
            ref={groupRef}
            role="group"
            aria-label={ariaLabel}
            style={{ "--span": rows.length + 1, "--n": rows.length } as React.CSSProperties}
            className="grid gap-[clamp(1rem,2.4vh,1.5rem)] lg:grid-cols-[minmax(0,1fr)_clamp(1.5rem,3vw,3rem)_minmax(0,1fr)] lg:grid-rows-[max-content_repeat(var(--n),auto)] lg:gap-y-0"
          >
            <Panel
              side="left"
              head={leftHead}
              rows={rows}
              mark={leftMark}
              tone={tone}
              isBright={bright === "left"}
              hide={hide}
              rowRefs={rowRefs}
              markRefs={markRefs}
              glowRef={bright === "left" ? glowRef : undefined}
              sweepRef={bright === "left" ? sweepRef : undefined}
              scrub={scrub}
            />

            <div
              aria-hidden="true"
              className="relative hidden lg:col-start-2 lg:block lg:[grid-row:1/span_var(--span)]"
            >
              <span className={`absolute inset-y-3 left-1/2 w-[3px] -translate-x-1/2 rounded-full ${SEAM_TRACK[tone]}`} />
              <span
                ref={seamFirstRef}
                className={`absolute inset-y-3 left-1/2 w-[3px] origin-top -translate-x-1/2 rounded-full ${SEAM_FIRST[tone]}`}
              />
              <span
                ref={seamSecondRef}
                className={`absolute inset-y-3 left-1/2 w-[5px] origin-top -translate-x-1/2 rounded-full ${SEAM_SECOND[tone]}`}
              />
            </div>

            <Panel
              side="right"
              head={rightHead}
              rows={rows}
              mark={rightMark}
              tone={tone}
              isBright={bright === "right"}
              hide={hide}
              rowRefs={rowRefs}
              markRefs={markRefs}
              glowRef={bright === "right" ? glowRef : undefined}
              sweepRef={bright === "right" ? sweepRef : undefined}
              scrub={scrub}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function Panel({
  side,
  head,
  rows,
  mark,
  tone,
  isBright,
  hide,
  rowRefs,
  markRefs,
  glowRef,
  sweepRef,
  scrub,
}: {
  side: Side;
  head: Head;
  rows: PanelRow[];
  mark: PanelMark;
  tone: Tone;
  isBright: boolean;
  hide: string;
  rowRefs: React.MutableRefObject<Record<Side, (HTMLDivElement | null)[]>>;
  markRefs: React.MutableRefObject<Record<Side, (SVGPathElement | null)[]>>;
  glowRef?: React.RefObject<HTMLDivElement | null>;
  sweepRef?: React.RefObject<HTMLDivElement | null>;
  scrub: boolean;
}) {
  const key: Key = `${tone}-${isBright ? "bright" : "muted"}`;
  const column = side === "left" ? "lg:col-start-1" : "lg:col-start-3";

  return (
    <div
      className={`relative isolate flex flex-col gap-3 p-[clamp(1.1rem,2.2vw,2.5rem)] lg:[grid-row:1/span_var(--span)] lg:grid lg:grid-rows-subgrid lg:gap-y-[clamp(0.7rem,1.8vh,1.25rem)] ${column}`}
    >
      {isBright && (
        <div
          ref={glowRef}
          aria-hidden="true"
          className={`absolute -inset-3 -z-20 rounded-[2.5rem] blur-2xl ${GLOW[key]} ${scrub ? "lg:opacity-0" : ""}`}
        />
      )}
      <div
        aria-hidden="true"
        className={`absolute inset-0 -z-10 overflow-hidden rounded-[clamp(1.5rem,2.4vw,2.25rem)] ${SURFACE[key]} ${
          isBright ? "shadow-[0_40px_90px_-40px_var(--shadow)]" : ""
        }`}
      >
        {isBright && (
          <div
            ref={sweepRef}
            className={`absolute inset-y-0 left-0 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent ${SWEEP[key]} to-transparent`}
          />
        )}
      </div>

      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 pb-[clamp(0.3rem,1.2vh,0.9rem)]">
        <span className={`t-text-strong ${TEXT[key]}`}>{head.title}</span>
        {head.meta && (
          <span className={`t-text rounded-full px-3 py-0.5 ${PILL[key]}`}>{head.meta}</span>
        )}
      </div>

      {rows.map((row, i) => {
        const cell = row[side];
        if (!cell) return null;
        return (
          <div
            key={i}
            ref={(el) => {
              rowRefs.current[side][i] = el;
            }}
            className={`t-text flex items-start gap-[0.8em] lg:self-center ${TEXT[key]} ${hide}`}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
              className="mt-[0.08em] h-[1.5em] w-[1.5em] shrink-0"
            >
              <circle cx="12" cy="12" r="10.5" strokeWidth="1.6" className={MARK_CIRCLE[key]} />
              <path
                ref={(el) => {
                  markRefs.current[side][i] = el;
                }}
                d={GLYPH[mark]}
                pathLength={1}
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={MARK_GLYPH[key]}
              />
            </svg>
            <p>
              {cell.label && <span className={LABEL[key]}>{cell.label} </span>}
              {cell.text}
            </p>
          </div>
        );
      })}
    </div>
  );
}
