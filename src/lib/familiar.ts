/**
 * The "Do any of these sound familiar?..." section: the pain-point cards and
 * the copy around them. Eleven quotes, all from the copy doc, in the order the
 * client chose (8 Oct), so the last card is the frustration one: the first ten
 * are scattered round the heading and gathered into a pile, the last rises on
 * top of it. The doc's clear typos are fixed
 * ("practices" to "practice’s", "google" to "Google", a stray capital).
 *
 * Text in **double asterisks** is highlighted in the doc and renders bold.
 */
export type PainQuote = {
  tag: string;
  quote: string;
};

export const painQuotes: PainQuote[] = [
  { tag: "Exhaustion", quote: "I can’t even get ill." },
  {
    tag: "Home Life",
    quote:
      "When I’m home I’m still thinking about the practice. Even when I’m on holiday. It wasn’t supposed to be like this.",
  },
  { tag: "Finance", quote: "Everyone else gets paid apart from me." },
  {
    tag: "Staff",
    quote:
      "I ask staff to do things...and they just don’t get done. No one seems to listen or take responsibility or care. Am I the only one who cares about the practice?",
  },
  {
    tag: "Burn Out",
    quote:
      "I dread coming to work. I can’t wait for the day to end and to be on the drive home, away from here.",
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
    quote: "I bought a practice for freedom. Instead I feel trapped.",
  },
  {
    tag: "Systems",
    quote:
      "Complaint after complaint. And my Google reviews are shocking. How do I get on top of this.",
  },
  { tag: "Home Life", quote: "My family get a very poor version of me." },
  {
    tag: "Frustration",
    quote: "I know things need to change, I just don’t know where to start.",
  },
];

export const familiarHeading = "Do any of these sound familiar?...";

/**
 * The single line the section ends on, in the parts it arrives in: the name
 * comes in, then " can ", then "fix this" (underlined) and the full stop.
 */
export const familiarResolve = {
  highlight: "Dental Growth Lab",
  middle: " can ",
  underlined: "fix this",
  end: ".",
};

export const familiarAfter = {
  notAlone: "If any, or even all of these sound familiar. You are not alone.",
  notNeeded: [
    "You don’t need to work harder.",
    "You don’t need to squeeze another patient into the diary.",
    "And you definitely don’t need to keep doing everything yourself.",
  ],
  need: "What you need is **complete change** to transform the practice from a struggling and stressful practice to **a thriving, systematic dental business that works for you, without you**.",
  close:
    "Dental Growth Lab helps dental practice owners like yourself become leaders, build accountable teams, effective systems and profitable businesses that don’t depend on them. We help take you **from owner dependent to owner independent**, by building a practice that works **for you, without you.**",
};
