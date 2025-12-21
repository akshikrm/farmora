import { useRef } from "react";
import HeroSection from "./sections/hero";
import AboutSection from "./sections/about";
import PackagesSection from "./sections/packages";
import ContactSection from "./sections/contact";
import Footer from "./sections/footer";

const LandingPage = () => {
  const aboutRef = useRef<HTMLDivElement>(null);
  const packagesRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (ref: React.RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

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
      <div ref={packagesRef}>
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
