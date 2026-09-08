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
          More Freedom. More Control. More Profit.
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
  const lineOneRef = useRef<HTMLSpanElement>(null);
  const strikeRef = useRef<HTMLSpanElement>(null);
  const lineTwoRef = useRef<HTMLParagraphElement>(null);
  const underlineRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      gsap.set(lineOneRef.current, { autoAlpha: 0, y: 16 });
      gsap.set(strikeRef.current, { scaleX: 0 });
      gsap.set(lineTwoRef.current, { autoAlpha: 0, y: 26 });
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
        .to(strikeRef.current, { scaleX: 1, duration: 1, ease: "power2.inOut" }, 1.7)
        .to(lineOneRef.current, { autoAlpha: 0.35, duration: 0.6 }, 2.6)
        .to(lineTwoRef.current, { autoAlpha: 1, y: 0, duration: 1.4, ease: "power2.out" }, 2.8)
        .to(underlineRef.current, { scaleX: 1, duration: 0.8, ease: "power2.inOut" }, 3.9);
    }, wrapRef);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <div
      ref={wrapRef}
      className="relative border-t border-paper-line bg-paper-dim py-24 sm:py-32"
    >
      <div className="structural-grid" />
      <div className="relative mx-auto max-w-[900px] px-6 text-center sm:px-10">
        <span
          ref={lineOneRef}
          className="relative inline-block font-display text-2xl tracking-tight text-mist-dim sm:text-3xl"
          style={reduced ? { opacity: 0.5 } : undefined}
        >
          A practice going from £1.2m to £1.4m is good.
          <span
            ref={strikeRef}
            aria-hidden="true"
            className="absolute left-0 top-1/2 h-[2px] w-full origin-left bg-mist-dim/70"
            style={reduced ? { transform: "scaleX(1)" } : undefined}
          />
        </span>

        <p
          ref={lineTwoRef}
          className="mx-auto mt-6 max-w-[26ch] text-balance font-display text-3xl font-medium leading-[1.15] tracking-tight text-ink sm:text-4xl md:text-5xl"
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
