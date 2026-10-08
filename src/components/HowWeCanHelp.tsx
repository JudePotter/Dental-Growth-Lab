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
 * stage with Pujan's photo fixed in the centre and large cards round it, in
 * sets. The first set is on screen; then, as the visitor scrolls, the cards
 * leave like doors opening (the left ones out to the left, the right ones out
 * to the right) and the next set comes in from the same two sides, and again,
 * until every pillar bar the last has had its turn. How many cards are in a
 * set depends on the room: six on a big monitor, four on a laptop or iPad,
 * and two on a screen too short for four. The ending is one composed screen:
 * the photo slides to the left and grows into a tall column, the last pillar,
 * Freedom, arrives as a card at the top right with its lines arriving one by
 * one, "Ready to take back control of your practice?" comes in beneath it at
 * the bottom right, and last the line and the Book a Call button run across
 * the whole of the bottom of the screen.
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

/** Every pillar but the last goes in a set; the last, Freedom, has the screen to itself. */
const SET_CARDS = pillars.length - 1;

/** The timeline, in units. One unit is about half a screen of scrolling. */
const HOLD_FIRST = 0.8;
const SWIPE = 0.95;
const HOLD = 1.25;
/** In a swipe the old set is out by this share of it, and the new set starts then. */
const SWIPE_SPLIT = 0.5;
/** Freedom's lines arrive one by one: this many units each, after the card has landed. */
const FREEDOM_LINE = 0.28;
/** The closing heading, then the bottom bar, each come in over this many units. */
const HEAD_IN = 0.7;
const STRIP_IN = 0.7;
/** The finished ending is held for this long before the page is let go. */
const HOLD_LAST = 1.7;
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
 * text each is allowed (px). Four cards a set (two rows) is the standard, down
 * to 12px on a short iPad; six (three rows) only where the text stays at 15.5px
 * or more, which is a 2560 wide monitor and up. One row is the fallback, so it
 * has no minimum. A set is two cards a row, and 12 divides into sets of 2, 4
 * or 6.
 */
const ROW_OPTIONS = [3, 2, 1];
const MIN_BODY_PX: Record<number, number> = { 3: 15.5, 2: 12, 1: 0 };

const smooth = (t: number) => {
  const c = Math.min(1, Math.max(0, t));
  return c * c * (3 - 2 * c);
};
const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

type Layout = {
  rows: number;
  /** Cards in a set. */
  size: number;
  /** How many sets there are. */
  sets: number;
  /** Where a swipe (0 based) starts, in units. The last one is the swipe to Freedom. */
  swipeAt: (k: number) => number;
  /** When Freedom's lines start to arrive. */
  linesAt: number;
  /** When the closing heading, and then the bottom bar, start to come in. */
  headAt: number;
  stripAt: number;
  total: number;
};

function buildLayout(rows: number): Layout {
  const size = rows * 2;
  const sets = Math.ceil(SET_CARDS / size);
  // With only two cards a set there are six swipes, so the pauses are shorter.
  const hold = rows === 1 ? HOLD * 0.7 : HOLD;
  const swipeAt = (k: number) => HOLD_FIRST + k * (SWIPE + hold);
  const freedomLanded = swipeAt(sets - 1) + SWIPE;
  // Freedom's closing lines and the lines of the list: (list + 2) beats.
  const beats = (pillars[pillars.length - 1].body.find((b) => b.kind === "lines") as
    | { items: string[] }
    | undefined)?.items.length;
  const linesAt = freedomLanded + 0.2;
  const headAt = linesAt + ((beats ?? 7) + 3) * FREEDOM_LINE + 0.1;
  const stripAt = headAt + HEAD_IN * 0.8;
  return {
    rows,
    size,
    sets,
    swipeAt,
    linesAt,
    headAt,
    stripAt,
    total: stripAt + STRIP_IN + HOLD_LAST,
  };
}

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
/** Freedom is the card at the top of the right hand column (`--ff-*`). */
const STAGE_FREEDOM =
  "orbit:absolute orbit:left-[var(--ff-left,40%)] orbit:top-[var(--ff-top,0.5rem)] orbit:h-[var(--ff-h,20rem)] orbit:w-[var(--ff-w,40rem)] orbit:opacity-0 orbit:will-change-transform";
/** "Ready to take back control" is under it, in the same column (`--rh-*`). */
const STAGE_RHEAD =
  "orbit:absolute orbit:left-[var(--ff-left,40%)] orbit:top-[var(--rh-top,60%)] orbit:z-[7] orbit:m-0 orbit:flex orbit:h-[var(--rh-h,8rem)] orbit:w-[var(--ff-w,40rem)] orbit:items-center orbit:opacity-0 orbit:will-change-transform";
/** The line and the button run across the whole bottom of the screen (`--st-h`). */
const STAGE_RSTRIP =
  "orbit:absolute orbit:bottom-[var(--edge-b,0.5rem)] orbit:left-[var(--edge-x,1rem)] orbit:z-[7] orbit:m-0 orbit:h-[var(--st-h,6rem)] orbit:w-[calc(100%-2*var(--edge-x,1rem))] orbit:opacity-0 orbit:will-change-transform";

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
 * The carousel locks the page while it plays: after the photo has scrolled
 * away, the cards are pinned and each PIN_STEP_VH of scrolling moves on one
 * card. A swipe sideways works too, and the page follows it. Keep the query in
 * sync with the `carousel` variant in globals.css.
 */
const CAROUSEL_QUERY =
  "not all and (min-width: 1024px) and (min-height: 540px) and (min-aspect-ratio: 11/10)";
const PIN_STEP_VH = 42;
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
  const readyHeadRef = useRef<HTMLDivElement>(null);
  const readyStripRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const innerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const trackRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  /** Set by the pin effect: tells the page which card is now showing. */
  const syncPageRef = useRef<((i: number) => void) | null>(null);
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
      syncPageRef.current?.(Math.min(pillars.length - 1, Math.max(0, i)));
    },
    [reduced]
  );

  // The carousel, locked. While it is pinned the page scroll moves the cards
  // on one at a time; and a sideways swipe moves the page to match, so the two
  // never fight. Only a swipe that really moved the track counts: a page
  // scroll that merely starts on a card must not be reset.
  useLayoutEffect(() => {
    if (reduced) return;
    const mm = gsap.matchMedia();

    mm.add(CAROUSEL_QUERY, () => {
      const pin = pinRef.current;
      const track = trackRef.current;
      const stage = pin?.firstElementChild as HTMLElement | null;
      if (!pin || !track || !stage) return;
      const cards = cardRefs.current.filter(Boolean) as HTMLElement[];
      const last = cards.length - 1;
      if (last < 1) return;

      // Fit: the writing is scaled down, never below MIN_CAROUSEL_SCALE, until
      // the fullest card sits whole inside the stage, between the header and
      // the hint and buttons under it. The stage height is fixed (a screen), so
      // a short phone gets smaller writing rather than a clipped card.
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

      const cardLeft = (i: number) =>
        cards[i].offsetLeft + cards[i].offsetWidth / 2 - track.clientWidth / 2;
      const pageY = (i: number) =>
        pin.getBoundingClientRect().top +
        window.scrollY +
        (i / last) * (pin.offsetHeight - stage.offsetHeight);
      const nearest = () => {
        const mid = track.scrollLeft + track.clientWidth / 2;
        let best = 0;
        let bestD = Infinity;
        cards.forEach((c, i) => {
          const d = Math.abs(c.offsetLeft + c.offsetWidth / 2 - mid);
          if (d < bestD) {
            bestD = d;
            best = i;
          }
        });
        return best;
      };

      let current = 0;
      let touching = false;
      let moved = false;
      let lastLeft = track.scrollLeft;
      let timer = 0;

      const settle = () => {
        if (touching) {
          timer = window.setTimeout(settle, 120);
          return;
        }
        if (!moved) return;
        moved = false;
        current = nearest();
        window.scrollTo({ top: pageY(current), behavior: "instant" as ScrollBehavior });
      };
      const arm = () => {
        window.clearTimeout(timer);
        timer = window.setTimeout(settle, 140);
      };
      const onTouchStart = () => {
        touching = true;
      };
      const onTouchEnd = () => {
        touching = false;
        if (moved) arm();
      };
      const onScroll = () => {
        const l = track.scrollLeft;
        if (touching && Math.abs(l - lastLeft) > 1) moved = true;
        lastLeft = l;
        if (moved) arm();
      };

      track.addEventListener("touchstart", onTouchStart, { passive: true });
      track.addEventListener("touchend", onTouchEnd, { passive: true });
      track.addEventListener("touchcancel", onTouchEnd, { passive: true });
      track.addEventListener("scroll", onScroll, { passive: true });

      syncPageRef.current = (i) => {
        current = i;
        window.scrollTo({ top: pageY(i), behavior: "instant" as ScrollBehavior });
      };

      const trigger = ScrollTrigger.create({
        trigger: pin,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          if (moved || touching) return;
          const i = Math.min(last, Math.max(0, Math.round(self.progress * last)));
          if (i === current) return;
          current = i;
          track.scrollTo({ left: cardLeft(i), behavior: "smooth" });
        },
      });

      return () => {
        window.clearTimeout(timer);
        trigger.kill();
        ScrollTrigger.removeEventListener("refreshInit", fit);
        stage.style.removeProperty("--fit-scale");
        syncPageRef.current = null;
        track.removeEventListener("touchstart", onTouchStart);
        track.removeEventListener("touchend", onTouchEnd);
        track.removeEventListener("touchcancel", onTouchEnd);
        track.removeEventListener("scroll", onScroll);
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
      const readyHead = readyHeadRef.current;
      const readyStrip = readyStripRef.current;
      const all = cardRefs.current.filter(Boolean) as HTMLElement[];
      const inners = innerRefs.current.filter(Boolean) as HTMLElement[];
      if (!outer || !region || !photo || !readyHead || !readyStrip || all.length !== pillars.length) return;

      const freedom = all[all.length - 1];
      const cards = all.slice(0, -1);
      const freedomFull = freedom.querySelector<HTMLElement>("[data-freedom-full]");
      const lines = Array.from(freedom.querySelectorAll<HTMLElement>("[data-fl]"));

      // The layout in use. It starts on the default and is chosen again every
      // time the stage is measured.
      let layout = buildLayout(2);

      // Geometry, in px, from the size of the stage.
      let sx = 0;
      let out = 0;
      let rowY: number[] = [];
      // Where the photo ends up (relative to where it starts, in the middle),
      // and how much bigger it is there.
      let photoDX = 0;
      let photoDY = 0;
      let photoScale = 1;
      // The solid bar along the bottom of a touch screen (see .bottom-bar in
      // globals.css) covers the bottom of the stage, so the stage lays
      // everything out in the height above it.
      let barPx = 0;
      const geometry = (rows: number) => {
        const W = region.clientWidth;
        const fullH = region.clientHeight;
        barPx = document.querySelector<HTMLElement>(".bottom-bar")?.offsetHeight ?? 0;
        const H = fullH - barPx;
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
        // Just far enough that a card sent out to its own side is clear of the
        // screen, and a card coming in starts clear of it.
        out = W / 2 - photoW / 2 - gapX + 12;
        rowY = Array.from(
          { length: rows },
          (_, r) => (r - (rows - 1) / 2) * (cardH + gapY) - barPx / 2
        );

        region.style.setProperty("--photo-w", `${photoW}px`);
        region.style.setProperty("--photo-h", `${photoH}px`);
        region.style.setProperty("--card-w", `${cardW}px`);
        region.style.setProperty("--card-h", `${cardH}px`);
        region.style.setProperty("--edge-x", `${edgeX}px`);
        region.style.setProperty("--edge-y", `${edgeY}px`);

        // The closing screen. The photo ends as a tall column on the left. In
        // the column beside it Freedom is the card at the top and "Ready to take
        // back control" sits under it; the line and the button run across the
        // whole of the bottom.
        const stripH = Math.max(96, Math.min(H * 0.16, 150));
        const mainH = H - edgeY * 2 - stripH - gapY;
        let photoEndH = mainH;
        let photoEndW = (photoEndH * 2) / 3;
        if (photoEndW > W * 0.31) {
          photoEndW = W * 0.31;
          photoEndH = (photoEndW * 3) / 2;
        }
        photoScale = photoEndH / photoH;
        photoDX = edgeX + photoEndW / 2 - W / 2;
        photoDY = edgeY + photoEndH / 2 - fullH / 2;

        const colLeft = edgeX + photoEndW + gapX * 1.5;
        const ffH = Math.round(mainH * 0.64);
        const headTop = edgeY + ffH + gapY * 0.5;
        region.style.setProperty("--ff-left", `${colLeft}px`);
        region.style.setProperty("--ff-w", `${W - edgeX - colLeft}px`);
        region.style.setProperty("--ff-top", `${edgeY}px`);
        region.style.setProperty("--ff-h", `${ffH}px`);
        region.style.setProperty("--rh-top", `${headTop}px`);
        region.style.setProperty("--rh-h", `${edgeY + mainH - headTop}px`);
        region.style.setProperty("--st-h", `${stripH}px`);
        region.style.setProperty("--edge-b", `${edgeY + barPx}px`);
      };

      // The text is as large as it can be while every card still holds its
      // words. Measured on every card at once, since they all share a size.
      const fits = () =>
        cards.every((card, i) => {
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
      // Freedom fills the screen, so its writing is big; shrink it only as far
      // as it must for all of it to sit inside the card.
      const fitFreedom = () => {
        if (!freedomFull) return;
        let scale = 1;
        freedomFull.style.setProperty("--ff-scale", "1");
        while (freedomFull.scrollHeight > freedomFull.clientHeight + 1 && scale > 0.5) {
          scale -= 0.04;
          freedomFull.style.setProperty("--ff-scale", scale.toFixed(2));
        }
      };
      // The closing heading and the bar's line shrink only as far as they must
      // to sit in their places. Their content is centred in its box, and
      // overflow of a centred box is not reported, so the content is measured
      // itself, with a little air.
      const fitReady = () => {
        const heading = readyHead.querySelector<HTMLElement>("h2");
        const bar = readyStrip.firstElementChild as HTMLElement | null;
        const text = readyStrip.querySelector<HTMLElement>("p");
        if (!heading || !bar || !text) return;
        let scale = 1;
        region.style.setProperty("--rd-scale", "1");
        const barRoom = () => {
          const style = getComputedStyle(bar);
          return bar.clientHeight - parseFloat(style.paddingTop) - parseFloat(style.paddingBottom);
        };
        const over = () =>
          heading.offsetHeight > readyHead.clientHeight * 0.96 || text.offsetHeight > barRoom();
        while (over() && scale > 0.45) {
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
        fitFreedom();
        fitReady();
        outer.style.setProperty(
          "--orbit-h",
          `calc(100svh + ${Math.round(layout.total * UNIT_VH)}vh)`
        );
        region.dataset.rows = String(layout.rows);
      };

      const hideEl = (el: HTMLElement) => {
        el.style.opacity = "0";
        el.style.visibility = "hidden";
      };
      const showEl = (el: HTMLElement) => {
        el.style.opacity = "1";
        el.style.visibility = "visible";
      };

      const render = (T: number) => {
        const { sets, swipeAt, linesAt, headAt, stripAt } = layout;
        const finalK = sets - 1;
        const size = layout.size;

        cards.forEach((card, i) => {
          const set = Math.floor(i / size);
          const s = i % size;
          const row = Math.floor(s / 2);
          const dir = s % 2 ? 1 : -1;
          // Each row starts a hair after the one above, so a set parts rather
          // than jumps. 0.1 is the most this adds, and the ranges allow for it.
          const delay = row * 0.05;
          let dx = 0;
          let hidden = false;

          if (set > 0) {
            // Coming in, from its own side, in the second half of the swipe.
            const x = (T - swipeAt(set - 1)) / SWIPE;
            if (x <= SWIPE_SPLIT) hidden = true;
            else if (x < 1) {
              const q = smooth(clamp01((x - SWIPE_SPLIT - delay) / (1 - SWIPE_SPLIT - 0.1)));
              dx = dir * out * (1 - q);
            }
          }
          if (!hidden) {
            // Going out, to its own side, in the first half of the swipe.
            const x = (T - swipeAt(set)) / SWIPE;
            if (x > 0) {
              const q = smooth(clamp01((x - delay) / (SWIPE_SPLIT - 0.1)));
              if (q >= 1) hidden = true;
              else dx = dir * out * q;
            }
          }

          if (hidden) {
            hideEl(card);
            return;
          }
          showEl(card);
          card.style.transform = `translate3d(${(dir * sx + dx).toFixed(1)}px, ${rowY[row].toFixed(1)}px, 0)`;
        });

        // The swipe to Freedom: the last set leaves (above), then the photo
        // slides to the left, growing into its column, and Freedom comes in
        // from the right at the top of the column beside it.
        const xf = (T - swipeAt(finalK)) / SWIPE;
        const ps = smooth(clamp01((xf - 0.45) / 0.55));
        photo.style.transform = `translate3d(${(photoDX * ps).toFixed(1)}px, ${(photoDY * ps - (barPx / 2) * (1 - ps)).toFixed(1)}px, 0) scale(${(1 + (photoScale - 1) * ps).toFixed(4)})`;

        const fe = smooth(clamp01((xf - 0.62) / 0.6));
        if (fe <= 0) {
          hideEl(freedom);
        } else {
          freedom.style.opacity = fe.toFixed(3);
          freedom.style.visibility = "visible";
          freedom.style.transform = `translate3d(${((1 - fe) * 80).toFixed(1)}px, 0, 0) scale(${(0.98 + 0.02 * fe).toFixed(3)})`;
        }

        // Freedom's lines arrive one by one.
        lines.forEach((el) => {
          const n = Number(el.dataset.fl ?? 0);
          const a = smooth((T - (linesAt + n * FREEDOM_LINE)) / (FREEDOM_LINE * 1.8));
          el.style.opacity = a.toFixed(3);
          el.style.transform = `translate3d(0, ${((1 - a) * 22).toFixed(1)}px, 0)`;
        });

        // The closing heading rises in under Freedom, and then the bar along
        // the bottom rises in under both.
        const he = smooth((T - headAt) / HEAD_IN);
        if (he <= 0) {
          hideEl(readyHead);
        } else {
          readyHead.style.opacity = he.toFixed(3);
          readyHead.style.visibility = "visible";
          readyHead.style.transform = `translate3d(0, ${((1 - he) * 40).toFixed(1)}px, 0)`;
        }
        const se = smooth((T - stripAt) / STRIP_IN);
        if (se <= 0) {
          hideEl(readyStrip);
        } else {
          readyStrip.style.opacity = se.toFixed(3);
          readyStrip.style.visibility = "visible";
          readyStrip.style.transform = `translate3d(0, ${((1 - se) * 56).toFixed(1)}px, 0)`;
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
        freedomFull?.style.removeProperty("--ff-scale");
        delete region.dataset.rows;
        region.style.removeProperty("--rd-scale");
        for (const el of [...all, photo, readyHead, readyStrip, ...lines]) {
          el.style.transform = "";
          el.style.opacity = "";
          el.style.visibility = "";
          el.style.zIndex = "";
          el.style.scale = "";
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
                "--pin-h": `calc(100svh + ${(pillars.length - 1) * PIN_STEP_VH}svh)`,
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
              const isFreedom = i === pillars.length - 1;
              return (
                <article
                  key={pillar.id}
                  ref={(el) => {
                    cardRefs.current[i] = el;
                  }}
                  aria-labelledby={`pillar-${pillar.id}`}
                  className={`type-orbit flex flex-col overflow-hidden rounded-[clamp(1.25rem,2vw,1.75rem)] bg-white p-[clamp(0.85rem,2.1vh,1.4rem)] text-ink shadow-[0_24px_60px_-34px_var(--shadow)] ${CAROUSEL_CARD} ${
                    scrub ? (isFreedom ? `${STAGE_FREEDOM} orbit:rounded-[clamp(1.5rem,2.2vw,2.25rem)] orbit:p-0` : STAGE_CARD) : ""
                  }`}
                >
                  <div
                    ref={(el) => {
                      innerRefs.current[i] = el;
                    }}
                    className={`flex flex-col gap-[clamp(0.3rem,0.9vh,0.65rem)] ${
                      isFreedom && scrub ? "orbit:hidden" : ""
                    }`}
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
                  {isFreedom && scrub && <FreedomFull pillar={pillar} count={pillars.length} />}
                </article>
              );
            })}
          </div>

          <SwipeHint show={active === 0} />
          <CarouselControls active={active} onGo={goTo} />
          </div>
          </div>

          <div
            ref={readyHeadRef}
            className={`mt-[clamp(3rem,9vh,6rem)] ${scrub ? STAGE_RHEAD : ""}`}
          >
            <ReadyHeading staged={scrub} />
          </div>
          <div
            ref={readyStripRef}
            className={`mt-[clamp(1.5rem,4vh,2.5rem)] ${scrub ? STAGE_RSTRIP : ""}`}
          >
            <ReadyStrip staged={scrub} />
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Freedom as one card across the whole screen, for the stage. Big writing, in
 * two columns: the title and the first and last lines on the left, and the
 * seven things that go away down the right. Each piece carries a `data-fl`
 * number, the order in which it arrives as the visitor scrolls. It is only
 * shown on the stage (the carousel and the plain grid show the ordinary card).
 */
function FreedomFull({ pillar, count }: { pillar: (typeof pillars)[number]; count: number }) {
  const paragraphs = pillar.body.filter((b): b is Extract<Block, { kind: "p" }> => b.kind === "p");
  const list = pillar.body.find((b): b is Extract<Block, { kind: "lines" }> => b.kind === "lines");
  const [imagine, ...closing] = paragraphs;
  const items = list?.items ?? [];

  return (
    <div
      data-freedom-full=""
      className="type-freedom hidden h-full w-full grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] gap-x-[clamp(2rem,5vw,6rem)] overflow-hidden p-[clamp(1.5rem,3.6vw,4.5rem)] orbit:grid"
    >
      <div className="flex min-h-0 flex-col">
        <p aria-hidden="true" className="t-fit-strong text-royal-600">
          {String(count).padStart(2, "0")} / {String(count).padStart(2, "0")}
        </p>
        <h3 className="t-mega mt-[0.15em] text-royal-gradient">{pillar.title}</h3>
        <p data-fl="0" className="t-big mt-[clamp(0.6rem,2.4vh,1.75rem)] text-ink-soft">
          {imagine.text}
        </p>
        <div className="mt-auto flex flex-col gap-[0.25em] pt-[0.8em]">
          {closing.map((p, i) => (
            <p
              key={p.text}
              data-fl={items.length + 1 + i}
              className={`t-big ${i === closing.length - 1 ? "text-royal-gradient" : "text-ink"}`}
            >
              {p.text}
            </p>
          ))}
        </div>
      </div>

      <ul className="flex min-h-0 flex-col justify-center gap-[clamp(0.5rem,1.8vh,1.5rem)]">
        {items.map((item, i) => (
          <li key={item} data-fl={i + 1} className="t-big flex items-center gap-[0.55em] text-ink">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
              className="h-[1em] w-[1em] shrink-0 text-royal-600"
            >
              <circle cx="12" cy="12" r="11" fill="currentColor" />
              <path
                d="M7.2 12.4l3.1 3.1 6.5-7.2"
                stroke="#fff"
                strokeWidth="2.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>
              <Rich text={item} />
            </span>
          </li>
        ))}
      </ul>
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
 * "Ready to take back control of your practice?" On the stage it sits at the
 * bottom right, under Freedom; on a phone, or with reduced motion, it simply
 * follows the cards, centred.
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
 * The line and the Book a Call button. On the stage they run across the whole
 * of the bottom of the screen, in a bar; on a phone, or with reduced motion,
 * they follow the heading, centred.
 */
function ReadyStrip({ staged }: { staged: boolean }) {
  return (
    <div
      className={`type-ready ${
        staged
          ? "type-ready-stage orbit:h-full orbit:max-w-none orbit:flex-row orbit:justify-between orbit:gap-[clamp(1.5rem,4vw,4rem)] orbit:rounded-[clamp(1.25rem,2vw,2rem)] orbit:border orbit:border-white/30 orbit:bg-white/[0.13] orbit:px-[clamp(1.25rem,3vw,3.25rem)] orbit:text-left"
          : ""
      } mx-auto flex max-w-[1500px] flex-col items-center px-6 text-center sm:px-10`}
    >
      <ReadyPart staged={staged} className={staged ? "orbit:flex-1" : ""}>
        <p className="t-text max-w-[46ch] text-balance text-white/95 orbit:max-w-[64ch] orbit:text-pretty">
          {readyBlock.body}
        </p>
      </ReadyPart>
      <ReadyPart staged={staged} delay={0.12} className="mt-[clamp(1.1rem,3.8vh,2.5rem)] orbit:mt-0 orbit:shrink-0">
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
