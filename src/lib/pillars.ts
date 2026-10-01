/**
 * "How We Can Help": the lead-in copy and the thirteen pillar cards, in
 * display order. Body copy is verbatim from the copy doc.
 */
export type Block =
  | { kind: "p"; text: string; strong?: boolean }
  | { kind: "quote"; text: string }
  | { kind: "chips"; items: string[] }
  | { kind: "steps"; items: string[] }
  | { kind: "lines"; items: string[] };

export type Pillar = {
  id: string;
  title: string;
  body: Block[];
};

export const helpIntro = {
  heading: "How We Can Help",
  paragraphs: [
    "Dental Growth Lab helps you become a leader of your own practice, a CEO of your business, so you can get back control of your practice. In doing so it means you get back your sanity, your life, profit, and most importantly your freedom.",
    "We don’t just give you a generic checklist. We work side-by-side with you to completely transform you and your practice from an exhausted, overwhelmed, owner and dentist to a confident, visionary leader of your own business.",
    "We help you take the practice out of your head and put it into systems, processes, people and numbers. So everyone knows what they are responsible for, what good looks like, what needs to happen and who is accountable.",
    "We help break the business down into simple step by step processes and help you to rebuild your business brick by brick until you have a self-running, well-oiled, thriving business, that can work without you.",
  ],
  closing: "These are some examples of how we help you to achieve this.",
};

export const pillars: Pillar[] = [
  {
    id: "clarity",
    title: "Clarity",
    body: [
      { kind: "p", text: "The question isn’t simply “How big can we make the practice?”" },
      {
        kind: "p",
        strong: true,
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
        text: "This is the first and most important step, because you need to know what your ultimate goal is so you know what it is you are working towards.",
      },
      {
        kind: "p",
        strong: true,
        text: "Start with the life you want, then we help you to work backwards to build the business for the life you want.",
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
        text: "As the CEO of your practice there are only two things you should be doing.",
      },
      { kind: "steps", items: ["Attending meetings.", "Making decisions."] },
      { kind: "p", strong: true, text: "And that is it. Dental Growth Lab will help you achieve this." },
      {
        kind: "p",
        text: "No more being the practice’s emergency department. No more micromanaging. No more working late or weekends to do the jobs you set your practice manager to do.",
      },
      { kind: "p", text: "We teach you how to think and behave like the CEO of your business." },
      {
        kind: "p",
        text: "When this happens and you become accountable and responsible for the practice, it transforms into a successful, well oiled, self-running machine, with you as the leader at the top.",
      },
    ],
  },
  {
    id: "systems",
    title: "Systems",
    body: [
      { kind: "p", strong: true, text: "Stop being the practice’s emergency department." },
      { kind: "p", text: "If every problem lands at your desk, the structure is wrong." },
      {
        kind: "p",
        text: "We help create clear lines of responsibility and accountability for your whole team, with clear structures in place so that the processes work, every time, all the time.",
      },
    ],
  },
  {
    id: "practice-manager",
    title: "Practice Manager",
    body: [
      {
        kind: "p",
        text: "Your Practice Manager should be your right hand person. We help you and your practice manager work as a team, not as an owner constantly chasing a manager.",
      },
      {
        kind: "p",
        text: "Your PM should be running the day-to-day business. You should be leading it.",
      },
      { kind: "p", strong: true, text: "We show you how to do this." },
    ],
  },
  {
    id: "meetings",
    title: "Meetings",
    body: [
      {
        kind: "p",
        strong: true,
        text: "Meetings shouldn’t be an hour of talking followed by nothing changing.",
      },
      {
        kind: "p",
        text: "We help you to structure meetings so that every meeting creates impactful decisions and real outcomes.",
      },
    ],
  },
  {
    id: "reception",
    title: "Reception",
    body: [
      {
        kind: "p",
        strong: true,
        text: "Make reception a growth department not just a front desk.",
      },
      {
        kind: "p",
        text: "No more missed calls, missed leads. No more booking errors. No more enquiries that never turn into appointments. No more recall appointments that are never made.",
      },
      {
        kind: "p",
        text: "We help you direct reception so they have a clear remit on their roles and responsibilities. Get the basics right first. Once reception is organised and efficient in their roles, we show you how to make it the powerhouse of your whole practice.",
      },
    ],
  },
  {
    id: "tco",
    title: "Treatment Co-Ordinator (TCO)",
    body: [
      {
        kind: "p",
        text: "Many practice owners and associates are trapped in a cycle of doing all the heavy lifting during consultations, only for the patients to decline treatments, due to poor information, poor communication and, crucially, no follow up.",
      },
      {
        kind: "p",
        strong: true,
        text: "A TCO will guide the patient through the patient journey, build trust, handle consultations and finance, so you don’t have to.",
      },
      {
        kind: "p",
        text: "We help you to set up and integrate a dedicated staff member, either recruited for the role or within your existing workforce, as a TCO in the practice for maximum practice efficiency and maximum business growth.",
      },
    ],
  },
  {
    id: "staff",
    title: "Staff",
    body: [
      {
        kind: "quote",
        text: "“Take care of your staff and your staff will take care of your business.”",
      },
      { kind: "p", text: "A good practice cannot run without good staff." },
      { kind: "p", strong: true, text: "Good staff are a result of good leadership." },
      {
        kind: "p",
        text: "We help you to identify the roles for each team member, including the associates and hygienists, so the practice can perform to its maximum efficiency.",
      },
      {
        kind: "p",
        text: "We help you clearly define those roles and responsibilities, and hold the staff accountable to them, so that everyone is working in the same direction, towards the same goal.",
      },
      {
        kind: "p",
        text: "We also teach you how to look after your workforce’s personal needs and how to create a happy workplace and work culture, so that everyone arrives to work happy, and leaves happy.",
      },
    ],
  },
  {
    id: "recruitment",
    title: "Recruitment",
    body: [
      {
        kind: "p",
        strong: true,
        text: "We help you get the right people in the right jobs. This goes for the nurses, reception, practice manager, TCO, hygienists and dentists.",
      },
      { kind: "p", text: "We help you to get the best out of your current workforce." },
      {
        kind: "p",
        text: "We also help you move away from reactive hiring or hiring out of desperation to help you attract and choose people who align with your practice values and skill sets required.",
      },
      {
        kind: "p",
        text: "But sometimes the problem isn’t the system. Sometimes it’s the person. Sometimes staff member/s don’t align with your practice values. They may be ‘toxic’ or ‘saboteurs.’ They may not even realise they are the cause of the disharmony in your practice.",
      },
      {
        kind: "p",
        text: "If this occurs, which is more common than you may think, we will help you to either reintegrate the staff member to the practice values, or we will help you with how to address and deal with them, so that the workforce is a happy one and always remains a happy one. No exceptions.",
      },
    ],
  },
  {
    id: "patient-journey",
    title: "Patient Journey",
    body: [
      {
        kind: "p",
        text: "A chaotic patient experience leads to reputational damage, missed appointments, poor uptake of treatment plans, low retention and negative feelings for the patients, and the staff.",
      },
      {
        kind: "p",
        strong: true,
        text: "We work with you to create a five-star patient journey from the very first phone call to the completion of their treatment plan, and beyond.",
      },
      {
        kind: "p",
        text: "By systemising every touchpoint we will help your practice consistently deliver an exceptional experience that turns everyday patients into your biggest fans and lifelong advocates.",
      },
    ],
  },
  {
    id: "finance",
    title: "Finance",
    body: [
      {
        kind: "p",
        text: "Many struggling owners feel blind to their actual financial health, relying on gut feel rather than the real situation. The only metric they use is to look at their bank account figure once a month to see if it’s higher or lower than the previous month.",
      },
      {
        kind: "p",
        strong: true,
        text: "We help you to demystify the numbers. We help you to set up a very simple system, only focusing on 7 to 10 key metrics per month, so it is not overwhelming but gives you a complete understanding over the figures that actually matter to you and your business.",
      },
      {
        kind: "p",
        text: "Checking your bank balance then goes from a feeling of disappointment and frustration, to a feeling of anticipation and excitement, as you can measure how much it has grown by each month and understand why it is growing.",
      },
      {
        kind: "p",
        text: "This is the fun exciting part where you get to try out new ideas. You will be able to now grow the practice from a position of strength where it is now fun and exciting, rather than from trying to grow it from a position of weakness when you were desperate.",
      },
    ],
  },
  {
    id: "growth",
    title: "Growth",
    body: [
      {
        kind: "p",
        strong: true,
        text: "When you have all the parts of the machine humming along and working together, growth will happen by default. And when it grows it can grow quickly.",
      },
      {
        kind: "p",
        text: "Coming into work daily with new ideas, having a go at implementing them to see what lands and what doesn’t, all while the practice continues to run automatically in the background.",
      },
      {
        kind: "p",
        text: "Once the foundations are strong, we help you to really grow and accelerate the practice fast. This is the fun part. This is the exciting part and this is what you imagined running a practice would be like when you bought it.",
      },
    ],
  },
  {
    id: "freedom",
    title: "Freedom",
    body: [
      { kind: "p", strong: true, text: "Imagine going away for two weeks..." },
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
      {
        kind: "p",
        strong: true,
        text: "Isn’t this how it was supposed to be? This is what real control looks like. Ready to take back control of your practice?",
      },
    ],
  },
];

/** Shown on the Freedom card, under its body. */
export const freedomContact =
  "Contact us and the founder will call you at a time convenient to you, so you can take the first step to building your profitable practice that works for you, without you.";
