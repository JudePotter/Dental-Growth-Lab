import { existsSync } from "node:fs";
import path from "node:path";

const EXTENSIONS = ["jpg", "jpeg", "png", "webp", "avif"];

/**
 * Looks in `public/images` for a file called `<name>.<ext>` and returns its
 * public URL, or null when there isn't one yet.
 *
 * This is how the founder, practice and testimonial photos are "wired":
 * every slot renders an on-brand placeholder until the real file exists,
 * then picks it up automatically on the next build. No code changes needed.
 * Server only (it reads the filesystem at render/build time).
 */
export function findPublicImage(name: string): string | null {
  for (const ext of EXTENSIONS) {
    const file = path.join(process.cwd(), "public", "images", `${name}.${ext}`);
    if (existsSync(file)) return `/images/${name}.${ext}`;
  }
  return null;
}
