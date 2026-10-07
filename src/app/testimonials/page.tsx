import type { Metadata } from "next";
import Testimonials from "@/components/Testimonials";
import PageTiles from "@/components/PageTiles";
import { tileAvatars } from "@/lib/testimonials";

export const metadata: Metadata = {
  title: "Testimonials | Dental Growth Lab",
  description:
    "What practice owners say about working with Pujan Soni and Dental Growth Lab.",
};

export default function TestimonialsPage() {
  return (
    <>
      <main>
        <Testimonials asPage />
        <PageTiles avatars={tileAvatars()} skip="testimonials" />
      </main>
    </>
  );
}
