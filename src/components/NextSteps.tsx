import { steps, stepsHeading } from "@/lib/howWeWork";
import BookCallButton from "./BookCallButton";
import { Reveal } from "./Reveal";

/**
 * "I am interested, what are the next steps, and how much does it cost?" Ten
 * steps from first enquiry to the quarterly review. The updated copy puts the
 * price in the Contract + payment and Alignment and Practice Visit steps, so
 * the figures appear here and nowhere else on the site.
 */
export default function NextSteps() {
  return (
    <section id="next-steps" className="relative">
      <div className="mx-auto grid max-w-[1320px] gap-12 px-6 pb-[clamp(4rem,10vh,7rem)] pt-[calc(var(--header-h)+clamp(2rem,7vh,5rem))] sm:px-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-[clamp(3rem,6vw,6rem)]">
        <div className="lg:sticky lg:top-[calc(var(--header-h)+2rem)] lg:self-start">
          <Reveal>
            <h2 className="t-big text-balance text-white">{stepsHeading}</h2>
            <div className="mt-8">
              <BookCallButton size="lg" />
            </div>
          </Reveal>
        </div>

        <ol className="flex flex-col gap-4">
          {steps.map((step, i) => (
            <li key={step.title}>
              <Reveal>
                <div className="grid grid-cols-[2.25rem_minmax(0,1fr)] items-center gap-x-3 gap-y-3 rounded-[1.5rem] border border-white/15 bg-white/[0.07] p-[clamp(1rem,2.2vw,1.75rem)] backdrop-blur-sm sm:grid-cols-[2.75rem_minmax(0,1fr)] sm:items-start sm:gap-x-5 sm:gap-y-0">
                  <span
                    aria-hidden="true"
                    className="t-text-strong flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-royal-700 sm:h-11 sm:w-11"
                  >
                    {i + 1}
                  </span>
                  <h3 className="t-text-strong text-white sm:pt-[0.55rem]">{step.title}</h3>
                  <ul className="col-span-2 flex flex-col gap-2 sm:col-span-1 sm:col-start-2 sm:mt-3">
                    {step.points.map((point) => (
                      <li key={point} className="t-text flex items-start gap-3 text-white/85">
                        <span
                          aria-hidden="true"
                          className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-sky-300"
                        />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
