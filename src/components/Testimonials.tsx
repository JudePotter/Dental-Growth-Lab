import { findPublicImage } from "@/lib/images";
import { testimonials } from "@/lib/testimonials";
import { Reveal } from "./Reveal";
import TestimonialCard from "./TestimonialCard";

/**
 * Three-up testimonials, Mohit, Jasdeep and Mital left to right: photo, name
 * and titles, the first four lines of the review, and a Read more button that
 * opens the full review in place. The words are in lib/testimonials.ts and the
 * photos are picked up from public/images by name. The cards in a row are the
 * same height until one is opened, then each keeps its own. On its own page
 * (`asPage`) the heading is the page's h1.
 */
export default function Testimonials({ asPage = false }: { asPage?: boolean }) {
  return (
    <section id="testimonials" className="type-compact relative">
      <div className="mx-auto max-w-[1320px] px-6 pb-[clamp(4rem,10vh,7rem)] pt-[calc(var(--header-h)+clamp(2rem,6vh,4rem))] sm:px-10">
        <Reveal>
          {asPage ? (
            <h1 className="t-big text-white">Testimonials</h1>
          ) : (
            <h2 className="t-big text-white">Testimonials</h2>
          )}
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
