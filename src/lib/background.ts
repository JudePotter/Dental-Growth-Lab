/**
 * The two background styles. Style 1 is the bright gradient and the default;
 * Style 2 is the original rich blue. Only the full-screen background changes
 * (see .site-bg in globals.css). The choice lives on <html data-bg> and is
 * remembered in localStorage.
 */
export type BgStyle = "bright" | "rich";

export const DEFAULT_BG: BgStyle = "bright";

export const BG_STYLES: { id: BgStyle; number: "1" | "2"; label: string }[] = [
  { id: "bright", number: "1", label: "Bright blue" },
  { id: "rich", number: "2", label: "Rich blue" },
];

/** localStorage key shared by the switch and the boot script below. */
export const BG_STORAGE_KEY = "dgl-bg";

/** The event the switch fires so every instance of it stays in step. */
export const BG_EVENT = "dgl-bg-change";

/**
 * Runs before paint, inlined in the root layout's head, so a style picked
 * earlier shows with no flash of the default. A shared link can force one
 * with ?style=1 or ?style=2, which wins over the stored choice.
 */
export function bgBootScript(): string {
  return `(function(){try{var q=new URLSearchParams(location.search).get("style");var v=q||localStorage.getItem("${BG_STORAGE_KEY}");if(v==="2"||v==="rich"){document.documentElement.setAttribute("data-bg","rich");}}catch(e){}})();`;
}
