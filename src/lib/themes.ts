export type ThemeId = "periwinkle" | "calendly" | "teal";

export const DEFAULT_THEME: ThemeId = "periwinkle";

export const THEMES: { id: ThemeId; label: string; description: string }[] = [
  {
    id: "periwinkle",
    label: "Periwinkle",
    description: "The original indigo periwinkle scheme.",
  },
  {
    id: "calendly",
    label: "Calendly gradient",
    description: "Blue to aqua mint, sampled from the Calendly gradient.",
  },
  {
    id: "teal",
    label: "Teal",
    description: "A calm, restrained deep teal on the same paper base.",
  },
];

export function isThemeId(value: string | null): value is ThemeId {
  return !!value && THEMES.some((t) => t.id === value);
}

/** localStorage key the header's style toggle reads/writes, shared with the boot script below. */
export const THEME_STORAGE_KEY = "dgl-theme";

/**
 * Runs before paint so a shared ?theme= link, or a style picked earlier via
 * the header toggle, swaps the palette with no flash of the default scheme.
 * Kept tiny and inlined in the root layout's head rather than a hook, so the
 * page stays statically prerenderable. The URL param wins over the stored
 * choice so a shared themed link is never overridden by local state.
 */
export function themeBootScript(): string {
  const ids = THEMES.map((t) => t.id).join('","');
  return `(function(){try{var t=new URLSearchParams(location.search).get("theme");if(!t){t=localStorage.getItem("${THEME_STORAGE_KEY}");}if(["${ids}"].indexOf(t)>-1){document.documentElement.setAttribute("data-theme",t);}}catch(e){}})();`;
}
