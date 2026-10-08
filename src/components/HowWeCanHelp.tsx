"use client";

import { useCallback, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SCRUB } from "@/lib/scrollFeel";
import { helpIntro, pillars, readyBlock, type Block } from "@/lib/pillars";
import { useReducedMotion } from "@/lib/useReducedMotion";
import BookCallButton from "./BookCallButton";
import PhotoSlot from "./PhotoSlot";
import Rich from "./Rich";
import { Reveal, ScrollLine } from "./Reveal";

gsap.registerPlugin(ScrollTrigger);

/**
 * How We Can Help. A lead-in, then the pillars as large cards round Pujan's
 * photo, then the "Ready to take back control" showstopper that ends the page.
 */
export default function HowWeCanHelp({ photoSrc }: { photoSrc: string | null }) {
  return (
    <section id="how-we-can-help" className="relative">
      <Intro />
      <Orbit photoSrc={photoSrc} />
    </section>
  );
}

function Intro() {
  return (
    <div className="mx-auto max-w-[920px] px-6 pb-[clamp(3rem,9vh,6rem)] pt-[calc(var(--header-h)+clamp(3rem,10vh,7rem))] sm:px-10">
      <div className="flex flex-col gap-[clamp(1.5rem,4.5vh,2.75rem)]">
        <ScrollLine>
          <h2 className="t-big text-white">{helpIntro.heading}</h2>
        </ScrollLine>

        {helpIntro.paragraphs.map((text) => (
          <ScrollLine key={text}>
            <p className="t-text max-w-[60ch] text-white">
              <Rich text={text} />
            </p>
          </ScrollLine>
        ))}
      </div>
    </div>
  );
}

/*
 * The orbit.
 *
 * Wide screens (laptops, desktops, iPads in landscape): a sticky, full-viewport
 * stage with Pujan's photo fixed in the centre and cards round it. A handful
 * of cards (four on a laptop) sit in fixed places round the photo, and as the
 * visitor scrolls ONE card changes at a time: the oldest rolls out of its
 * place along the orbit and its replacement rolls into the very same place, in
 * reading order (top left, top right, bottom left, bottom right, then round
 * again). The other cards never move, so the eye always knows where to look,
 * and a slim progress rail under the photo shows which pillars are on screen.
 * The last pillar, Freedom, takes the oldest place at the top left, then, as
 * the rest roll away, rolls clockwise round the photo to rest on its right,
 * and only once it has landed do "Ready to take back control of your
 * practice?", the line and the Book a Call button come up on the left.
 *
 * Phones and iPads in portrait: the photo, then the pillars as a swipe
 * carousel (one big card at a time, snapping), then the closing section.
 *
 * Reduced motion on a wide screen: the photo, then the cards in a plain grid.
 */

/**
 * The size of screen that gets the orbit stage. Keep it in sync with the
 * `orbit` and `carousel` variants in globals.css.
 */
const ORBIT_QUERY = "(min-width: 1024px) and (min-height: 540px) and (min-aspect-ratio: 11/10)";

/** Every pillar but the last takes its turn in the places round the photo; the last, Freedom, finishes it. */
const SET_CARDS = pillars.length - 1;

/** How far along the orbit a card rolls as it comes in or goes out, in place spacings. */
const TRAVEL = 0.42;

/** The timeline, in units. One unit is about half a screen of scrolling. */
const HOLD_FIRST = 0.5;
/** One card changing: it rolls for MOVE, then everything rests for HOLD. */
const MOVE = 0.6;
const HOLD = 0.3;
/** The finish: the rest roll away and Freedom rolls round to its end place. */
const FINAL_MOVE = 1.0;
/** The closing words rise in over this many units. */
const READY_IN = 0.8;
/** The finished ending is held for this long before the page is let go. */
const HOLD_LAST = 1.2;
const UNIT_VH = 50;

/**
 * The fitting loop starts the card text at MAX_SCALE times its base size and
 * shrinks it, never below MIN_SCALE, until every card holds its words.
 */
const MAX_SCALE = 1.16;
const MIN_SCALE = 0.78;

/** With one row the cards are few and large, so the text may run bigger, and the cards stop short of the full height. */
const MAX_SCALE_ONE_ROW = 1.45;
const ONE_ROW_CARD_H = 540;

/**
 * How many rows of cards the stage may hold, most first, and the smallest body
 * text each is allowed (px). Four cards (two rows) is the standard, down to
 * 12px on a short iPad; six (three rows) only where the text stays at 15.5px
 * or more, which is a 2560 wide monitor and up. One row is the fallback, so it
 * has no minimum. 12 divides by 2, 4 and 6, which keeps Freedom's entrance in
 * the same place, the top left.
 */
const ROW_OPTIONS = [3, 2, 1];
const MIN_BODY_PX: Record<number, number> = { 3: 15.5, 2: 12, 1: 0 };

const smooth = (t: number) => {
  const c = Math.min(1, Math.max(0, t));
  return c * c * (3 - 2 * c);
};

type CardPlan = {
  /** The place round the photo it sits in (0 is the top left, then reading order). */
  slot: number;
  /** The move (1 based) it rolls in during, or 0 if it starts on screen. */
  inMove: number;
  /** The move it rolls out during. */
  outMove: number;
};

type Layout = {
  rows: number;
  /** How many cards are on screen at once. */
  size: number;
  /** One plan per pillar before Freedom. */
  plan: CardPlan[];
  /** Where a move (1 based) starts, in units. */
  startOf: (k: number) => number;
  /** The move Freedom rolls in during, taking the oldest card's place. */
  freedomIn: number;
  /** The move the others roll away and Freedom rolls round to its end place. */
  finish: number;
  /** Where Freedom ends, as a position along the orbit: right of the photo, halfway down. */
  finalRest: number;
  readyAt: number;
  total: number;
};

function buildLayout(rows: number): Layout {
  const size = rows * 2;
  const changes = SET_CARDS - size;
  const startOf = (k: number) => HOLD_FIRST + (k - 1) * (MOVE + HOLD);
  const freedomIn = changes + 1;
  const finish = changes + 2;
  const plan: CardPlan[] = Array.from({ length: SET_CARDS }, (_, i) => ({
    slot: i < size ? i : (i - size) % size,
    inMove: i < size ? 0 : i - size + 1,
    // The card in a place is replaced when its turn comes, oldest first.
    outMove: i < changes ? i + 1 : i === changes ? freedomIn : finish,
  }));
  // The closing words wait until Freedom has landed in its end place.
  const readyAt = startOf(finish) + FINAL_MOVE;
  return {
    rows,
    size,
    plan,
    startOf,
    freedomIn,
    finish,
    finalRest: 1 + (rows - 1) / 2,
    readyAt,
    total: readyAt + READY_IN + HOLD_LAST,
  };
}

/**
 * The places round the photo sit on a loop, clockwise from the top left: the
 * top of the left column, down the right column, then back up the left. A slot
 * (0 is the top left, 1 the top right, 2 the next row down on the left, and so
 * on in reading order) is a position along that loop.
 */
const slotU = (slot: number, rows: number) => {
  const row = Math.floor(slot / 2);
  return slot % 2 ? 1 + row : row === 0 ? 0 : 2 * rows - row;
};

/*
 * Tailwind only generates classes it can read whole in the source, so the
 * stage classes are written out in full here, not built from parts. Every one
 * is behind the `orbit` variant (see globals.css), so below it, or with
 * reduced motion, none of them apply and the layout is a plain flow.
 */
const STAGE_RUNWAY = "orbit:h-[var(--orbit-h)]";
const STAGE_STICKY = "orbit:stage orbit:sticky orbit:top-0 orbit:overflow-hidden";
const STAGE_REGION = "orbit:h-full orbit:max-w-none orbit:p-0";
const STAGE_PHOTO =
  "orbit:absolute orbit:left-1/2 orbit:top-1/2 orbit:mb-0 orbit:aspect-auto orbit:h-[var(--photo-h,60svh)] orbit:w-[var(--photo-w,40svh)] orbit:-translate-x-1/2 orbit:-translate-y-1/2";
const STAGE_CARD =
  "orbit:absolute orbit:left-[calc(50%-var(--card-w,28rem)/2)] orbit:top-[calc(50%-var(--card-h,20rem)/2)] orbit:h-[var(--card-h,20rem)] orbit:w-[var(--card-w,28rem)] orbit:opacity-0 orbit:will-change-transform";
/** The closing words: a column on the left, vertically centred (`--ready-left`, `--card-w`, `--ready-top`). */
const STAGE_READY =
  "orbit:absolute orbit:left-[var(--ready-left,2rem)] orbit:top-[var(--ready-top,50%)] orbit:z-[7] orbit:m-0 orbit:w-[var(--card-w,28rem)] orbit:-translate-y-1/2 orbit:opacity-0 orbit:will-change-transform";
/** The progress rail, under the photo (`--rail-top`, `--photo-w`). */
const STAGE_RAIL =
  "orbit:absolute orbit:left-1/2 orbit:top-[var(--rail-top,80%)] orbit:z-[5] orbit:flex orbit:-translate-x-1/2";

/*
 * The carousel (phones, iPads in portrait). The track bleeds to the screen
 * edges, scrolls sideways and snaps; each card is most of the screen wide so
 * the next one peeks in. On the stage the track gets `orbit:contents`, which
 * takes it out of the way, since the stage's cards are placed against the
 * stage itself.
 */
const TRACK =
  "grid gap-4 sm:grid-cols-2 carousel:relative carousel:flex carousel:snap-x carousel:snap-mandatory carousel:gap-3 carousel:overflow-x-auto carousel:overscroll-x-contain carousel:-mx-6 carousel:scroll-px-6 carousel:px-6 carousel:pb-3 carousel:[scrollbar-width:none] carousel:[&::-webkit-scrollbar]:hidden sm:carousel:-mx-10 sm:carousel:scroll-px-10 sm:carousel:px-10";
/**
 * The carousel holds its place on the screen for a short stretch of scrolling:
 * after the photo has scrolled away the cards lock in position (PIN_HOLD_SVH),
 * so a visitor can swipe sideways through them, and then the page carries on.
 * Scrolling down is never blocked and never moves the cards. Keep the query in
 * sync with the `carousel` variant in globals.css.
 */
const CAROUSEL_QUERY =
  "not all and (min-width: 1024px) and (min-height: 540px) and (min-aspect-ratio: 11/10)";
const PIN_HOLD_SVH = 55;
/** The smallest the pinned carousel's writing is taken down to on a short phone. */
const MIN_CAROUSEL_SCALE = 0.7;

const CAROUSEL_CARD =
  "carousel:w-[min(86vw,32rem)] carousel:shrink-0 carousel:snap-center carousel:p-5 sm:carousel:p-6";

function Orbit({ photoSrc }: { photoSrc: string | null }) {
  const reduced = useReducedMotion();
  const scrub = !reduced;

  const outerRef = useRef<HTMLDivElement>(null);
  const regionRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const readyRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const innerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const trackRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  // The carousel: which card is centred, and the buttons that move it.
  const onTrackScroll = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const mid = track.scrollLeft + track.clientWidth / 2;
    let best = 0;
    let bestD = Infinity;
    cardRefs.current.forEach((card, i) => {
      if (!card) return;
      const d = Math.abs(card.offsetLeft + card.offsetWidth / 2 - mid);
      if (d < bestD) {
        bestD = d;
        best = i;
      }
    });
    setActive((prev) => (prev === best ? prev : best));
  }, []);
  const goTo = useCallback(
    (i: number) => {
      const track = trackRef.current;
      const card = cardRefs.current[Math.min(pillars.length - 1, Math.max(0, i))];
      if (!track || !card) return;
      track.scrollTo({
        left: card.offsetLeft + card.offsetWidth / 2 - track.clientWidth / 2,
        behavior: reduced ? "auto" : "smooth",
      });
    },
    [reduced]
  );

  // The carousel's writing is fitted so the fullest card sits whole inside the
  // locked stage, between the header and the hint and buttons under it. The
  // stage is a screen tall, so a short phone gets smaller writing rather than
  // a clipped card.
  useLayoutEffect(() => {
    if (reduced) return;
    const mm = gsap.matchMedia();

    mm.add(CAROUSEL_QUERY, () => {
      const pin = pinRef.current;
      const track = trackRef.current;
      const stage = pin?.firstElementChild as HTMLElement | null;
      if (!pin || !track || !stage) return;
      const inners = innerRefs.current.filter(Boolean) as HTMLElement[];

      const fit = () => {
        const style = getComputedStyle(stage);
        const kids = Array.from(stage.children) as HTMLElement[];
        const others = kids
          .filter((k) => k !== track)
          .reduce((n, k) => n + k.offsetHeight, 0);
        const gaps = parseFloat(style.rowGap || "0") * (kids.length - 1);
        const trackPad = parseFloat(getComputedStyle(track).paddingBottom || "0");
        const room =
          stage.clientHeight - parseFloat(style.paddingTop) - others - gaps - trackPad - 4;
        let scale = 1;
        stage.style.setProperty("--fit-scale", "1");
        const need = () =>
          Math.max(
            ...inners.map((inner) => {
              const cs = getComputedStyle(inner.parentElement as HTMLElement);
              return (
                inner.offsetHeight + parseFloat(cs.paddingTop) + parseFloat(cs.paddingBottom)
              );
            })
          );
        while (need() > room && scale > MIN_CAROUSEL_SCALE) {
          scale = Math.max(MIN_CAROUSEL_SCALE, scale - 0.03);
          stage.style.setProperty("--fit-scale", scale.toFixed(2));
        }
      };
      fit();
      ScrollTrigger.addEventListener("refreshInit", fit);

      return () => {
        ScrollTrigger.removeEventListener("refreshInit", fit);
        stage.style.removeProperty("--fit-scale");
      };
    });

    return () => mm.revert();
  }, [reduced]);

  useLayoutEffect(() => {
    if (reduced) return;
    const mm = gsap.matchMedia();

    mm.add(ORBIT_QUERY, () => {
      const outer = outerRef.current;
      const region = regionRef.current;
      const photo = photoRef.current;
      const ready = readyRef.current;
      const rail = railRef.current;
      const all = cardRefs.current.filter(Boolean) as HTMLElement[];
      const inners = innerRefs.current.filter(Boolean) as HTMLElement[];
      if (!outer || !region || !photo || !ready || !rail || all.length !== pillars.length) return;

      const freedom = all[all.length - 1];
      const cards = all.slice(0, -1);
      const ticks = Array.from(rail.children) as HTMLElement[];

      // The layout in use. It starts on the default and is chosen again every
      // time the stage is measured.
      let layout = buildLayout(2);

      // Geometry, in px, from the size of the stage.
      let sx = 0;
      let stageH = 0;
      let rowY: number[] = [];
      // The solid bar along the bottom of a touch screen (see .bottom-bar in
      // globals.css) covers the bottom of the stage, so the stage lays
      // everything out in the height above it.
      let barPx = 0;
      const geometry = (rows: number) => {
        const W = region.clientWidth;
        const fullH = region.clientHeight;
        barPx = document.querySelector<HTMLElement>(".bottom-bar")?.offsetHeight ?? 0;
        const H = fullH - barPx;
        stageH = H;
        const edgeX = Math.max(16, W * 0.03);
        const edgeY = Math.max(10, H * 0.02);
        const gapX = Math.max(16, W * 0.016);
        const gapY = Math.max(12, H * 0.022);

        const photoH = H * 0.6;
        const photoW = (photoH * 2) / 3;
        const colW = (W - photoW - gapX * 2 - edgeX * 2) / 2;
        const cardW = Math.min(colW, 560);
        const cardH = Math.min(
          (H - edgeY * 2 - (rows - 1) * gapY) / rows,
          rows === 1 ? ONE_ROW_CARD_H : Infinity
        );

        sx = photoW / 2 + gapX + cardW / 2;
        rowY = Array.from(
          { length: rows },
          (_, r) => (r - (rows - 1) / 2) * (cardH + gapY) - barPx / 2
        );

        region.style.setProperty("--photo-w", `${photoW}px`);
        region.style.setProperty("--photo-h", `${photoH}px`);
        region.style.setProperty("--card-w", `${cardW}px`);
        region.style.setProperty("--card-h", `${cardH}px`);
        region.style.setProperty("--ready-left", `${W / 2 - sx - cardW / 2}px`);
        region.style.setProperty("--ready-top", `${H / 2}px`);
        region.style.setProperty("--rail-top", `${fullH / 2 - barPx / 2 + photoH / 2 + 16}px`);
      };

      // The text is as large as it can be while every card still holds its
      // words. Measured on every card at once, since they all share a size.
      const fits = () =>
        all.every((card, i) => {
          const inner = inners[i];
          const style = getComputedStyle(card);
          const room =
            card.clientHeight - parseFloat(style.paddingTop) - parseFloat(style.paddingBottom);
          return inner.offsetHeight <= room + 1;
        });
      const bodyPx = () => {
        const p = inners[0].querySelector("p.t-fit");
        return p ? parseFloat(getComputedStyle(p).fontSize) : 0;
      };
      const fitRows = (rows: number) => {
        geometry(rows);
        let scale = rows === 1 ? MAX_SCALE_ONE_ROW : MAX_SCALE;
        region.style.setProperty("--fit-scale", scale.toFixed(2));
        while (!fits() && scale > MIN_SCALE) {
          scale = Math.max(MIN_SCALE, scale - 0.02);
          region.style.setProperty("--fit-scale", scale.toFixed(2));
        }
      };
      // The closing words shrink only as far as they must to sit in the left
      // column. They are centred, and overflow of a centred box is not
      // reported, so the block itself is measured.
      const fitReady = () => {
        let scale = 1;
        region.style.setProperty("--rd-scale", "1");
        while (ready.offsetHeight > stageH * 0.86 && scale > 0.45) {
          scale -= 0.04;
          region.style.setProperty("--rd-scale", scale.toFixed(2));
        }
      };
      // As many rows of cards as the screen can hold while the writing stays
      // at least that row count's minimum. Fewer, bigger cards on a smaller
      // screen.
      const fit = () => {
        for (const rows of ROW_OPTIONS) {
          fitRows(rows);
          if (bodyPx() >= MIN_BODY_PX[rows]) {
            if (layout.rows !== rows) layout = buildLayout(rows);
            break;
          }
        }
        fitReady();
        outer.style.setProperty(
          "--orbit-h",
          `calc(100svh + ${Math.round(layout.total * UNIT_VH)}vh)`
        );
        region.dataset.rows = String(layout.rows);
      };

      // Position `u` along the loop of places, clockwise from the top left. A
      // card between two places is a point on the line between them.
      const place = (u: number) => {
        const rows = layout.rows;
        const slots: [number, number][] = [[-sx, rowY[0]]];
        for (let r = 0; r < rows; r++) slots.push([sx, rowY[r]]);
        for (let r = rows - 1; r >= 1; r--) slots.push([-sx, rowY[r]]);
        const n = slots.length;
        const w = ((u % n) + n) % n;
        const i = Math.floor(w);
        const f = w - i;
        const a = slots[i];
        const b = slots[(i + 1) % n];
        return { x: a[0] + (b[0] - a[0]) * f, y: a[1] + (b[1] - a[1]) * f };
      };

      const lit: boolean[] = [];
      const render = (T: number) => {
        const { plan, startOf, freedomIn, finish, finalRest, readyAt, rows } = layout;

        // One card, rolling in during `inMove`, rolling out during `outMove`.
        // Out and in happen in the same place, so a card is replaced where it
        // stands.
        const roll = (
          card: HTMLElement,
          index: number,
          slot: number,
          inMove: number,
          outMove: number
        ) => {
          const rest = slotU(slot, rows);
          let u = rest;
          let alpha = 1;
          let scale = 1;
          let moving = false;

          if (inMove) {
            const x = (T - startOf(inMove)) / MOVE;
            if (x <= 0) alpha = 0;
            else if (x < 1) {
              const e = smooth(x);
              u = rest - TRAVEL * (1 - e);
              alpha = smooth((x - 0.42) / 0.58);
              scale = 0.94 + 0.06 * e;
              moving = true;
            }
          }
          if (outMove) {
            const x = (T - startOf(outMove)) / (outMove === finish ? FINAL_MOVE : MOVE);
            if (x >= 1) alpha = 0;
            else if (x > 0) {
              const e = smooth(x);
              u = rest + TRAVEL * e;
              alpha = 1 - smooth(x / 0.5);
              scale = 1 - 0.06 * e;
              moving = true;
            }
          }
          // Freedom, once in, carries on round the photo to its end place.
          if (index === pillars.length - 1) {
            const x = (T - startOf(finish)) / FINAL_MOVE;
            if (x > 0) {
              const e = smooth(x);
              u = rest + (finalRest - rest) * e;
              scale = 1 + 0.03 * e;
              moving = moving || x < 1;
            }
          }

          const { x, y } = place(u);
          card.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) scale(${scale.toFixed(3)})`;
          card.style.opacity = alpha.toFixed(3);
          card.style.visibility = alpha <= 0.001 ? "hidden" : "visible";
          // Cards on the move pass behind the photo, so they orbit it.
          card.style.zIndex = moving ? "4" : "6";
          return alpha > 0.05;
        };

        cards.forEach((card, i) => {
          const on = roll(card, i, plan[i].slot, plan[i].inMove, plan[i].outMove);
          if (lit[i] !== on) {
            lit[i] = on;
            ticks[i].dataset.on = on ? "true" : "false";
          }
        });
        const fi = pillars.length - 1;
        const freedomOn = roll(freedom, fi, 0, freedomIn, 0);
        if (lit[fi] !== freedomOn) {
          lit[fi] = freedomOn;
          ticks[fi].dataset.on = freedomOn ? "true" : "false";
        }
        // The rail has done its job once Freedom is rolling to its end place.
        rail.style.opacity = (1 - smooth((T - startOf(finish)) / (FINAL_MOVE * 0.5))).toFixed(3);

        // The closing words rise in on the left.
        const re = smooth((T - readyAt) / READY_IN);
        if (re <= 0) {
          ready.style.opacity = "0";
          ready.style.visibility = "hidden";
        } else {
          ready.style.opacity = re.toFixed(3);
          ready.style.visibility = "visible";
          ready.style.transform = `translate3d(0, ${((1 - re) * 40).toFixed(1)}px, 0)`;
        }
      };

      fit();
      ScrollTrigger.addEventListener("refreshInit", fit);

      const state = { p: 0 };
      render(0);
      gsap.to(state, {
        p: 1,
        ease: "none",
        scrollTrigger: {
          trigger: outer,
          start: "top top",
          end: "bottom bottom",
          scrub: SCRUB,
          invalidateOnRefresh: true,
        },
        onUpdate: () => render(state.p * layout.total),
      });

      return () => {
        ScrollTrigger.removeEventListener("refreshInit", fit);
        region.style.removeProperty("--fit-scale");
        region.style.removeProperty("--rd-scale");
        delete region.dataset.rows;
        for (const el of [...all, photo, ready, rail]) {
          el.style.transform = "";
          el.style.opacity = "";
          el.style.visibility = "";
          el.style.zIndex = "";
        }
      };
    });

    return () => mm.revert();
  }, [reduced]);

  // Until the stage takes over, the cards are hidden by a class (not by an
  // inline style), so that reverting the animation for a reduced-motion
  // visitor can never leave them hidden.
  return (
    <div
      id="pillars"
      ref={outerRef}
      className={scrub ? STAGE_RUNWAY : ""}
      style={{ "--orbit-h": `calc(100svh + ${Math.round(buildLayout(2).total * UNIT_VH)}vh)` } as React.CSSProperties}
    >
      <div className={scrub ? STAGE_STICKY : ""}>
        <div
          ref={regionRef}
          className={`relative mx-auto max-w-[1700px] px-6 pb-[clamp(3rem,8vh,5rem)] sm:px-10 ${
            scrub ? STAGE_REGION : ""
          }`}
        >
          <div
            ref={photoRef}
            className={`relative z-[5] mx-auto mb-8 aspect-[4/5] w-[min(56vw,15rem)] sm:w-[min(40vw,19rem)] ${
              scrub ? STAGE_PHOTO : ""
            }`}
          >
            <div
              aria-hidden="true"
              className="absolute -inset-[8%] rounded-[2.5rem] bg-white/15 blur-2xl"
            />
            <PhotoSlot
              src={photoSrc}
              alt="Pujan Soni talking with a colleague in a dental surgery"
              kind="practice"
              hint="practice.jpg"
              sizes="(min-width: 1200px) 24vw, 80vw"
              objectPosition="50% 12%"
              early
              className="h-full w-full rounded-[clamp(1.25rem,2vw,2rem)] border border-white/40 shadow-[0_40px_90px_-40px_var(--shadow)]"
            />
          </div>

          <div
            ref={pinRef}
            className={scrub ? "carousel:h-[var(--pin-h)] orbit:contents" : ""}
            style={
              {
                "--pin-h": `calc(100svh + ${PIN_HOLD_SVH}svh)`,
              } as React.CSSProperties
            }
          >
          <div
            className={
              scrub
                ? "carousel:sticky carousel:top-0 carousel:flex carousel:h-[calc(100svh-var(--bottom-bar-h))] carousel:flex-col carousel:justify-center carousel:gap-2 carousel:pt-[var(--header-h)] orbit:contents"
                : ""
            }
          >
          <div
            ref={trackRef}
            onScroll={onTrackScroll}
            role="group"
            aria-roledescription="carousel"
            aria-label="How we can help, swipe for each area"
            tabIndex={0}
            className={`${TRACK} ${scrub ? "orbit:contents" : ""}`}
          >
            {pillars.map((pillar, i) => {
              return (
                <article
                  key={pillar.id}
                  ref={(el) => {
                    cardRefs.current[i] = el;
                  }}
                  aria-labelledby={`pillar-${pillar.id}`}
                  className={`type-orbit flex flex-col overflow-hidden rounded-[clamp(1.25rem,2vw,1.75rem)] bg-white p-[clamp(0.85rem,2.1vh,1.4rem)] text-ink shadow-[0_24px_60px_-34px_var(--shadow)] ${CAROUSEL_CARD} ${
                    scrub ? STAGE_CARD : ""
                  }`}
                >
                  <div
                    ref={(el) => {
                      innerRefs.current[i] = el;
                    }}
                    className="flex flex-col gap-[clamp(0.3rem,0.9vh,0.65rem)]"
                  >
                    <div className="flex items-baseline justify-between gap-4">
                      <h3 id={`pillar-${pillar.id}`} className="t-big text-ink">
                        {pillar.title}
                      </h3>
                      <p aria-hidden="true" className="t-fit-strong shrink-0 text-royal-600">
                        {String(i + 1).padStart(2, "0")} / {String(pillars.length).padStart(2, "0")}
                      </p>
                    </div>
                    <div className="flex flex-col gap-[clamp(0.3rem,0.85vh,0.6rem)]">
                      {pillar.body.map((block, b) => (
                        <BlockView key={b} block={block} />
                      ))}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <SwipeHint show={active === 0} />
          <CarouselControls active={active} onGo={goTo} />
          </div>
          </div>

          {/* The progress rail: one tick for every pillar, lit while its card
              is on the screen. Only on the stage. */}
          <div
            ref={railRef}
            aria-hidden="true"
            className={`hidden gap-1 ${scrub ? STAGE_RAIL : ""}`}
          >
            {pillars.map((p) => (
              <span
                key={p.id}
                data-on="false"
                className="h-1 w-3.5 rounded-full bg-white/30 transition-colors duration-300 data-[on=true]:bg-white"
              />
            ))}
          </div>

          <div
            ref={readyRef}
            className={`mt-[clamp(3rem,9vh,6rem)] ${scrub ? STAGE_READY : ""}`}
          >
            <ReadyHeading staged={scrub} />
            <ReadyStrip staged={scrub} />
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * One part of the closing block. On the stage the whole block is driven by the
 * scroll (see render in Orbit), so its parts are plain. In the flow each part
 * rolls up as it comes into view.
 */
function ReadyPart({
  staged,
  delay = 0,
  className,
  children,
}: {
  staged: boolean;
  delay?: number;
  className?: string;
  children: React.ReactNode;
}) {
  if (staged) return <div className={className}>{children}</div>;
  return (
    <Reveal delay={delay} className={className}>
      {children}
    </Reveal>
  );
}

/**
 * "Ready to take back control of your practice?" On the stage it is the top of
 * the column on the left, left aligned; on a phone, or with reduced motion, it
 * simply follows the cards, centred.
 */
function ReadyHeading({ staged }: { staged: boolean }) {
  const [first, second] = readyBlock.headingParts;
  return (
    <div
      id="ready"
      className={`type-ready ${staged ? "type-ready-stage orbit:mx-0 orbit:max-w-none orbit:px-0 orbit:text-left" : ""} mx-auto max-w-[1500px] px-6 text-center sm:px-10`}
    >
      <ReadyPart staged={staged}>
        <h2 className="t-mega text-balance text-white">
          <span className="block">{first.trim()}</span>
          <span className="text-glow block">{second}</span>
        </h2>
      </ReadyPart>
    </div>
  );
}

/**
 * The line and the Book a Call button, under the heading in the same column.
 * Centred on a phone or with reduced motion, left aligned on the stage.
 */
function ReadyStrip({ staged }: { staged: boolean }) {
  return (
    <div
      className={`type-ready ${
        staged ? "type-ready-stage orbit:mx-0 orbit:max-w-none orbit:items-start orbit:px-0 orbit:text-left" : ""
      } mx-auto flex max-w-[1500px] flex-col items-center px-6 text-center sm:px-10`}
    >
      <ReadyPart staged={staged}>
        <p className="t-text mt-[clamp(0.9rem,3vh,2rem)] max-w-[46ch] text-balance text-white/95 orbit:text-pretty">
          {readyBlock.body}
        </p>
      </ReadyPart>
      <ReadyPart staged={staged} delay={0.12} className="mt-[clamp(1.1rem,3.8vh,2.5rem)]">
        <BookCallButton size="xl" />
      </ReadyPart>
    </div>
  );
}

/**
 * "Swipe": a small nudge under the first card, telling a visitor that the
 * cards move sideways. It folds away once they have moved on.
 */
function SwipeHint({ show }: { show: boolean }) {
  return (
    <div
      aria-hidden="true"
      className={`hidden h-7 items-center justify-center gap-2 transition-opacity duration-500 carousel:flex ${
        show ? "opacity-100" : "opacity-0"
      }`}
    >
      <span className="t-ui text-white/90">Swipe</span>
      <svg viewBox="0 0 28 12" fill="none" className="swipe-nudge h-3 w-7 text-white">
        <path
          d="M1 6h24m-5-5 5 5-5 5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

/**
 * Previous and next buttons and a dot for every card, under the carousel.
 * Only shown where the carousel is (see the `carousel` variant), and every
 * target is at least 44px, since it is for thumbs.
 */
function CarouselControls({
  active,
  onGo,
}: {
  active: number;
  onGo: (i: number) => void;
}) {
  const last = pillars.length - 1;
  const arrow =
    "flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/50 text-white transition-colors duration-200 enabled:active:bg-white enabled:active:text-royal-700 disabled:opacity-35";
  return (
    <div className="mt-2 hidden items-center justify-between gap-3 carousel:flex">
      <button
        type="button"
        onClick={() => onGo(active - 1)}
        disabled={active === 0}
        aria-label="Previous"
        className={arrow}
      >
        <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4 rotate-180" aria-hidden="true">
          <path d="M4 10h11m-4-4 4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <ul className="flex min-w-0 flex-1 items-center justify-center" aria-label="Choose a card">
        {pillars.map((p, i) => (
          <li key={p.id}>
            <button
              type="button"
              onClick={() => onGo(i)}
              aria-label={`${p.title}, ${i + 1} of ${pillars.length}`}
              aria-current={i === active ? "true" : undefined}
              className="flex h-11 w-[clamp(1rem,3.6vw,1.5rem)] items-center justify-center"
            >
              <span
                className={`block rounded-full transition-all duration-300 ${
                  i === active ? "h-2.5 w-2.5 bg-white" : "h-1.5 w-1.5 bg-white/45"
                }`}
              />
            </button>
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={() => onGo(active + 1)}
        disabled={active === last}
        aria-label="Next"
        className={arrow}
      >
        <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4" aria-hidden="true">
          <path d="M4 10h11m-4-4 4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  );
}

function BlockView({ block }: { block: Block }) {
  switch (block.kind) {
    case "p":
      return (
        <p className="t-fit text-ink-soft">
          <Rich text={block.text} />
        </p>
      );
    case "quote":
      return (
        <blockquote className="t-fit border-l-[3px] border-royal-500 pl-3 text-royal-700">
          <Rich text={block.text} />
        </blockquote>
      );
    case "chips":
      return (
        <ul className="flex flex-wrap gap-1">
          {block.items.map((item) => (
            <li key={item} className="t-fit rounded-full bg-sky-100 px-2.5 py-px text-royal-800">
              {item}
            </li>
          ))}
        </ul>
      );
    case "lines":
      return (
        <ul className="flex flex-col gap-0.5">
          {block.items.map((item) => (
            <li key={item} className="t-fit text-ink">
              <Rich text={item} />
            </li>
          ))}
        </ul>
      );
  }
}
