import { findPublicImage } from "@/lib/images";
import { testimonials } from "@/lib/testimonials";
import { Reveal } from "./Reveal";
import TestimonialCard from "./TestimonialCard";

/**
 * Three-up testimonials: photo, name and titles, and a Read more button that
 * opens the full testimonial in place. Closed, the whole section is sized to
 * fit on one screen. The words are in lib/testimonials.ts and the photos are
 * picked up from public/images by name. The cards in a row are the same
 * height until one is opened, then each keeps its own.
 */
export default function Testimonials() {
  return (
    <section id="testimonials" className="type-compact relative">
      <div className="mx-auto max-w-[1320px] px-6 pb-[clamp(4rem,10vh,7rem)] pt-[calc(var(--header-h)+clamp(2rem,6vh,4rem))] sm:px-10">
        <Reveal>
          <h2 className="t-big text-white">Testimonials</h2>
        </Reveal>

        <div className="mt-[clamp(1.25rem,4vh,2.5rem)] grid gap-6 has-[[aria-expanded=true]]:items-start lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.imageName} delay={i * 0.1} className="flex">
              <TestimonialCard testimonial={t} src={findPublicImage(t.imageName)} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
