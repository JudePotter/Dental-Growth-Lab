"use client";

import { motion } from "framer-motion";
import BookCallButton from "./BookCallButton";
import { ease } from "./Reveal";

const headlineLines = ["Transforming dental practices", "into dental businesses."];
const pillars = ["Clarity.", "Leadership.", "Growth.", "Freedom."];

export default function Hero() {
  return (
    <section id="home" className="relative">
      <div className="mx-auto flex min-h-[100svh] max-w-[1080px] flex-col items-center justify-center px-6 pb-20 pt-[var(--header-h)] text-center sm:px-10">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.1 }}
          className="t-small rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-white/90 backdrop-blur-sm"
        >
          Dental Business Coaching for practice owners.
        </motion.p>

        <h1 className="t-display mt-[clamp(1.25rem,3vh,2rem)] text-white">
          {headlineLines.map((line, i) => (
            <span key={line} className="block overflow-hidden pb-[0.08em]">
              <motion.span
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 0.9, ease, delay: 0.15 + i * 0.1 }}
                className="block"
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.5 }}
          className="t-lead mt-[clamp(1rem,2.6vh,1.75rem)] max-w-[52ch] text-white/85"
        >
          We help dental practice owners build accountable teams, effective
          systems and profitable businesses that don’t depend on them.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.62 }}
          className="t-h2 text-glow mt-[clamp(1.25rem,3.4vh,2.25rem)] max-w-[24ch] text-balance"
        >
          Build a practice that works for you, without you.
        </motion.p>

        <p className="t-h3 mt-[clamp(0.75rem,2vh,1.25rem)] flex flex-wrap justify-center gap-x-4 text-white/70">
          {pillars.map((word, i) => (
            <motion.span
              key={word}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease, delay: 0.8 + i * 0.12 }}
            >
              {word}
            </motion.span>
          ))}
        </p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 1.05 }}
          className="mt-[clamp(1.5rem,4vh,2.5rem)]"
        >
          <BookCallButton size="lg" />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        aria-hidden="true"
        className="absolute inset-x-0 bottom-6 hidden flex-col items-center gap-2 text-white/60 [@media(min-height:700px)]:flex"
      >
        <span className="t-label">Scroll</span>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="h-7 w-px bg-white/40"
        />
      </motion.div>
    </section>
  );
}
