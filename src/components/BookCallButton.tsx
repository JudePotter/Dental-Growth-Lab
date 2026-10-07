"use client";

import Link from "next/link";
import { motion } from "framer-motion";

type Variant = "light" | "solid" | "line";

const styles: Record<Variant, string> = {
  // White pill with blue text: the default on the blue background.
  light: "bg-white text-royal-700 hover:bg-sky-100",
  // Blue pill with white text: for use on the pastel white sheet.
  solid: "bg-royal-600 text-white hover:bg-royal-500",
  line: "bg-transparent text-current border border-current/40 hover:border-current",
};

const MotionLink = motion.create(Link);

/**
 * The persistent site-wide CTA. Defaults to the Book a Call page (Calendly on
 * the left, enquiry form on the right).
 */
export default function BookCallButton({
  variant = "light",
  className = "",
  label = "Book a Call",
  href = "/book-a-call",
  size = "md",
}: {
  variant?: Variant;
  size?: "md" | "lg" | "xl";
  className?: string;
  label?: string;
  href?: string;
}) {
  const sharedProps = {
    whileHover: { y: -1 },
    whileTap: { scale: 0.97 },
    transition: { type: "spring" as const, stiffness: 400, damping: 25 },
    className: `t-ui inline-flex items-center justify-center whitespace-nowrap rounded-full transition-colors duration-200 ${
      size === "xl" ? "px-12 py-5" : size === "lg" ? "px-8 py-4" : "px-6 py-3"
    } ${styles[variant]} ${className}`,
    style:
      size === "xl"
        ? { fontSize: "clamp(1.0625rem, 1.5vw, 1.3rem)" }
        : size === "lg"
          ? { fontSize: "1rem" }
          : undefined,
  };

  if (/^https?:\/\//.test(href)) {
    return (
      <motion.a href={href} target="_blank" rel="noopener noreferrer" {...sharedProps}>
        {label}
      </motion.a>
    );
  }

  return (
    <MotionLink href={href} {...sharedProps}>
      {label}
    </MotionLink>
  );
}
