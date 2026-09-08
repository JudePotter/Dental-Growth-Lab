"use client";

import { motion } from "framer-motion";

const BOOKING_URL =
  process.env.NEXT_PUBLIC_BOOKING_URL ?? "https://cal.com/dental-growth-lab/intro-call";

type Variant = "solid" | "inverse" | "line";

const styles: Record<Variant, string> = {
  solid:
    "bg-moss text-paper hover:bg-moss-bright",
  inverse:
    "bg-paper text-ink hover:bg-white",
  line:
    "bg-transparent text-current border border-current/30 hover:border-current/70",
};

export default function BookCallButton({
  variant = "solid",
  className = "",
  label = "Book a Call",
}: {
  variant?: Variant;
  className?: string;
  label?: string;
}) {
  return (
    <motion.a
      href={BOOKING_URL}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={`inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium tracking-wide transition-colors duration-200 ${styles[variant]} ${className}`}
    >
      {label}
    </motion.a>
  );
}
