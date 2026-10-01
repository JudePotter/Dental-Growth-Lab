/**
 * The feel of scrolling, in one place. Two layers of smoothing stack up, and
 * the sum of them is how far the page "trails" your hand:
 *
 * 1. SCROLL_GLIDE: how long the page keeps gliding after the wheel stops
 *    (Lenis). Same easing curve, shorter run.
 * 2. SCRUB: how long scroll-linked animations take to catch up to the scroll
 *    position (GSAP). It used to be 0.7 to 0.8s on top of the glide, which
 *    made animations finish well after the scroll had. At 0.2 they still
 *    ease in, but land with the scroll.
 *
 * Raise either number for a floatier feel, lower it for a tighter one.
 */
export const SCROLL_GLIDE = 0.8;
/** Glide for jumps from the nav and in-page links, which cover more ground. */
export const SCROLL_JUMP_GLIDE = 1.05;
export const SCRUB = 0.2;
