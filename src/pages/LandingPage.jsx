import "../App.css";

import Navbar from "../components/landing/Navbar";
import HeroSection from "../components/landing/HeroSection";
import AboutSection from "../components/landing/AboutSection";
import MissionVisionSection from "../components/landing/MissionVisionSection";
import ObjectivesSection from "../components/landing/ObjectivesSection";
import NewsletterSection from "../components/landing/NewsletterSection";
import Footer from "../components/landing/Footer";

export default function LandingPage() {
  return (
    <div className="landing-root">
      <Navbar />
      <main className="pt-5 mt-3">
        <HeroSection />
        <AboutSection />
        <MissionVisionSection />
        <ObjectivesSection />
        <NewsletterSection />
      </main>
      <Footer />
    </div>
  );
}
