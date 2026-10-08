"use client";

import { useEffect } from "react";

/**
 * What colour is under the top of the screen, section by section. These are
 * measured from the page itself (the colour at the very top edge, in the
 * middle of the screen), not guessed.
 */
const TINTS = {
  bright: "#0e7ee6",
  rich: "#0830a0",
  sheet: "#f4f5fb",
} as const;

type Tint = keyof typeof TINTS;

/**
 * Keeps the strip iOS 26 Safari paints under the status bar the same colour as
 * the page beneath it, so on a phone it disappears into the page instead of
 * showing as a band of a different blue.
 *
 * Safari cannot let a page show through that strip: it fills it with one solid
 * colour, taken from the page background (and it re-reads that as the
 * background changes). So the page background is set to whatever section is at
 * the top of the screen right now. Touch screens only; on a laptop it does
 * nothing, because nothing is painted there.
 */
export default function ChromeTint() {
  useEffect(() => {
    if (!window.matchMedia("(hover: none) and (pointer: coarse)").matches) return;

    const root = document.documentElement;
    const body = document.body;
    const meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
    let current: Tint | null = null;
    let frame = 0;

    const tintAtTop = (): Tint => {
      const y = 6;
      for (const el of document.querySelectorAll<HTMLElement>("#my-story, .section-rich")) {
        const r = el.getBoundingClientRect();
        if (r.top <= y && r.bottom > y) return el.id === "my-story" ? "sheet" : "rich";
      }
      return "bright";
    };

    const apply = () => {
      frame = 0;
      const next = tintAtTop();
      if (next === current) return;
      current = next;
      const colour = TINTS[next];
      root.style.backgroundColor = colour;
      body.style.backgroundColor = colour;
      meta?.setAttribute("content", colour);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(apply);
    };

    apply();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      root.style.backgroundColor = "";
      body.style.backgroundColor = "";
    };
  }, []);

  return null;
}
