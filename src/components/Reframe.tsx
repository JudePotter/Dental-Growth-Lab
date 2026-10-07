"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SCRUB } from "@/lib/scrollFeel";
import { useReducedMotion } from "@/lib/useReducedMotion";
import BookCallButton from "./BookCallButton";
import { Reveal, ScrollLine } from "./Reveal";

gsap.registerPlugin(ScrollTrigger);

/**
 * The reframe. First the contrast ("is good", "But...", "is better", all the
 * same size, no strikethrough), then the reframe copy, revealed line by line
 * as it rolls up over the fixed background. The Book a Call button sits
 * directly under the "that don’t depend on them" line.
 */
export default function Reframe() {
  return (
    <section id="reframe" className="relative">
      <ContrastStage />
      <ReframeCopy />
    </section>
  );
}

function ContrastStage() {
  const reduced = useReducedMotion();
  const outerRef = useRef<HTMLDivElement>(null);
  const goodRef = useRef<HTMLParagraphElement>(null);
  const butRef = useRef<HTMLParagraphElement>(null);
  const betterRef = useRef<HTMLParagraphElement>(null);
  const markRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      gsap.set([goodRef.current, butRef.current, betterRef.current], { autoAlpha: 0, y: 44 });
      gsap.set(markRef.current, { scaleX: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: outerRef.current,
          start: "top 55%",
          end: "bottom bottom",
          scrub: SCRUB,
        },
        defaults: { ease: "power2.out" },
      });

      tl.to(goodRef.current, { autoAlpha: 1, y: 0, duration: 1 })
        .to({}, { duration: 0.9 })
        .to(butRef.current, { autoAlpha: 1, y: 0, duration: 0.8 })
        .to({}, { duration: 0.8 })
        .to([goodRef.current, butRef.current], { autoAlpha: 0.34, duration: 0.7 })
        .to(betterRef.current, { autoAlpha: 1, y: 0, duration: 1.1 }, "<0.15")
        .to(markRef.current, { scaleX: 1, duration: 0.7, ease: "power2.inOut" }, ">-0.2")
        .to({}, { duration: 1.3 });
    }, outerRef);

    return () => ctx.revert();
  }, [reduced]);

  // A class (not inline style) hides the lines until GSAP takes over: GSAP's
  // revert would otherwise restore an inline opacity of 0 for reduced-motion
  // visitors.
  const hidden = reduced ? "" : "opacity-0";

  return (
    <div ref={outerRef} className={reduced ? "" : "h-[300vh]"}>
      <div
        className={`mx-auto flex max-w-[1040px] flex-col justify-center gap-[clamp(1.5rem,5vh,3rem)] px-6 sm:px-10 ${
          reduced ? "py-24" : "stage sticky top-0 pb-6"
        }`}
      >
        <div className="flex flex-col gap-[clamp(0.75rem,2.4vh,1.5rem)]">
          <p
            ref={goodRef}
            className={`t-statement text-balance text-white ${hidden}`}
          >
            £900,000 to £1.2 million turnover{" "}
            <strong className="text-glow">is good.</strong>
          </p>

          <p ref={butRef} className={`t-statement text-white ${hidden}`}>
            But…
          </p>
        </div>

        <p
          ref={betterRef}
          className={`t-statement text-balance text-white ${hidden}`}
        >
          £900,000 to £1.2 million while the owner goes from five clinical days
          a week to two, has evenings and weekends free, the practice can run
          without them, and they go on holiday three times a year…
          <span className="relative inline-block text-glow">
            <strong>is better.</strong>
            <span
              ref={markRef}
              aria-hidden="true"
              className="absolute -bottom-1 left-0 h-[3px] w-full origin-left rounded-full bg-white/80"
            />
          </span>
        </p>
      </div>
    </div>
  );
}

function ReframeCopy() {
  return (
    <div
      data-copy="reframe"
      className="type-compact mx-auto max-w-[980px] px-6 pb-[clamp(6rem,16vh,11rem)] pt-[clamp(4rem,12vh,8rem)] sm:px-10"
    >
      <div className="flex flex-col gap-[clamp(1rem,3.4vh,2.25rem)]">
        <ScrollLine>
          <h2 className="t-big text-balance text-white">
            Most practice owners don’t have a dentistry problem.
          </h2>
        </ScrollLine>

        <ScrollLine>
          <h2 className="t-big text-balance text-white">
            They have{" "}
            <strong className="text-glow">a business problem.</strong>
          </h2>
        </ScrollLine>

        <ScrollLine>
          <p className="t-text max-w-[66ch] text-white/85">
            No one was taught how to run a practice at dental school. A poorly
            performing workforce, lack of leadership and direction, ineffective
            systems, leads to you feeling overwhelmed, burnt out, and on top of
            that you end up working harder just to subsidise your practice.
          </p>
        </ScrollLine>

        <ScrollLine>
          <p className="t-big text-glow text-balance">
            Dental Growth Lab helps you change that.
          </p>
        </ScrollLine>

        <ScrollLine>
          <p className="t-text max-w-[66ch] text-white/85">
            We help dental practice owners build accountable teams, effective
            systems and profitable businesses, that don’t depend on them.
          </p>
        </ScrollLine>

        <Reveal>
          <BookCallButton size="lg" />
        </Reveal>
      </div>
    </div>
  );
}
