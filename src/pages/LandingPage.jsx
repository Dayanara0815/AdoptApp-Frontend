import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import '../App.css';

import Navbar from '../components/landing/Navbar';
import HeroSection from '../components/landing/HeroSection';
import AboutSection from '../components/landing/AboutSection';
import MissionVisionSection from '../components/landing/MissionVisionSection';
import ObjectivesSection from '../components/landing/ObjectivesSection';
import Footer from '../components/landing/Footer';

export default function LandingPage() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const section = document.querySelector(location.hash);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location.hash]);

  return (
    <div className="landing-root">
      <main className="pt-5 mt-3">
        <HeroSection />
        <AboutSection />
        <MissionVisionSection />
        <ObjectivesSection />
      </main>
    </div>
  );
}
