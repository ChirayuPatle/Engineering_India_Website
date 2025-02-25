// import Hero from "@/components/hero"
import ClubHeads from "@/components/landing/clubHeads";
import EventsGallery from "@/components/landing/eventGallery";
import Feedback from "@/components/landing/feedback";
import Faq from "@/components/landing/faq";
import AboutSection from "@/components/landing/aboutSection";
import Footer from "@/components/landing/footer";

export default function Home() {
  return (
    <>
      <main className="min-h-screen px-20">
        {/* <Hero /> */}
        <AboutSection />
        <ClubHeads />
        <EventsGallery />
        <Feedback />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
