import type { Metadata } from "next";
import Link from "next/link";
import {
  MARK_OPTIONS,
  WORDMARK_OPTIONS,
  WordmarkStandard,
} from "@/components/logo/LogoOptions";

export const metadata: Metadata = {
  title: "Logo options | Dental Growth Lab",
  description: "Logo and wordmark directions for Dental Growth Lab.",
};

export default function LogoPage() {
  return (
    <main className="on-sheet min-h-screen bg-sheet px-6 py-16 text-ink sm:px-10 sm:py-24">
      <div className="mx-auto max-w-[1200px]">
        <Link href="/" className="t-ui text-ink-soft hover:text-ink">
          Back to the site
        </Link>

        <h1 className="t-display mt-6 max-w-[24ch] text-balance text-ink">
          Logo and wordmark directions
        </h1>
        <p className="t-lead mt-4 max-w-[60ch] text-ink-soft">
          Four mark directions, none of them a tooth. Each is shown on the
          pastel white sheet in the brand blue, and in white on the site’s
          blue background.
        </p>

        <div className="mt-16 flex flex-col gap-20">
          {MARK_OPTIONS.map(({ id, name, blurb, Mark }) => (
            <section key={id}>
              <h2 className="t-h2 text-ink">{name}</h2>
              <p className="t-body mt-2 max-w-[60ch] text-ink-soft">{blurb}</p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-sheet-line bg-white p-5">
                  <div className="flex items-center gap-4">
                    <Mark className="h-14 w-14 text-royal-600" />
                    <div className="flex items-center gap-2.5 text-ink">
                      <Mark className="h-6 w-6 text-royal-600" />
                      <WordmarkStandard className="text-base text-ink" />
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl bg-royal-600 p-5">
                  <div className="flex items-center gap-4">
                    <Mark className="h-14 w-14 text-white" />
                    <div className="flex items-center gap-2.5 text-white">
                      <Mark className="h-6 w-6 text-white" />
                      <WordmarkStandard className="text-base text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </section>
          ))}
        </div>

        <section className="mt-24 border-t border-sheet-line pt-16">
          <h2 className="t-h2 text-ink">Wordmark treatments</h2>
          <p className="t-body mt-2 max-w-[60ch] text-ink-soft">
            Two ways to set the name on its own, independent of which mark
            it pairs with.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {WORDMARK_OPTIONS.map(({ id, name, blurb, Wordmark }) => (
              <div key={id} className="rounded-2xl border border-sheet-line bg-white p-6">
                <p className="t-label text-ink-soft">{name}</p>
                <p className="t-small mt-1 max-w-[46ch] text-ink-soft">{blurb}</p>
                <div className="mt-6 rounded-xl bg-sheet px-5 py-6">
                  <Wordmark className="text-xl text-ink" />
                </div>
                <div className="mt-3 rounded-xl bg-royal-600 px-5 py-6">
                  <Wordmark className="text-xl text-white" />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
