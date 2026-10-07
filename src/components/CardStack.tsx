"use client";

import { useLayoutEffect, useRef, type CSSProperties, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/lib/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

/** How many earlier cards show behind the top one in a pile, and by how much each. */
const PEEKS = 3;
const PEEK_PX = 14;
const PEEK_SCALE = 0.04;
const PEEK_SHADE = 0.14;

/** The finale's exit takes this share of a screen of scrolling, and lifts it by this share of its bottom edge. */
const EXIT_SPAN = 0.5;
const EXIT_LIFT = 0.7;

/** The piles are gone once the finale has risen this far over them, having slid out by this share of the screen width and tilted this many degrees. */
const LEAVE_BY = 0.9;
const LEAVE_TRAVEL = 0.62;
const LEAVE_TILT = 5;

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

/**
 * The rolodex, two up. Two piles of cards side by side with a gap between
 * them, the cards dealt in pairs: card one and card two arrive together, one
 * on each pile, then card three and card four land on top of them, and so on.
 * Each card is `position: sticky`, so as the visitor scrolls a new pair rises
 * from below and lands on its piles. The cards underneath sink back (a little
 * smaller, dimmer, and a sliver higher), so two cards are always on screen
 * with a deck behind each. With an odd number of cards the last one before the
 * finale lands on the left pile alone, and the right pile keeps its top card.
 *
 * Pairs arrive `stepRatio` of a card height apart, so the whole run is fast.
 *
 * The last card is the finale. As it rises, every other card leaves: the piles
 * slide outward and fade, so by the time it lands it is the only card on the
 * screen. It is taller (`lastGrow`), arrives after a short `finalLead` of
 * quiet scrolling, and is held for `lastHold`, then lifts away quickly so
 * nothing is left over whatever comes next. Under 768px there is one pile.
 */
export default function CardStack({
  count,
  renderCard,
  labels,
  maxCardH,
  maxCardHSmall,
  stepRatio = 0.9,
  stepRatioSmall = 0.62,
  finalLead = 0.55,
  gap = "clamp(1rem, 4vh, 2.5rem)",
  articleClassName = "",
  lastArticleClassName,
  lastGrow = 1,
  lastHold = "0px",
  shadeClassName = "bg-black",
  className = "",
}: {
  count: number;
  renderCard: (index: number, isLast: boolean) => ReactNode;
  /** An accessible name for each card. */
  labels: string[];
  maxCardH: number;
  /** On a phone (one pile) the cards are shorter, so the run is quicker. */
  maxCardHSmall?: number;
  /** Scroll between one pair arriving and the next, as a share of a card height. */
  stepRatio?: number;
  /** The same on a phone, where cards land one at a time. */
  stepRatioSmall?: number;
  /** Extra quiet scroll before the last card, as a share of a card height. */
  finalLead?: number;
  /** The scroll gap between cards when there is only one pile. */
  gap?: string;
  articleClassName?: string;
  /** Replaces `articleClassName` on the last card. */
  lastArticleClassName?: string;
  /** How much taller than the others the last card is. */
  lastGrow?: number;
  /** How much further the last card stays pinned, as a CSS length. */
  lastHold?: string;
  /** The colour the cards dim towards as others land on them. */
  shadeClassName?: string;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const probeRef = useRef<HTMLDivElement>(null);
  const wrapperRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const shadeRefs = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const probe = probeRef.current;
    if (!container || !probe) return;

    const cards = () => cardRefs.current.filter(Boolean) as HTMLElement[];
    let cols = 2;
    let cardH = 0;
    let lastH = 0;
    let step = 0;
    let lead = 0;
    let stackTop = 0;
    let stackTopLast = 0;

    const measure = () => {
      cols = window.matchMedia("(min-width: 768px)").matches ? 2 : 1;
      const limit = cols === 1 && maxCardHSmall ? maxCardHSmall : maxCardH;
      const headerH = probe.offsetHeight;
      const edge = 16;
      const peekRoom = PEEKS * PEEK_PX;
      const available = window.innerHeight - headerH - edge * 2 - peekRoom;

      container.style.setProperty("--card-h", "auto");
      container.style.setProperty("--card-h-last", "auto");
      const list = cards();
      const normal = list.slice(0, -1);
      const tallest = Math.max(0, ...normal.map((c) => c.offsetHeight));
      cardH = Math.max(Math.min(available, limit), tallest);
      const centred = headerH + edge + peekRoom + Math.max(0, (available - cardH) / 2);
      stackTop = Math.min(centred, window.innerHeight - cardH - edge);

      // The finale card grows about its centre, as far as the screen allows.
      const lastNatural = list.length ? list[list.length - 1].offsetHeight : cardH;
      lastH = Math.max(Math.min(available, Math.round(cardH * lastGrow)), lastNatural, cardH);
      stackTopLast = Math.max(headerH + edge, stackTop - (lastH - cardH) / 2);
      lastH = Math.min(lastH, window.innerHeight - edge - stackTopLast);

      if (cols === 2) {
        step = Math.round(cardH * stepRatio);
        lead = Math.round(cardH * finalLead);
        container.style.setProperty("--card-mb", `${step - cardH}px`);
        container.style.setProperty("--final-lead", `${lead}px`);
      } else {
        step = Math.round(cardH * stepRatioSmall);
        lead = Math.round(cardH * finalLead * 0.6);
        container.style.setProperty("--card-mb", `${step - cardH}px`);
        container.style.setProperty("--final-lead", `${lead}px`);
      }

      container.style.setProperty("--card-h", `${cardH}px`);
      container.style.setProperty("--card-h-last", `${lastH}px`);
      container.style.setProperty("--stack-top", `${stackTop}px`);
      container.style.setProperty("--stack-top-last", `${stackTopLast}px`);
    };

    const update = () => {
      if (reduced) return;
      const list = cards();
      const n = list.length;
      const rect = container.getBoundingClientRect();
      const top = rect.top;
      const last = n - 1;
      const stuckTop = (j: number) => (j === last ? stackTopLast : stackTop);
      const heightOf = (j: number) => (j === last ? lastH : cardH);
      // The flow line a card sits on: cards in a pair share one, and the
      // finale has a line of its own after the last pair.
      const lineOf = (j: number) => (j === last ? Math.ceil(last / cols) : Math.floor(j / cols));
      const posOf = (j: number) => top + lineOf(j) * step + (j === last ? lead : 0);

      // arrival[j]: how far card j has risen over the pile it is landing on,
      // 0 while it is still below the card it will cover, 1 once it has
      // landed. The finale covers the top card of both piles.
      const arrival = list.map((_, j) => {
        const under = j === last ? Math.max(0, j - cols) : j - cols;
        if (under < 0) return 1;
        const underBottom =
          j === last ? stackTop + cardH : stuckTop(under) + heightOf(under);
        const covers = underBottom - stuckTop(j);
        return 1 - clamp01((posOf(j) - stuckTop(j)) / covers);
      });

      // The piles leave as the finale rises. Each pile slides out sideways,
      // solid and fanning a little, off its own edge of the screen, so by the
      // time the finale has landed it is the only card left and holds on a
      // clear stage. Nothing fades, so no card ever shows the writing of the
      // one beneath it.
      const finale = arrival[last];
      const leave = clamp01(finale / LEAVE_BY);
      const leaveE = leave * leave * (3 - 2 * leave);
      const slide = leaveE * window.innerWidth * LEAVE_TRAVEL;

      // The finale itself leaves once its hold is over: it lifts up the screen
      // over EXIT_SPAN of a screen, solid, ahead of whatever comes next.
      const exitStart = stackTopLast + lastH;
      const exit = clamp01((exitStart - rect.bottom) / (window.innerHeight * EXIT_SPAN));
      const lift = exit * exit * (3 - 2 * exit);

      // A card's depth is the sum of the arrivals of every card landing on
      // its pile above it. A card more than PEEKS deep is completely covered,
      // so it is not drawn at all: that keeps the number of live layers small,
      // which is what keeps this smooth on a phone.
      const depthByPile = [0, 0];
      for (let i = last; i >= 0; i--) {
        const pile = cols === 1 ? 0 : i % 2;
        const raw = i === last ? 0 : depthByPile[pile];
        const d = Math.min(raw, PEEKS);
        // With a single pile (a phone) the finale is as wide as the pile and
        // covers it, so nothing needs to slide sideways, and nothing may,
        // because anything sliding off the side widens the page on a phone.
        const dx = i === last || cols === 1 ? 0 : pile === 0 ? -slide : slide;
        const up = d * PEEK_PX + (i === last ? lift * (stackTopLast + lastH) * EXIT_LIFT : 0);
        const transform =
          up > 0 || d > 0 || dx !== 0
            ? `translate3d(${dx.toFixed(1)}px, ${(-up).toFixed(1)}px, 0) rotate(${((dx / (window.innerWidth * LEAVE_TRAVEL || 1)) * LEAVE_TILT).toFixed(2)}deg) scale(${(1 - PEEK_SCALE * d).toFixed(4)})`
            : "";
        const covered = i !== last && (leave >= 1 || raw > PEEKS + 0.02);
        const el = list[i];
        // Only touch the style when the value has changed.
        if (el.dataset.t !== transform) {
          el.dataset.t = transform;
          el.style.transform = transform;
        }
        const vis = covered ? "hidden" : "";
        if (el.dataset.v !== vis) {
          el.dataset.v = vis;
          el.style.visibility = vis;
        }
        const shade = shadeRefs.current[i];
        if (shade) {
          const o = (d * PEEK_SHADE).toFixed(3);
          if (shade.dataset.o !== o) {
            shade.dataset.o = o;
            shade.style.opacity = o;
          }
        }
        if (i !== last) depthByPile[pile] += arrival[i];
      }
    };

    // On a phone the page is scrolled natively (the compositor moves it, and
    // the sticky cards with it), so the depth effect follows the scroll event
    // on the next frame: the quickest a script can follow, and the same on
    // every touch screen. On a laptop or desktop the smooth scroll engine
    // moves the page and updates ScrollTrigger in the same tick, so the effect
    // is driven from there and lands in the same frame as the page.
    const touch = window.matchMedia("(pointer: coarse)").matches;
    let lastW = window.innerWidth;
    // On a phone, Safari's toolbars sliding away change the height of the
    // screen as the visitor scrolls. That must not re-lay the stack out under
    // their thumb, so only a change of width (a rotation) counts.
    const onResize = () => {
      if (touch && window.innerWidth === lastW) return;
      lastW = window.innerWidth;
      measure();
      update();
    };

    measure();
    update();

    let frame = 0;
    const schedule = () => {
      if (!frame)
        frame = requestAnimationFrame(() => {
          frame = 0;
          update();
        });
    };
    const trigger =
      reduced || touch
        ? null
        : ScrollTrigger.create({
            trigger: container,
            start: "top bottom",
            end: "bottom top",
            onUpdate: update,
            onRefresh: () => {
              measure();
              update();
            },
          });
    if (touch && !reduced) window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", onResize);
    document.fonts?.ready.then(onResize).catch(() => {});

    return () => {
      trigger?.kill();
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", onResize);
    };
  }, [reduced, maxCardH, maxCardHSmall, count, lastGrow, stepRatio, stepRatioSmall, finalLead, gap]);

  return (
    <div
      ref={containerRef}
      className={`relative flex flex-wrap items-start justify-between ${className}`}
      style={
        {
          "--card-h": `min(${maxCardH}px, calc(100svh - var(--header-h) - 2rem))`,
          "--card-h-last": `min(${maxCardH}px, calc(100svh - var(--header-h) - 2rem))`,
          "--stack-top": "calc(var(--header-h) + 3rem)",
          "--stack-top-last": "calc(var(--header-h) + 3rem)",
          "--card-mb": gap,
          "--final-lead": "0px",
        } as CSSProperties
      }
    >
      <div
        ref={probeRef}
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 h-[var(--header-h)] w-0"
      />
      {Array.from({ length: count }, (_, i) => {
        const isLast = i === count - 1;
        return (
          <div
            key={i}
            ref={(el) => {
              wrapperRefs.current[i] = el;
            }}
            className={`sticky w-full ${
              isLast
                ? "top-[var(--stack-top-last)]"
                : "top-[var(--stack-top)] md:w-[calc(50%-0.75rem)]"
            }`}
            style={{
              zIndex: i + 1,
              marginBottom: isLast ? 0 : "var(--card-mb)",
              marginTop: isLast ? "var(--final-lead)" : 0,
            }}
          >
            <article
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              aria-label={labels[i]}
              className={`relative origin-top will-change-transform ${
                isLast ? "h-[var(--card-h-last)]" : "h-[var(--card-h)]"
              } ${isLast && lastArticleClassName !== undefined ? lastArticleClassName : articleClassName}`}
            >
              {renderCard(i, isLast)}
              <div
                ref={(el) => {
                  shadeRefs.current[i] = el;
                }}
                aria-hidden="true"
                className={`pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 ${shadeClassName}`}
              />
            </article>
          </div>
        );
      })}
      {/* Keeps the last card pinned for a while before the stack lets go. */}
      <div aria-hidden="true" className="w-full" style={{ height: lastHold }} />
    </div>
  );
}
