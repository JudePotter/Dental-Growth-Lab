/**
 * My Story copy and the Purchased / Sold table.
 *
 * Every row pairs a "Purchased" cell with a "Sold" cell. `label` is the
 * category prefix shown before the value (for example "Clinicians:").
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
  lead: "I know what this feels like. Everything you’ve experienced, I’ve been through.",
  beats: [
    "Then a few years ago, I changed.",
    "I started thinking with clarity.",
    "I started to take accountability and responsibility.",
    "I started to treat it like a business.",
    "And the results were astounding...",
  ],
  result:
    "In just over 5 years I took a failing, part-time, loss making dental surgery to a very profitable, fully private, fully associate led FTE 6 surgery practice. I retired from clinical dentistry.",
  outcome: [
    "But most importantly the practice was self-running.",
    "I was stress free.",
    "And I was only spending 6 hours a week working on the business, instead of 35 hours a week in the business.",
  ],
};

export const purchased = { title: "Purchased", date: "4th Feb 2018" };
export const sold = { title: "Sold", date: "1st December 2023" };

export const storyRows: StoryRow[] = [
  {
    left: { label: "Clinicians:", text: "1 part-time dentist, 1 part-time hygienist" },
    right: { label: "Clinicians:", text: "11 (3 hygienists, 8 dentists)" },
  },
  {
    left: { text: "Skeleton staff" },
    right: { label: "Total workforce:", text: "24 people" },
  },
  {
    left: {
      text: "Failing practice, owner was going to close the door if I hadn’t purchased it.",
    },
    right: {
      label: "Hours:",
      text: "8am to 8pm Mon to Thu, 8am to 5pm Fri, 9am to 4pm Sat",
    },
  },
  {
    left: { label: "Equipment:", text: "15 year old CEREC, functional" },
    right: {
      label: "Equipment:",
      text: "4 brand new surgeries, endo microscope, brand new CEREC, OPG/CBCT",
    },
  },
  {
    left: { label: "Specialities:", text: "Implants" },
    right: {
      label: "Specialities:",
      text: "Implants x3 clinicians, Invisalign, Endodontics, Periodontics, Oral Surgery x3 clinicians, Orthodontics, Sedation (a referral practice for the local area)",
    },
  },
  {
    left: { label: "Surgeries:", text: "3" },
    right: { label: "Surgeries:", text: "5 (6 FTE)" },
  },
  {
    left: { label: "Google:", text: "no presence" },
    right: {
      label: "Google:",
      text: "No.1 organically, 4.9 star rating, over 400 reviews",
    },
  },
  {
    left: { label: "New patients:", text: "5 per month" },
    right: {
      label: "New patients:",
      text: "200+ per month, every month, for 4 years",
    },
  },
  {
    left: { label: "Clinical hours worked by owner:", text: "24" },
    right: { label: "Clinical hours worked by owner:", text: "zero" },
  },
  {
    left: { label: "Admin hours worked by owner:", text: "N/A" },
    right: { label: "Admin hours worked by owner:", text: "24 per month" },
  },
  // Revenue is deliberately just another line, not a finale.
  {
    left: { label: "Annual turnover:", text: "£285,000" },
    right: { label: "Annual turnover:", text: "£2,500,000" },
  },
];

export const storyClosing = {
  beats: [
    "But the important part isn’t the numbers.",
    "It’s what happened in-between.",
    "It wasn’t luck.",
    "It wasn’t one clever marketing campaign.",
    "And it certainly didn’t happen overnight.",
  ],
  learned:
    "I had to learn to become a business owner rather than simply a dentist who owned a business.",
  actions: [
    "I had a clear vision.",
    "I took accountability.",
    "I took responsibility.",
    "I changed the people. The structure. The systems.",
    "I became a leader.",
  ],
  stopped: "And eventually the practice stopped depending on me.",
  sold: "I have now sold the practice, and having walked the walk of buying and selling practices for the last 20 years, I have decided to focus on helping other dental practice owners who are going through the same things I went through, to build profitable practices that can work without you.",
  cta: "You can take back control of your practice. Dental Growth Lab works with you to help achieve your goals, systemise your practice, build effective teams that look after your business for you so you don’t have to. If you would like your practice to work for you, without you, book a call with our founder. Take the first step to taking back control of your business.",
};
