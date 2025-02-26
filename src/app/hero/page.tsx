import Hero from "@/vcomponents/Hero";
import WearYourStory from "@/vcomponents/WearYourStory";
import FeatureCarousel from "@/vcomponents/FeatureCarousel";
import PortfolioGrid from "@/vcomponents/PortfolioGrid";
import Timeline from "@/vcomponents/Timeline";
import Marquee from "@/vcomponents/Marquee";
import ContactForm from "@/vcomponents/ContactForm";
import NewsletterSubscribe from "@/vcomponents/NewsletterSubscribe";
import AboutSection from "@/components/landing/aboutSection";

export default function Home() {
  return (
    <>
      <Hero />
      <AboutSection />
      <FeatureCarousel />
      <PortfolioGrid />
      <Timeline />
      <Marquee />
      <ContactForm />
      <NewsletterSubscribe />
    </>
  );
}
