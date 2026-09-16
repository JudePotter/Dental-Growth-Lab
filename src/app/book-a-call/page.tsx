import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CalendlyEmbed from "@/components/CalendlyEmbed";

const BOOKING_URL =
  process.env.NEXT_PUBLIC_BOOKING_URL ??
  "https://calendly.com/dental-growth-lab/intro-call";
const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "hello@dentalgrowthlab.co.uk";
const CONTACT_PHONE = process.env.NEXT_PUBLIC_CONTACT_PHONE ?? "020 7946 0958";

export const metadata: Metadata = {
  title: "Book a Call | Dental Growth Lab",
  description:
    "Book a call with Dental Growth Lab to talk through building a practice that works without you.",
};

export default function BookACallPage() {
  return (
    <>
      <Header />
      <main className="relative bg-paper text-ink">
        <section className="relative overflow-hidden border-b border-paper-line bg-paper-dim">
          <div className="structural-grid" />
          <div className="relative mx-auto max-w-[900px] px-6 pt-36 pb-20 text-center sm:px-10 sm:pt-44 sm:pb-28">
            <p className="text-sm font-medium tracking-wide text-mist-dim">
              Book a call
            </p>
            <h1 className="mt-6 text-balance font-display text-[clamp(2.5rem,7vw,4.5rem)] font-medium leading-[1.02] tracking-tight text-ink">
              Ready to take back control of your practice?
            </h1>
            <p className="mx-auto mt-6 max-w-[52ch] text-lg leading-relaxed text-ink/70">
              A short call is all it takes to see whether we are a fit.
              We&apos;ll talk through where your practice is now, where you
              want it to be, and what needs to change to get there.
            </p>
            <p className="mt-6 font-display text-lg font-medium text-moss-text">
              More Profit. More Control. More Freedom.
            </p>

            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-10 inline-flex items-center justify-center rounded-full bg-moss px-9 py-4 text-base font-medium tracking-wide text-paper transition-colors duration-200 hover:bg-moss-bright"
            >
              Book a call now
            </a>
          </div>
        </section>

        <section className="relative py-20 sm:py-28">
          <div className="mx-auto max-w-[900px] px-6 sm:px-10">
            <CalendlyEmbed />
          </div>
        </section>

        <section className="relative border-t border-paper-line bg-paper-dim py-16 sm:py-20">
          <div className="mx-auto max-w-[900px] px-6 text-center sm:px-10">
            <h2 className="font-display text-2xl font-medium tracking-tight text-ink sm:text-3xl">
              Not ready to book yet?
            </h2>
            <p className="mt-3 max-w-[46ch] mx-auto text-ink/70">
              Enquire via email or number, and we&apos;ll get back to you
              directly.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-10">
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="font-display text-lg font-medium text-moss-text hover:text-moss"
              >
                {CONTACT_EMAIL}
              </a>
              <span className="hidden h-5 w-px bg-mist-line sm:block" aria-hidden="true" />
              <a
                href={`tel:${CONTACT_PHONE.replace(/\s+/g, "")}`}
                className="font-display text-lg font-medium text-moss-text hover:text-moss"
              >
                {CONTACT_PHONE}
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
