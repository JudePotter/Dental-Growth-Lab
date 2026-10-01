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

- `pujan.jpg` (founder) and `practice.jpg` (the practice) on My Story
- `testimonial-1.jpg`, `testimonial-2.jpg`, `testimonial-3.jpg` on Testimonials

`.jpg`, `.jpeg`, `.png`, `.webp` and `.avif` all work.

**Colour**: the whole palette comes from one number. In `src/app/globals.css`,
change `--hue` (0 to 360) and the background, tiles, illustrations, table,
buttons and footer all follow. 264 is the current blue.

**Type rule**: content sections use two sizes and two weights at a time. Big
(`t-big`, weight 600) for statements and section titles, text (`t-text`,
weight 400) for everything else, and `t-fit` for the dense pinned stages. The
hero, nav and footer keep their own scale.

**Footer**: the footer is fixed behind the page and revealed when the page
lifts away at the very end (`.page-shell` and `.site-footer` in `globals.css`).

**Copy** lives in `src/lib/` (`familiar.ts`, `story.ts`, `pillars.ts`,
`howWeWork.ts`, `testimonials.ts`). No pricing appears anywhere on the site.

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
