"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { familiarHeading, painQuotes, type PainQuote } from "@/lib/familiar";
import {
  CARD_SIZE,
  FINALE_LEN,
  GATHER_AT,
  GATHER_LEN,
  GATHER_STEP,
  HOLD_LEN,
  LAYOUTS,
  LIFT_LEN,
  PHONE_JOINERS,
  RUN_SCREENS,
  SHORT_JOINERS,
  SHORT_PHONE,
  SHORT_PHONE_JOINERS,
  SHORT_SCREEN,
  type ScatterMode,
} from "@/lib/scatter";
import { SCRUB } from "@/lib/scrollFeel";
import { useReducedMotion } from "@/lib/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

/** The first ten quotes are scattered then gathered; the last one is the finale. */
const SCATTERED = painQuotes.slice(0, -1);
const FINALE = painQuotes[painQuotes.length - 1];

/** How far each card in the pile sits above the one on top of it, in px. */
const PILE_STEP = 3;
/** Clear space kept round the heading text and between cards, in px. */
const HEAD_GAP = 14;
const CARD_GAP = 3;

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

const label = (q: PainQuote, i: number) => `${q.tag}, ${i + 1} of ${painQuotes.length}`;

const CARD_SHADOW =
  "shadow-[0_0.8em_1.8em_-0.8em_oklch(0.14_0.09_264/0.75)]";
const FINALE_CLASS =
  "type-finale rounded-[clamp(1.5rem,2.6vw,2.5rem)] bg-white text-ink-black shadow-[0_34px_90px_-30px_oklch(0.12_0.09_264/0.9)] max-md:shadow-[0_12px_26px_-14px_oklch(0.12_0.09_264/0.8)]";

/**
 * The pain-point section, "Do any of these sound familiar?..." into the pile.
 *
 * The section pins. Ten white cards sit scattered round the heading, each a
 * little tilted, and drift as the visitor scrolls. They are then gathered to
 * the centre one after another, in the order of the copy, into one tidy pile
 * just in front of the heading (which fades back behind it). The last quote, the frustration
 * one, rises from the bottom, bigger, onto the pile and is held. Then the pile
 * and that card lift away and the next stage ("Dental Growth Lab can fix this")
 * takes over.
 *
 * One GSAP timeline holds the lot, transforms and opacity only. On a laptop or
 * desktop ScrollTrigger scrubs it; on a touch screen the page scrolls natively,
 * so the timeline follows the scroll event on the next frame instead, which is
 * what keeps the phone free of judder. Reduced motion gets a plain list.
 */
export default function PainScatter() {
  const reduced = useReducedMotion();
  return reduced ? <PainList /> : <ScatterStage />;
}

function CardBody({
  q,
  variant,
}: {
  q: PainQuote;
  variant: "scatter" | "list" | "finale";
}) {
  const scatter = variant === "scatter";
  return (
    <figure
      className={`flex h-full flex-col ${
        scatter
          ? "type-scatter-card gap-[0.55em] p-[0.9em]"
          : "gap-4 p-[clamp(1.25rem,2.6vw,2.25rem)]"
      }`}
    >
      <figcaption>
        <span
          className={`t-text-strong inline-block rounded-full bg-ink-black/[0.07] text-ink-black ${
            scatter ? "px-[0.9em] py-[0.12em]" : "px-4 py-1"
          }`}
        >
          {q.tag}
        </span>
      </figcaption>
      <blockquote
        className={`t-big text-ink-black ${
          scatter
            ? "flex min-h-0 flex-1 items-center overflow-hidden"
            : "flex flex-1 items-start text-balance md:items-center"
        }`}
      >
        <p>&ldquo;{q.quote}&rdquo;</p>
      </blockquote>
    </figure>
  );
}

function ScatterStage() {
  const outerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const fieldRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLHeadingElement>(null);
  const headTextRef = useRef<HTMLSpanElement>(null);
  const finaleRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);

  useLayoutEffect(() => {
    const outer = outerRef.current;
    const stage = stageRef.current;
    const field = fieldRef.current;
    const head = headRef.current;
    const headText = headTextRef.current;
    const finale = finaleRef.current;
    const cards = cardRefs.current.filter(Boolean) as HTMLElement[];
    if (!outer || !stage || !field || !head || !headText || !finale || cards.length === 0) return;

    const touch = window.matchMedia("(pointer: coarse)").matches;
    let ctx: gsap.Context | null = null;
    let detach: (() => void) | null = null;
    let lastW = window.innerWidth;

    const build = () => {
      detach?.();
      detach = null;
      ctx?.revert();

      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const mode: ScatterMode = vw < 768 ? "phone" : vw < 1024 || vw / vh < 1.1 ? "tablet" : "wide";
      const short = mode === "wide" && vh < SHORT_SCREEN;
      const joiners =
        mode === "phone"
          ? vh < SHORT_PHONE
            ? SHORT_PHONE_JOINERS
            : PHONE_JOINERS
          : short
            ? SHORT_JOINERS
            : [];
      const slots = LAYOUTS[mode];
      const size = CARD_SIZE[mode];
      const fw = field.clientWidth;
      const fh = field.clientHeight;
      const last = cards.length - 1;
      const onScreen = slots.map((_, i) => i).filter((i) => !joiners.includes(i));

      // Place every card by its fixed percentages.
      cards.forEach((card, i) => {
        card.style.left = `${slots[i].x}%`;
        card.style.top = `${slots[i].y}%`;
      });

      const apply = (w: number, ar: number, t: number) =>
        cards.forEach((card) => {
          card.style.width = `${w}px`;
          card.style.height = `${w * ar}px`;
          card.style.fontSize = `${w * size.fs * t}px`;
        });

      // 1. The text must fit its card: shrink it, then make the cards taller.
      const base = clamp(fw * size.wFrac, size.min, size.max);
      const overflows = () =>
        cards.some((card) => {
          const q = card.querySelector("blockquote");
          return !!q && q.scrollHeight > q.clientHeight + 1;
        });
      let ar = size.ar;
      let t = 1;
      for (let grow = 0; grow < 4; grow++) {
        ar = size.ar + grow * 0.06;
        t = 1;
        apply(base, ar, t);
        while (overflows() && t > 0.72) {
          t -= 0.04;
          apply(base, ar, t);
        }
        if (!overflows()) break;
      }

      // 2. The scattered cards must clear the heading, each other and the
      // edges, at rest and at the far end of their drift. Shrink until they do.
      const fieldBox = field.getBoundingClientRect();
      const text = headText.getBoundingClientRect();
      const keepOut = {
        l: text.left - fieldBox.left - HEAD_GAP,
        r: text.right - fieldBox.left + HEAD_GAP,
        t: text.top - fieldBox.top - HEAD_GAP,
        b: text.bottom - fieldBox.top + HEAD_GAP,
      };
      type Box = { l: number; r: number; t: number; b: number };
      const hit = (a: Box, b: Box, gap = 0) =>
        a.l < b.r + gap && a.r > b.l - gap && a.t < b.b + gap && a.b > b.t - gap;
      const fits = (w: number) => {
        const h = w * ar;
        for (const drifted of [false, true]) {
          const boxes = onScreen.map((i) => {
            const s = slots[i];
            const a = (Math.abs(s.r) + (drifted ? Math.abs(s.dr) : 0)) * (Math.PI / 180);
            const hw = (w / 2) * Math.cos(a) + (h / 2) * Math.sin(a);
            const hh = (w / 2) * Math.sin(a) + (h / 2) * Math.cos(a);
            const cx = (s.x / 100) * fw + (drifted ? (s.dx / 100) * fw : 0);
            const cy = (s.y / 100) * fh + (drifted ? (s.dy / 100) * fh : 0);
            return { l: cx - hw, r: cx + hw, t: cy - hh, b: cy + hh };
          });
          for (let a = 0; a < boxes.length; a++) {
            const bx = boxes[a];
            if (bx.l < 3 || bx.t < 3 || bx.r > fw - 3 || bx.b > fh - 3) return false;
            if (hit(bx, keepOut)) return false;
            for (let b = a + 1; b < boxes.length; b++) {
              if (hit(bx, boxes[b], CARD_GAP)) return false;
            }
          }
        }
        return true;
      };
      let scale = 1;
      while (!fits(base * scale) && scale > 0.5) scale -= 0.03;
      const w = base * scale;
      apply(w, ar, t);

      // 3. Where the pile sits, and how big its cards are.
      const pileW = Math.min(
        clamp(fw * size.pileFrac, size.pileMin, size.pileMax),
        (fh * 0.62) / ar,
      );
      const pileScale = pileW / w;
      const finaleRise = fh / 2 + finale.offsetHeight / 2 + 24;

      const finaleAt = GATHER_AT + last * GATHER_STEP + GATHER_LEN + 0.1;
      const liftAt = finaleAt + FINALE_LEN + HOLD_LEN;

      ctx = gsap.context(() => {
        const tl = gsap.timeline({
          paused: touch,
          defaults: { ease: "none" },
          scrollTrigger: touch
            ? undefined
            : {
                trigger: outer,
                start: "top top",
                end: "bottom bottom",
                scrub: SCRUB,
              },
        });

        gsap.set([...cards, finale], { xPercent: -50, yPercent: -50, force3D: true });

        cards.forEach((card, i) => {
          const s = slots[i];
          const cx = (s.x / 100) * fw;
          const cy = (s.y / 100) * fh;
          const start = GATHER_AT + i * GATHER_STEP;
          const toX = fw / 2 - cx;
          const toY = fh / 2 - cy + (i - last) * PILE_STEP;
          const gather = { x: toX, y: toY, rotation: 0, scale: pileScale, duration: GATHER_LEN, ease: "power2.inOut" };

          if (joiners.includes(i)) {
            // Not on screen at the start: slides in from the side as its turn comes.
            const side = s.x < 50 ? -1 : s.x > 50 ? 1 : joiners.indexOf(i) % 2 === 0 ? -1 : 1;
            const out = side < 0 ? -(cx + w * 0.75 + 16) : fw - cx + w * 0.75 + 16;
            tl.fromTo(card, { x: out, y: 0, rotation: side * 7, scale: 1 }, gather, start);
            return;
          }

          const dx = (s.dx / 100) * fw;
          const dy = (s.dy / 100) * fh;
          // Drift while waiting, easing to a stop as the turn comes round...
          tl.fromTo(
            card,
            { x: 0, y: 0, rotation: s.r, scale: 1 },
            { x: dx, y: dy, rotation: s.r + s.dr, duration: start, ease: "sine.out" },
            0,
          );
          // ...then gather into the pile.
          tl.fromTo(
            card,
            { x: dx, y: dy, rotation: s.r + s.dr, scale: 1 },
            { ...gather, immediateRender: false },
            start,
          );
        });

        // The heading steps back as the pile forms, and goes as it lifts away.
        tl.fromTo(head, { opacity: 1 }, { opacity: 0.15, duration: 2.6, ease: "power1.inOut" }, GATHER_AT + 0.4);
        tl.to(head, { opacity: 0, duration: LIFT_LEN * 0.6, ease: "power1.in" }, liftAt);

        // Frustration rises from the bottom onto the pile, and is held.
        tl.fromTo(finale, { opacity: 0 }, { opacity: 1, duration: 0.1 }, finaleAt);
        tl.fromTo(
          finale,
          { y: finaleRise },
          { y: 0, duration: FINALE_LEN, ease: "power3.out" },
          finaleAt,
        );

        // The pile and Frustration lift away together.
        tl.to(field, { y: -(fh + 120), duration: LIFT_LEN, ease: "power2.in" }, liftAt);

        if (touch) {
          let frame = 0;
          const progress = () => {
            const run = outer.offsetHeight - stage.offsetHeight;
            const top = outer.getBoundingClientRect().top;
            tl.progress(clamp(run > 0 ? -top / run : 0, 0, 1));
          };
          const schedule = () => {
            if (!frame)
              frame = requestAnimationFrame(() => {
                frame = 0;
                progress();
              });
          };
          window.addEventListener("scroll", schedule, { passive: true });
          progress();
          detach = () => {
            window.removeEventListener("scroll", schedule);
            if (frame) cancelAnimationFrame(frame);
          };
        }
      }, stage);
    };

    build();

    // Safari's toolbars sliding away change the height as the visitor scrolls.
    // That must not rebuild the sequence under their thumb, so on a touch
    // screen only a change of width (a rotation) counts.
    let timer = 0;
    const onResize = () => {
      if (touch && window.innerWidth === lastW) return;
      lastW = window.innerWidth;
      window.clearTimeout(timer);
      timer = window.setTimeout(build, 120);
    };
    window.addEventListener("resize", onResize);
    document.fonts?.ready.then(build).catch(() => {});

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("resize", onResize);
      detach?.();
      ctx?.revert();
    };
  }, []);

  return (
    <div
      ref={outerRef}
      id="pain-scatter"
      style={{ height: `${(1 + RUN_SCREENS) * 100}svh` }}
    >
      <div
        ref={stageRef}
        className="sticky top-0 overflow-clip"
        style={{ height: "calc(100svh - var(--bottom-bar-h))" }}
      >
        <div className="type-scatter pointer-events-none absolute inset-x-0 bottom-0 top-[var(--header-h)] z-0 flex items-center justify-center px-6">
          <h2
            ref={headRef}
            className="t-big max-w-[34%] text-balance text-center text-white max-lg:max-w-[62%] max-md:max-w-[80%]"
          >
            <span ref={headTextRef} className="inline-block">
              {familiarHeading}
            </span>
          </h2>
        </div>

        <div
          ref={fieldRef}
          className="pointer-events-none absolute inset-x-0 bottom-0 top-[var(--header-h)] z-10"
        >
          {SCATTERED.map((q, i) => (
            <article
              key={i}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              aria-label={label(q, i)}
              className={`absolute w-[clamp(11rem,17vw,20rem)] rounded-[1.1em] bg-white text-ink-black ${CARD_SHADOW}`}
              style={{ left: `${LAYOUTS.wide[i].x}%`, top: `${LAYOUTS.wide[i].y}%`, zIndex: i + 1 }}
            >
              <CardBody q={q} variant="scatter" />
            </article>
          ))}
          <article
            ref={finaleRef}
            aria-label={label(FINALE, painQuotes.length - 1)}
            className={`absolute left-1/2 top-1/2 w-[min(36rem,88%)] opacity-0 ${FINALE_CLASS}`}
            style={{ zIndex: 30 }}
          >
            <CardBody q={FINALE} variant="finale" />
          </article>
        </div>

      </div>
    </div>
  );
}

/** Reduced motion: the heading, then all eleven cards in one column, Frustration last. */
function PainList() {
  return (
    <div className="type-card mx-auto max-w-[44rem] px-6 pb-[clamp(2rem,6vh,4rem)] pt-[calc(var(--header-h)+clamp(3rem,10vh,6rem))] sm:px-10">
      <h2 className="t-big text-balance text-center text-white">{familiarHeading}</h2>
      <ol className="mt-[clamp(1.5rem,5vh,3rem)] flex flex-col gap-4">
        {painQuotes.map((q, i) => {
          const isLast = i === painQuotes.length - 1;
          return (
            <li
              key={i}
              aria-label={label(q, i)}
              className={
                isLast
                  ? FINALE_CLASS
                  : `rounded-[clamp(1.25rem,2.2vw,2rem)] bg-white text-ink-black shadow-[0_14px_30px_-18px_oklch(0.14_0.09_264/0.8)]`
              }
            >
              <CardBody q={q} variant={isLast ? "finale" : "list"} />
            </li>
          );
        })}
      </ol>
    </div>
  );
}
