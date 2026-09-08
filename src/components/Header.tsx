"use client";

import { useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { LogoMark, Wordmark } from "./Logo";
import BookCallButton from "./BookCallButton";

const NAV_LINKS = [
  { href: "#home", label: "Home" },
  { href: "#your-practice", label: "Your Practice" },
  { href: "#my-story", label: "My Story" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 24);
  });

  const floating = scrolled || menuOpen;

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-4 sm:pt-4">
      <motion.div
        initial={false}
        animate={{
          backgroundColor: floating ? "rgba(255,255,255,0.88)" : "rgba(255,255,255,0)",
          borderColor: floating ? "rgba(12,15,14,0.08)" : "rgba(12,15,14,0)",
          boxShadow: floating
            ? "0 10px 30px -16px rgba(12,15,14,0.18)"
            : "0 0px 0px -16px rgba(12,15,14,0)",
        }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className={`mx-auto max-w-[1400px] border backdrop-blur-md ${
          menuOpen ? "rounded-3xl" : "rounded-full"
        }`}
      >
        <div className="flex items-center justify-between px-5 py-3 sm:px-6">
          <a
            href="#home"
            className="flex items-center gap-2.5 text-ink"
            aria-label="Dental Growth Lab, home"
          >
            <LogoMark className="h-7 w-7 text-moss" />
            <Wordmark className="hidden text-[1.05rem] sm:inline" />
          </a>

          <nav
            aria-label="Primary"
            onMouseLeave={() => setHovered(null)}
            className="hidden items-center gap-1 text-sm font-medium text-ink/70 md:flex"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onMouseEnter={() => setHovered(link.href)}
                className="relative rounded-full px-4 py-2 transition-colors duration-200 hover:text-ink"
              >
                {hovered === link.href && (
                  <motion.span
                    layoutId="nav-hover-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-ink/5"
                    transition={{ type: "spring", stiffness: 420, damping: 32 }}
                  />
                )}
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <span className="hidden sm:inline-flex">
              <BookCallButton />
            </span>
            <span className="sm:hidden">
              <BookCallButton className="px-4 py-2.5 text-xs" label="Book" />
            </span>
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className="ml-1 flex h-9 w-9 flex-col items-center justify-center gap-1.5 md:hidden"
            >
              <motion.span
                animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 4 : 0 }}
                className="h-px w-5 bg-ink"
              />
              <motion.span
                animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -4 : 0 }}
                className="h-px w-5 bg-ink"
              />
            </button>
          </div>
        </div>

        <motion.nav
          id="mobile-nav"
          aria-label="Mobile primary"
          initial={false}
          animate={
            menuOpen
              ? { height: "auto", opacity: 1 }
              : { height: 0, opacity: 0 }
          }
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden md:hidden"
        >
          <div className="flex flex-col gap-1 border-t border-ink-line px-5 py-4 text-base font-medium text-ink/80 sm:px-6">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-xl px-2 py-2 transition-colors duration-200 hover:bg-ink/5 hover:text-ink"
              >
                {link.label}
              </a>
            ))}
          </div>
        </motion.nav>
      </motion.div>
    </header>
  );
}
