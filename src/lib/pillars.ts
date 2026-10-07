/**
 * "How We Can Help": the lead-in copy and the thirteen pillar cards, in
 * display order. The wording is the cut-down version from the copy doc,
 * verbatim apart from clear typos ("practices" to "practice’s", "its" to
 * "it’s", a lower case "we" opening a sentence).
 *
 * Text in **double asterisks** is highlighted in the doc and renders bold.
 */
export type Block =
  | { kind: "p"; text: string }
  | { kind: "quote"; text: string }
  | { kind: "chips"; items: string[] }
  | { kind: "lines"; items: string[] };

export type Pillar = {
  id: string;
  title: string;
  body: Block[];
};

export const helpIntro = {
  heading: "How We Can Help",
  paragraphs: [
    "Dental Growth Lab helps you become **a leader of your own practice, a CEO of your business,** so you can get back control of your practice. In doing so it means you get back your wellbeing, your life, your profit, and most importantly your freedom.",
    "We don’t just give you a generic checklist. We work **side-by-side with you** to completely transform you and your practice **from an exhausted, overwhelmed, owner and dentist to a confident, visionary leader of your own business.**",
  ],
};

export const pillars: Pillar[] = [
  {
    id: "clarity",
    title: "Clarity",
    body: [
      { kind: "p", text: "The question isn’t simply “How big can we make the practice?”" },
      {
        kind: "p",
        text: "The most important question is “What do you want your practice to give you?”",
      },
      {
        kind: "chips",
        items: [
          "More time?",
          "More profit?",
          "Three clinical days instead of five?",
          "School fees?",
          "More holidays?...A holiday?",
          "Financial independence?",
          "Early retirement?",
          "Another practice?...a chain of practices?",
          "Or simply evenings and weekends with your family?",
        ],
      },
      {
        kind: "p",
        text: "We help you to work backwards from the end vision, **to build the business for the life you want.**",
      },
    ],
  },
  {
    id: "leadership",
    title: "Leadership",
    body: [
      {
        kind: "p",
        text: "True transformation comes from the top. You are the CEO of your company so you need to start thinking and behaving like one to be able to get the results you want.",
      },
      {
        kind: "p",
        text: "We teach you how to **think and behave like the CEO of your business.**",
      },
    ],
  },
  {
    id: "systems",
    title: "Systems",
    body: [
      { kind: "p", text: "**Stop being the practice’s emergency department.**" },
      { kind: "p", text: "If every problem lands at your desk, the structure is wrong." },
      {
        kind: "p",
        text: "We help create **clear lines of responsibility and accountability for your whole team**, with clear structures in place so that the processes work. Every time. All the time.",
      },
    ],
  },
  {
    id: "practice-manager",
    title: "Practice Manager",
    body: [
      {
        kind: "p",
        text: "**Your PM should be running the day-to-day business. You should be leading it**.",
      },
      {
        kind: "p",
        text: "We help you and your practice manager work as a team, not as an owner constantly chasing a manager.",
      },
    ],
  },
  {
    id: "meetings",
    title: "Meetings",
    body: [
      {
        kind: "p",
        text: "Meetings shouldn’t be an hour of talking followed by nothing changing.",
      },
      {
        kind: "p",
        text: "We help you to structure meetings so that every meeting creates **impactful decisions** and **real outcomes.**",
      },
    ],
  },
  {
    id: "reception",
    title: "Reception",
    body: [
      {
        kind: "p",
        text: "No more missed calls, missed leads. No more booking errors. No more enquiries that never turn into appointments. No more recall appointments that are never made.",
      },
      {
        kind: "p",
        text: "We help you direct reception so they have a clear remit on their roles and responsibilities. We show you how to make it **the powerhouse of your whole practice.**",
      },
    ],
  },
  {
    id: "tco",
    title: "Treatment Co-Ordinator (TCO)",
    body: [
      {
        kind: "p",
        text: "A TCO will guide the patients through the patient journey, build trust and handle consultations, **so you don’t have to**. They also follow up patients treatment plans and arrange finance.",
      },
      {
        kind: "p",
        text: "We help you to set up and integrate a TCO in the practice for **maximum practice efficiency and business growth.**",
      },
    ],
  },
  {
    id: "staff",
    title: "Staff",
    body: [
      {
        kind: "quote",
        text: "**“Take care of your staff and your staff will take care of your business.”**",
      },
      { kind: "p", text: "A good practice cannot run without good staff." },
      {
        kind: "p",
        text: "We help you to identify the roles for each team member so they perform their duties to their maximum efficiency, defining their roles and responsibilities, and holding them accountable to them.",
      },
      {
        kind: "p",
        text: "We show you how to address any staff that don’t align with your practice values, and may be ‘toxic’ or ‘saboteurs’ to the practice. We help you ensure the workforce in your practice is a happy one, and remains a happy one. No exceptions.",
      },
    ],
  },
  {
    id: "recruitment",
    title: "Recruitment",
    body: [
      {
        kind: "p",
        text: "**Sometimes the problem isn’t the system, it’s the person.**",
      },
      {
        kind: "p",
        text: "This goes for the nurses, reception, practice manager, TCO, hygienists and dentists.",
      },
      {
        kind: "p",
        text: "We help you to get the best out of your current and future workforce so the workforce align with your practice values, the skillsets you require, and are all working towards the same goal.",
      },
      { kind: "p", text: "We help you get **the right people in the right jobs**." },
    ],
  },
  {
    id: "patient-journey",
    title: "Patient Journey",
    body: [
      {
        kind: "p",
        text: "We work with you to create a **five-star patient journey** from the very first phone call to the completion of their treatment plan, and beyond.",
      },
      {
        kind: "p",
        text: "By systemising every touchpoint we will help your practice **consistently deliver an exceptional experience** that turns everyday patients into your biggest fans and lifelong advocates.",
      },
    ],
  },
  {
    id: "finance",
    title: "Finance",
    body: [
      {
        kind: "p",
        text: "Many struggling owners look at their bank account figure once a month to see if it’s higher or lower than the previous month.",
      },
      {
        kind: "p",
        text: "We help you to demystify the numbers. We help you to set up **a very simple system** that is not overwhelming but gives you a complete understanding over **the figures that actually matter to you and your business**, so you can grow it into a thriving, profitable business.",
      },
    ],
  },
  {
    id: "growth",
    title: "Growth",
    body: [
      {
        kind: "p",
        text: "Once the foundations are strong, and your practice is running automatically in the background, you get to try out new ideas, and tried and tested ones that work, to see what lands and what doesn’t.",
      },
      {
        kind: "lines",
        items: [
          "This is the fun part.",
          "This is the exciting part.",
          "**This is what you imagined running a practice would be like when you bought it.**",
        ],
      },
      {
        kind: "p",
        text: "We help you to really grow and accelerate the practice **quickly**.",
      },
    ],
  },
  {
    id: "freedom",
    title: "Freedom",
    body: [
      { kind: "p", text: "Imagine going away for two weeks..." },
      {
        kind: "lines",
        items: [
          "Nobody needs you.",
          "No constant WhatsApps.",
          "No panicked phone calls.",
          "No checking emails beside the swimming pool.",
          "The team knows what to do.",
          "The PM is in control.",
          "The practice continues.",
        ],
      },
      { kind: "p", text: "Isn’t this how it was supposed to be?" },
      { kind: "p", text: "This is what real control looks like." },
    ],
  },
];

/** The closing passage after the last card. Shared by the home page and How We Work. */
export const readyBlock = {
  heading: "Ready to take back control of your practice?",
  /** The heading as it breaks across the big closing section. The parts join back to `heading`. */
  headingParts: ["Ready to take back ", "control of your practice?"],
  body: "Contact us and the founder will call you at a time convenient to you, so you can take that first step to building your profitable practice that works for you, without you.",
};
