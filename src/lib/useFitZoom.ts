"use client";

import { useLayoutEffect, type RefObject } from "react";

/**
 * Safety net for pinned, viewport-height stages. If the stage's content is
 * taller than the space below the fixed header (a short laptop screen), it
 * is zoomed down just enough to fit, so nothing is ever cut off or trapped
 * under the header. On roomy screens the zoom stays at 1 and does nothing.
 *
 * Only applies from the `lg` breakpoint up, where the stage is pinned.
 */
export function useFitZoom(
  containerRef: RefObject<HTMLElement | null>,
  contentRef: RefObject<HTMLElement | null>,
  enabled: boolean,
  minZoom = 0.7
) {
  useLayoutEffect(() => {
    const container = containerRef.current;
    const content = contentRef.current;
    if (!container || !content) return;

    const apply = () => {
      const desktop = window.matchMedia("(min-width: 1024px)").matches;
      if (!enabled || !desktop) {
        content.style.zoom = "";
        return;
      }
      content.style.zoom = "1";
      const style = getComputedStyle(container);
      const available =
        container.clientHeight -
        parseFloat(style.paddingTop) -
        parseFloat(style.paddingBottom) -
        16;
      const natural = content.offsetHeight;
      const zoom = natural > available ? Math.max(minZoom, available / natural) : 1;
      content.style.zoom = zoom === 1 ? "" : String(zoom);
    };

    apply();
    const observer = new ResizeObserver(apply);
    observer.observe(container);
    document.fonts?.ready.then(apply).catch(() => {});

    return () => observer.disconnect();
  }, [containerRef, contentRef, enabled, minZoom]);
}
