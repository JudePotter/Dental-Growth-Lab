export type PainQuote = {
  topic: string;
  quote: string;
  x: number;
  y: number;
  rotate: number;
  width: number;
};

export const painQuotes: PainQuote[] = [
  {
    topic: "Reception",
    quote:
      "I've literally walked past reception, heard the phone ringing, and watched nobody pick it up.",
    x: 17,
    y: 5,
    rotate: -7,
    width: 280,
  },
  {
    topic: "The Team",
    quote:
      "My staff have a poor work ethic. No one seems to listen or care, apart from me.",
    x: -18,
    y: 17,
    rotate: 5,
    width: 260,
  },
  {
    topic: "Your PM",
    quote:
      "My practice manager isn't really managing. I either end up doing it myself, or just give up on the task completely.",
    x: 2,
    y: -15,
    rotate: 4,
    width: 290,
  },
  {
    topic: "Finance",
    quote:
      "If I didn't work, the practice would run negative every month. I work 5 days a week just to subsidise it.",
    x: 18,
    y: 22,
    rotate: -5,
    width: 290,
  },
  {
    topic: "Home Life",
    quote:
      "Even when I'm at home I'm still thinking about the practice. That goes for weekends and holidays too.",
    x: -31,
    y: 1,
    rotate: 8,
    width: 270,
  },
  {
    topic: "The Daily Grind",
    quote:
      "Instead of putting out fires before they happen, I am constantly fighting fires.",
    x: 28,
    y: -8,
    rotate: -6,
    width: 260,
  },
  {
    topic: "Being Trapped",
    quote: "I bought a practice for freedom. Instead I feel trapped.",
    x: -9,
    y: 29,
    rotate: -4,
    width: 230,
  },
  {
    topic: "Being Underpaid",
    quote:
      "For what I do, I'm probably the lowest paid member of staff, with the most responsibility.",
    x: -16,
    y: -18,
    rotate: 6,
    width: 280,
  },
  {
    topic: "Switching Off",
    quote: "I can't even get ill.",
    x: 35,
    y: 14,
    rotate: -9,
    width: 190,
  },
  {
    topic: "Where To Start",
    quote:
      "I know things need to change. I just don't know where to start.",
    x: -35,
    y: 16,
    rotate: 3,
    width: 260,
  },
];
