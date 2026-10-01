import type { Metadata } from "next";
import ContactSection from "@/components/ContactSection";

export const metadata: Metadata = {
  title: "Book a Call | Dental Growth Lab",
  description:
    "Book a call with Dental Growth Lab to talk through building a practice that works for you, without you.",
};

export default function BookACallPage() {
  return (
    <>
      <main>
        <ContactSection />
      </main>
    </>
  );
}
