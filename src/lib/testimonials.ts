import { findPublicImage } from "@/lib/images";

/**
 * Testimonials, three-up. The words, names and titles are from
 * `Testimonials/Testimonials.docx`. They are shown left to right as Mohit,
 * Jasdeep, Mital (see `testimonials` at the bottom). Only clear typos are
 * fixed ("Denta" to "Dental", "Univerity" to "University", "NHS trust" to
 * "NHS Trust", a missing full stop).
 *
 * Photos are picked up from `public/images/` by `imageName` (see
 * `findPublicImage` in `lib/images.ts`): testimonial-1 is Jasdeep,
 * testimonial-2 is Dr Patel and testimonial-3 is Mohit.
 */
export type Testimonial = {
  /** Base file name looked up in public/images (no extension). */
  imageName: string;
  /** CSS object-position, so the face stays in frame when the photo is cropped. */
  imagePosition: string;
  name: string;
  /** The headline title. */
  role: string;
  practice?: string;
  /** Post-nominals, set a little smaller. */
  credentials?: string;
  /** Further titles and appointments. Shown when the card is opened. */
  more?: string[];
  /** One entry per paragraph. */
  quote: string[];
};

const fromDoc: Testimonial[] = [
  {
    imageName: "testimonial-1",
    imagePosition: "50% 12%",
    name: "Jasdeep Gangotra",
    role: "Principal Dentist and Director",
    practice: "Mango Tree Dental",
    credentials: "BDS Wales",
    quote: [
      "Pujan is a transformative dental business coach whose actionable marketing strategies have consistently delivered a steady influx of the ideal patients my practice needed. His impactful approach and thought-provoking insights have been instrumental in driving growth through well-structured systems and processes. Having navigated these challenges himself, Pujan offers invaluable expertise in key areas such as competent HR management, accountable marketing, and a seamless end-to-end patient journey driven by your dental team. His sharp focus on data-driven strategies, combined with his approachable nature, empowers you to confidently take the next steps towards enhancing your practice’s growth and profitability.",
      "Thank you for invaluable support and services Pujan!",
    ],
  },
  {
    imageName: "testimonial-2",
    imagePosition: "50% 0%",
    name: "Dr Mital Patel",
    role: "Consultant in Restorative Dentistry and Honorary Clinical Senior Lecturer",
    practice: "Department of Restorative Dentistry, Barts Health NHS Trust",
    credentials:
      "BDS, BSc(Hons), MFDS RCS(Eng), MSc, FDS (Rest. Dent.) RCS(Eng.), FDS RCS (Ed)",
    more: [
      "Trust appointed Associate Dean for Dental Education",
      "Centre of Adult Oral Health, Barts and The London School of Medicine and Dentistry, Queen Mary University of London",
      "The Royal London Dental Institute, London, E1 1BB",
      "Chairman of the Advisory Board for Implant Dentistry and Lead Examiner for Membership in Implant Dentistry Examination",
      "Royal College of Surgeons, Edinburgh",
      "Chairman Elect, International Team for Implantology (ITI) UK and Ireland Section",
      "ITI Fellow and Co-Chair of ITI Scholarship Centre",
      "Barts and The London School of Medicine and Dentistry, Queen Mary University of London",
      "The Royal London Dental Institute, London, E1 1BB",
    ],
    quote: [
      "Pujan has a genuine understanding of the business of dentistry and, importantly, how to build a successful dental business without it becoming unnecessarily stressful or overwhelming.",
      "I have spent several hours listening to Pujan explain his ideas and strategies for putting effective systems in place to help dental practices grow. What particularly stands out is that his approach is based on real-world experience. Pujan has successfully bought, developed and sold several dental practices, achieving an excellent return on each occasion.",
      "His strategies are simple, practical and, most importantly, make a great deal of sense. Having someone with his experience there to support and coach you through the process gives you the confidence to put those ideas into practice and make meaningful changes to your business.",
      "Pujan has clear strategies covering all aspects of running a successful dental practice, from marketing and generating new patients, to recruitment and staff management, through to delivering an excellent patient experience and achieving long-term growth.",
      "I would have no hesitation in recommending Pujan to any dentist or practice owner looking to develop their business, improve their systems and achieve greater success without compromising their quality of life.",
    ],
  },
  {
    imageName: "testimonial-3",
    imagePosition: "50% 10%",
    name: "Mohit",
    role: "Principal and Implant Dentist",
    practice: "MK Dental and Implant Clinic, Brighton",
    credentials: "B.A., B.Dent.Sc, MFD RCSI, MSc (Dental Implants, University of Bristol)",
    quote: [
      "My name is Mohit, and I’m a practice owner in Brighton at MK Dental and Implant Clinic. I’ve been working with Pujan for about three years now, and I’ve found him to be tremendously helpful, putting some strong systems in place in my practice.",
      "Pujan has helped me grow my practice from a point where we were just about surviving and making ends meet, to a thriving practice. I run a mixed practice with both NHS and private elements, and what I’ve really learned from Pujan is clarity of thought: how to put robust systems in place, and how to get the key people in the right places, which has driven the growth in my practice.",
      "I found him approachable, and he was there every time I needed him. I couldn’t recommend him enough to any practice owner out there looking to grow their practice.",
    ],
  },
];

/** Shown left to right: Mohit, Jasdeep, Mital. */
const DISPLAY_ORDER = ["testimonial-3", "testimonial-1", "testimonial-2"];

export const testimonials: Testimonial[] = DISPLAY_ORDER.map((name) => {
  const found = fromDoc.find((t) => t.imageName === name);
  if (!found) throw new Error(`No testimonial with image name ${name}`);
  return found;
});

/** The photos and first names for the Testimonials jump tile. Server only. */
export function tileAvatars() {
  return testimonials.map((t) => ({
    src: findPublicImage(t.imageName),
    name: t.name.replace(/^Dr /, "").replace(/ Gangotra$/, "").replace(/ Patel$/, ""),
  }));
}
