import Hero from "@/components/Hero";
import Reframe from "@/components/Reframe";
import FeelFamiliar from "@/components/FeelFamiliar";
import MyStory from "@/components/MyStory";
import HowWeCanHelp from "@/components/HowWeCanHelp";
import WorkTeaser from "@/components/WorkTeaser";
import Testimonials from "@/components/Testimonials";
import ContactSection from "@/components/ContactSection";
import { findPublicImage } from "@/lib/images";

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <Reframe />
        <FeelFamiliar />
        <MyStory
          founderSrc={findPublicImage("pujan")}
          practiceSrc={findPublicImage("practice")}
        />
        <HowWeCanHelp />
        <WorkTeaser />
        <Testimonials />
        <ContactSection />
      </main>
    </>
  );
}
