"use client";

import Link from "next/link";
import { motion } from "framer-motion";

type Variant = "solid" | "inverse" | "line";

const styles: Record<Variant, string> = {
  solid:
    "bg-moss text-paper hover:bg-moss-bright",
  inverse:
    "bg-paper text-ink hover:bg-white",
  line:
    "bg-transparent text-current border border-current/30 hover:border-current/70",
};

const MotionLink = motion.create(Link);

/**
 * The persistent site-wide CTA. Defaults to the internal Book a Call page,
 * which holds the real Calendly link, the inline embed and the email or
 * phone fallback. Pass an absolute href (e.g. the Calendly URL itself) to
 * open it directly instead.
 */
export default function BookCallButton({
  variant = "solid",
  className = "",
  label = "Book a Call",
  href = "/book-a-call",
}: {
  variant?: Variant;
  className?: string;
  label?: string;
  href?: string;
}) {
  const sharedClassName = `inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium tracking-wide transition-colors duration-200 ${styles[variant]} ${className}`;
  const sharedProps = {
    whileHover: { y: -1 },
    whileTap: { scale: 0.97 },
    transition: { type: "spring" as const, stiffness: 400, damping: 25 },
    className: sharedClassName,
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
