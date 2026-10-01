/**
 * The pain-point quotes for the "Do any of these sound familiar?..."
 * section. Twelve of the twenty in the copy doc, chosen as the ones that
 * make an owner think "that is exactly me". Each carries its topic tag from
 * the doc. The quotes are verbatim, apart from a typo fix.
 *
 * The order is the order they are laid out on the scatter grid on desktop:
 * the top row, the two side cards of each of the two middle rows, then the
 * bottom row. It is arranged so the longest quotes sit in the top and bottom
 * rows, where the cards have the most room.
 */
export type PainQuote = {
  tag: string;
  quote: string;
};

export const painQuotes: PainQuote[] = [
  {
    tag: "Home Life",
    quote:
      "When I’m home I’m still thinking about the practice. Even when I’m on holiday. It wasn’t supposed to be like this.",
  },
  {
    tag: "Exhaustion",
    quote:
      "I can’t even get ill.",
  },
  {
    tag: "Finance",
    quote:
      "Everyone else gets paid apart from me.",
  },
  {
    tag: "Staff",
    quote:
      "I ask staff to do things...and they just don’t get done. No one seems to listen or take responsibility or care. Am I the only one who cares about the practice?",
  },
  {
    tag: "Frustration",
    quote:
      "I know things need to change, I just don’t know where to start.",
  },
  {
    tag: "Burn Out",
    quote:
      "I dread coming to work. I can’t wait for the day to end and to be on the drive home, away from here.",
  },
  {
    tag: "Stress",
    quote:
      "I’m the practice’s emergency department.",
  },
  {
    tag: "Home Life",
    quote:
      "My family get a very poor version of me.",
  },
  {
    tag: "Reception",
    quote:
      "I’ve literally walked past reception, heard the phone ringing and no one picks it up.",
  },
  {
    tag: "Practice Manager",
    quote:
      "My practice manager isn’t really managing. I either end up doing some things myself or giving up on the task completely.",
  },
  {
    tag: "Stress",
    quote:
      "I bought a practice for freedom. Instead I feel trapped.",
  },
  {
    tag: "Systems",
    quote:
      "Complaint after complaint. And my Google reviews are shocking. How do I get on top of this.",
  },
];

export const familiarHeading = "Do any of these sound familiar?...";
/** What the cards resolve into at the end of the sequence. */
export const familiarResolve = {
  highlight: "Dental Growth Lab",
  rest: " can fix this.",
  pillars: "Clarity. Leadership. Growth. Freedom.",
};

export const familiarAfter = {
  notAlone: "If any, or even all of these sound familiar. You are not alone.",
  notNeeded: [
    "You don’t need to work harder.",
    "You don’t need to squeeze another patient into the diary.",
    "And you definitely don’t need to keep doing everything yourself.",
  ],
  need: "What you need is complete change to transform the practice from a struggling and stressful practice to a thriving, systematic dental business that works for you, without you.",
  close:
    "Dental Growth Lab helps dental practice owners like yourself become leaders, build accountable teams, effective systems and profitable businesses that don’t depend on them. We help take you from owner dependent to owner independent, by building a practice that works for you, without you.",
  cta: "Contact Dental Growth Lab now and schedule a call with our founder so you can take back control of your business and become free again.",
};
