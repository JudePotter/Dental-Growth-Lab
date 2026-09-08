"use client";

import { useEffect, useRef, useState } from "react";
import { animate, motion } from "framer-motion";
import {
  boughtDetails,
  soldDetails,
  storyStats,
  type StoryStat,
} from "@/lib/storyStats";
import { useReducedMotion } from "@/lib/useReducedMotion";
import BookCallButton from "./BookCallButton";

const ease = [0.22, 1, 0.36, 1] as const;

const JOURNEY_LEAD_IN =
  "These are real numbers from a practice I bought in February 2018 and sold in December 2023, ending fully associate-led after I stopped clinical dentistry.";

const STACK_TOP_BASE = 96;
const STACK_TOP_STEP = 16;

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
  return (
    <div className="relative overflow-hidden border-b border-paper/10 py-24 sm:py-32">
      <div className="structural-grid structural-grid--dark" />
      <div className="relative mx-auto max-w-[1400px] px-6 sm:px-10">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease }}
          className="text-sm font-medium tracking-wide text-paper/50"
        >
          My Story
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease, delay: 0.05 }}
          className="mt-6 max-w-[20ch] text-balance font-display text-[clamp(2.75rem,7.5vw,6rem)] font-bold leading-[0.98] tracking-tight text-paper"
        >
          I know what this feels like. I&apos;ve lived it.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease, delay: 0.15 }}
          className="mt-8 max-w-[60ch] text-xl leading-relaxed text-paper/70"
        >
          My name is Pujan Soni. I&apos;ve bought four dental practices and
          sold three. Everything you&apos;ve experienced, I&apos;ve been
          through. I had exactly the same problems, and felt the practice
          wasn&apos;t progressing and was going nowhere. Then, a few years
          ago, I changed. I stopped being a dentist who owned a business, and
          became a business owner.
        </motion.p>
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
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease }}
          >
            <p className="text-balance font-display text-2xl font-medium leading-snug tracking-tight text-paper sm:text-3xl">
              But the important part isn&apos;t the numbers. It&apos;s what
              happened in between.
            </p>
            <p className="mt-5 max-w-[52ch] text-lg leading-relaxed text-paper/70">
              I had to learn how to become a business owner, rather than
              simply a dentist who owned a business. I took accountability.
              I took responsibility. I changed the people, the structure,
              the meetings, how we measured performance, and the systems. I
              became a leader. Eventually, the practice stopped depending on
              me.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease, delay: 0.1 }}
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
                More Freedom. More Control. More Profit.
              </span>
              <BookCallButton variant="inverse" />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function TransformationJourney() {
  return (
    <div className="relative bg-ink py-24 sm:py-32">
      <div className="structural-grid structural-grid--dark" />
      <div className="relative mx-auto max-w-[1400px] px-6 sm:px-10">
        <div className="grid gap-10 sm:grid-cols-2 sm:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease }}
          >
            <span className="font-display text-2xl font-medium text-paper sm:text-3xl">
              Bought
            </span>
            <p className="mt-2 text-sm font-medium text-paper/50">
              4 February 2018
            </p>
            <ul className="mt-6 space-y-2 text-[15px] leading-relaxed text-paper/65">
              {boughtDetails.map((d) => (
                <li key={d} className="flex gap-2.5">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-paper/40" />
                  {d}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease, delay: 0.1 }}
          >
            <span className="font-display text-2xl font-medium text-moss-bright sm:text-3xl">
              Sold
            </span>
            <p className="mt-2 text-sm font-medium text-paper/50">
              1 December 2023
            </p>
            <ul className="mt-6 space-y-2 text-[15px] leading-relaxed text-paper/80">
              {soldDetails.map((d) => (
                <li key={d} className="flex gap-2.5">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-moss-bright" />
                  {d}
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

        <StatStack />
      </div>
    </div>
  );
}

/**
 * Sticky-stacked proof cards. Each card is `position: sticky` at its own
 * incremental `top`, so later cards pin lower and slide up over earlier
 * ones as the user scrolls, leaving a sliver of the card behind visible,
 * building a physical stack rather than a scrubbed timeline.
 */
function StatStack() {
  const reduced = useReducedMotion();
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  if (reduced) {
    return (
      <div className="mt-12 flex flex-col gap-4 sm:mt-16 sm:gap-5">
        {storyStats.map((stat, i) => (
          <div
            key={stat.id}
            className="rounded-3xl bg-moss-soft px-7 py-8 sm:px-12 sm:py-11"
          >
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
              <div className="flex items-baseline gap-4 sm:flex-col sm:items-start sm:gap-2">
                <span className="font-display text-sm font-semibold tabular-nums text-moss-text/50 sm:text-base">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-xl font-medium tracking-tight text-moss-text sm:text-2xl">
                  {stat.label}
                </h3>
              </div>
              <div className="flex items-center gap-3 sm:gap-4">
                <span className="font-display text-base font-medium tabular-nums text-moss-text/40 line-through decoration-moss-text/30 sm:text-xl">
                  {stat.format(stat.start)}
                </span>
                <span className="text-moss-text/40" aria-hidden="true">
                  &rarr;
                </span>
                <span className="font-display text-[clamp(2rem,4.5vw,3.5rem)] font-bold tabular-nums text-moss-text">
                  {stat.format(stat.end)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="relative mt-16 sm:mt-24">
      {storyStats.map((stat, i) => (
        <StackCard
          key={stat.id}
          stat={stat}
          index={i}
          registerRef={(el) => {
            cardRefs.current[i] = el;
          }}
          nextRef={cardRefs}
        />
      ))}
    </div>
  );
}

function StackCard({
  stat,
  index,
  registerRef,
  nextRef,
}: {
  stat: StoryStat;
  index: number;
  registerRef: (el: HTMLDivElement | null) => void;
  nextRef: React.RefObject<(HTMLDivElement | null)[]>;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const valueRef = useRef<HTMLSpanElement>(null);
  const hasCounted = useRef(false);
  const [covered, setCovered] = useState(false);

  // Count up once, the moment this card arrives and locks into place.
  useEffect(() => {
    const el = cardRef.current;
    if (!el || !valueRef.current) return;

    valueRef.current.textContent = stat.format(stat.start);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasCounted.current) {
          hasCounted.current = true;
          animate(stat.start, stat.end, {
            duration: 1.3,
            ease: [0.22, 1, 0.36, 1],
            onUpdate: (v) => {
              if (valueRef.current) valueRef.current.textContent = stat.format(v);
            },
          });
        }
      },
      { threshold: 0.6 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [stat]);

  // Ease back and dim once the next card arrives and starts covering this one.
  useEffect(() => {
    const nextEl = nextRef.current[index + 1];
    if (!nextEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => setCovered(entry.isIntersecting),
      { rootMargin: "-10% 0px -78% 0px", threshold: 0 }
    );
    observer.observe(nextEl);
    return () => observer.disconnect();
  }, [index, nextRef]);

  return (
    <div
      ref={(el) => {
        registerRef(el);
      }}
      className="sticky flex flex-col"
      style={{
        top: `${STACK_TOP_BASE + index * STACK_TOP_STEP}px`,
        zIndex: index + 1,
        minHeight: "76vh",
      }}
    >
      <div
        ref={cardRef}
        className="mx-auto w-full max-w-[1200px] origin-top rounded-3xl bg-moss-soft px-7 py-8 shadow-[0_30px_60px_-30px_rgba(12,15,14,0.4)] transition-[transform,filter] duration-500 ease-out sm:px-12 sm:py-11"
        style={{
          transform: covered ? "scale(0.95)" : "scale(1)",
          filter: covered ? "brightness(0.85)" : "brightness(1)",
        }}
      >
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
          <div className="flex items-baseline gap-4 sm:flex-col sm:items-start sm:gap-2">
            <span className="font-display text-sm font-semibold tabular-nums text-moss-text/50 sm:text-base">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="font-display text-xl font-medium tracking-tight text-moss-text sm:text-2xl">
              {stat.label}
            </h3>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <span className="font-display text-base font-medium tabular-nums text-moss-text/40 line-through decoration-moss-text/30 sm:text-xl">
              {stat.format(stat.start)}
            </span>
            <span className="text-moss-text/40" aria-hidden="true">
              &rarr;
            </span>
            <span
              ref={valueRef}
              className="font-display text-[clamp(2rem,4.5vw,3.5rem)] font-bold tabular-nums text-moss-text"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
