/**
 * Copy for the How We Work page: the FAQ headings, the phase timeline, the
 * "Is Dental Coaching For Me?" table and the next steps. The wording is the
 * copy doc, verbatim apart from clear typos.
 *
 * The Next Steps now carry the price, as the updated copy has it: £1500 a
 * month and the £995 practice visit, both inclusive of VAT.
 */
export type Phase = {
  numeral: string;
  title: string;
  /** Shown as a chip beside the phase title. Phase IV has none in the copy. */
  duration?: string;
  lead?: string;
  bullets: string[];
  /** A short sign-off line shown under the bullets. */
  outro?: string;
};

export const phases: Phase[] = [
  {
    numeral: "Phase I",
    title: "Clarity and Leadership",
    duration: "Approximately 9 months",
    bullets: [
      "Having a clear vision / goal for your life, and a plan to build your practice to be able to give you that life.",
      "Becoming the CEO of your own practice.",
      "Taking responsibility and accountability.",
      "Implementation of the structure to be able to achieve your goals.",
    ],
  },
  {
    numeral: "Phase II",
    title: "Systems and Structure",
    duration: "Approximately 18 months",
    lead: "Putting in the systems and structures so your practice can become a well-oiled, self-running machine. These are the areas we will focus on, one at a time so it is always manageable, and systematic. Step by step, brick by brick we help you to build your practice with you.",
    bullets: [
      "Workforce: nurses, reception, TCO, PM, hygienists, dentists.",
      "Recruitment and contracts.",
      "Workplace culture.",
      "Financial metrics.",
      "Patient journey.",
      "Reinvestment.",
      "Appointment books and zoning.",
      "Marketing.",
    ],
    outro: "Step by step, brick by brick, we will help you.",
  },
  {
    numeral: "Phase III",
    title: "Consolidation and Growth",
    duration: "Approximately 6 months",
    lead: "Further consolidation of Phase II. Consolidating the systems and structures already in place. And also adapting, adding and changing them as necessary, it’s always a dynamic process that will constantly need consolidating as you go along. Once the practice has efficient systems and structures in place, this is what growth will look like.",
    bullets: [
      "More new patients.",
      "Better conversion.",
      "More clinicians.",
      "New treatments.",
      "Reinvestment: the latest and leading-edge equipment.",
      "Extended capacity and hours.",
      "Consistent five-star reviews.",
      "Additional surgeries.",
      "‘Skilling-up’ associates.",
      "Specialisations?",
      "Referrals?",
    ],
  },
  {
    numeral: "Phase IV",
    title: "Freedom and Beyond",
    lead: "Re-evaluation of your original vision / goal or continue as you are? When your practice is a profitable self-running machine that is making money for you whether you are there or not, the next step often involves a complete re-evaluation of your goals and a new approach to achieving them. We help you to choose and take it to the next level, and this is where it can get really exciting, as you are now decision making from a position of strength.",
    bullets: [
      "Associate-led model.",
      "Reduce clinically / retire clinically.",
      "Referral specialist practice add-on model.",
      "Extend / expand.",
      "Purchase multiple practices.",
      "Specialise / become a specialist practice.",
      "Set up a squat.",
      "New business plan / spin-off, e.g. education centre / offer courses, as a new income stream.",
      "Exit / cash out.",
      "Or...you may just want to stay as you are having achieved what you originally set out to do.",
    ],
  },
];

/** The three questions the page answers, in the doc's order. */
export const faqLead = "Three FAQ’s:";
export const faqQuestions = {
  how: "How will it work if I join Dental Growth Lab, and how long will it take to get my practice running profitably and efficiently?",
  fit: "Is dental coaching for me?",
  next: "I am interested, what are the next steps, and how much does it cost?",
};

export const fitIntro = {
  heading: "Is Dental Coaching For Me?",
  willWork: "Our coaching will work for you if",
  mayNot: "Our coaching may not work for you if",
};

export const fitWillWork: string[] = [
  "You own your own practice or multiple practices.",
  "You are: Private, Fee-per-item, Denplan, NHS or any mix of these.",
  "You are an associate looking to buy a practice, or to open a squat.",
  "You are a Specialist / referral dentist looking to open/buy your own practice.",
  "You can’t get a grip on the running of the practice, or the finances.",
  "You feel you are constantly firefighting, stressed, overwhelmed or close to burn out.",
  "You are open and receptive to change and new ideas.",
  "You want meaningful change and are prepared to work at it long-term.",
];

export const fitMayNot: string[] = [
  "You are looking for a quick fix.",
  "You think by hiring a dental coach they will do all the work for you and you won’t need to do anything.",
  "You are solely motivated and fixated by money.",
  "You are not open and receptive to change, or to new ways of thinking.",
  "If you are one in a partnership/s and the other partner/s are not on board with dental coaching.",
];

export type Step = {
  title: string;
  points: string[];
};

export const stepsHeading = faqQuestions.next;

export const steps: Step[] = [
  {
    title: "Initial enquiry",
    points: [
      "Simply click on the Book a Call button to arrange a call at a time that is convenient to you, and our founder will give you a short initial 20 to 30 minute call to ask how we can help you and your business.",
      "Alternatively, fill in the form to give us some basic information about you and your practice, then we will call you as above to see how we can help you and your business.",
    ],
  },
  {
    title: "Discovery call",
    points: [
      "An informal chat, usually 30 to 60 minutes, where you can tell us about you and your business, the problems you are facing and where you want to get to.",
    ],
  },
  {
    title: "Offer",
    points: [
      "Provided we are a right fit for you, and also you are a right fit for us we will get back to you within 10 days to discuss and present an offer to yourself of how we can help you. You can take your time to consider this and decide.",
    ],
  },
  {
    title: "Decision / follow-up",
    points: [
      "After considering the offer, we can have another call for any further questions if you have any.",
      "Then let us know if you would like to start the journey to improve your practice, or alternatively you can simply have more or as much time as you like to decide, or even defer entirely.",
    ],
  },
  {
    title: "Contract + payment",
    points: [
      "If you wish to proceed, we send out a service level agreement to yourself which are the coaching agreement/terms between yourself and us.",
      "The cost per month is £1500, this includes VAT.",
      "The agreement can be cancelled at the end of any Quarterly Progress Review. 3 month notice period.",
      "Once signed, you make the first payment and we begin!",
    ],
  },
  {
    title: "Onboarding",
    points: [
      "Welcome email.",
      "Intake questionnaire and baseline assessment.",
      "Scheduling recurring sessions.",
      "Introduce tools/resources and explain how you’ll work together.",
    ],
  },
  {
    title: "Alignment and Practice Visit",
    points: [
      "We come to your practice to spend a whole day with you and your staff to help understand how your practice works and the dynamics.",
      "In this same visit we will have a separate meeting with the owner only to establish the ultimate vision and goals.",
      "This may stretch over two days if necessary. There is a one off fee for Alignment + Practice Visit of £995 inclusive of VAT (it’s the same price if it’s a two day visit).",
    ],
  },
  {
    title: "Initial coaching session",
    points: [
      "Establish the coaching relationship.",
      "Clarify objectives and success measures.",
      "Agree expectations and boundaries.",
      "Create an initial action plan.",
    ],
  },
  {
    title: "Ongoing coaching",
    points: [
      "Regular sessions either fortnightly or weekly depending on what pace you want to progress at or have the time/capacity for.",
      "If you are able to, reserve one day per fortnight for dental coaching. “Working on the business not in the business”",
      "If you are not able to dedicate a day, it will be approximately 2 hours per session.",
      "Between-session exercises/check-ins where appropriate.",
    ],
  },
  {
    title: "Quarterly Progress Review",
    points: [
      "Formal review every quarter.",
      "This is in addition to your fortnightly/weekly meeting and it is included as part of the monthly fee.",
      "We chart and analyse the key metrics compared to previous quarters and the baseline, to check progress and adjust goals.",
      "What’s working/not working for you?",
      "Continue and modify.",
      "Or end agreement and give notice.",
    ],
  },
];
