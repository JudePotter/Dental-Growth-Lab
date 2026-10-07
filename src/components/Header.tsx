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
 * Seven links need the room of a laptop, so below 1024px it is the menu button.
 * Between 1024px and 1100px the wordmark text gives way to the logo mark
 * alone, to make the room for the seven links.
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
            <Wordmark className="hidden text-[1.05rem] min-[1100px]:inline" />
          </Link>

          <nav
            aria-label="Primary"
            onMouseLeave={() => setHovered(null)}
            className="hidden items-center gap-0.5 lg:flex xl:gap-1"
          >
            {NAV_LINKS.map((link) => {
              const current = link.href === pathname;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onMouseEnter={() => setHovered(link.href)}
                  aria-current={current ? "page" : undefined}
                  className={`t-nav relative whitespace-nowrap rounded-full px-1.5 py-2 outline-offset-0 min-[1120px]:px-2.5 xl:px-3.5 transition-colors duration-200 hover:text-white ${
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
              <BookCallButton className="px-5 py-3" label="Book" />
            </span>
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className="ml-1 flex h-11 w-11 flex-col items-center justify-center gap-1.5 lg:hidden"
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
          className="overflow-hidden lg:hidden"
        >
          <div className="flex flex-col gap-1 border-t border-white/12 px-5 py-4 sm:px-6">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="t-lead rounded-xl px-2 py-3 text-white/85 transition-colors duration-200 hover:bg-white/10 hover:text-white active:bg-white/10"
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
