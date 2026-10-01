"use client";

import { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import { LogoMark } from "./Logo";
import BookCallButton from "./BookCallButton";
import { NAV_LINKS } from "@/lib/nav";

const SOCIALS = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "Facebook", href: "https://facebook.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
];

const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "hello@dentalgrowthlab.co.uk";
const CONTACT_PHONE = process.env.NEXT_PUBLIC_CONTACT_PHONE ?? "020 7946 0958";

const COLUMN_HEADING = "t-label text-ink-black/55";
const COLUMN_LINK =
  "t-small break-words text-ink-black transition-colors hover:text-royal-600";

/**
 * The footer. It is fixed to the bottom of the screen, *behind* the page
 * shell, so it is hidden until the very end of the page, when the shell
 * lifts away and reveals it. It measures itself and publishes its height as
 * --footer-h, which the shell uses as its bottom margin so the last scroll
 * position shows the whole footer.
 */
export default function Footer() {
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const footer = ref.current;
    if (!footer) return;
    const root = document.documentElement;
    const publish = () => root.style.setProperty("--footer-h", `${footer.offsetHeight}px`);
    publish();
    const observer = new ResizeObserver(publish);
    observer.observe(footer);
    document.fonts?.ready.then(publish).catch(() => {});
    return () => {
      observer.disconnect();
      root.style.removeProperty("--footer-h");
    };
  }, []);

  return (
    <footer
      ref={ref}
      className="site-footer on-sheet overflow-x-clip bg-white text-ink-black"
    >
      {/* The footer's white backdrop runs up behind the page shell by the
          shell's corner radius. The shell's rounded bottom corners cut away
          that strip, so what shows through them is the footer itself,
          continuing seamlessly, not the plain page colour. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 top-[calc(-1*var(--shell-radius))] bg-white"
      />

      <div className="relative mx-auto max-w-[1400px] px-6 pb-5 pt-[clamp(2rem,6vh,3.5rem)] sm:px-10">
        {/* The Contact column has a minimum width so the email can never run into
            the Follow column, and the headline column stays wide enough for
            two lines. */}
        <div className="grid gap-x-8 gap-y-8 lg:grid-cols-[minmax(0,1.7fr)_minmax(0,0.55fr)_minmax(14rem,0.85fr)_minmax(0,0.55fr)]">
          <div>
            <p className="t-h2 max-w-[20ch] text-balance">
              Build a practice that works for you, without you.
            </p>
            <div className="mt-5">
              <BookCallButton variant="solid" />
            </div>
          </div>

          <nav aria-label="Footer" className="flex flex-col gap-2.5">
            <p className={COLUMN_HEADING}>Explore</p>
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className={COLUMN_LINK}>
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col gap-2.5">
            <p className={COLUMN_HEADING}>Contact</p>
            <a href={`mailto:${CONTACT_EMAIL}`} className={COLUMN_LINK}>
              {CONTACT_EMAIL}
            </a>
            <a href={`tel:${CONTACT_PHONE.replace(/\s+/g, "")}`} className={COLUMN_LINK}>
              {CONTACT_PHONE}
            </a>
          </div>

          <div className="flex flex-col gap-2.5">
            <p className={COLUMN_HEADING}>Follow</p>
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className={COLUMN_LINK}
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>

        <div
          className="mt-[clamp(1.25rem,4vh,2.5rem)] flex items-end gap-[0.2em] whitespace-nowrap font-display leading-[0.9] tracking-[-0.045em]"
          style={{ fontSize: "min(7.2vw, 16vh, 8rem)" }}
        >
          <LogoMark className="mb-[0.06em] h-[0.95em] w-[0.95em] shrink-0 text-ink-black/90" />
          <span
            className="bg-gradient-to-b from-ink-black to-ink-black/60 bg-clip-text text-transparent"
            style={{ fontWeight: "var(--w-display)" }}
          >
            Dental Growth Lab
          </span>
        </div>

        <p className="t-small mt-4 text-ink-black/55">
          © {new Date().getFullYear()} Dental Growth Lab. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
