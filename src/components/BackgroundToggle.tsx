"use client";

import { useSyncExternalStore } from "react";
import {
  BG_EVENT,
  BG_STORAGE_KEY,
  BG_STYLES,
  DEFAULT_BG,
  type BgStyle,
} from "@/lib/background";

function subscribe(callback: () => void) {
  window.addEventListener(BG_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(BG_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

function getSnapshot(): BgStyle {
  return document.documentElement.getAttribute("data-bg") === "rich" ? "rich" : "bright";
}

function getServerSnapshot(): BgStyle {
  return DEFAULT_BG;
}

function choose(style: BgStyle) {
  document.documentElement.setAttribute("data-bg", style);
  try {
    localStorage.setItem(BG_STORAGE_KEY, style === "rich" ? "2" : "1");
  } catch {}
  window.dispatchEvent(new Event(BG_EVENT));
}

/** A little swatch of each style, built from the site hue like everything else. */
const SWATCH: Record<BgStyle, string> = {
  bright:
    "linear-gradient(135deg, oklch(0.86 0.08 calc(var(--hue) - 26)), oklch(0.55 0.18 calc(var(--hue) - 5)))",
  rich: "linear-gradient(135deg, oklch(0.463 0.22 var(--hue)), oklch(0.332 0.16 var(--hue)))",
};

/**
 * The background style switch: Style 1 (bright) or Style 2 (rich blue).
 * "pill" sits in the header bar, "block" in the mobile menu.
 */
export default function BackgroundToggle({
  variant = "pill",
  className = "",
}: {
  variant?: "pill" | "block";
  className?: string;
}) {
  const current = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return (
    <div
      role="group"
      aria-label="Background style"
      className={`inline-flex items-center rounded-full border border-white/20 p-0.5 ${className}`}
    >
      {BG_STYLES.map((style) => {
        const active = current === style.id;
        return (
          <button
            key={style.id}
            type="button"
            onClick={() => choose(style.id)}
            aria-pressed={active}
            aria-label={`Style ${style.number}, ${style.label}`}
            title={`Style ${style.number}: ${style.label}`}
            className={`t-nav inline-flex items-center gap-1.5 rounded-full transition-colors duration-200 ${
              variant === "pill" ? "px-2.5 py-1.5" : "px-3.5 py-2"
            } ${active ? "bg-white text-royal-950" : "text-white/75 hover:text-white"}`}
          >
            <span
              aria-hidden="true"
              className={`h-3 w-3 rounded-full ring-1 ${active ? "ring-royal-950/25" : "ring-white/40"}`}
              style={{ background: SWATCH[style.id] }}
            />
            {style.number}
          </button>
        );
      })}
    </div>
  );
}
