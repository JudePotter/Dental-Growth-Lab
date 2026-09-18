"use client";

import { useEffect, useState } from "react";
import { THEME_STORAGE_KEY, type ThemeId } from "@/lib/themes";

/** Style 1 is the original look; Style 2 is the Calendly-inspired gradient mesh. */
const STYLE_THEME: Record<"1" | "2", ThemeId> = {
  "1": "periwinkle",
  "2": "calendly",
};

export default function ThemeStyleToggle({
  variant = "pill",
  className = "",
}: {
  variant?: "pill" | "block";
  className?: string;
}) {
  const [style, setStyle] = useState<"1" | "2">("1");

  useEffect(() => {
    setStyle(document.documentElement.getAttribute("data-theme") === "calendly" ? "2" : "1");
  }, []);

  function toggle() {
    const next = style === "1" ? "2" : "1";
    setStyle(next);
    document.documentElement.setAttribute("data-theme", STYLE_THEME[next]);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, STYLE_THEME[next]);
    } catch {}
  }

  const nextLabel = style === "1" ? "Style 2" : "Style 1";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${nextLabel}`}
      className={
        variant === "pill"
          ? `inline-flex items-center rounded-full border border-ink-line px-3.5 py-2 text-xs font-medium text-ink/70 transition-colors duration-200 hover:text-ink ${className}`
          : `flex items-center justify-center rounded-xl border border-ink-line px-4 py-2.5 text-sm font-medium text-ink/80 transition-colors duration-200 hover:text-ink ${className}`
      }
    >
      {nextLabel}
    </button>
  );
}
