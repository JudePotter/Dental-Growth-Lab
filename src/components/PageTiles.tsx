import Link from "next/link";
import { phases } from "@/lib/howWeWork";
import PhotoSlot from "./PhotoSlot";
import { Reveal } from "./Reveal";

export type TileId = "testimonials" | "how-we-work" | "book-a-call";

/** A photo for each person on the Testimonials tile, left to right. */
export type TileAvatar = { src: string | null; name: string };

const ARROW = (
  <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4" aria-hidden="true">
    <path
      d="M4 10h11m-4-4 4 4-4 4"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const TILE =
  "group relative flex min-h-[clamp(15rem,34vh,21rem)] flex-col justify-between overflow-hidden rounded-[clamp(1.5rem,2.4vw,2.25rem)] p-[clamp(1.25rem,2.4vw,2.25rem)] transition-[transform,background-color,box-shadow] duration-500 hover:-translate-y-1";
const GLASS =
  "border border-white/25 bg-white/12 text-white shadow-[0_30px_70px_-40px_var(--shadow)] backdrop-blur-md hover:bg-white/20";
const SOLID =
  "bg-white text-ink shadow-[0_30px_80px_-36px_var(--shadow)] hover:shadow-[0_40px_90px_-30px_var(--shadow)]";

function Arrow({ solid = false }: { solid?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-transform duration-500 group-hover:translate-x-1 ${
        solid ? "bg-royal-600 text-white" : "bg-white text-royal-700"
      }`}
    >
      {ARROW}
    </span>
  );
}

/**
 * The jump tiles that close the home page. Testimonials, How We Work and Book
 * a Call are pages of their own, and these are the way through to them. The
 * Testimonials page and the How We Work page leave out their own tile.
 */
export default function PageTiles({
  avatars,
  skip,
}: {
  avatars: TileAvatar[];
  skip?: TileId;
}) {
  const show = (id: TileId) => skip !== id;

  return (
    <section id="explore" className="type-compact relative">
      <div className="mx-auto max-w-[1320px] px-6 pb-[clamp(2.5rem,6vh,4rem)] pt-[clamp(1.5rem,5vh,3rem)] sm:px-10">
        <ul
          className={`grid gap-[clamp(0.75rem,1.6vw,1.25rem)] ${
            skip ? "md:grid-cols-2" : "lg:grid-cols-3"
          }`}
        >
          {show("testimonials") && (
            <li>
              <Reveal className="h-full">
                <Link href="/testimonials" className={`${TILE} ${GLASS} h-full`}>
                  <ul className="flex" aria-hidden="true">
                    {avatars.map((a) => (
                      <li key={a.name} className="-ml-3 first:ml-0">
                        <PhotoSlot
                          src={a.src}
                          alt=""
                          kind="person"
                          hint="testimonial.jpg"
                          sizes="64px"
                          early
                          className="h-[clamp(3.25rem,5vw,4.25rem)] w-[clamp(3.25rem,5vw,4.25rem)] rounded-full border-[3px] border-white/80"
                        />
                      </li>
                    ))}
                  </ul>
                  <span className="flex items-end justify-between gap-4">
                    <span>
                      <span className="t-big block">Testimonials</span>
                      <span className="t-text mt-2 block text-white/85">
                        {avatars.map((a) => a.name).join(", ").replace(/, ([^,]*)$/, " and $1")}
                      </span>
                    </span>
                    <Arrow />
                  </span>
                </Link>
              </Reveal>
            </li>
          )}

          {show("how-we-work") && (
            <li>
              <Reveal delay={0.08} className="h-full">
                <Link href="/how-we-work" className={`${TILE} ${GLASS} h-full`}>
                  <ol className="flex items-center gap-2" aria-hidden="true">
                    {phases.map((phase, i) => (
                      <li key={phase.numeral} className="flex items-center gap-2">
                        <span className="t-text-strong flex h-[clamp(2.25rem,3.4vw,3rem)] min-w-[clamp(2.25rem,3.4vw,3rem)] items-center justify-center rounded-full border border-white/50 px-2 text-white">
                          {phase.numeral.replace("Phase ", "")}
                        </span>
                        {i < phases.length - 1 && <span className="h-px w-3 bg-white/50" />}
                      </li>
                    ))}
                  </ol>
                  <span className="flex items-end justify-between gap-4">
                    <span>
                      <span className="t-big block">How We Work</span>
                      <span className="t-text mt-2 block max-w-[30ch] text-white/85">
                        Four phases, from Clarity and Leadership to Freedom and Beyond.
                      </span>
                    </span>
                    <Arrow />
                  </span>
                </Link>
              </Reveal>
            </li>
          )}

          {show("book-a-call") && (
            <li>
              <Reveal delay={0.16} className="h-full">
                <Link href="/book-a-call" className={`${TILE} ${SOLID} on-sheet h-full`}>
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-sky-200/60 blur-3xl"
                  />
                  <span className="t-text-strong relative text-royal-700">Contact us</span>
                  <span className="relative flex items-end justify-between gap-4">
                    <span>
                      <span className="t-big block text-ink">Book a Call</span>
                      <span className="t-text mt-2 block max-w-[30ch] text-ink-soft">
                        Contact us and the founder will call you at a time convenient to you.
                      </span>
                    </span>
                    <Arrow solid />
                  </span>
                </Link>
              </Reveal>
            </li>
          )}
        </ul>
      </div>
    </section>
  );
}
