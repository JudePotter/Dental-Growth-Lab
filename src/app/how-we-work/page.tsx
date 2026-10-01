import type { Metadata } from "next";
import WorkTimeline from "@/components/WorkTimeline";
import SpineStage, { type SpineRow } from "@/components/SpineStage";
import NextSteps from "@/components/NextSteps";
import ContactSection from "@/components/ContactSection";
import { Reveal } from "@/components/Reveal";
import { fitIntro, fitMayNot, fitWillWork } from "@/lib/howWeWork";

export const metadata: Metadata = {
  title: "How We Work | Dental Growth Lab",
  description:
    "How Dental Growth Lab works with practice owners: four phases from clarity and leadership to freedom, who our coaching is for, and the next steps to get started.",
};

// Left and right columns are matched row for row. The right column is
// shorter, so its last rows are simply empty.
const fitRows: SpineRow[] = fitWillWork.map((text, i) => ({
  left: { text },
  right: fitMayNot[i] ? { text: fitMayNot[i] } : undefined,
}));

export default function HowWeWorkPage() {
  return (
    <>
      <main>
        <section id="how-we-work" className="relative">
          <div className="mx-auto max-w-[1100px] px-6 pb-[clamp(3rem,8vh,5rem)] pt-[calc(var(--header-h)+clamp(3rem,10vh,6rem))] sm:px-10">
            <Reveal>
              <h1 className="t-big text-white">How We Work</h1>
              <p className="t-text mt-4 text-white/85">
                Step by step, brick by brick, we will help you.
              </p>
            </Reveal>
          </div>

          <div className="mx-auto max-w-[1100px] px-6 pb-[clamp(5rem,14vh,9rem)] sm:px-10">
            <WorkTimeline />
          </div>
        </section>

        <section
          id="is-coaching-for-me"
          className="on-sheet relative rounded-[clamp(1.5rem,3.2vw,2.75rem)] bg-sheet text-ink shadow-[0_-30px_90px_-40px_var(--shadow)]"
        >
          <SpineStage
            title={fitIntro.heading}
            ariaLabel={`${fitIntro.willWork}, compared with ${fitIntro.mayNot}`}
            leftHead={{ title: fitIntro.willWork }}
            rightHead={{ title: fitIntro.mayNot }}
            rows={fitRows}
            leftMark="check"
            rightMark="cross"
          />
        </section>

        <NextSteps />
        <ContactSection />
      </main>
    </>
  );
}
