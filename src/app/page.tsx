import Hero from "@/components/Hero";
import Reframe from "@/components/Reframe";
import FeelFamiliar from "@/components/FeelFamiliar";
import MyStory from "@/components/MyStory";
import HowWeCanHelp from "@/components/HowWeCanHelp";
import PageTiles from "@/components/PageTiles";
import { findPublicImage } from "@/lib/images";
import { tileAvatars } from "@/lib/testimonials";

export default function Home() {
  return (
    <>
      <main>
        <Hero photoSrc={findPublicImage("office-consultation")} />
        <Reframe />
        <FeelFamiliar />
        <MyStory
          founderSrc={findPublicImage("pujan")}
          practiceSrc={findPublicImage("practice")}
        />
        <HowWeCanHelp photoSrc={findPublicImage("practice")} />
        <PageTiles avatars={tileAvatars()} />
      </main>
    </>
  );
}
