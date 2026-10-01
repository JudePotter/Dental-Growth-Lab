"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useReducedMotion } from "@/lib/useReducedMotion";

export const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Rolls its children up from below into place once, the first time they
 * scroll into view. Used for cards, groups and anything that should simply
 * arrive rather than track the scroll position.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 36,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.8, ease, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * A narrative line whose opacity and rise are tied to scroll position: it
 * starts faint and low, and settles into place as it travels up the
 * screen. Stack a few of these and the copy reads line by line as the
 * visitor scrolls, in either direction.
 */
export function ScrollLine({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 96%", "start 66%"],
  });
  const opacity = useTransform(scrollYProgress, [0, 1], [0.1, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [40, 0]);

  return (
    <motion.div
      ref={ref}
      style={reduced ? undefined : { opacity, y }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
