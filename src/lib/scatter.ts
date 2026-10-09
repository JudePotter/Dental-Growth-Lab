/**
 * Hand placed positions for the scattered pain cards. Fixed numbers, never
 * random, so the screen looks the same every visit.
 *
 * x and y are the centre of the card as a percentage of the field (the stage
 * below the header). r is its resting tilt in degrees (about -3 to +3). dx, dy
 * (percent of the field) and dr (degrees) are how far the card drifts while the
 * visitor scrolls, before it is gathered. Index i is the i-th quote in
 * painQuotes, which is also the order the cards are gathered in.
 *
 * Three layouts, picked by screen shape: wide (laptop, desktop, iPad held
 * sideways), tablet (iPad upright, narrow windows) and phone.
 */
export type Slot = {
  x: number;
  y: number;
  r: number;
  dx: number;
  dy: number;
  dr: number;
};

export type ScatterMode = "wide" | "tablet" | "phone";

/**
 * Round the heading: a column of three down each side, two above and two
 * below it. The two mid-side cards (3 and 6, the longest quotes) are the ones
 * that join late on a short screen, so the rest keep their room.
 */
const WIDE: Slot[] = [
  { x: 10.5, y: 22.5, r: -2.4, dx: 0.8, dy: 1.0, dr: 1.1 },
  { x: 89.5, y: 81, r: 2.2, dx: -0.7, dy: -1.1, dr: -1.0 },
  { x: 66.5, y: 20.5, r: 1.6, dx: 0.6, dy: 1.2, dr: -1.2 },
  { x: 10, y: 51.5, r: 2.8, dx: -0.6, dy: -0.9, dr: -1.0 },
  { x: 33.5, y: 80, r: -1.8, dx: 0.7, dy: -1.0, dr: 1.2 },
  { x: 89.5, y: 23, r: -2.9, dx: -0.8, dy: 1.1, dr: 1.0 },
  { x: 90, y: 52, r: -1.5, dx: 0.7, dy: 0.9, dr: 1.1 },
  { x: 33.5, y: 21.5, r: 2.6, dx: -0.6, dy: 1.0, dr: -1.1 },
  { x: 10.5, y: 81, r: 1.4, dx: 0.9, dy: -1.1, dr: -1.0 },
  { x: 66.5, y: 79.5, r: -2.2, dx: -0.7, dy: -0.9, dr: 1.2 },
];

/** Tall and not so wide: rows of three and two above and below the heading. */
const TABLET: Slot[] = [
  { x: 17, y: 17.5, r: -2.6, dx: 1.0, dy: 0.7, dr: 1.1 },
  { x: 83, y: 82.5, r: 2.4, dx: -1.0, dy: -0.7, dr: -1.0 },
  { x: 70, y: 33, r: 1.8, dx: 0.8, dy: 0.8, dr: -1.2 },
  { x: 30, y: 67.5, r: -2.0, dx: -0.9, dy: -0.8, dr: 1.1 },
  { x: 17, y: 81.5, r: 2.8, dx: 0.9, dy: -0.7, dr: -1.0 },
  { x: 83, y: 18.5, r: -2.2, dx: -1.0, dy: 0.7, dr: 1.0 },
  { x: 70, y: 66.5, r: 1.2, dx: 0.9, dy: -0.8, dr: -0.9 },
  { x: 30, y: 32, r: 2.4, dx: -0.8, dy: 0.8, dr: -1.1 },
  { x: 50, y: 16.5, r: -1.2, dx: 0.7, dy: 0.7, dr: 1.0 },
  { x: 50, y: 83.5, r: 1.6, dx: -0.7, dy: -0.7, dr: -1.0 },
];

/**
 * Phone: only six cards sit at the edges (the shorter quotes), two above the
 * heading and four below. The other four (1, 3, 4, 6) are not on screen at the
 * start; they slide in from the side as the gather reaches them, so only their
 * y is used here (and their side, by index).
 */
const PHONE: Slot[] = [
  { x: 25, y: 20, r: -2.6, dx: 1.6, dy: 0.8, dr: 1.0 },
  { x: 50, y: 40, r: 0, dx: 0, dy: 0, dr: 0 },
  { x: 75, y: 25, r: 2.4, dx: -1.6, dy: 0.9, dr: -1.0 },
  { x: 50, y: 55, r: 0, dx: 0, dy: 0, dr: 0 },
  { x: 50, y: 60, r: 0, dx: 0, dy: 0, dr: 0 },
  { x: 25, y: 70, r: 1.8, dx: 1.4, dy: -0.8, dr: -0.9 },
  { x: 50, y: 45, r: 0, dx: 0, dy: 0, dr: 0 },
  { x: 75, y: 71, r: -2.2, dx: -1.4, dy: -0.8, dr: 1.0 },
  { x: 27, y: 88, r: -1.4, dx: 1.4, dy: -0.7, dr: 0.9 },
  { x: 73, y: 88, r: 2.0, dx: -1.4, dy: -0.7, dr: -0.9 },
];

export const LAYOUTS: Record<ScatterMode, Slot[]> = {
  wide: WIDE,
  tablet: TABLET,
  phone: PHONE,
};

/**
 * Cards that are not on screen when the scatter opens, and join as the gather
 * reaches them. On a phone that is four of the ten. On a wide screen under
 * SHORT_SCREEN tall it is the two longest, so the scatter stays calm.
 */
export const PHONE_JOINERS = [1, 3, 4, 6];
export const SHORT_JOINERS = [3, 6];
/** A phone under SHORT_PHONE tall (a 360x640) has room for only four on screen. */
export const SHORT_PHONE = 700;
export const SHORT_PHONE_JOINERS = [1, 3, 4, 6, 8, 9];
export const SHORT_SCREEN = 760;

/** How big a card is, as a share of the field width (with limits in px), its height as a share of its width, and its text as a share of its width. */
export const CARD_SIZE: Record<
  ScatterMode,
  { wFrac: number; min: number; max: number; ar: number; fs: number; pileFrac: number; pileMin: number; pileMax: number }
> = {
  wide: { wFrac: 0.17, min: 176, max: 320, ar: 0.72, fs: 0.064, pileFrac: 0.26, pileMin: 300, pileMax: 420 },
  tablet: { wFrac: 0.27, min: 150, max: 300, ar: 0.78, fs: 0.07, pileFrac: 0.5, pileMin: 300, pileMax: 380 },
  phone: { wFrac: 0.36, min: 110, max: 200, ar: 0.9, fs: 0.082, pileFrac: 0.66, pileMin: 230, pileMax: 300 },
};

/**
 * The timeline, in arbitrary units (the scroll maps the whole of it). The
 * scatter drifts from 0, the cards gather one after another from GATHER_AT,
 * Frustration rises when the pile is neat, is held, then everything lifts away.
 */
export const GATHER_AT = 2.4;
export const GATHER_STEP = 0.32;
export const GATHER_LEN = 1.45;
export const FINALE_LEN = 1.5;
export const HOLD_LEN = 1.1;
export const LIFT_LEN = 1.2;

/** Screens of scrolling the whole sequence takes, on top of the one it is pinned in. */
export const RUN_SCREENS = 5.4;
