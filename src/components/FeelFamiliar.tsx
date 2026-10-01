"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  familiarAfter,
  familiarHeading,
  familiarResolve,
  painQuotes,
} from "@/lib/familiar";
import { useReducedMotion } from "@/lib/useReducedMotion";
import BookCallButton from "./BookCallButton";
import { Reveal, ScrollLine } from "./Reveal";

gsap.registerPlugin(ScrollTrigger);

/*
 * Grid cell for each quote on the desktop scatter, as [column, row] on a
 * 4 by 4 grid. The two middle rows keep only their outer cells, so the
 * heading can sit in the open centre of the ring (the "From Chaos..."
 * position) and the resolved text lands in the same spot.
 */
const SLOTS: [number, number][] = [
  [1, 1],
  [2, 1],
  [3, 1],
  [4, 1],
  [1, 2],
  [4, 2],
  [1, 3],
  [4, 3],
  [1, 4],
  [2, 4],
  [3, 4],
  [4, 4],
];

/** Small resting offsets (vw / vh) and tilt (deg) so the cards feel scattered. */
const JITTER: { x: number; y: number; r: number }[] = [
  { x: -0.8, y: 1.0, r: -2.4 },
  { x: 0.6, y: -1.4, r: 1.8 },
  { x: -0.4, y: 1.2, r: -1.4 },
  { x: 0.8, y: -0.8, r: 2.4 },
  { x: 0.6, y: 0.6, r: 1.6 },
  { x: -0.6, y: -0.6, r: -2.0 },
  { x: -0.6, y: 0.4, r: 2.0 },
  { x: 0.6, y: -0.4, r: -1.8 },
  { x: -0.5, y: 0.7, r: 1.4 },
  { x: 0.5, y: -0.9, r: -1.6 },
  { x: -0.4, y: 0.8, r: 1.2 },
  { x: 0.7, y: -0.5, r: -2.2 },
];

/** The dense-text size the cards use (see --fs-fit in globals.css). */
const FIT_BASE = "clamp(0.8125rem, min(1.15vw, 2.35vh), 1.3rem)";
const MIN_SCALE = 0.8;

type SlotStyle = React.CSSProperties & { "--c"?: number; "--r"?: number };

/**
 * "Do any of these sound familiar?..." into "Dental Growth Lab can fix this."
 *
 * Desktop: a sticky, full-viewport stage. Twelve pain-point cards sit at
 * full size, scattered around the heading so they can all be read. Scrolling
 * pulls every card in to the centre, where they resolve into the line
 * "Dental Growth Lab can fix this." (text only, no box). The reframe copy
 * then rolls up line by line.
 *
 * The card text scales itself down until every card sits inside its own
 * cell (allowing for its tilt), so at no window size can two cards overlap
 * each other, the heading, or the header.
 *
 * Under 1024px, or with reduced motion, the same content lays out as a
 * plain flow with no pinning.
 */
export default function FeelFamiliar() {
  const reduced = useReducedMotion();
  const scrub = !reduced;

  const outerRef = useRef<HTMLDivElement>(null);
  const regionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const resolveRef = useRef<HTMLDivElement>(null);
  const resolveContentRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    if (reduced) return;
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1200px) and (min-height: 700px)", () => {
      const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
      const region = regionRef.current;
      const grid = gridRef.current;
      const heading = headingRef.current;
      const resolve = resolveRef.current;
      if (!region || !grid || !heading || !resolve || cards.length === 0) return;

      // On tight screens the scatter and tilt ease off so cards keep their
      // cells; on roomy ones they are at full strength.
      let jitterScale = 1;

      const tracks = (value: string) =>
        value.split(" ").map((v) => parseFloat(v)).filter((v) => !Number.isNaN(v));

      // Do all twelve cards sit inside their own grid cell, tilt and scatter
      // included? Measured from layout (untransformed) boxes.
      const fits = () => {
        const style = getComputedStyle(grid);
        const cols = tracks(style.gridTemplateColumns);
        const rows = tracks(style.gridTemplateRows);
        const gapX = parseFloat(style.columnGap) || 0;
        const gapY = parseFloat(style.rowGap) || 0;
        if (cols.length < 4 || rows.length < 4) return true;

        const cardsFit = cards.every((card, i) => {
          const [c, r] = SLOTS[i];
          const rad = (Math.abs(JITTER[i].r * jitterScale) * Math.PI) / 180;
          const w = card.offsetWidth;
          const h = card.offsetHeight;
          const boxW = w * Math.cos(rad) + h * Math.sin(rad) + 2 * Math.abs((JITTER[i].x * jitterScale * window.innerWidth) / 100);
          const boxH = h * Math.cos(rad) + w * Math.sin(rad) + 2 * Math.abs((JITTER[i].y * jitterScale * window.innerHeight) / 100);
          return boxW <= cols[c - 1] + gapX && boxH <= rows[r - 1] + gapY;
        });

        // The heading fills the open centre: two columns wide, two rows tall.
        const headingFits = heading.offsetHeight <= rows[1] + gapY + rows[2];
        return cardsFit && headingFits;
      };

      const fit = () => {
        const apply = (s: number) =>
          region.style.setProperty("--fs-fit", `calc(${FIT_BASE} * ${s})`);
        const rowH = tracks(getComputedStyle(grid).gridTemplateRows)[0] ?? 200;
        jitterScale = Math.min(1, Math.max(0.35, (rowH - 120) / 110));
        let scale = 1;
        apply(scale);
        while (!fits() && scale > MIN_SCALE) {
          scale = Math.max(MIN_SCALE, scale - 0.03);
          apply(scale);
        }
      };

      fit();
      // Re-fit before every ScrollTrigger measure (resize, fonts loading).
      ScrollTrigger.addEventListener("refreshInit", fit);

      // Resting scatter offsets, in px, from the viewport at build time.
      const restX = (i: number) => (JITTER[i].x * jitterScale * window.innerWidth) / 100;
      const restY = (i: number) => (JITTER[i].y * jitterScale * window.innerHeight) / 100;
      const restR = (i: number) => JITTER[i].r * jitterScale;
      // Where each card has to travel to reach the centre of the stage.
      const toCentreX = (_i: number, el: Element) => {
        const card = el as HTMLElement;
        return region.clientWidth / 2 - (card.offsetLeft + card.offsetWidth / 2);
      };
      const toCentreY = (_i: number, el: Element) => {
        const card = el as HTMLElement;
        return region.clientHeight / 2 - (card.offsetTop + card.offsetHeight / 2);
      };

      const content = Array.from(resolveContentRef.current?.children ?? []);

      gsap.set(resolve, { xPercent: -50, yPercent: -50, autoAlpha: 0, scale: 0.62 });
      gsap.set(content, { autoAlpha: 0, y: 18, filter: "blur(10px)" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: outerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
        defaults: { ease: "none" },
      });

      // 0 to 1.4: the cards just sit, full size, so they can be read.
      tl.fromTo(
        cards,
        { x: restX, y: restY, rotation: restR, scale: 1 },
        { x: restX, y: restY, rotation: restR, scale: 1, duration: 1.4 },
        0
      );

      // The heading steps back as the pull begins.
      tl.to(
        heading,
        { autoAlpha: 0, scale: 0.94, filter: "blur(8px)", duration: 0.8, ease: "power2.in" },
        1.4
      );

      // Every card is drawn in to the centre, shrinking and untilting.
      tl.fromTo(
        cards,
        { x: restX, y: restY, rotation: restR, scale: 1 },
        {
          x: toCentreX,
          y: toCentreY,
          rotation: 0,
          scale: 0.3,
          duration: 1.9,
          ease: "power3.inOut",
          stagger: { each: 0.06, from: "random" },
        },
        1.6
      );

      tl.to(
        cards,
        {
          autoAlpha: 0,
          duration: 0.5,
          ease: "power1.in",
          stagger: { each: 0.06, from: "random" },
        },
        2.9
      );

      // ...and they resolve into the closing line, text only.
      tl.to(resolve, { autoAlpha: 1, scale: 1, duration: 1.3, ease: "power3.out" }, 3.0);
      tl.to(
        content,
        {
          autoAlpha: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.8,
          ease: "power2.out",
          stagger: 0.18,
        },
        3.8
      );

      // Hold the resolved line before the stage releases.
      tl.to({}, { duration: 1.4 }, 4.9);

      return () => {
        ScrollTrigger.removeEventListener("refreshInit", fit);
        region.style.removeProperty("--fs-fit");
      };
    });

    return () => mm.revert();
  }, [reduced]);

  return (
    <section id="feel-familiar" className="relative">
      <div ref={outerRef} className={scrub ? "stagey:h-[470vh]" : ""}>
        <div
          className={
            scrub ? "stagey:stage stagey:sticky stagey:top-0 stagey:overflow-hidden" : ""
          }
        >
          <div
            ref={regionRef}
            className={`relative ${scrub ? "stagey:h-full" : ""}`}
          >
            <div
              ref={gridRef}
              className={`mx-auto grid max-w-[1100px] grid-cols-1 gap-3 px-6 pb-12 pt-28 sm:grid-cols-2 sm:px-10 ${
                scrub
                  ? "stagey:absolute stagey:inset-0 stagey:mx-0 stagey:max-w-none stagey:grid-cols-4 stagey:grid-rows-4 stagey:gap-x-[1.5vw] stagey:gap-y-[1vh] stagey:px-[3vw] stagey:pb-[1.5vh] stagey:pt-[1.5vh]"
                  : "lg:grid-cols-3"
              }`}
            >
              <div
                ref={headingRef}
                className={`col-span-full mb-6 text-center ${
                  scrub
                    ? "stagey:z-10 stagey:col-span-2 stagey:col-start-2 stagey:row-span-2 stagey:row-start-2 stagey:mb-0 stagey:self-center"
                    : ""
                }`}
              >
                <h2 className="t-big text-balance text-white">
                  {familiarHeading}
                </h2>
              </div>

              {painQuotes.map((q, i) => {
                const style: SlotStyle = { "--c": SLOTS[i][0], "--r": SLOTS[i][1] };
                return (
                  <div
                    key={`${q.tag}-${i}`}
                    ref={(el) => {
                      cardRefs.current[i] = el;
                    }}
                    style={style}
                    className={
                      scrub
                        ? "stagey:[grid-column:var(--c)] stagey:[grid-row:var(--r)] stagey:w-[min(calc(100%-1.8vw-0.25rem),clamp(15rem,21.5vw,24rem))] stagey:place-self-center"
                        : ""
                    }
                  >
                    <Reveal delay={0.04 * i}>
                      <figure className="rounded-2xl bg-white p-[clamp(0.75rem,1.7vh,1.15rem)] shadow-[0_24px_50px_-28px_var(--shadow)]">
                        <figcaption className="t-fit-strong inline-block rounded-full bg-royal-600/10 px-3 py-0.5 text-royal-700">
                          {q.tag}
                        </figcaption>
                        <blockquote className="t-fit mt-2 text-ink">
                          &ldquo;{q.quote}&rdquo;
                        </blockquote>
                      </figure>
                    </Reveal>
                  </div>
                );
              })}
            </div>

            <div
              ref={resolveRef}
              className={`mx-auto mb-16 w-[min(88vw,56rem)] text-center ${
                scrub ? "stagey:absolute stagey:left-1/2 stagey:top-1/2 stagey:mb-0" : ""
              }`}
            >
              <div ref={resolveContentRef}>
                <p className="t-big text-white">
                  {familiarResolve.highlight}
                  <span className="text-white/70">{familiarResolve.rest}</span>
                </p>
                <p className="t-text mt-[clamp(0.5rem,1.6vh,1rem)] text-white/80">
                  {familiarResolve.pillars}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <FamiliarCopy />
    </section>
  );
}

function FamiliarCopy() {
  return (
    <div
      data-copy="familiar"
      className="type-compact mx-auto max-w-[1040px] px-6 pb-[clamp(6rem,16vh,11rem)] pt-[clamp(4rem,12vh,8rem)] sm:px-10"
    >
      <div className="flex flex-col gap-[clamp(0.75rem,2.2vh,1.6rem)]">
        <ScrollLine>
          <h2 className="t-big text-balance text-white">
            {familiarAfter.notAlone}
          </h2>
        </ScrollLine>

        {familiarAfter.notNeeded.map((line, i) => (
          <ScrollLine key={line}>
            <p
              className={`t-big text-balance ${
                i === familiarAfter.notNeeded.length - 1
                  ? "text-glow"
                  : "text-white"
              }`}
            >
              {line}
            </p>
          </ScrollLine>
        ))}

        <ScrollLine>
          <p className="t-text-strong max-w-[70ch] text-balance text-white">
            {familiarAfter.need}
          </p>
        </ScrollLine>

        <ScrollLine>
          <p className="t-text max-w-[76ch] text-white/85">{familiarAfter.close}</p>
        </ScrollLine>

        <ScrollLine>
          <p className="t-text max-w-[76ch] text-white">{familiarAfter.cta}</p>
        </ScrollLine>

        <Reveal>
          <BookCallButton size="lg" />
        </Reveal>
      </div>
    </div>
  );
}
