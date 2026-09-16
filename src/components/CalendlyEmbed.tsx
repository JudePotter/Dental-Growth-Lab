"use client";

import { useEffect, useRef } from "react";

const BOOKING_URL =
  process.env.NEXT_PUBLIC_BOOKING_URL ??
  "https://calendly.com/dental-growth-lab/intro-call";

const DEFAULT_PARAMS = {
  background_color: "ffffff",
  text_color: "0c0f0e",
  primary_color: "6c63ff",
  hide_gdpr_banner: "1",
};

/**
 * Reads the active colourway straight from the computed CSS variables
 * (already applied by the theme boot script before this mounts) and
 * repoints the iframe at Calendly's own embed colour params, so the
 * widget never clashes with whichever scheme is active. The initial src
 * uses the Scheme A defaults so server and client markup match.
 */
export default function CalendlyEmbed({ className = "" }: { className?: string }) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const styles = getComputedStyle(document.documentElement);
    const strip = (value: string, fallback: string) =>
      (value.trim() || fallback).replace("#", "");

    const params = new URLSearchParams({
      background_color: strip(styles.getPropertyValue("--color-paper"), DEFAULT_PARAMS.background_color),
      text_color: strip(styles.getPropertyValue("--color-ink"), DEFAULT_PARAMS.text_color),
      primary_color: strip(styles.getPropertyValue("--color-moss"), DEFAULT_PARAMS.primary_color),
      hide_gdpr_banner: "1",
    });

    const src = `${BOOKING_URL}?${params.toString()}`;
    if (iframe.src !== src) {
      iframe.src = src;
    }
  }, []);

  return (
    <div
      className={`overflow-hidden rounded-3xl border border-ink-line bg-paper-dim ${className}`}
    >
      <iframe
        ref={iframeRef}
        src={`${BOOKING_URL}?${new URLSearchParams(DEFAULT_PARAMS).toString()}`}
        title="Book a call with Dental Growth Lab"
        className="h-[680px] w-full border-0"
      />
    </div>
  );
}
