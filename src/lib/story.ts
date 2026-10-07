/**
 * My Story copy and the Purchased / Sold stats. The wording is the copy doc,
 * verbatim apart from clear typos ("Its" to "It’s"), and date and time ranges
 * written with "to" (the site never uses dashes).
 *
 * Text in **double asterisks** is highlighted in the doc and renders bold.
 */
export type StoryCell = {
  label?: string;
  text: string;
};

export type StoryRow = {
  left: StoryCell;
  right: StoryCell;
};

export const storyIntro = {
  lead: "I know what this feels like. Everything you’ve experienced, I’ve experienced.",
  /** Revealed one line at a time, no bullets. */
  beats: [
    "Then a few years ago, I changed.",
    "I started thinking with **clarity.**",
    "I started to take **accountability and responsibility**.",
    "I started to **treat it like a business.**",
    "And the results were astounding…",
  ],
  result:
    "…In just over 5 years I took a failing, part-time, loss making dental surgery to a very profitable, fully private, fully associate led FTE 6 surgery practice.",
  retired:
    "I retired from clinical dentistry. I was only spending 6 hours a week working **on** the business, instead of 35 hours a week **in** the business.",
  outcome:
    "But most importantly the practice was self-running. And I was stress free.",
};

export const purchased = { title: "Purchased", date: "4th Feb 2018" };
export const sold = { title: "Sold", date: "1st December 2023" };

/** Each row pairs a Purchased line with the Sold line it is read against. */
export const storyRows: StoryRow[] = [
  {
    left: { text: "Skeleton Staff" },
    right: { label: "Total Workforce:", text: "24 people" },
  },
  {
    left: {
      label: "Hours:",
      text: "Failing practice, the owner was going to convert it to a flat if I hadn’t purchased it.",
    },
    right: {
      label: "Hours:",
      text: "8am to 8pm Monday to Thursday. 8am to 5pm Friday. 9am to 4pm Saturday",
    },
  },
  {
    left: {
      label: "Clinicians/DwSI’s:",
      text: "1 PT Dentist + Implants, 1 x PT hygienist.",
    },
    right: {
      label: "Clinicians/DwSI’s:",
      text: "Implants x 3 Clinicians, Invisalign, Endodontics, Periodontics, Oral Surgery x 3 Clinicians, Orthodontics and Sedation. 3 hygienists. This practice also became a referral practice for the local area.",
    },
  },
  {
    left: { label: "Equipment:", text: "Basic but functional." },
    right: {
      label: "Equipment:",
      text: "Endo microscope. Brand new; CEREC, OPG/CBCT, 5 x surgeries, 35m2 Staff area extension.",
    },
  },
  {
    left: { label: "Google:", text: "no presence" },
    right: {
      label: "Google:",
      text: "No.1 organically. 4.9 Star Rating. Over 300 reviews.",
    },
  },
  {
    left: { label: "New patients:", text: "5 per month" },
    right: {
      label: "New Patients:",
      text: "200+ per month, every month, for 4 years.",
    },
  },
  {
    left: { label: "Annual Turnover:", text: "£285,000" },
    right: { label: "Annual Turnover:", text: "£2,500,000" },
  },
];

export const storyClosing = {
  /** Each is revealed one line at a time. */
  beats: [
    "The important part isn’t the numbers.",
    "**It’s what happened in-between.**",
    "It wasn’t luck.",
    "It wasn’t one clever marketing campaign.",
    "And it certainly didn’t happen overnight.",
  ],
  learned:
    "**I had to learn to become a business owner rather than simply a dentist who owned a business**.",
  /** Revealed one line at a time, no bullets. */
  actions: [
    "I had a clear vision.",
    "I took accountability.",
    "I took responsibility.",
    "I changed the people. The structure. The systems.",
    "**I became a leader.**",
  ],
  stopped: "And eventually the practice stopped depending on me.",
  sold: "Having bought and sold multiple practices for the last 20 years, I have now decided to retire from practice ownership, so that I can focus on helping other dental practice owners **take back control of their practice.**",
};
