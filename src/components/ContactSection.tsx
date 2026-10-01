"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type FormEvent } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import CalendlyEmbed from "./CalendlyEmbed";
import { Reveal } from "./Reveal";

const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "hello@dentalgrowthlab.co.uk";
const CONTACT_PHONE = process.env.NEXT_PUBLIC_CONTACT_PHONE ?? "020 7946 0958";

// Web3Forms access keys are public by design (they only allow posting to the
// inbox they were created for), so a NEXT_PUBLIC_ variable is the right home.
const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
const PLACEHOLDER_KEY = "YOUR_WEB3FORMS_ACCESS_KEY";
const ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY || PLACEHOLDER_KEY;

type Status = "idle" | "sending" | "sent" | "error";

const noopSubscribe = () => () => {};

const FIELD =
  "t-text mt-1 w-full rounded-xl border border-sheet-line bg-sheet px-3.5 py-2.5 text-ink placeholder:text-ink-soft/60 transition-colors focus:border-royal-500 focus:outline-none focus:ring-2 focus:ring-royal-500/25";

export default function ContactSection() {
  return (
    <section id="contact" className="relative">
      <div className="mx-auto max-w-[1320px] px-6 pb-[clamp(5rem,12vh,8rem)] pt-[calc(var(--header-h)+clamp(2rem,7vh,5rem))] sm:px-10">
        <Reveal className="mx-auto max-w-[820px] text-center">
          <h2 className="t-big text-white">Book a Call</h2>
          <p className="t-text mt-5 text-white/85">
            Contact us and the founder will call you at a time convenient to
            you, so you can take the first step to building your profitable
            practice that works for you, without you.
          </p>
        </Reveal>

        {/* The two boxes run at 80% of their old size: a narrower row, a
            shorter Calendly frame and a tighter form. */}
        <div className="type-box mx-auto mt-[clamp(2rem,6vh,4rem)] grid max-w-[992px] gap-5 lg:grid-cols-2 lg:items-stretch">
          <Reveal className="flex flex-col">
            <p className="t-text-strong mb-2.5 text-white">Pick a time that suits you</p>
            <CalendlyEmbed className="flex-1" />
          </Reveal>

          <Reveal delay={0.1} className="flex flex-col">
            <p className="t-text-strong mb-2.5 text-white">Or send an enquiry</p>
            <EnquiryForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function EnquiryForm() {
  const [status, setStatus] = useState<Status>("idle");
  const closeRef = useRef<HTMLButtonElement>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    // Honeypot: real visitors never see or fill this field.
    if (data.get("botcheck")) return;

    setStatus("sending");

    if (ACCESS_KEY === PLACEHOLDER_KEY) {
      // No Web3Forms key configured yet: nothing is sent. Set
      // NEXT_PUBLIC_WEB3FORMS_KEY (see .env.local.example) to go live.
      console.warn(
        "[contact form] NEXT_PUBLIC_WEB3FORMS_KEY is not set, so this enquiry was NOT sent."
      );
      setStatus("sent");
      form.reset();
      return;
    }

    try {
      const response = await fetch(WEB3FORMS_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          subject: `New enquiry from ${String(data.get("practice_name") || "the website")}`,
          from_name: "Dental Growth Lab website",
          name: data.get("name"),
          email: data.get("email"),
          phone: data.get("phone"),
          practice_name: data.get("practice_name"),
          message: data.get("message"),
        }),
      });
      const result = (await response.json()) as { success?: boolean };
      if (result.success) {
        setStatus("sent");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  // Close the confirmation with Escape, and move focus onto its button when
  // it opens so keyboard users land on it.
  useEffect(() => {
    if (status !== "sent") return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setStatus("idle");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [status]);

  return (
    <>
      <form
        onSubmit={onSubmit}
        className="on-sheet flex flex-1 flex-col gap-3 rounded-[1.5rem] bg-white p-[clamp(1rem,2.1vw,1.8rem)] text-ink shadow-[0_30px_70px_-40px_var(--shadow)]"
      >
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="t-text block text-ink-soft">
            Name
            <input name="name" type="text" required autoComplete="name" className={FIELD} />
          </label>
          <label className="t-text block text-ink-soft">
            Practice name
            <input name="practice_name" type="text" required autoComplete="organization" className={FIELD} />
          </label>
          <label className="t-text block text-ink-soft">
            Email
            <input name="email" type="email" required autoComplete="email" className={FIELD} />
          </label>
          <label className="t-text block text-ink-soft">
            Phone
            <input name="phone" type="tel" autoComplete="tel" className={FIELD} />
          </label>
        </div>

        <label className="t-text flex flex-1 flex-col text-ink-soft">
          Message
          <textarea
            name="message"
            rows={4}
            className={`${FIELD} min-h-[6.4rem] flex-1 resize-y`}
          />
        </label>

        {/* Honeypot for bots. Hidden from people and assistive tech. */}
        <input
          type="checkbox"
          name="botcheck"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="hidden"
        />

        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          <button
            type="submit"
            disabled={status === "sending"}
            className="t-ui inline-flex items-center justify-center whitespace-nowrap rounded-full bg-royal-600 px-6 py-3 text-white transition-colors duration-200 hover:bg-royal-500 disabled:opacity-60"
            style={{ fontSize: "0.875rem" }}
          >
            {status === "sending" ? "Sending..." : "Send to founder"}
          </button>
          <p className="t-text flex flex-wrap gap-x-4 text-ink-soft">
            <a href={`mailto:${CONTACT_EMAIL}`} className="whitespace-nowrap hover:text-royal-700">
              {CONTACT_EMAIL}
            </a>
            <a
              href={`tel:${CONTACT_PHONE.replace(/\s+/g, "")}`}
              className="whitespace-nowrap hover:text-royal-700"
            >
              {CONTACT_PHONE}
            </a>
          </p>
        </div>

        {status === "error" && (
          <p role="alert" className="t-text text-ink">
            Sorry, that did not send. Please try again, or email us at{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-royal-700 underline">
              {CONTACT_EMAIL}
            </a>
            .
          </p>
        )}
      </form>

      <ConfirmationDialog
        open={status === "sent"}
        onClose={() => setStatus("idle")}
        closeRef={closeRef}
      />
    </>
  );
}

/**
 * The "message sent" pop-up. Portalled to <body>: a fixed overlay inside a
 * transformed ancestor (the scroll reveal) would not cover the viewport.
 */
function ConfirmationDialog({
  open,
  onClose,
  closeRef,
}: {
  open: boolean;
  onClose: () => void;
  closeRef: React.RefObject<HTMLButtonElement | null>;
}) {
  const mounted = useSyncExternalStore(noopSubscribe, () => true, () => false);
  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="enquiry-sent-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-royal-950/70 p-6 backdrop-blur-sm"
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
            className="on-sheet w-full max-w-[26rem] rounded-[1.75rem] bg-white p-8 text-center text-ink shadow-[0_40px_100px_-30px_var(--shadow)]"
          >
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-royal-600 text-white">
              <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7" aria-hidden="true">
                <path
                  d="M5.5 12.5 10 17l8.5-9.5"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <h3 id="enquiry-sent-title" className="t-big mt-5 text-ink">
              Thanks, the founder will be in touch shortly.
            </h3>
            <p className="t-text mt-3 text-ink-soft">
              We look forward to helping you build a practice that works for
              you, without you.
            </p>
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              className="t-ui mt-6 inline-flex items-center justify-center rounded-full bg-royal-600 px-7 py-3 text-white transition-colors duration-200 hover:bg-royal-500"
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
