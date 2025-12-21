import { useRef, useEffect } from "react";
import { useLocation } from "react-router";
import HeroSection from "./sections/hero";
import AboutSection from "./sections/about";
import PackagesSection from "./sections/packages";
import ContactSection from "./sections/contact";
import Footer from "./sections/footer";

const LandingPage = () => {
  const aboutRef = useRef<HTMLDivElement>(null);
  const packagesRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  const scrollToSection = (ref: React.RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Handle hash-based navigation
  useEffect(() => {
    if (location.hash === "#packages") {
      setTimeout(() => {
        scrollToSection(packagesRef);
      }, 100);
    } else if (location.hash === "#about") {
      setTimeout(() => {
        scrollToSection(aboutRef);
      }, 100);
    } else if (location.hash === "#contact") {
      setTimeout(() => {
        scrollToSection(contactRef);
      }, 100);
    }
  }, [location]);

  return (
    <div className="min-h-screen">
      <HeroSection
        onScrollToAbout={() => scrollToSection(aboutRef)}
        onScrollToPackages={() => scrollToSection(packagesRef)}
        onScrollToContact={() => scrollToSection(contactRef)}
      />
      <div ref={aboutRef}>
        <AboutSection />
      </div>
      <div ref={packagesRef} id="packages">
        <PackagesSection />
      </div>
      <div ref={contactRef}>
        <ContactSection />
      </div>
      <Footer />
    </div>
  );
};

export default LandingPage;
