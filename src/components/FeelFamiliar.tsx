"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { familiarAfter, familiarResolve } from "@/lib/familiar";
import { SCRUB } from "@/lib/scrollFeel";
import { useReducedMotion } from "@/lib/useReducedMotion";
import BookCallButton from "./BookCallButton";
import PainScatter from "./PainScatter";
import Rich from "./Rich";
import { Reveal, ScrollLine } from "./Reveal";

gsap.registerPlugin(ScrollTrigger);

/**
 * "Do any of these sound familiar?..." into "Dental Growth Lab can fix this."
 *
 * The section sits on the Style 2 blue. The pain points are ten white cards
 * scattered round the heading that drift, then gather into one pile; the
 * frustration card rises onto the pile and is held (PainScatter). Then the pile
 * lifts away and "Dental Growth Lab" arrives, followed by "can fix this." with
 * "fix this" underlined, and the reframe copy rolls up line by line.
 */
export default function FeelFamiliar() {
  return (
    <section id="feel-familiar" className="section-rich">
      <PainScatter />
      <FixThis />
      <FamiliarCopy />
    </section>
  );
}

/**
 * "Dental Growth Lab" comes in, then "can fix this.", then "fix this" is
 * underlined. A short pinned stage: the line sits in the middle of the screen
 * while the scroll plays it, and the stage is only as tall as the line needs,
 * so the next copy follows close behind.
 */
function FixThis() {
  const reduced = useReducedMotion();
  const outerRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLSpanElement>(null);
  const middleRef = useRef<HTMLSpanElement>(null);
  const fixRef = useRef<HTMLSpanElement>(null);
  const lineRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      gsap.set(nameRef.current, { autoAlpha: 0, y: 40, filter: "blur(10px)" });
      gsap.set([middleRef.current, fixRef.current], { autoAlpha: 0, y: 24 });
      gsap.set(lineRef.current, { autoAlpha: 0, scaleX: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: outerRef.current,
          start: "top 62%",
          end: "bottom 70%",
          scrub: SCRUB,
        },
        defaults: { ease: "power2.out" },
      });

      tl.to(nameRef.current, { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 1.1 })
        .to({}, { duration: 0.35 })
        .to(middleRef.current, { autoAlpha: 1, y: 0, duration: 0.7 })
        .to(fixRef.current, { autoAlpha: 1, y: 0, duration: 0.7 }, "<0.15")
        .to({}, { duration: 0.25 })
        .to(lineRef.current, { autoAlpha: 1, scaleX: 1, duration: 0.8, ease: "power2.inOut" })
        .to({}, { duration: 1.2 });
    }, outerRef);

    return () => ctx.revert();
  }, [reduced]);

  // Classes (not inline styles) hide the words until GSAP takes over, so a
  // reduced-motion visitor always sees the whole line.
  const hidden = reduced ? "" : "opacity-0";

  return (
    <div ref={outerRef} className={reduced ? "py-[clamp(3rem,10vh,6rem)]" : "h-[125svh]"}>
      <div
        className={`mx-auto flex max-w-[1040px] items-center justify-center px-6 text-center sm:px-10 ${
          reduced ? "" : "sticky top-[30svh] h-[40svh]"
        }`}
      >
        <p className="t-big text-balance text-white">
          <span ref={nameRef} className={`inline-block ${hidden}`}>
            {familiarResolve.highlight}
          </span>
          <span ref={middleRef} className={`inline-block whitespace-pre text-white/70 ${hidden}`}>
            {familiarResolve.middle}
          </span>
          <span ref={fixRef} className={`inline-block ${hidden}`}>
            <span className="relative inline-block">
              {familiarResolve.underlined}
              <span
                ref={lineRef}
                aria-hidden="true"
                className={`absolute -bottom-[0.1em] left-0 h-[0.07em] min-h-[3px] w-full origin-left rounded-full bg-white ${hidden}`}
              />
            </span>
            {familiarResolve.end}
          </span>
        </p>
      </div>
    </div>
  );
}

function FamiliarCopy() {
  return (
    <div
      data-copy="familiar"
      className="type-compact mx-auto max-w-[1040px] px-6 pb-[clamp(6rem,16vh,11rem)] pt-[clamp(0.5rem,2vh,1.5rem)] sm:px-10"
    >
      <div className="flex flex-col gap-[clamp(0.75rem,2.2vh,1.6rem)]">
        <ScrollLine>
          <h2 className="t-big text-balance text-white">
            {familiarAfter.notAlone}
          </h2>
        </ScrollLine>

        {familiarAfter.notNeeded.map((line, i) => (
          <ScrollLine key={line}>
            <p
              className={`t-big text-balance ${
                i === familiarAfter.notNeeded.length - 1
                  ? "text-glow"
                  : "text-white"
              }`}
            >
              {line}
            </p>
          </ScrollLine>
        ))}

        <ScrollLine>
          <p className="t-text max-w-[70ch] text-white">
            <Rich text={familiarAfter.need} />
          </p>
        </ScrollLine>

        <ScrollLine>
          <p className="t-text max-w-[76ch] text-white/90">
            <Rich text={familiarAfter.close} />
          </p>
        </ScrollLine>

        <Reveal>
          <BookCallButton size="lg" />
        </Reveal>
      </div>
    </div>
  );
}
