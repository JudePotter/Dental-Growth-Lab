"use client";

import { useEffect, useRef } from "react";

const BOOKING_URL =
  process.env.NEXT_PUBLIC_BOOKING_URL ??
  "https://calendly.com/dental-growth-lab/intro-call";

/** Server render default (the original blue). The real colours are read from the palette on mount. */
const DEFAULT_PARAMS = {
  background_color: "ffffff",
  text_color: "0a1b4a",
  primary_color: "1447d4",
  hide_gdpr_banner: "1",
};

/** Resolves any CSS colour (including oklch and var()) to a six digit hex string. */
function toHex(cssColor: string): string | null {
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = 1;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) return null;
  ctx.fillStyle = "#000";
  ctx.fillStyle = cssColor;
  ctx.fillRect(0, 0, 1, 1);
  const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
  return [r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("");
}

/**
 * The inline Calendly scheduler. The URL comes from NEXT_PUBLIC_BOOKING_URL
 * (see .env.local.example), so swapping in the real link needs no code
 * change. Its text and button colours are read from the site palette, so
 * they follow --hue if the colour is ever changed.
 */
export default function CalendlyEmbed({ className = "" }: { className?: string }) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;
    const styles = getComputedStyle(document.documentElement);
    const read = (name: string, fallback: string) =>
      toHex(styles.getPropertyValue(name).trim() || "") ?? fallback;

    const params = new URLSearchParams({
      ...DEFAULT_PARAMS,
      text_color: read("--color-ink", DEFAULT_PARAMS.text_color),
      primary_color: read("--color-royal-600", DEFAULT_PARAMS.primary_color),
    });
    const src = `${BOOKING_URL}?${params.toString()}`;
    if (iframe.getAttribute("src") !== src) iframe.setAttribute("src", src);
  }, []);

  return (
    <div
      className={`flex flex-col overflow-hidden rounded-[1.5rem] bg-white shadow-[0_30px_70px_-40px_var(--shadow)] ${className}`}
    >
      <iframe
        ref={iframeRef}
        src={`${BOOKING_URL}?${new URLSearchParams(DEFAULT_PARAMS).toString()}`}
        title="Book a call with Dental Growth Lab"
        loading="lazy"
        className="min-h-[512px] w-full flex-1 border-0"
      />
    </div>
  );
}
