import type { Metadata } from "next";
import { Bricolage_Grotesque, Manrope } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { bgBootScript, DEFAULT_BG } from "@/lib/background";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Dental Growth Lab | Build a Practice That Works Without You",
  description:
    "Dental Growth Lab helps dental practice owners build accountable teams, effective systems and profitable businesses that don't depend on them.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${manrope.variable} h-full antialiased`}
      data-bg={DEFAULT_BG}
      suppressHydrationWarning
    >
      <head>
        {/* Applies a remembered background style before first paint. */}
        <script dangerouslySetInnerHTML={{ __html: bgBootScript() }} />
      </head>
      <body className="min-h-full text-white">
        <SmoothScroll />
        <Header />
        {/* The page. It lifts away at the very end to reveal the footer,
            which is fixed behind it. */}
        <div className="page-shell">
          <div className="site-bg" aria-hidden="true" />
          {children}
        </div>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
