import Header from "@/components/Header";
import Hero from "@/components/Hero";
import YourPracticeConvergence from "@/components/YourPracticeConvergence";
import MyStoryTransformation from "@/components/MyStoryTransformation";
import TeaserFullBleed from "@/components/TeaserFullBleed";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <YourPracticeConvergence />
        <MyStoryTransformation />
        <TeaserFullBleed />
      </main>
      <Footer />
    </>
  );
}
