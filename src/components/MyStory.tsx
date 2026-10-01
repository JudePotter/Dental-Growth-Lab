"use client";

import { purchased, sold, storyClosing, storyIntro, storyRows } from "@/lib/story";
import BookCallButton from "./BookCallButton";
import PhotoSlot from "./PhotoSlot";
import { Reveal, ScrollLine } from "./Reveal";
import SpineStage from "./SpineStage";

/**
 * My Story. The one pastel white section on the site: a sheet that rolls up
 * over the fixed blue background and lets it back in at the bottom.
 */
export default function MyStory({
  founderSrc,
  practiceSrc,
}: {
  founderSrc: string | null;
  practiceSrc: string | null;
}) {
  return (
    <section
      id="my-story"
      className="on-sheet type-story relative rounded-[clamp(1.5rem,3.2vw,2.75rem)] bg-sheet text-ink shadow-[0_-30px_90px_-40px_var(--shadow)]"
    >
      <Intro founderSrc={founderSrc} practiceSrc={practiceSrc} />
      <SpineStage
        ariaLabel={`${purchased.title} ${purchased.date} compared with ${sold.title} ${sold.date}`}
        leftHead={{ title: purchased.title, meta: purchased.date }}
        rightHead={{ title: sold.title, meta: sold.date }}
        rows={storyRows}
      />
      <Closing />
    </section>
  );
}

function Intro({
  founderSrc,
  practiceSrc,
}: {
  founderSrc: string | null;
  practiceSrc: string | null;
}) {
  return (
    <div className="mx-auto grid max-w-[1320px] gap-12 px-6 pb-[clamp(4rem,10vh,7rem)] pt-[calc(var(--header-h)+clamp(2rem,6vh,4rem))] sm:px-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:gap-[clamp(3rem,6vw,6rem)]">
      <div>
        <h2 className="t-mega text-ink">My Story</h2>

        <div className="mt-[clamp(2rem,6vh,4rem)] flex flex-col gap-[clamp(1.5rem,4.5vh,3rem)]">
          <ScrollLine>
            <p className="t-big text-balance text-ink">
              {storyIntro.lead}
            </p>
          </ScrollLine>

          <div className="flex flex-col gap-[clamp(0.9rem,2.6vh,1.5rem)]">
            {storyIntro.beats.map((beat, i) => (
              <ScrollLine key={beat}>
                <p
                  className={`flex items-center gap-4 ${
                    i === storyIntro.beats.length - 1
                      ? "t-big text-royal-gradient"
                      : "t-big text-ink"
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className="h-2.5 w-2.5 shrink-0 rounded-full bg-royal-500"
                  />
                  {beat}
                </p>
              </ScrollLine>
            ))}
          </div>

          <ScrollLine>
            <p className="t-text max-w-[54ch] text-ink-soft">{storyIntro.result}</p>
          </ScrollLine>

          {storyIntro.outcome.map((line, i) => (
            <ScrollLine key={line}>
              <p
                className={
                  i < 2
                    ? "t-big text-balance text-ink"
                    : "t-text max-w-[54ch] text-ink-soft"
                }
              >
                {line}
              </p>
            </ScrollLine>
          ))}
        </div>
      </div>

      <aside className="lg:sticky lg:top-[calc(var(--header-h)+1.5rem)] lg:self-start">
        <Reveal>
          <div className="relative mx-auto w-full max-w-[clamp(19rem,28vw,30rem)] pb-14">
            <div className="relative w-[80%]">
              <PhotoSlot
                src={founderSrc}
                alt="Pujan Soni, founder of Dental Growth Lab"
                kind="person"
                hint="pujan.jpg"
                sizes="(min-width: 1024px) 24vw, 70vw"
                priority
                className="aspect-[4/5] w-full rounded-[1.75rem] shadow-[0_30px_70px_-35px_var(--shadow)]"
              />
              <p className="t-text absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-ink backdrop-blur-sm">
                Pujan Soni, Founder
              </p>
            </div>
            <div className="absolute bottom-0 right-0 w-[62%]">
              <PhotoSlot
                src={practiceSrc}
                alt="The practice Pujan built and sold"
                kind="practice"
                hint="practice.jpg"
                sizes="(min-width: 1024px) 18vw, 50vw"
                className="aspect-[4/3] w-full rounded-[1.5rem] border-[6px] border-sheet shadow-[0_30px_70px_-35px_var(--shadow)]"
              />
              <p className="t-text absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-ink backdrop-blur-sm">
                The practice
              </p>
            </div>
          </div>
        </Reveal>
      </aside>
    </div>
  );
}

function Closing() {
  return (
    <div className="mx-auto max-w-[920px] px-6 pb-[clamp(5rem,14vh,9rem)] pt-[clamp(3rem,9vh,6rem)] sm:px-10">
      <div className="flex flex-col gap-[clamp(1.5rem,4.5vh,3rem)]">
        <div className="flex flex-col gap-[clamp(0.6rem,1.6vh,1rem)]">
          {storyClosing.beats.map((beat, i) => (
            <ScrollLine key={beat}>
              <p className={`t-big text-balance ${i === 0 ? "text-ink" : "text-ink-soft"}`}>
                {beat}
              </p>
            </ScrollLine>
          ))}
        </div>

        <ScrollLine>
          <p className="t-big text-balance text-ink">{storyClosing.learned}</p>
        </ScrollLine>

        <div className="flex flex-col gap-[clamp(0.6rem,1.6vh,1rem)]">
          {storyClosing.actions.map((line) => (
            <ScrollLine key={line}>
              <p className="t-big flex items-center gap-4 text-ink">
                <span
                  aria-hidden="true"
                  className="h-2.5 w-2.5 shrink-0 rounded-full bg-royal-500"
                />
                {line}
              </p>
            </ScrollLine>
          ))}
        </div>

        <ScrollLine>
          <p className="t-big text-royal-gradient text-balance">{storyClosing.stopped}</p>
        </ScrollLine>

        <ScrollLine>
          <p className="t-text max-w-[58ch] text-ink-soft">{storyClosing.sold}</p>
        </ScrollLine>

        <ScrollLine>
          <p className="t-text max-w-[58ch] text-ink">{storyClosing.cta}</p>
        </ScrollLine>

        <Reveal>
          <BookCallButton variant="solid" size="lg" />
        </Reveal>
      </div>
    </div>
  );
}
