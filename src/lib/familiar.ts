/**
 * The "Do any of these sound familiar?..." section: the pain-point cards and
 * the copy around them. Every quote is from the copy doc, in the doc's order,
 * so the last card is the frustration one. The doc's clear typos are fixed
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
    tag: "Finance",
    quote: "If I stopped working clinically, the practice would lose money.",
  },
  {
    tag: "Finance",
    quote:
      "The staff think I’m sleeping on a bed of money. They couldn’t be further from the truth. I’m working five days a week and more, just to keep the practice going and to make sure everyone gets paid.",
  },
  {
    tag: "Finance",
    quote:
      "For what I do, I feel like I’m the lowest paid member of staff, with the most responsibility. I’ve calculated, if I was an associate my percentage would be 15%. How did it get to this?",
  },
  { tag: "Stress", quote: "I’m the practice’s emergency department." },
  { tag: "Home Life", quote: "My family get a very poor version of me." },
  {
    tag: "Burn Out",
    quote:
      "I dread coming to work. I can’t wait for the day to end and to be on the drive home, away from here.",
  },
  {
    tag: "Frustration",
    quote:
      "After all my hard work I’ve put into the business, the practice is nowhere near where I thought it would be by now. I don’t know what to do.",
  },
  {
    tag: "Practice Manager",
    quote:
      "My practice manager isn’t really managing. I either end up doing some things myself or giving up on the task completely.",
  },
  {
    tag: "Stress",
    quote:
      "As soon as I step in the door everyone wants a piece of me. I spend the whole day sorting out issues, between seeing patients, when I should be focusing on patients, or on the business. It’s so stressful.",
  },
  {
    tag: "Staff",
    quote:
      "I ask staff to do things...and they just don’t get done. No one seems to listen or take responsibility or care. Am I the only one who cares about the practice?",
  },
  {
    tag: "Nurse + Reception",
    quote:
      "Today I asked one of the nurses to get the day list and check the lab work for the day AGAIN. This is the 5th time I’ve said it in last 2 weeks. Why am I still saying this? Why do I still have to micromanage?",
  },
  {
    tag: "Reception",
    quote:
      "I’ve literally walked past reception, heard the phone ringing and no one picks it up.",
  },
  {
    tag: "Systems + Reception",
    quote:
      "We’re spending thousands to get new patients and then I have no idea what happens to them. God knows how many patients we’re losing because of reception.",
  },
  {
    tag: "Systems + Recruitment",
    quote:
      "One of my nurses just handed her notice in. My heart sank. Another resignation. How am I going to replace her in just 4 weeks. No one seems to understand how hard this is.",
  },
  {
    tag: "Systems",
    quote:
      "Complaint after complaint. And my Google reviews are shocking. How do I get on top of this.",
  },
  {
    tag: "Stress",
    quote: "I bought a practice for freedom. Instead I feel trapped.",
  },
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
