"use client";

import { useLayoutEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  boughtDetails,
  soldDetails,
  statRows,
  turnoverStat,
  type StatRow,
} from "@/lib/storyStats";
import { useReducedMotion } from "@/lib/useReducedMotion";
import BookCallButton from "./BookCallButton";

gsap.registerPlugin(ScrollTrigger);

const ease = [0.22, 1, 0.36, 1] as const;

const JOURNEY_LEAD_IN =
  "These are real numbers from a practice I bought in February 2018 and sold in December 2023, ending fully associate-led after I stopped clinical dentistry.";

const INTRO_LINES = [
  "My name is Pujan Soni.",
  "I've bought four dental practices and sold three.",
  "Everything you've experienced, I've been through.",
  "Then, a few years ago, I changed.",
];

const CLOSING_LINES = [
  "But the important part isn't the numbers.",
  "It's what happened in between.",
  "I took accountability. I took responsibility.",
  "I changed the people, the structure, the meetings, how we measured performance, and the systems.",
  "I became a leader. Eventually, the practice stopped depending on me.",
];

export default function MyStoryTransformation() {
  return (
    <section id="my-story" className="relative bg-ink text-paper">
      <IntroBlock />
      <TransformationJourney />
      <ClosingBlock />
    </section>
  );
}

function IntroBlock() {
  const reduced = useReducedMotion();
  return reduced ? <IntroBlockStatic /> : <IntroBlockAnimated />;
}

function IntroBlockStatic() {
  return (
    <div className="relative overflow-hidden border-b border-paper/10 py-24 sm:py-32">
      <div className="structural-grid structural-grid--dark" />
      <div className="relative mx-auto max-w-[1400px] px-6 sm:px-10">
        <p className="text-sm font-medium tracking-wide text-paper/50">My Story</p>
        <h2 className="mt-6 max-w-[24ch] text-balance font-display text-[clamp(4rem,16vw,14rem)] font-bold leading-[0.92] tracking-tight text-paper">
          I know what this feels like. I&apos;ve lived it.
        </h2>
        <div className="mt-10 flex flex-col gap-2 sm:mt-14">
          {INTRO_LINES.map((line) => (
            <p
              key={line}
              className="max-w-[52ch] font-display text-2xl font-medium leading-snug text-paper sm:text-3xl"
            >
              {line}
            </p>
          ))}
        </div>
        <p className="mt-8 max-w-[60ch] text-xl leading-relaxed text-paper/70">
          I had exactly the same problems, and felt the practice wasn&apos;t
          progressing and was going nowhere. I stopped being a dentist who
          owned a business, and became a business owner.
        </p>
      </div>
    </div>
  );
}

function IntroBlockAnimated() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const lineRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const bodyRef = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const lines = lineRefs.current.filter(Boolean) as HTMLParagraphElement[];

      gsap.set(labelRef.current, { autoAlpha: 0, y: 10 });
      gsap.set(headingRef.current, { autoAlpha: 0, y: 24 });
      gsap.set(lines, { autoAlpha: 0, y: 16 });
      gsap.set(bodyRef.current, { autoAlpha: 0, y: 14 });

      // Not pinned: ties each line's arrival to how far the user has
      // actually scrolled, so a new line lands every little bit of scroll
      // rather than the whole block fading in as one batch.
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapRef.current,
          start: "top 85%",
          end: "top -50%",
          scrub: 0.6,
        },
      });

      tl.to(labelRef.current, { autoAlpha: 1, y: 0, duration: 0.5 }, 0).to(
        headingRef.current,
        { autoAlpha: 1, y: 0, duration: 1 },
        0.3
      );

      lines.forEach((line, i) => {
        tl.to(line, { autoAlpha: 1, y: 0, duration: 0.55 }, 1.6 + i * 0.6);
      });

      tl.to(
        bodyRef.current,
        { autoAlpha: 1, y: 0, duration: 0.6 },
        1.6 + lines.length * 0.6 + 0.3
      );
    }, wrapRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={wrapRef}
      className="relative overflow-hidden border-b border-paper/10 py-24 sm:py-32"
    >
      <div className="structural-grid structural-grid--dark" />
      <div className="relative mx-auto max-w-[1400px] px-6 sm:px-10">
        <p
          ref={labelRef}
          className="text-sm font-medium tracking-wide text-paper/50"
        >
          My Story
        </p>
        <h2
          ref={headingRef}
          className="mt-6 max-w-[24ch] text-balance font-display text-[clamp(4rem,16vw,14rem)] font-bold leading-[0.92] tracking-tight text-paper"
        >
          I know what this feels like. I&apos;ve lived it.
        </h2>

        <div className="mt-10 flex flex-col gap-2 sm:mt-14">
          {INTRO_LINES.map((line, i) => (
            <p
              key={line}
              ref={(el) => {
                lineRefs.current[i] = el;
              }}
              className="max-w-[52ch] font-display text-2xl font-medium leading-snug text-paper sm:text-3xl"
            >
              {line}
            </p>
          ))}
        </div>

        <p
          ref={bodyRef}
          className="mt-8 max-w-[60ch] text-xl leading-relaxed text-paper/70"
        >
          I had exactly the same problems, and felt the practice wasn&apos;t
          progressing and was going nowhere. I stopped being a dentist who
          owned a business, and became a business owner.
        </p>
      </div>
    </div>
  );
}

function ClosingBlock() {
  return (
    <div className="relative overflow-hidden border-t border-paper/10 py-24 sm:py-32">
      <div className="structural-grid structural-grid--dark" />
      <div className="relative mx-auto max-w-[1400px] px-6 sm:px-10">
        <div className="grid gap-12 md:grid-cols-2 md:gap-20">
          <div className="flex flex-col gap-2.5">
            {CLOSING_LINES.map((line, i) => (
              <motion.p
                key={line}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, ease, delay: 0.12 * i }}
                className={
                  i < 2
                    ? "text-balance font-display text-2xl font-medium leading-snug tracking-tight text-paper sm:text-3xl"
                    : "max-w-[52ch] text-lg leading-relaxed text-paper/70"
                }
              >
                {line}
              </motion.p>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease, delay: 0.1 + CLOSING_LINES.length * 0.12 }}
            className="flex flex-col justify-between gap-8"
          >
            <p className="max-w-[52ch] text-lg leading-relaxed text-paper/70">
              This is how Dental Growth Lab can help you change your
              practice in the same way, so it can work without you, and not
              only work without you, but thrive without you. I&apos;ve been
              through what you&apos;ve been through, and come out the other
              end. You can too.
            </p>
            <div className="flex flex-col items-start gap-5 border-t border-paper/10 pt-8 sm:flex-row sm:items-center sm:justify-between sm:pt-6">
              <span className="font-display text-xl font-medium text-paper">
                More Profit. More Control. More Freedom.
              </span>
              <BookCallButton variant="inverse" />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function MinusIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden="true">
      <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.4" />
      <path d="M6.5 10h7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden="true">
      <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M6.5 10.3 8.8 12.6 13.5 7.6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function TransformationJourney() {
  return (
    <div className="relative bg-ink py-24 sm:py-32">
      <div className="structural-grid structural-grid--dark" />
      <div className="relative mx-auto max-w-[1400px] px-6 sm:px-10">
        <div className="grid gap-6 sm:grid-cols-2 sm:gap-8">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease }}
            className="rounded-3xl border border-paper/10 bg-paper/[0.03] p-8 sm:p-10"
          >
            <div className="flex items-center justify-between gap-4">
              <span className="font-display text-2xl font-medium text-paper sm:text-3xl">
                Bought
              </span>
              <span className="rounded-full border border-paper/15 px-3 py-1 text-xs font-medium text-paper/50">
                4 Feb 2018
              </span>
            </div>
            <ul className="mt-8 space-y-4 text-[15px] leading-relaxed text-paper/65">
              {boughtDetails.map((d) => (
                <li key={d} className="flex gap-3">
                  <MinusIcon className="mt-0.5 h-5 w-5 shrink-0 text-paper/30" />
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease, delay: 0.1 }}
            className="rounded-3xl border border-moss-bright/25 bg-moss/[0.08] p-8 sm:p-10"
          >
            <div className="flex items-center justify-between gap-4">
              <span className="font-display text-2xl font-medium text-moss-bright sm:text-3xl">
                Sold
              </span>
              <span className="rounded-full border border-moss-bright/25 bg-moss-bright/10 px-3 py-1 text-xs font-medium text-moss-bright">
                1 Dec 2023
              </span>
            </div>
            <ul className="mt-8 space-y-4 text-[15px] leading-relaxed text-paper/85">
              {soldDetails.map((d) => (
                <li key={d} className="flex gap-3">
                  <CheckIcon className="mt-0.5 h-5 w-5 shrink-0 text-moss-bright" />
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease }}
          className="mx-auto mt-16 max-w-[56ch] text-balance text-center text-lg leading-relaxed text-paper/60 sm:mt-24"
        >
          {JOURNEY_LEAD_IN}
        </motion.p>
      </div>

      <StatSpine />
    </div>
  );
}

/**
 * Pinned, scroll-scrubbed two-sided reveal. Metric labels run down a
 * centre spine; the Bought column fills top to bottom on the left, then
 * the Sold column fills top to bottom on the right, landing on the same
 * row as its Bought counterpart. Turnover is held back and only appears,
 * centred and alone, once both sides are complete.
 */
function StatSpine() {
  const reduced = useReducedMotion();
  return reduced ? <StatSpineStatic /> : <StatSpineAnimated />;
}

function StatSpineStatic() {
  return (
    <div className="mx-auto mt-16 max-w-[1400px] px-6 sm:mt-24 sm:px-10">
      <div className="mx-auto max-w-[900px]">
        <SpineHeader />
        <div className="mt-4 divide-y divide-paper/10">
          {statRows.map((row) => (
            <div
              key={row.id}
              className="grid grid-cols-2 items-center gap-y-1 py-5 sm:grid-cols-[1fr_auto_1fr] sm:gap-x-8"
            >
              <span className="order-first col-span-2 text-center text-xs font-semibold uppercase tracking-wide text-paper/50 sm:order-none sm:col-span-1 sm:text-sm">
                {row.label}
              </span>
              <span className="text-right font-display text-3xl font-medium tabular-nums text-paper/60 sm:text-4xl">
                {row.boughtDisplay ?? row.format(row.bought)}
              </span>
              <span className="text-left font-display text-[clamp(2.25rem,5.5vw,4.25rem)] font-bold tabular-nums text-moss-bright">
                {row.format(row.sold)}
                {row.soldCaption && (
                  <span className="mt-1 block text-sm font-medium tracking-tight text-paper/60">
                    {row.soldCaption}
                  </span>
                )}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-20 max-w-[700px] text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-paper">
          Revenue
        </p>
        <span className="mt-4 block font-display text-[clamp(3.5rem,12vw,9rem)] font-bold tabular-nums text-feature-gradient">
          {turnoverStat.format(turnoverStat.sold)}
        </span>
      </div>
    </div>
  );
}

function SpineHeader() {
  return (
    <div className="grid grid-cols-2 gap-x-8 sm:grid-cols-[1fr_auto_1fr]">
      <span className="text-right font-display text-lg font-medium text-paper/60 sm:text-xl">
        Bought
      </span>
      <span className="hidden sm:block" aria-hidden="true" />
      <span className="text-left font-display text-lg font-medium text-moss-bright sm:text-xl">
        Sold
      </span>
    </div>
  );
}

function StatSpineAnimated() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const boughtRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const soldRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const soldCaptionRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const labelRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const finaleRef = useRef<HTMLDivElement>(null);
  const finaleLabelRef = useRef<HTMLParagraphElement>(null);
  const finaleValueRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const boughtEls = boughtRefs.current.filter(Boolean) as HTMLSpanElement[];
      const soldEls = soldRefs.current.filter(Boolean) as HTMLSpanElement[];
      const captionEls = soldCaptionRefs.current;
      const labels = labelRefs.current.filter(Boolean) as HTMLSpanElement[];

      gsap.set(labels, { autoAlpha: 0, y: 8 });
      gsap.set(boughtEls, { autoAlpha: 0, x: -16 });
      gsap.set(soldEls, { autoAlpha: 0, x: 24, scale: 0.6 });
      gsap.set(captionEls.filter(Boolean), { autoAlpha: 0 });
      gsap.set(glowRef.current, { opacity: 0 });
      gsap.set(finaleRef.current, { autoAlpha: 0, y: 24 });
      gsap.set(finaleValueRef.current, { autoAlpha: 0, scale: 0.85 });

      const rowStep = 0.32;

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

      tl.to(labels, { autoAlpha: 1, y: 0, duration: 0.4, stagger: 0.06 }, 0.15);

      // Bought fills top to bottom, left side. Modest: this is the before.
      statRows.forEach((row: StatRow, i: number) => {
        const at = 0.55 + i * rowStep;
        tl.to(boughtEls[i], { autoAlpha: 1, x: 0, duration: 0.3 }, at);
        if (row.boughtDisplay === undefined) {
          const counter = { v: 0 };
          tl.to(
            counter,
            {
              v: row.bought,
              duration: 0.3,
              onUpdate: () => {
                if (boughtEls[i]) boughtEls[i].textContent = row.format(counter.v);
              },
            },
            at
          );
        }
      });

      const boughtEnd = 0.55 + statRows.length * rowStep + 0.25;

      // Then Sold fills top to bottom, right side, row for row, with a
      // punchier landing (a slight overshoot) since this is the payoff.
      statRows.forEach((row: StatRow, i: number) => {
        const at = boughtEnd + i * rowStep;
        tl.to(
          soldEls[i],
          { autoAlpha: 1, x: 0, scale: 1, duration: 0.45, ease: "back.out(1.8)" },
          at
        );
        if (captionEls[i]) {
          tl.to(captionEls[i], { autoAlpha: 1, duration: 0.3 }, at + 0.1);
        }
        const counter = { v: row.bought };
        tl.to(
          counter,
          {
            v: row.sold,
            duration: 0.35,
            onUpdate: () => {
              if (soldEls[i]) soldEls[i].textContent = row.format(counter.v);
            },
          },
          at
        );
      });

      const soldEnd = boughtEnd + statRows.length * rowStep + 0.3;

      // A soft white glow builds behind the grid as the sold side lands,
      // the section's own "more to come" feeling before the finale.
      tl.to(glowRef.current, { opacity: 0.16, duration: 1.2, ease: "power1.out" }, boughtEnd);

      // Finale: the grid recedes, turnover lands alone, centred. The
      // Revenue label arrives first and stays while the figure counts up.
      tl.to(gridRef.current, { autoAlpha: 0.18, scale: 0.96, duration: 0.5, ease: "power2.inOut" }, soldEnd);
      tl.to(glowRef.current, { opacity: 0.3, duration: 0.6 }, soldEnd);
      tl.to(finaleRef.current, { autoAlpha: 1, y: 0, duration: 0.5 }, soldEnd + 0.2);
      tl.to(finaleLabelRef.current, { autoAlpha: 1, duration: 0.3 }, soldEnd + 0.2);
      tl.to(
        finaleValueRef.current,
        { autoAlpha: 1, scale: 1, duration: 0.4, ease: "power2.out" },
        soldEnd + 0.45
      );

      const turnoverCounter = { v: turnoverStat.bought };
      const turnoverStart = soldEnd + 0.5;
      const turnoverDuration = 1.1;
      tl.to(
        turnoverCounter,
        {
          v: turnoverStat.sold,
          duration: turnoverDuration,
          ease: "power2.out",
          onUpdate: () => {
            if (finaleValueRef.current) {
              finaleValueRef.current.textContent = turnoverStat.format(turnoverCounter.v);
            }
          },
        },
        turnoverStart
      );

      // Hold the finished figure in place for a few more scrolls before
      // the section releases, rather than rushing straight into the next.
      tl.to({}, { duration: 1.3 }, turnoverStart + turnoverDuration);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative h-[540vh] md:h-[680vh]">
      <div ref={stageRef} className="relative flex h-[100svh] items-center overflow-hidden bg-ink">
        <div className="structural-grid structural-grid--dark" />
        <div
          ref={glowRef}
          className="pointer-events-none absolute inset-0 opacity-0"
          style={{
            background:
              "radial-gradient(55% 45% at 50% 50%, rgba(244,244,241,0.5), transparent 70%)",
          }}
        />

        <div ref={gridRef} className="relative mx-auto w-full max-w-[900px] px-6 sm:px-10">
          <SpineHeader />
          <div className="mt-4 divide-y divide-paper/10">
            {statRows.map((row, i) => (
              <div
                key={row.id}
                className="grid grid-cols-2 items-center gap-y-1 py-4 sm:grid-cols-[1fr_auto_1fr] sm:gap-x-8 sm:py-5"
              >
                <span
                  ref={(el) => {
                    labelRefs.current[i] = el;
                  }}
                  className="order-first col-span-2 text-center text-xs font-semibold uppercase tracking-wide text-paper sm:order-none sm:col-span-1 sm:text-sm"
                >
                  {row.label}
                </span>
                <span
                  ref={(el) => {
                    boughtRefs.current[i] = el;
                  }}
                  className="text-right font-display text-3xl font-medium tabular-nums text-paper/60 sm:text-4xl"
                >
                  {row.boughtDisplay ?? ""}
                </span>
                <span className="text-left">
                  <span
                    ref={(el) => {
                      soldRefs.current[i] = el;
                    }}
                    className="block font-display text-[clamp(2.25rem,5.5vw,4.25rem)] font-bold tabular-nums text-moss-bright"
                  />
                  {row.soldCaption && (
                    <span
                      ref={(el) => {
                        soldCaptionRefs.current[i] = el;
                      }}
                      className="mt-1 block text-sm font-medium tracking-tight text-paper/60"
                    >
                      {row.soldCaption}
                    </span>
                  )}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div
          ref={finaleRef}
          className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-6 text-center opacity-0"
        >
          <p
            ref={finaleLabelRef}
            className="text-sm font-semibold uppercase tracking-[0.2em] text-paper opacity-0"
          >
            Revenue
          </p>
          <span
            ref={finaleValueRef}
            className="mt-5 block font-display text-[clamp(3.5rem,13vw,10rem)] font-bold tabular-nums text-feature-gradient opacity-0"
          />
        </div>
      </div>
    </section>
  );
}
