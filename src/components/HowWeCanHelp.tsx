"use client";

import { useLayoutEffect, useRef } from "react";
import { freedomContact, helpIntro, pillars, type Block } from "@/lib/pillars";
import { useReducedMotion } from "@/lib/useReducedMotion";
import BookCallButton from "./BookCallButton";
import PillarGraphic from "./PillarGraphic";
import { ScrollLine } from "./Reveal";

/**
 * How We Can Help. A lead-in, then a stack of pillar cards. Each card is
 * `position: sticky`, so as the visitor scrolls the next card rises from the
 * bottom and overlays the one before it.
 */
export default function HowWeCanHelp() {
  return (
    <section id="how-we-can-help" className="relative">
      <Intro />
      <Stack />
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

        {helpIntro.paragraphs.map((text, i) => (
          <ScrollLine key={text}>
            <p className={`max-w-[60ch] ${i === 0 ? "t-text-strong text-white" : "t-text text-white/85"}`}>
              {text}
            </p>
          </ScrollLine>
        ))}

        <ScrollLine>
          <p className="t-big text-glow text-balance">{helpIntro.closing}</p>
        </ScrollLine>
      </div>
    </div>
  );
}

const MAX_CARD_H = 760;

function Stack() {
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
    let cardH = 0;
    let gap = 0;
    let stackTop = 0;
    let frame = 0;

    // Every card shares one height: the taller of the space below the
    // header and the tallest card's own content. Cards that would not fit
    // the screen are given a sticky top above the header so their whole
    // face still scrolls into view before the next card lands on them.
    const measure = () => {
      const headerH = probe.offsetHeight;
      const edge = 16;
      const available = window.innerHeight - headerH - edge * 2;

      container.style.setProperty("--card-h", "auto");
      const tallest = Math.max(0, ...cards().map((c) => c.offsetHeight));
      // On tall screens the cards stop growing and sit centred, so the
      // illustration never floats in a huge empty panel.
      cardH = Math.max(Math.min(available, MAX_CARD_H), tallest);
      const centred = headerH + edge + Math.max(0, (available - cardH) / 2);
      stackTop = Math.min(centred, window.innerHeight - cardH - edge);

      container.style.setProperty("--card-h", `${cardH}px`);
      container.style.setProperty("--stack-top", `${stackTop}px`);
      const first = wrapperRefs.current[0];
      gap = first ? parseFloat(getComputedStyle(first).marginBottom) || 0 : 0;
    };

    // As the next card rises over a card, that card recedes slightly and
    // dims, so the stack reads as depth rather than a hard cut.
    const update = () => {
      frame = 0;
      if (reduced) return;
      const top = container.getBoundingClientRect().top;
      const step = cardH + gap;
      const list = cards();
      list.forEach((card, i) => {
        if (i >= list.length - 1) return;
        const next = top + (i + 1) * step;
        const q = 1 - Math.min(1, Math.max(0, (next - stackTop) / cardH));
        card.style.transform = q > 0 ? `scale(${1 - 0.055 * q})` : "";
        const shade = shadeRefs.current[i];
        if (shade) shade.style.opacity = String(q * 0.42);
      });
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const onResize = () => {
      measure();
      update();
    };

    measure();
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", onResize);
    document.fonts?.ready.then(onResize).catch(() => {});

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", onResize);
    };
  }, [reduced]);

  return (
    <div
      ref={containerRef}
      className="relative mx-auto max-w-[1400px] px-[clamp(0.75rem,3vw,2.5rem)] pb-[clamp(4rem,10vh,7rem)]"
      style={
        {
          "--card-h": "calc(100svh - var(--header-h) - 2rem)",
          "--stack-top": "calc(var(--header-h) + 1rem)",
          "--card-gap": "clamp(2rem, 8vh, 5rem)",
        } as React.CSSProperties
      }
    >
      <div
        ref={probeRef}
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 h-[var(--header-h)] w-0"
      />
      {pillars.map((pillar, i) => (
        <div
          key={pillar.id}
          ref={(el) => {
            wrapperRefs.current[i] = el;
          }}
          className="sticky top-[var(--stack-top)]"
          style={{
            zIndex: i + 1,
            marginBottom: i < pillars.length - 1 ? "var(--card-gap)" : 0,
          }}
        >
          <article
            ref={(el) => {
              cardRefs.current[i] = el;
            }}
            aria-labelledby={`pillar-${pillar.id}`}
            className="relative grid h-[var(--card-h)] origin-top gap-[clamp(1.25rem,3vw,3rem)] rounded-[clamp(1.25rem,2.2vw,2rem)] bg-white p-[clamp(1.1rem,2.6vh,2.25rem)] text-ink shadow-[0_-10px_36px_-24px_var(--shadow)] will-change-transform lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]"
          >
            <div className="flex min-h-0 flex-col justify-center gap-[clamp(0.45rem,1.3vh,0.9rem)]">
              <p className="t-fit-strong text-royal-600">
                {String(i + 1).padStart(2, "0")} / {String(pillars.length).padStart(2, "0")}
              </p>
              <h3 id={`pillar-${pillar.id}`} className="t-big text-ink">
                {pillar.title}
              </h3>
              <div className="flex flex-col gap-[clamp(0.4rem,1.15vh,0.8rem)]">
                {pillar.body.map((block, b) => (
                  <BlockView key={b} block={block} />
                ))}
              </div>
              {pillar.id === "freedom" && (
                <div className="mt-1 flex flex-col items-start gap-[clamp(0.6rem,1.6vh,1rem)]">
                  <p className="t-fit text-ink-soft">{freedomContact}</p>
                  <BookCallButton variant="solid" />
                </div>
              )}
            </div>

            <div className="relative hidden min-h-0 overflow-hidden rounded-[1.25rem] bg-gradient-to-br from-sky-100 via-sky-200 to-sky-300 lg:block">
              <div className="absolute inset-0 p-[clamp(0.75rem,2vh,1.5rem)]">
                <PillarGraphic id={pillar.id} />
              </div>
            </div>

            <div
              ref={(el) => {
                shadeRefs.current[i] = el;
              }}
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 rounded-[inherit] bg-royal-950 opacity-0"
            />
          </article>
        </div>
      ))}
    </div>
  );
}

function BlockView({ block }: { block: Block }) {
  switch (block.kind) {
    case "p":
      return (
        <p className={`t-fit ${block.strong ? "text-ink" : "text-ink-soft"}`}>{block.text}</p>
      );
    case "quote":
      return (
        <blockquote className="t-fit-strong border-l-[3px] border-royal-500 pl-3 text-royal-700">
          {block.text}
        </blockquote>
      );
    case "chips":
      return (
        <ul className="flex flex-wrap gap-1.5">
          {block.items.map((item) => (
            <li key={item} className="t-fit rounded-full bg-sky-100 px-3 py-0.5 text-royal-800">
              {item}
            </li>
          ))}
        </ul>
      );
    case "steps":
      return (
        <ol className="flex flex-wrap gap-2">
          {block.items.map((item, i) => (
            <li
              key={item}
              className="t-fit flex items-center gap-2 rounded-full bg-royal-600 py-1 pl-1.5 pr-3.5 text-white"
            >
              <span className="flex h-[1.5em] w-[1.5em] items-center justify-center rounded-full bg-white text-royal-700">
                {i + 1}
              </span>
              {item}
            </li>
          ))}
        </ol>
      );
    case "lines":
      return (
        <ul className="grid gap-x-6 gap-y-1 sm:grid-cols-2">
          {block.items.map((item) => (
            <li key={item} className="t-fit flex items-start gap-2 text-ink">
              <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className="mt-[0.2em] h-[1.1em] w-[1.1em] shrink-0 text-royal-500">
                <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.6" />
                <path d="M6.3 10.3 8.8 12.8 13.7 7.4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {item}
            </li>
          ))}
        </ul>
      );
  }
}
