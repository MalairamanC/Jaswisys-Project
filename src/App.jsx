import { useState } from "react";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import About from "./components/About";
import Services from "./components/Services";
import Careers from "./components/Careers";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";

// Reusable Section
const AppSection = ({ id, children }) => (
  <section id={id}>
    {children}
  </section>
);

export default function App() {
  const [page, setPage] = useState("home");

  // Privacy Policy Page
  if (page === "privacy") {
    return (
      <PrivacyPolicy setPage={setPage} />
    );
  }

  // Terms Page
  if (page === "terms") {
    return (
      <TermsOfService setPage={setPage} />
    );
  }

  // Home Page
  return (
    <div className="relative min-h-screen bg-black">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main>
        <AppSection id="Home">
          <Hero />
        </AppSection>

        <AppSection id="Features">
          <Features />
        </AppSection>

        <AppSection id="About">
          <About />
        </AppSection>

        <AppSection id="Services">
          <Services />
        </AppSection>

        <AppSection id="Careers">
          <Careers />
        </AppSection>

        <AppSection id="Contact">
          <Contact />
        </AppSection>

        <AppSection id="Footer">
          <Footer setPage={setPage} />
        </AppSection>
      </main>
    </div>
  );
}
