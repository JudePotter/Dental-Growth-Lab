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
  "I know what this feels like. I've lived it.",
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
        <h2 className="max-w-[16ch] text-balance font-display text-[clamp(4rem,16vw,14rem)] font-bold leading-[0.92] tracking-tight text-paper">
          My Story
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

/**
 * Pinned so each line's arrival is tied to actual scroll distance, giving
 * a new line every deliberate bit of scroll rather than a quick batch
 * fade-in. "My Story" is the display heading and stays put throughout.
 */
function IntroBlockAnimated() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const lineRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const bodyRef = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const lines = lineRefs.current.filter(Boolean) as HTMLParagraphElement[];

      gsap.set(headingRef.current, { autoAlpha: 0, y: 24 });
      gsap.set(lines, { autoAlpha: 0, y: 16 });
      gsap.set(bodyRef.current, { autoAlpha: 0, y: 14 });

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

      tl.to(headingRef.current, { autoAlpha: 1, y: 0, duration: 0.6 }, 0.1);

      lines.forEach((line, i) => {
        tl.to(line, { autoAlpha: 1, y: 0, duration: 0.5 }, 0.9 + i * 0.5);
      });

      tl.to(
        bodyRef.current,
        { autoAlpha: 1, y: 0, duration: 0.55 },
        0.9 + lines.length * 0.5 + 0.3
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative h-[280vh] md:h-[340vh]">
      <div
        ref={stageRef}
        className="relative flex h-[100svh] flex-col justify-center overflow-hidden border-b border-paper/10 bg-ink"
      >
        <div className="structural-grid structural-grid--dark" />
        <div className="relative mx-auto max-w-[1400px] px-6 sm:px-10">
          <h2
            ref={headingRef}
            className="max-w-[16ch] text-balance font-display text-[clamp(4rem,16vw,14rem)] font-bold leading-[0.92] tracking-tight text-paper"
          >
            My Story
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
            I had exactly the same problems, and felt the practice
            wasn&apos;t progressing and was going nowhere. I stopped being a
            dentist who owned a business, and became a business owner.
          </p>
        </div>
      </div>
    </section>
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

/*
 * One shared grid holds the header and every row. The spine (label)
 * column is a fixed pixel width, not `auto`, so it can never be nudged
 * by content elsewhere. The Bought and Sold columns use `minmax(0,1fr)`
 * rather than a bare `1fr`: a bare fr track still grows past its fair
 * share to fit a wide count-up digit, which shifts every column beside
 * it, while `minmax(0, ...)` caps its minimum at zero and lets it hold
 * the track size no matter what the count-up renders. Bought is
 * left-aligned and Sold is right-aligned, so each column fills outward
 * toward its own edge of the section instead of huddling against the
 * centre spine, and the divider lines spanning the whole grid stay put
 * throughout the reveal. Explicit sm:col-start placement (not the
 * `order` utility, which reorders the whole grid rather than just one
 * row) puts Bought/Spine/Sold side by side on desktop while keeping
 * natural label-then-values DOM order for the mobile stack.
 */
const SPINE_GRID =
  "grid grid-cols-2 sm:grid-cols-[minmax(0,1fr)_200px_minmax(0,1fr)] gap-x-6 sm:gap-x-12 lg:gap-x-20";
const SPINE_LABEL_CELL =
  "col-span-2 pb-2 text-center text-xs font-semibold uppercase tracking-wide text-paper sm:col-span-1 sm:col-start-2 sm:pb-0 sm:text-sm";
const SPINE_BOUGHT_CELL =
  "min-w-[2.5ch] py-5 text-left font-display text-4xl font-medium tabular-nums text-paper/60 sm:col-start-1 sm:py-7 sm:text-5xl";
const SPINE_SOLD_WRAP = "py-5 text-right sm:col-start-3 sm:py-7";
// The min-width lives here, not on the wrapper: ch resolves against this
// element's own (huge) font-size, so it actually reserves enough room for
// the widest value ("200+") and the count-up never nudges the column.
const SPINE_SOLD_VALUE =
  "block min-w-[5.5ch] font-display text-[clamp(2.75rem,6.5vw,5.5rem)] font-bold tabular-nums text-moss-bright";
const SPINE_DIVIDER = "col-span-2 h-[2px] bg-paper/25 sm:col-span-3";

function SpineHeaderRow() {
  return (
    <>
      <div className="col-span-2 flex items-baseline justify-between pb-4 sm:hidden">
        <span className="font-display text-lg font-medium text-paper/60">Bought</span>
        <span className="font-display text-lg font-medium text-moss-bright">Sold</span>
      </div>
      <span className="hidden pb-6 text-left font-display text-xl font-medium text-paper/60 sm:col-start-1 sm:block">
        Bought
      </span>
      <span className="hidden pb-6 text-right font-display text-xl font-medium text-moss-bright sm:col-start-3 sm:block">
        Sold
      </span>
      {/* Claims the header row's middle cell so the first data row can't
          auto-place its label back into row 1 alongside the headers. */}
      <span aria-hidden="true" className="hidden sm:col-start-2 sm:block" />
    </>
  );
}

function StatSpineStatic() {
  return (
    <div className="mx-auto mt-16 max-w-[1400px] px-6 sm:mt-24 sm:px-10">
      <div className={`mx-auto w-full items-center ${SPINE_GRID}`}>
        <SpineHeaderRow />
        {statRows.map((row, i) => (
          <div key={row.id} className="contents">
            <span className={SPINE_LABEL_CELL}>{row.label}</span>
            <span className={SPINE_BOUGHT_CELL}>
              {row.boughtDisplay ?? row.format(row.bought)}
            </span>
            <span className={SPINE_SOLD_WRAP}>
              <span className={SPINE_SOLD_VALUE}>{row.format(row.sold)}</span>
              {row.soldCaption && (
                <span className="mt-1 block text-sm font-medium tracking-tight text-paper/60">
                  {row.soldCaption}
                </span>
              )}
            </span>
            {i < statRows.length - 1 && <div className={SPINE_DIVIDER} />}
          </div>
        ))}
      </div>

      <div className="mx-auto mt-20 max-w-[700px] text-center">
        <p className="text-lg font-semibold uppercase tracking-[0.15em] text-paper sm:text-2xl">
          Revenue
        </p>
        <span className="mt-4 block font-display text-[clamp(3.5rem,12vw,9rem)] font-bold tabular-nums text-feature-gradient">
          {turnoverStat.format(turnoverStat.sold)}
        </span>
      </div>
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
  const dividerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const finaleRef = useRef<HTMLDivElement>(null);
  const finaleLabelRef = useRef<HTMLParagraphElement>(null);
  const finaleValueRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const boughtEls = boughtRefs.current.filter(Boolean) as HTMLSpanElement[];
      const soldEls = soldRefs.current.filter(Boolean) as HTMLSpanElement[];
      const captionEls = soldCaptionRefs.current;
      const labels = labelRefs.current.filter(Boolean) as HTMLSpanElement[];
      const dividers = dividerRefs.current.filter(Boolean) as HTMLDivElement[];

      gsap.set(labels, { autoAlpha: 0, y: 8 });
      gsap.set(dividers, { autoAlpha: 0 });
      // Bought and Sold now fill outward to the far left and far right of
      // the section, so they fly in from further out still, converging
      // into their resting spot rather than drifting sideways across it.
      gsap.set(boughtEls, { autoAlpha: 0, x: -36 });
      gsap.set(soldEls, { autoAlpha: 0, x: 44, scale: 0.6 });
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
        // Opacity only, never width or position, so the divider is exactly
        // where it started once it is visible.
        if (dividers[i]) tl.to(dividers[i], { autoAlpha: 1, duration: 0.4 }, at);
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

        <div
          ref={gridRef}
          className={`relative mx-auto w-full max-w-[1400px] items-center px-6 sm:px-10 ${SPINE_GRID}`}
        >
          <SpineHeaderRow />
          {statRows.map((row, i) => (
            <div key={row.id} className="contents">
              <span
                ref={(el) => {
                  labelRefs.current[i] = el;
                }}
                className={SPINE_LABEL_CELL}
              >
                {row.label}
              </span>
              <span
                ref={(el) => {
                  boughtRefs.current[i] = el;
                }}
                className={SPINE_BOUGHT_CELL}
              >
                {row.boughtDisplay ?? ""}
              </span>
              <span className={SPINE_SOLD_WRAP}>
                <span
                  ref={(el) => {
                    soldRefs.current[i] = el;
                  }}
                  className={SPINE_SOLD_VALUE}
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
              {i < statRows.length - 1 && (
                <div
                  ref={(el) => {
                    dividerRefs.current[i] = el;
                  }}
                  className={SPINE_DIVIDER}
                />
              )}
            </div>
          ))}
        </div>

        <div
          ref={finaleRef}
          className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-6 text-center opacity-0"
        >
          <p
            ref={finaleLabelRef}
            className="text-lg font-semibold uppercase tracking-[0.15em] text-paper opacity-0 sm:text-2xl"
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
