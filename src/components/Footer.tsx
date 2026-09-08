import { LogoMark, Wordmark } from "./Logo";
import BookCallButton from "./BookCallButton";

const SOCIALS = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "Facebook", href: "https://facebook.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
];

export default function Footer() {
  return (
    <footer className="relative bg-ink text-paper">
      <div className="mx-auto max-w-[1400px] px-6 py-16 sm:px-10 sm:py-20">
        <div className="flex flex-col gap-10 border-b border-paper/10 pb-12 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-display text-2xl font-medium tracking-tight text-paper sm:text-3xl">
              Build a practice that works without you.
            </p>
            <p className="mt-3 max-w-[46ch] text-paper/60">
              We help dental practice owners build accountable teams,
              effective systems and profitable businesses that don&apos;t
              depend on them.
            </p>
          </div>
          <BookCallButton variant="inverse" className="shrink-0" />
        </div>

        <div className="mt-10 flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
          <a
            href="#home"
            className="flex items-center gap-2.5 text-paper"
            aria-label="Dental Growth Lab, home"
          >
            <LogoMark className="h-6 w-6 text-moss-bright" />
            <Wordmark className="text-[0.95rem]" />
          </a>

          <nav aria-label="Footer" className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-paper/60">
            <a href="#home" className="hover:text-paper">
              Home
            </a>
            <a href="#your-practice" className="hover:text-paper">
              Your Practice
            </a>
            <a href="#my-story" className="hover:text-paper">
              My Story
            </a>
          </nav>

          <div className="flex gap-6 text-sm text-paper/60">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-paper"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>

        <p className="mt-12 text-xs text-paper/35">
          © {new Date().getFullYear()} Dental Growth Lab. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}
