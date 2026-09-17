export type StatRow = {
  id: string;
  label: string;
  bought: number;
  sold: number;
  decimals?: number;
  format: (value: number) => string;
  /** Overrides the counted Bought figure with plain text, for a metric
   * that had no meaningful starting number (e.g. no reviews yet). */
  boughtDisplay?: string;
  /** A short line under the Sold figure for extra context from the brief. */
  soldCaption?: string;
};

const int = (v: number) => Math.round(v).toString();
// A thin space after the symbol keeps it from crowding the first digit at
// the very large display sizes the turnover finale uses.
const gbp = (value: number) => `£ ${Math.round(value).toLocaleString("en-GB")}`;

export const statRows: StatRow[] = [
  {
    id: "team",
    label: "Team members",
    bought: 2,
    sold: 25,
    format: int,
  },
  {
    id: "clinicians",
    label: "Clinicians",
    bought: 1,
    sold: 12,
    format: int,
  },
  {
    id: "surgeries",
    label: "Private surgeries",
    bought: 1,
    sold: 5,
    format: int,
    soldCaption: "FTE 6 surgeries",
  },
  {
    id: "patients",
    label: "New patients per month",
    bought: 0,
    sold: 200,
    format: (v) => `${Math.round(v)}${v >= 199.5 ? "+" : ""}`,
  },
  {
    id: "rating",
    label: "Google rating",
    bought: 0,
    sold: 4.9,
    decimals: 1,
    format: (v) => v.toFixed(1),
    boughtDisplay: "No reviews yet",
    soldCaption: "No.1 organically on Google",
  },
];

export const turnoverStat = {
  label: "Annual turnover",
  bought: 275000,
  sold: 2500000,
  format: gbp,
};

export const boughtDetails = [
  "100% private fee per item dentistry",
  "One part time dentist, one part time hygienist",
  "Skeleton staff, no specialist services",
  "A rapidly declining practice",
  "The previous owners said that, had it not been bought, it would have closed and been converted into a flat",
];

export const soldDetails = [
  "Implants, Invisalign, orthodontics, periodontics, endodontics, oral surgery, sedation",
  "Open 8am to 8pm Monday to Thursday, Saturday 9am to 4pm",
  "Brand new CEREC, OPG or CBCT, and an endodontic microscope",
  "A referral centre for other dental practices",
  "Fully associate led. I ceased clinical dentistry",
];
