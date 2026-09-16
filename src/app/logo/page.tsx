import type { Metadata } from "next";
import Link from "next/link";
import { THEMES } from "@/lib/themes";
import {
  MARK_OPTIONS,
  WORDMARK_OPTIONS,
  WordmarkStandard,
} from "@/components/logo/LogoOptions";

export const metadata: Metadata = {
  title: "Logo options | Dental Growth Lab",
  description: "Logo and wordmark directions for Dental Growth Lab, previewed across all three colourways.",
};

export default function LogoPage() {
  return (
    <main className="min-h-screen bg-paper px-6 py-16 text-ink sm:px-10 sm:py-24">
      <div className="mx-auto max-w-[1200px]">
        <Link href="/" className="text-sm font-medium text-mist-dim hover:text-ink">
          Back to the site
        </Link>

        <h1 className="mt-6 max-w-[24ch] text-balance font-display text-[clamp(2.25rem,5vw,3.5rem)] font-medium tracking-tight text-ink">
          Logo and wordmark directions
        </h1>
        <p className="mt-4 max-w-[60ch] text-lg leading-relaxed text-ink/70">
          Four mark directions, none of them a tooth. Each is shown on a
          light background in the mark&apos;s accent colour, and in mono on
          a dark background, across all three colourways so you can judge
          it alongside the palette decision.
        </p>

        <div className="mt-16 flex flex-col gap-20">
          {MARK_OPTIONS.map(({ id, name, blurb, Mark }) => (
            <section key={id}>
              <h2 className="font-display text-2xl font-medium tracking-tight text-ink sm:text-3xl">
                {name}
              </h2>
              <p className="mt-2 max-w-[60ch] text-ink/60">{blurb}</p>

              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                {THEMES.map((theme) => (
                  <div
                    key={theme.id}
                    data-theme={theme.id}
                    className="rounded-2xl border border-paper-line p-5"
                  >
                    <p className="text-xs font-semibold uppercase tracking-wide text-mist-dim">
                      {theme.label}
                    </p>

                    <div className="mt-4 flex items-center gap-4">
                      <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-paper-dim">
                        <Mark className="h-9 w-9 text-moss" />
                      </div>
                      <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-ink">
                        <Mark className="h-9 w-9 text-paper" />
                      </div>
                    </div>

                    <div className="mt-4 flex items-center gap-2.5 text-ink">
                      <Mark className="h-6 w-6 text-moss" />
                      <WordmarkStandard className="text-base text-ink" />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        <section className="mt-24 border-t border-paper-line pt-16">
          <h2 className="font-display text-2xl font-medium tracking-tight text-ink sm:text-3xl">
            Wordmark treatments
          </h2>
          <p className="mt-2 max-w-[60ch] text-ink/60">
            Two ways to set the name on its own, independent of which mark
            it pairs with.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {WORDMARK_OPTIONS.map(({ id, name, blurb, Wordmark }) => (
              <div key={id} className="rounded-2xl border border-paper-line p-6">
                <p className="text-xs font-semibold uppercase tracking-wide text-mist-dim">
                  {name}
                </p>
                <p className="mt-1 max-w-[46ch] text-sm text-ink/60">{blurb}</p>
                <div className="mt-6 rounded-xl bg-paper-dim px-5 py-6">
                  <Wordmark className="text-xl text-ink" />
                </div>
                <div className="mt-3 rounded-xl bg-ink px-5 py-6">
                  <Wordmark className="text-xl text-paper" />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
