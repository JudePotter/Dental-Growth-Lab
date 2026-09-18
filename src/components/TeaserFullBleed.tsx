"use client";

import { motion } from "framer-motion";
import { LogoMark } from "./Logo";
import BookCallButton from "./BookCallButton";

const ease = [0.22, 1, 0.36, 1] as const;

export default function TeaserFullBleed() {
  return (
    <section className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-moss px-6 py-28 text-center text-paper sm:px-10">
      <LogoMark className="absolute left-1/2 top-1/2 h-[70vh] w-[70vh] -translate-x-1/2 -translate-y-1/2 text-paper opacity-[0.05]" />
      <div className="structural-grid" style={{ opacity: 0.12 }} />

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease }}
        className="relative text-sm font-medium tracking-wide text-paper/60"
      >
        That&apos;s everything for now.
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease, delay: 0.08 }}
        className="relative mt-6 text-balance font-display text-[clamp(3rem,10vw,8.5rem)] font-medium leading-[0.95] tracking-tight text-paper"
      >
        More to come.
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease, delay: 0.2 }}
        className="relative mt-6 max-w-[40ch] text-balance font-display text-xl font-medium text-paper/80 sm:text-2xl"
      >
        Testimonials, a booking system and a &ldquo;How We Can Help&rdquo;
        section are on the way.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease, delay: 0.3 }}
        className="relative mt-10"
      >
        <BookCallButton variant="inverse" />
      </motion.div>
    </section>
  );
}
