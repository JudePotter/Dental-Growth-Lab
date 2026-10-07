## Dental Growth Lab: content and config

**Environment** (copy `.env.local.example` to `.env.local`):

- `NEXT_PUBLIC_BOOKING_URL`: the Calendly link embedded in the Contact section.
- `NEXT_PUBLIC_WEB3FORMS_KEY`: the Web3Forms access key for the enquiry form
  ("Send to founder"). Until it is set the form shows its confirmation but
  sends nothing (a console warning says so).
- `NEXT_PUBLIC_CONTACT_EMAIL`, `NEXT_PUBLIC_CONTACT_PHONE`: shown under the form.

These are inlined at build time, so re-run `npm run build` after changing them.

**Photos**: drop files into `public/images/` and rebuild. They are picked up
automatically, with no code changes:

- `office-consultation.jpg` (Pujan at his desk) in the hero
- `pujan.jpg` (founder) and `practice.jpg` (Pujan in the practice) on My Story;
  `practice.jpg` is also the photo fixed in the centre of How We Can Help
- `testimonial-1.jpg` (Jasdeep), `testimonial-2.jpg` (Dr Patel),
  `testimonial-3.jpg` (Mohit) on Testimonials, shown as Mohit, Jasdeep, Mital

`.jpg`, `.jpeg`, `.png`, `.webp` and `.avif` all work.

**Colour**: the whole palette comes from one number. In `src/app/globals.css`,
change `--hue` (0 to 360) and the background, tiles, illustrations, table,
buttons and footer all follow. 264 is the current blue.

**Backgrounds**: the page background is Style 1 (bright blue). `--bg-lift` in
`globals.css` is how light it is: raise it to lighten the whole site, but white
text loses contrast as it goes up (measured median 4.2:1 at 0, 3.7:1 at 0.03).
Two sections use Style 2 (the deeper royal blue) instead, the pain points ("Do
any of these sound familiar?") and "Is Dental Coaching For Me?": add
`section-rich` to a section to do the same. There is no switch in the header.

**Pages**: the home page ends on three jump tiles to the Testimonials, How We
Work and Book a Call pages (`/testimonials`, `/how-we-work`, `/book-a-call`).
Every Book a Call button goes to `/book-a-call`.

**Type rule**: content sections use two sizes and two weights at a time. Big
(`t-big`, weight 600) for statements and section titles, text (`t-text`,
weight 400) for everything else, and `t-fit` for the dense pinned stages. The
hero, nav and footer keep their own scale. A section can opt into a different
scale with a wrapper class: `type-story` (My Story), `type-compact`,
`type-orbit` (the How We Can Help cards) and `type-large` (the How We Work page).

**Footer**: the footer is fixed behind the page and revealed when the page
lifts away at the very end (`.page-shell` and `.site-footer` in `globals.css`).

**Copy** lives in `src/lib/` (`familiar.ts`, `story.ts`, `pillars.ts`,
`howWeWork.ts`, `testimonials.ts`). Text in `**double asterisks**` is
highlighted in the copy doc and renders bold. The only prices on the site are
in the Next Steps on the How We Work page (the monthly fee and the practice
visit fee), as the updated copy has them.

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
