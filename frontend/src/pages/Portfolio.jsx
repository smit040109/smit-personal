import { useEffect } from "react";
import { useLenis } from "../hooks/useLenis";
import { Navbar } from "../components/portfolio/Navbar";
import { Hero } from "../components/portfolio/Hero";
import { About } from "../components/portfolio/About";
import { Experience } from "../components/portfolio/Experience";
import { Expertise } from "../components/portfolio/Expertise";
import { CaseStudies } from "../components/portfolio/CaseStudies";
import { MarketingStack } from "../components/portfolio/MarketingStack";
import { WhyHireMe } from "../components/portfolio/WhyHireMe";
import { Education } from "../components/portfolio/Education";
import { Contact } from "../components/portfolio/Contact";
import { Footer } from "../components/portfolio/Footer";

export default function Portfolio() {
  useLenis();

  useEffect(() => {
    document.title = "Smit Patel — Digital Marketing & Growth Specialist";
  }, []);

  return (
    <div className="bg-[#FAFAFA] min-h-screen antialiased">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Experience />
        <Expertise />
        <CaseStudies />
        <MarketingStack />
        <WhyHireMe />
        <Education />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
