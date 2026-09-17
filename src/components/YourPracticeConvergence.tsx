"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { painQuotes } from "@/lib/painQuotes";
import { useReducedMotion } from "@/lib/useReducedMotion";
import BookCallButton from "./BookCallButton";

gsap.registerPlugin(ScrollTrigger);

type CardStyle = React.CSSProperties & {
  "--sx"?: string;
  "--sy"?: string;
  "--sr"?: string;
  "--s"?: string | number;
};

export default function YourPracticeConvergence() {
  const reduced = useReducedMotion();

  return reduced ? <StaticPractice /> : <AnimatedPractice />;
}

function AnimatedPractice() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const reframeRef = useRef<HTMLDivElement>(null);
  const lineRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const ctaRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];
      const lines = lineRefs.current.filter(Boolean) as HTMLParagraphElement[];

      // Visible by default (not scrub-driven) so it reads naturally while
      // the tall section scrolls into place, before the pin even engages.
      gsap.set(introRef.current, { autoAlpha: 1, y: 0, scale: 1, filter: "blur(0px)" });
      // Cards start gathered at the centre, small and hidden (set via
      // inline style above), then roll outward to their scatter position:
      // the reverse of the old scatter to centre collapse, with the same
      // rotations, positions, scale and stagger, only the travel direction
      // inverts.
      gsap.set(cards, { autoAlpha: 0 });
      gsap.set(reframeRef.current, { autoAlpha: 0 });
      gsap.set(lines, { autoAlpha: 0, y: 18 });
      gsap.set(ctaRef.current, { autoAlpha: 0, y: 14 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.8,
          pin: stageRef.current,
        },
        defaults: { ease: "power2.out" },
      });

      tl.to(
        introRef.current,
        {
          autoAlpha: 0,
          y: -20,
          scale: 1.05,
          filter: "blur(10px)",
          duration: 0.45,
          ease: "power2.in",
        },
        0.3
      );

      // Gather at the centre first.
      tl.to(
        cards,
        {
          autoAlpha: 1,
          duration: 0.5,
          ease: "power2.out",
          stagger: { each: 0.035, from: "random" },
        },
        1.0
      );

      // Then roll outward to each card's own scatter position.
      tl.to(
        cards,
        {
          "--sx": (i: number) => `${painQuotes[i].x}vw`,
          "--sy": (i: number) => `${painQuotes[i].y}vh`,
          "--sr": (i: number) => `${painQuotes[i].rotate}deg`,
          "--s": 1,
          duration: 1.1,
          ease: "power1.inOut",
          stagger: { each: 0.05, from: "random" },
        },
        1.7
      );

      tl.to(
        cards,
        { autoAlpha: 0, duration: 0.5, ease: "power2.in" },
        3.2
      );

      tl.to(
        bgRef.current,
        {
          backgroundColor: "var(--color-paper)",
          duration: 0.8,
          ease: "power1.inOut",
        },
        3.1
      ).to(
        glowRef.current,
        { opacity: 1, duration: 0.9, ease: "power1.out" },
        3.2
      );

      tl.set(reframeRef.current, { autoAlpha: 1 }, 3.7);

      lines.forEach((line, i) => {
        tl.to(
          line,
          { autoAlpha: 1, y: 0, duration: 0.55, ease: "power2.out" },
          3.75 + i * 0.45
        );
      });

      tl.to(
        ctaRef.current,
        { autoAlpha: 1, y: 0, duration: 0.5, ease: "power2.out" },
        3.75 + lines.length * 0.45 + 0.15
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="your-practice"
      ref={sectionRef}
      className="relative h-[400vh] md:h-[520vh]"
    >
      <div
        ref={stageRef}
        className="relative h-[100svh] overflow-hidden bg-paper-dim"
      >
        <div
          ref={bgRef}
          className="absolute inset-0"
          style={{ backgroundColor: "var(--color-paper-dim)" }}
        />
        <div
          ref={glowRef}
          className="absolute inset-0 opacity-0"
          style={{
            background:
              "radial-gradient(60% 50% at 50% 45%, rgba(108,99,255,0.14), transparent 70%)",
          }}
        />
        <div className="structural-grid" />

        <div
          ref={introRef}
          className="pointer-events-none absolute inset-0 flex items-center justify-center px-6 opacity-0"
          style={{ transform: "translateY(14px)" }}
        >
          <h2 className="max-w-[18ch] text-balance text-center font-display text-[clamp(2.75rem,9vw,7.5rem)] font-medium leading-[0.98] tracking-tight text-ink">
            Does this feel familiar?
          </h2>
        </div>

        <div className="pointer-events-none absolute inset-0">
          {painQuotes.map((q, i) => {
            const style: CardStyle = {
              width: `clamp(148px, 46vw, ${q.width}px)`,
              "--sx": "0vw",
              "--sy": "0vh",
              "--sr": "0deg",
              "--s": 0.32,
              transform:
                "translate(-50%, -50%) translate(calc(var(--sx) * var(--scatter-scale)), calc(var(--sy) * var(--scatter-scale))) rotate(var(--sr)) scale(var(--s))",
              opacity: 0,
            };
            return (
              <div
                key={q.topic}
                ref={(el) => {
                  cardsRef.current[i] = el;
                }}
                style={style}
                className="absolute left-1/2 top-1/2 rounded-xl border border-ink/10 bg-paper py-4 pl-4.5 pr-4.5 shadow-[0_20px_45px_-30px_rgba(13,22,17,0.45)] will-change-transform"
              >
                <span className="inline-block rounded-full bg-mist-line/60 px-2.5 py-1 text-[12px] font-semibold text-mist-dim">
                  {q.topic}
                </span>
                <p className="mt-2.5 font-display text-[16px] font-semibold leading-[1.2] text-ink sm:text-[18px]">
                  &ldquo;{q.quote}&rdquo;
                </p>
              </div>
            );
          })}
        </div>

        <div
          ref={reframeRef}
          className="absolute inset-0 flex flex-col items-center justify-center gap-5 px-6 text-center opacity-0 sm:gap-7"
        >
          <p
            ref={(el) => {
              lineRefs.current[0] = el;
            }}
            className="max-w-[22ch] text-balance font-display text-[clamp(2rem,5.5vw,4rem)] font-bold leading-[1.05] tracking-tight text-ink"
          >
            Most practice owners don&apos;t have a{" "}
            <span className="text-moss-text/70">dentistry problem</span>.
          </p>
          <p
            ref={(el) => {
              lineRefs.current[1] = el;
            }}
            className="max-w-[22ch] text-balance font-display text-[clamp(2rem,5.5vw,4rem)] font-bold leading-[1.05] tracking-tight text-ink"
          >
            They have a <span className="text-moss-text">business problem</span>.
          </p>
          <p
            ref={(el) => {
              lineRefs.current[2] = el;
            }}
            className="max-w-[34ch] text-balance text-xl font-medium leading-[1.35] text-moss-text/60 sm:text-3xl"
          >
            If this sounds familiar, you are not alone.
          </p>
          <p
            ref={(el) => {
              lineRefs.current[3] = el;
            }}
            className="max-w-[22ch] text-balance font-display text-[clamp(2.25rem,6.5vw,5.5rem)] font-bold leading-[1.02] tracking-tight text-moss-text"
          >
            Dental Growth Lab helps you change that.
          </p>
          <div ref={ctaRef} className="mt-2 opacity-0 sm:mt-4">
            <BookCallButton className="px-9 py-4 text-base" />
          </div>
        </div>
      </div>
    </section>
  );
}

function StaticPractice() {
  return (
    <section id="your-practice" className="relative bg-paper-dim py-24">
      <div className="structural-grid" />
      <div className="relative mx-auto max-w-[1100px] px-6 sm:px-10">
        <h2 className="text-center font-display text-[clamp(2.5rem,7vw,4.5rem)] font-medium tracking-tight text-ink">
          Does this feel familiar?
        </h2>

        <div className="mt-14 grid gap-4 sm:grid-cols-2">
          {painQuotes.map((q) => (
            <div
              key={q.topic}
              className="rounded-xl border border-ink/10 bg-paper p-5"
            >
              <span className="inline-block rounded-full bg-mist-line/60 px-2.5 py-1 text-[12px] font-semibold text-mist-dim">
                {q.topic}
              </span>
              <p className="mt-2.5 font-display text-[16px] font-semibold leading-[1.2] text-ink">
                &ldquo;{q.quote}&rdquo;
              </p>
            </div>
          ))}
        </div>

        <div className="mt-20 flex flex-col items-center gap-5 text-center sm:gap-7">
          <p className="max-w-[22ch] text-balance font-display text-[clamp(2rem,5.5vw,4rem)] font-bold leading-[1.05] tracking-tight text-ink">
            Most practice owners don&apos;t have a{" "}
            <span className="text-moss-text/70">dentistry problem</span>.
          </p>
          <p className="max-w-[22ch] text-balance font-display text-[clamp(2rem,5.5vw,4rem)] font-bold leading-[1.05] tracking-tight text-ink">
            They have a <span className="text-moss-text">business problem</span>.
          </p>
          <p className="max-w-[34ch] text-balance text-xl font-medium leading-[1.35] text-moss-text/60 sm:text-3xl">
            If this sounds familiar, you are not alone.
          </p>
          <p className="max-w-[22ch] text-balance font-display text-[clamp(2.25rem,6.5vw,5.5rem)] font-bold leading-[1.02] tracking-tight text-moss-text">
            Dental Growth Lab helps you change that.
          </p>
          <div className="mt-2 sm:mt-4">
            <BookCallButton className="px-9 py-4 text-base" />
          </div>
        </div>
      </div>
    </section>
  );
}
