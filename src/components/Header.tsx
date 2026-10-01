"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { LogoMark, Wordmark } from "./Logo";
import BookCallButton from "./BookCallButton";
import { NAV_LINKS } from "@/lib/nav";

/**
 * Fixed, always-on header. Over the coloured background it is transparent;
 * once the page scrolls it becomes a deep frosted pill, which reads cleanly
 * over both the coloured background and the pastel white My Story sheet.
 */
export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const pathname = usePathname();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 24);
  });

  const floating = scrolled || menuOpen;

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-4 sm:pt-4">
      <div
        className={`mx-auto max-w-[1400px] border backdrop-blur-md transition-[background-color,border-color,box-shadow] duration-500 ${
          floating
            ? "border-white/15 bg-royal-950/80 shadow-[0_12px_32px_-16px_var(--shadow)]"
            : "border-transparent bg-transparent shadow-none"
        } ${menuOpen ? "rounded-3xl" : "rounded-full"}`}
      >
        <div className="flex items-center justify-between px-5 py-3 sm:px-6">
          <Link
            href="/"
            className="flex items-center gap-2.5 text-white"
            aria-label="Dental Growth Lab, home"
          >
            <LogoMark className="h-7 w-7 text-white" />
            <Wordmark className="hidden text-[1.05rem] lg:inline" />
          </Link>

          <nav
            aria-label="Primary"
            onMouseLeave={() => setHovered(null)}
            className="hidden items-center gap-1 md:flex"
          >
            {NAV_LINKS.map((link) => {
              const current = link.href === pathname;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onMouseEnter={() => setHovered(link.href)}
                  aria-current={current ? "page" : undefined}
                  className={`t-nav relative rounded-full px-3.5 py-2 outline-offset-0 transition-colors duration-200 hover:text-white ${
                    current ? "text-white" : "text-white/75"
                  }`}
                >
                  {hovered === link.href && (
                    <motion.span
                      layoutId="nav-hover-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-white/12"
                      transition={{ type: "spring", stiffness: 420, damping: 32 }}
                    />
                  )}
                  {link.label}
                </Link>
              );
            })}
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
                className="h-px w-5 bg-white"
              />
              <motion.span
                animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -4 : 0 }}
                className="h-px w-5 bg-white"
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
          <div className="flex flex-col gap-1 border-t border-white/12 px-5 py-4 sm:px-6">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="t-lead rounded-xl px-2 py-2 text-white/85 transition-colors duration-200 hover:bg-white/10 hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </motion.nav>
      </div>
    </header>
  );
}
