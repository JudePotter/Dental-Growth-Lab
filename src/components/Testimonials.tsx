import { findPublicImage } from "@/lib/images";
import { testimonials } from "@/lib/testimonials";
import PhotoSlot from "./PhotoSlot";
import { Reveal } from "./Reveal";

/**
 * Three-up testimonials: image, then the practice and credentials, then the
 * quote beneath. The content is placeholder for now (see lib/testimonials.ts);
 * real photos are picked up automatically from public/images.
 */
export default function Testimonials() {
  return (
    <section id="testimonials" className="relative">
      <div className="mx-auto max-w-[1320px] px-6 pb-[clamp(4rem,10vh,7rem)] pt-[calc(var(--header-h)+clamp(2rem,6vh,4rem))] sm:px-10">
        <Reveal>
          <h2 className="t-big text-white">Testimonials</h2>
        </Reveal>

        <div className="mt-[clamp(2rem,5vh,3.5rem)] grid gap-6 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.imageName} delay={i * 0.1} className="flex">
              <figure className="on-sheet flex w-full flex-col overflow-hidden rounded-[1.75rem] bg-white text-ink shadow-[0_30px_70px_-40px_var(--shadow)]">
                <PhotoSlot
                  src={findPublicImage(t.imageName)}
                  alt={`${t.name}, ${t.practice}`}
                  kind="person"
                  hint={`${t.imageName}.jpg`}
                  sizes="(min-width: 1024px) 30vw, 90vw"
                  className="aspect-[4/3] w-full"
                />
                <figcaption className="px-6 pt-6">
                  <p className="t-text-strong text-ink">{t.practice}</p>
                  <p className="t-text mt-1 text-royal-700">{t.name}</p>
                  <p className="t-text mt-0.5 text-ink-soft">{t.credentials}</p>
                </figcaption>
                <blockquote className="t-text flex-1 px-6 pb-7 pt-4 text-ink-soft">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
