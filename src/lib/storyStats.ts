export type StoryStat = {
  id: string;
  label: string;
  start: number;
  end: number;
  decimals?: number;
  format: (value: number) => string;
};

const gbp = (value: number) => `£${Math.round(value).toLocaleString("en-GB")}`;

export const storyStats: StoryStat[] = [
  {
    id: "turnover",
    label: "Annual turnover",
    start: 275000,
    end: 2500000,
    format: gbp,
  },
  {
    id: "team",
    label: "Team members",
    start: 2,
    end: 25,
    format: (v) => Math.round(v).toString(),
  },
  {
    id: "clinicians",
    label: "Clinicians",
    start: 1,
    end: 12,
    format: (v) => Math.round(v).toString(),
  },
  {
    id: "surgeries",
    label: "Private surgeries",
    start: 1,
    end: 5,
    format: (v) => Math.round(v).toString(),
  },
  {
    id: "patients",
    label: "New patients per month",
    start: 0,
    end: 200,
    format: (v) => `${Math.round(v)}${v >= 199.5 ? "+" : ""}`,
  },
  {
    id: "rating",
    label: "Google rating",
    start: 0,
    end: 4.9,
    decimals: 1,
    format: (v) => v.toFixed(1),
  },
];

export const boughtDetails = [
  "100% private fee per item dentistry",
  "One part-time dentist, one part-time hygienist",
  "Skeleton staff, no specialist services",
  "A rapidly declining practice",
];

export const soldDetails = [
  "Implants, Invisalign, orthodontics, periodontics, endodontics, oral surgery, sedation",
  "Open 8am to 8pm Monday to Thursday, Saturday 9am to 4pm",
  "A referral centre for other dental practices",
  "Fully associate-led. I ceased clinical dentistry",
];
