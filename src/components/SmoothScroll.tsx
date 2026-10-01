"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SCROLL_GLIDE, SCROLL_JUMP_GLIDE } from "@/lib/scrollFeel";

gsap.registerPlugin(ScrollTrigger);

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

/**
 * Site-wide smooth scroll (Lenis), wired into GSAP's ticker so the scrubbed
 * sequences read the same scroll position Lenis is driving.
 *
 * It also owns in-page navigation. Every section is laid out so its own top
 * padding already clears the fixed header, so a hash link can simply scroll
 * the section's top to the top of the viewport.
 */
export default function SmoothScroll() {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);
  const firstRun = useRef(true);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let lenis: Lenis | null = null;
    let tick: ((time: number) => void) | null = null;

    if (!prefersReduced) {
      const instance = new Lenis({
        duration: SCROLL_GLIDE,
        easing: easeOutCubic,
        smoothWheel: true,
      });
      lenis = instance;
      lenisRef.current = instance;

      instance.on("scroll", ScrollTrigger.update);
      tick = (time: number) => instance.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
    }

    // Pinned, scroll-scrubbed sections measure their scroll range on mount.
    // Web fonts swapping in afterwards (or images loading late) can reflow
    // the page and desync that range from the real scroll position, so
    // re-measure once layout has settled.
    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh).catch(() => {});
    window.addEventListener("load", refresh);

    const scrollTo = (target: HTMLElement | number, immediate = false) => {
      if (lenis) {
        lenis.scrollTo(target, {
          duration: SCROLL_JUMP_GLIDE,
          easing: easeOutCubic,
          immediate,
          force: true,
        });
      } else if (typeof target === "number") {
        window.scrollTo({ top: target });
      } else {
        target.scrollIntoView();
      }
    };

    const onClick = (e: MouseEvent) => {
      if (
        e.defaultPrevented ||
        e.button !== 0 ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey
      ) {
        return;
      }
      const anchor = (e.target as Element | null)?.closest?.("a[href]") as
        | HTMLAnchorElement
        | null;
      if (!anchor || anchor.target === "_blank" || anchor.hasAttribute("download")) {
        return;
      }
      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin) return;

      const target = url.hash
        ? document.getElementById(decodeURIComponent(url.hash.slice(1)))
        : null;
      const samePath = url.pathname === window.location.pathname;
      // A "/#contact" link on a page that has its own #contact section
      // (How We Work, Book a Call) scrolls there instead of leaving the page.
      const homeLinkToLocalSection = !samePath && url.pathname === "/" && !!target;
      if (!samePath && !homeLinkToLocalSection) return;
      if (samePath && url.search !== window.location.search) return;
      if (url.hash && !target) return;

      e.preventDefault();
      e.stopImmediatePropagation();
      scrollTo(target ?? 0);
      window.history.pushState(
        null,
        "",
        window.location.pathname + window.location.search + url.hash
      );
    };
    // Capture phase, so it runs before next/link's own handler.
    document.addEventListener("click", onClick, true);

    return () => {
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("load", refresh);
      if (tick) gsap.ticker.remove(tick);
      lenis?.destroy();
      lenisRef.current = null;
    };
  }, []);

  // After a client-side route change (or an initial load onto a hash),
  // re-measure and land where the URL says. A plain reload without a hash
  // is left alone so the browser can restore its own scroll position.
  useEffect(() => {
    const isFirst = firstRun.current;
    firstRun.current = false;
    const hash = window.location.hash;
    if (isFirst && !hash) return;

    const id = window.setTimeout(() => {
      ScrollTrigger.refresh();
      const el = hash
        ? document.getElementById(decodeURIComponent(hash.slice(1)))
        : null;
      const lenis = lenisRef.current;
      if (lenis) {
        lenis.scrollTo(el ?? 0, { immediate: true, force: true });
      } else if (el) {
        el.scrollIntoView();
      } else {
        window.scrollTo({ top: 0 });
      }
    }, 120);

    return () => window.clearTimeout(id);
  }, [pathname]);

  return null;
}
