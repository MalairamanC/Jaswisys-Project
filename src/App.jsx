import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import About from "./components/About";
import Services from "./components/Services";
import Careers from "./components/Careers";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

// Reusable section component for consistency
const AppSection = ({ id, children, className = "" }) => (
  <section
    id={id}
    className={className}
    role="region"
    aria-labelledby={`heading-${id}`}
  >
    {children}
  </section>
);

export default function App() {
  return (
    <div className="relative min-h-screen bg-black">
      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main className="pt-0 sm:pt-0">
        {/* Hero Section */}
        <AppSection id="Home">
          <Hero />
        </AppSection>

        {/* Features Section */}
        <AppSection id="Features">
          <Features />
        </AppSection>

        {/* About Section */}
        <AppSection id="About">
          <About />
        </AppSection>

        {/* Services Section */}
        <AppSection id="Services">
          <Services />
        </AppSection>

        {/* Careers Section */}
        <AppSection id="Careers">
          <Careers />
        </AppSection>

        {/* Contact Section */}
        <AppSection id="Contact">
          <Contact />
        </AppSection>

        {/* Footer Section */}
        <AppSection id="Footer">
          <Footer />
        </AppSection>
      </main>

      {/* Skip to Content Link for Accessibility */}
      <a
        href="#Home"
        className="sr-only focus:not-sr-only fixed top-2 left-2 z-50 bg-purple-600 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-white"
      >
        Skip to main content
      </a>
    </div>
  );
}
