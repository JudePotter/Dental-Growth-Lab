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
    x: -30,
    y: -24,
    rotate: -7,
    width: 280,
  },
  {
    topic: "The Team",
    quote:
      "My staff have a poor work ethic. No one seems to listen or care, apart from me.",
    x: 26,
    y: -30,
    rotate: 5,
    width: 260,
  },
  {
    topic: "Your PM",
    quote:
      "My practice manager isn't really managing. I either end up doing it myself, or just give up on the task completely.",
    x: -34,
    y: 6,
    rotate: 4,
    width: 290,
  },
  {
    topic: "Finance",
    quote:
      "If I didn't work, the practice would run negative every month. I work 5 days a week just to subsidise it.",
    x: 33,
    y: 2,
    rotate: -5,
    width: 290,
  },
  {
    topic: "Home Life",
    quote:
      "Even when I'm at home I'm still thinking about the practice. That goes for weekends and holidays too.",
    x: -12,
    y: -38,
    rotate: 8,
    width: 270,
  },
  {
    topic: "The Daily Grind",
    quote:
      "Instead of putting out fires before they happen, I am constantly fighting fires.",
    x: 14,
    y: 30,
    rotate: -6,
    width: 260,
  },
  {
    topic: "Being Trapped",
    quote: "I bought a practice for freedom. Instead I feel trapped.",
    x: -28,
    y: 32,
    rotate: -4,
    width: 230,
  },
  {
    topic: "Being Underpaid",
    quote:
      "For what I do, I'm probably the lowest paid member of staff, with the most responsibility.",
    x: 32,
    y: -6,
    rotate: 6,
    width: 280,
  },
  {
    topic: "Switching Off",
    quote: "I can't even get ill.",
    x: 22,
    y: -24,
    rotate: -9,
    width: 190,
  },
  {
    topic: "Where To Start",
    quote:
      "I know things need to change. I just don't know where to start.",
    x: 6,
    y: 40,
    rotate: 3,
    width: 260,
  },
];
