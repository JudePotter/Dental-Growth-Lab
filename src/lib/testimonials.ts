/**
 * Testimonials, three-up. These are PLACEHOLDERS, structured so the real
 * photo, practice, credentials and quote drop straight in.
 *
 * To add a real photo: put the file in `public/images/` named
 * `testimonial-1.jpg` (or .jpeg, .png, .webp), `testimonial-2...`,
 * `testimonial-3...` and rebuild. See `findPublicImage` in `lib/images.ts`.
 */
export type Testimonial = {
  /** Base file name looked up in public/images (no extension). */
  imageName: string;
  name: string;
  practice: string;
  credentials: string;
  quote: string;
};

export const testimonials: Testimonial[] = [
  {
    imageName: "testimonial-1",
    name: "Practice owner name",
    practice: "Practice name, Town",
    credentials: "Credentials, e.g. BDS",
    quote:
      "Testimonial placeholder. Replace this with the practice owner’s own words about working with Dental Growth Lab.",
  },
  {
    imageName: "testimonial-2",
    name: "Practice owner name",
    practice: "Practice name, Town",
    credentials: "Credentials, e.g. BDS",
    quote:
      "Testimonial placeholder. Replace this with the practice owner’s own words about working with Dental Growth Lab.",
  },
  {
    imageName: "testimonial-3",
    name: "Practice owner name",
    practice: "Practice name, Town",
    credentials: "Credentials, e.g. BDS",
    quote:
      "Testimonial placeholder. Replace this with the practice owner’s own words about working with Dental Growth Lab.",
  },
];
