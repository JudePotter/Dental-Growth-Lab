"use client";

import { motion } from "framer-motion";
import PhotoSlot from "./PhotoSlot";
import { ease } from "./Reveal";

/**
 * The hero: the name, what we do, and Pujan at his desk. There is no Book a
 * Call button here; it sits under the support line in the next section.
 * The type is big and loud (the `type-hero` scale), two sizes only: the name,
 * and the two lines under it.
 */
export default function Hero({ photoSrc }: { photoSrc: string | null }) {
  return (
    <section id="home" className="relative">
      <div className="type-hero mx-auto grid min-h-[100svh] max-w-[1432px] items-center gap-[clamp(1.5rem,4vh,3rem)] px-6 pb-[clamp(3rem,8vh,5rem)] pt-[calc(var(--header-h)+0.5rem)] sm:px-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:gap-[clamp(2rem,4vw,5rem)]">
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.1 }}
            className="t-text rounded-full border border-white/30 bg-white/12 px-[1.1em] py-[0.35em] text-white backdrop-blur-sm"
          >
            Dental Business Coaching for practice owners.
          </motion.p>

          <h1 className="t-mega mt-[clamp(0.9rem,2.6vh,1.75rem)] text-balance text-white">
            <span className="block overflow-hidden pb-[0.1em]">
              <motion.span
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 0.9, ease, delay: 0.15 }}
                className="block"
              >
                Dental Growth Lab
              </motion.span>
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.45 }}
            className="t-big mt-[clamp(1rem,3vh,2rem)] max-w-[22ch] text-balance text-white"
          >
            Transforming dental practices into dental businesses.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.6 }}
            className="t-big text-glow mt-[clamp(0.5rem,1.4vh,1rem)] max-w-[22ch] text-balance"
          >
            Build a practice that works for you, without you.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, ease, delay: 0.3 }}
          className="flex justify-center lg:justify-end"
        >
          <div className="relative w-[min(100%,calc(min(70svh,52rem)*5/6))]">
            <PhotoSlot
              src={photoSrc}
              alt="Pujan Soni, founder of Dental Growth Lab, in conversation at his desk"
              kind="person"
              hint="office-consultation.jpg"
              sizes="(min-width: 1024px) 40vw, 90vw"
              objectPosition="62% 30%"
              priority
              className="aspect-[5/6] w-full rounded-[clamp(1.5rem,2.4vw,2.25rem)] border border-white/30 shadow-[0_40px_90px_-40px_var(--shadow)]"
            />
            <p className="t-text absolute bottom-4 left-4 rounded-full bg-white/90 px-[0.9em] py-[0.25em] text-ink backdrop-blur-sm">
              Pujan Soni, Founder
            </p>
          </div>
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
