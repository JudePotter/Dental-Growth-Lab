import Link from "next/link";
import { phases } from "@/lib/howWeWork";
import BookCallButton from "./BookCallButton";
import { Reveal } from "./Reveal";

/**
 * The bridge from How We Can Help to the How We Work page. It sits straight
 * after the last pillar card: the four phases at a glance, each one a link,
 * and a clear button through to the full page.
 */
export default function WorkTeaser() {
  return (
    <section id="how-we-work-teaser" className="relative">
      <div className="mx-auto max-w-[1320px] px-6 pb-[clamp(2rem,6vh,4rem)] pt-[clamp(1rem,4vh,3rem)] sm:px-10">
        <Reveal>
          <div className="relative overflow-hidden rounded-[clamp(1.5rem,3vw,2.5rem)] border border-white/20 bg-gradient-to-br from-white/20 via-white/10 to-white/5 p-[clamp(1.5rem,3.5vw,3.5rem)] shadow-[0_40px_100px_-40px_var(--shadow)] backdrop-blur-md">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/20 blur-3xl"
            />

            <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <h2 className="t-big text-white">How We Work</h2>
                <p className="t-text mt-3 max-w-[46ch] text-white/85">
                  Four phases, from Clarity and Leadership to Freedom and
                  Beyond.
                </p>
              </div>
              <BookCallButton
                size="lg"
                href="/how-we-work"
                label="See how we work"
                className="shrink-0 self-start lg:self-auto"
              />
            </div>

            <ol className="relative mt-[clamp(1.5rem,4vh,2.5rem)] grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {phases.map((phase) => (
                <li key={phase.numeral}>
                  <Link
                    href="/how-we-work"
                    className="group flex h-full flex-col gap-2 rounded-2xl border border-white/20 bg-royal-950/35 p-5 transition-colors duration-300 hover:bg-white/15"
                  >
                    <span className="flex items-center justify-between">
                      <span className="t-text-strong text-white">{phase.numeral}</span>
                      <span
                        aria-hidden="true"
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-royal-700 transition-transform duration-300 group-hover:translate-x-1"
                      >
                        <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4">
                          <path
                            d="M4 10h11m-4-4 4 4-4 4"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    </span>
                    <span className="t-text text-white">{phase.title}</span>
                    {phase.duration && (
                      <span className="t-text mt-auto pt-2 text-white/70">
                        {phase.duration}
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
