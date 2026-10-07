import type { Metadata } from "next";
import WorkTimeline from "@/components/WorkTimeline";
import TwinPanels, { type PanelRow } from "@/components/TwinPanels";
import NextSteps from "@/components/NextSteps";
import ContactSection from "@/components/ContactSection";
import { Reveal } from "@/components/Reveal";
import { fitIntro, fitMayNot, fitWillWork, faqLead, faqQuestions } from "@/lib/howWeWork";
import { readyBlock } from "@/lib/pillars";

export const metadata: Metadata = {
  title: "How We Work | Dental Growth Lab",
  description:
    "How Dental Growth Lab works with practice owners: four phases from clarity and leadership to freedom, who our coaching is for, and the next steps to get started.",
};

// Left and right columns are matched row for row. The right column is
// shorter, so its last rows are simply empty.
const fitRows: PanelRow[] = fitWillWork.map((text, i) => ({
  left: { text },
  right: fitMayNot[i] ? { text: fitMayNot[i] } : undefined,
}));

const faqIndex = [
  { id: "faq-how", question: faqQuestions.how },
  { id: "is-coaching-for-me", question: faqQuestions.fit },
  { id: "next-steps", question: faqQuestions.next },
];

export default function HowWeWorkPage() {
  return (
    <>
      <main className="type-large">
        <section id="how-we-work" className="relative">
          <div className="mx-auto max-w-[1100px] px-6 pb-[clamp(3rem,8vh,5rem)] pt-[calc(var(--header-h)+clamp(3rem,10vh,6rem))] sm:px-10">
            <Reveal>
              <h1 className="t-mega text-white">How We Work</h1>
              <p className="t-text-strong mt-[clamp(1.75rem,6vh,3.5rem)] text-white/80">
                {faqLead}
              </p>
              <ol className="mt-4 border-t border-white/25">
                {faqIndex.map((faq, i) => (
                  <li key={faq.id} className="border-b border-white/25">
                    <a
                      href={`#${faq.id}`}
                      className="group -mx-4 flex items-center gap-[clamp(1rem,2.6vw,2.25rem)] rounded-2xl px-4 py-[clamp(1.1rem,2.6vh,1.6rem)] text-white transition-colors duration-300 hover:bg-white/[0.07]"
                    >
                      <span
                        aria-hidden="true"
                        className="t-text w-[2ch] shrink-0 tabular-nums text-white/50 transition-colors duration-300 group-hover:text-white"
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="t-text flex-1 text-balance">{faq.question}</span>
                      <span
                        aria-hidden="true"
                        className="flex h-[2.6rem] w-[2.6rem] shrink-0 items-center justify-center rounded-full border border-white/40 text-white transition-all duration-300 group-hover:translate-y-0.5 group-hover:border-white group-hover:bg-white group-hover:text-royal-700"
                      >
                        <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4 rotate-90">
                          <path
                            d="M4 10h11m-4-4 4 4-4 4"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    </a>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>

          <div
            id="faq-how"
            className="mx-auto max-w-[1100px] px-6 pb-[clamp(5rem,14vh,9rem)] pt-[calc(var(--header-h)+clamp(0.5rem,2vh,1.5rem))] sm:px-10"
          >
            <Reveal>
              <h2 className="t-big mb-[clamp(2.5rem,8vh,5rem)] text-balance text-white">
                {faqQuestions.how}
              </h2>
            </Reveal>
            <WorkTimeline />
          </div>
        </section>

        <section id="is-coaching-for-me" className="section-rich section-rich-all">
          <TwinPanels
            title={fitIntro.heading}
            ariaLabel={`${fitIntro.willWork}, compared with ${fitIntro.mayNot}`}
            leftHead={{ title: fitIntro.willWork }}
            rightHead={{ title: fitIntro.mayNot }}
            rows={fitRows}
            leftMark="check"
            rightMark="cross"
            bright="left"
            tone="dark"
          />
        </section>

        <NextSteps />
        <ContactSection heading={readyBlock.heading} lead={readyBlock.body} />
      </main>
    </>
  );
}
