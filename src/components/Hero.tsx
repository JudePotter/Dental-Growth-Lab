"use client";

import { useLayoutEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BookCallButton from "./BookCallButton";
import { useReducedMotion } from "@/lib/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

const headlineWords = ["Build a profitable", "practice that works", "without you."];

const ease = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden bg-paper text-ink">
      <div className="plus-field" />

      <div className="relative mx-auto flex min-h-[100svh] max-w-[1000px] flex-col items-center justify-center px-6 pt-28 pb-20 text-center sm:px-10">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.1 }}
          className="text-sm font-medium tracking-wide text-mist-dim"
        >
          Dental business coaching for practice owners
        </motion.p>

        <h1 className="mt-6 font-display text-[clamp(2.75rem,7.6vw,6.75rem)] font-light leading-[1.02] tracking-tight text-ink">
          {headlineWords.map((line, i) => (
            <span key={line} className="block overflow-hidden">
              <motion.span
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 0.9, ease, delay: 0.15 + i * 0.09 }}
                className="block"
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.55 }}
          className="mt-8 font-display text-xl font-medium text-moss-text sm:text-2xl"
        >
          More Profit. More Control. More Freedom.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.65 }}
          className="mt-4 max-w-[46ch] text-lg leading-relaxed text-ink/70"
        >
          We help dental practice owners build accountable teams, effective
          systems and profitable businesses that don&apos;t depend on them.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.78 }}
          className="mt-10"
        >
          <BookCallButton className="px-8 py-4 text-base" />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        aria-hidden="true"
        className="absolute inset-x-0 bottom-8 flex flex-col items-center gap-3 text-mist-dim"
      >
        <span className="text-xs font-medium tracking-[0.2em]">SCROLL</span>
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="h-9 w-px bg-mist-line"
        />
      </motion.div>

      <ReframeContrast />
    </section>
  );
}

function ReframeContrast() {
  const reduced = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);
  const lineOneRef = useRef<HTMLParagraphElement>(null);
  const lineTwoRef = useRef<HTMLParagraphElement>(null);
  const underlineRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      gsap.set(lineOneRef.current, { autoAlpha: 0, y: 16 });
      gsap.set(lineTwoRef.current, { autoAlpha: 0, y: 16 });
      gsap.set(underlineRef.current, { scaleX: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapRef.current,
          start: "top 75%",
          end: "top 10%",
          scrub: 0.6,
        },
      });

      tl.to(lineOneRef.current, { autoAlpha: 1, y: 0, duration: 1 }, 0)
        .to(lineOneRef.current, { autoAlpha: 0.4, duration: 0.6 }, 1.9)
        .to(lineTwoRef.current, { autoAlpha: 1, y: 0, duration: 1.2, ease: "power2.out" }, 2.1)
        .to(underlineRef.current, { scaleX: 1, duration: 0.8, ease: "power2.inOut" }, 3.1);
    }, wrapRef);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <div
      ref={wrapRef}
      className="relative border-t border-paper-line bg-paper-dim py-24 sm:py-32"
    >
      <div className="structural-grid" />
      <div className="relative mx-auto max-w-[720px] px-6 text-center sm:px-10">
        <p
          ref={lineOneRef}
          className="text-balance font-display text-[clamp(1.75rem,4.5vw,3rem)] font-medium leading-[1.2] tracking-tight text-mist-dim"
          style={reduced ? { opacity: 0.5 } : undefined}
        >
          A practice going from £1.2m to £1.4m is good.
        </p>

        <p
          ref={lineTwoRef}
          className="mx-auto mt-6 max-w-[30ch] text-balance font-display text-[clamp(1.75rem,4.5vw,3rem)] font-medium leading-[1.2] tracking-tight text-ink"
          style={reduced ? { opacity: 1, transform: "none" } : undefined}
        >
          While the owner goes from five clinical days to three, and stops
          dealing with practice problems at home, is{" "}
          <span className="relative inline-block text-moss-text">
            better.
            <span
              ref={underlineRef}
              aria-hidden="true"
              className="absolute -bottom-1 left-0 h-[3px] w-full origin-left rounded-full bg-moss"
              style={reduced ? { transform: "scaleX(1)" } : undefined}
            />
          </span>
        </p>
      </div>
    </div>
  );
}
